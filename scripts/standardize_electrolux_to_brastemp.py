"""
Padroniza a foto do fogão Electrolux para o mesmo canvas 1024×1024 da referência
(brastemp-bfs5ncr-review-premium.webp), com os mesmos parâmetros do Consul (cards alinhados).
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REF_PATH = ROOT / "public" / "images" / "reviews" / "brastemp-bfs5ncr-review-premium.webp"
# Fonte versionada no repositório (copiar o PNG do produto para este caminho).
REPO_SRC = ROOT / "public" / "images" / "source-fogao-electrolux-76usq.png"
OUT_PATH = ROOT / "public" / "images" / "reviews" / "electrolux-fe5ig-review-premium.webp"

SCALE_FACTOR = 1.05
NUDGE_UP_PX = 18


def bbox_nonwhite(img: Image.Image, thresh: int = 12) -> tuple[int, int, int, int]:
    g = img.convert("L")
    mask = g.point(lambda v: 255 if (255 - v) > thresh else 0, mode="1")
    bb = mask.getbbox()
    if bb is None:
        return 0, 0, img.width, img.height
    return bb


def main() -> None:
    ref = Image.open(REF_PATH).convert("RGBA")
    w, h = ref.size
    rb = bbox_nonwhite(ref)
    rw, rh = rb[2] - rb[0], rb[3] - rb[1]

    if not REPO_SRC.is_file():
        raise FileNotFoundError(
            f"Coloque o PNG do Electrolux em: {REPO_SRC} (ou rode o projeto a partir da máquina com o arquivo em assets)."
        )
    src = Image.open(REPO_SRC).convert("RGBA")
    cb = bbox_nonwhite(src)
    content = src.crop(cb)
    cw, ch = content.size

    base_scale = min(rw / cw, rh / ch)
    scale = base_scale * SCALE_FACTOR
    max_scale = min(w / cw, h / ch) * 0.999
    scale = min(scale, max_scale)
    nw, nh = max(1, int(round(cw * scale))), max(1, int(round(ch * scale)))
    resized = content.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    x0 = (w - nw) // 2
    y0 = (h - nh) // 2 - NUDGE_UP_PX
    x0 = max(0, min(x0, w - nw))
    y0 = max(0, min(y0, h - nh))
    canvas.paste(resized, (x0, y0), resized)

    rgb_out = Image.new("RGB", (w, h), (255, 255, 255))
    rgb_out.paste(canvas, mask=canvas.split()[3])

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    rgb_out.save(OUT_PATH, "WEBP", quality=92, method=6)
    print("Wrote", OUT_PATH, rgb_out.size)


if __name__ == "__main__":
    main()
