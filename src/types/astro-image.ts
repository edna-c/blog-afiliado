/**
 * Forma mínima do default export de imagens raster locais (`*.webp`, `*.png`, etc.)
 * no pipeline Astro — compatível com `getImage` e `<Picture src={...} />`.
 */
export interface AstroRasterImport {
	readonly src: string;
	readonly width: number;
	readonly height: number;
	readonly format: 'avif' | 'png' | 'webp' | 'jpeg' | 'jpg' | 'svg' | 'tiff' | 'gif';
}
