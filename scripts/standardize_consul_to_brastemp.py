"""
Padroniza a foto do fogão Consul para o mesmo canvas 1024×1024 da referência
(fogao-brastemp-bfs5ncr.webp): escala baseada na caixa de conteúdo do Brastemp,
+5% de zoom uniforme, centralização no canvas e leve ajuste vertical para cima.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REF_PATH = ROOT / "public" / "images" / "fogao-brastemp-bfs5ncr.webp"
CONSUL_SRC = Path(
    r"C:\Users\EdnaLocal\.cursor\projects\c-Users-EdnaLocal-Desktop-Projetos-blog-afiliado\assets"
    r"\c__Users_EdnaLocal_AppData_Roaming_Cursor_User_workspaceStorage_b332aae3c9bef0f757dbb63c8fcd48ae_images_consul-8df86065-06b2-4e2e-99cb-638fe2945c59.png"
)
OUT_PATH = ROOT / "public" / "images" / "fogao-consul-cfs5nab.webp"

# ~5% maior que o encaixe na caixa de conteúdo da referência; proporção uniforme (sem distorção).
SCALE_FACTOR = 1.05
# Após centralizar no canvas, sobe alguns pixels (produto um pouco baixo vs. referência visual).
NUDGE_UP_PX = 18


def bbox_nonwhite(img: Image.Image, thresh: int = 12) -> tuple[int, int, int, int]:
    """Pixels com max(R,G,B) < 255-thresh contam como conteúdo (produto/sombra)."""
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

    cons = Image.open(CONSUL_SRC).convert("RGBA")
    cb = bbox_nonwhite(cons)
    content = cons.crop(cb)
    cw, ch = content.size

    base_scale = min(rw / cw, rh / ch)
    scale = base_scale * SCALE_FACTOR
    # Garante que o recorte ampliado ainda cabe no canvas inteiro (fundo branco intacto).
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
