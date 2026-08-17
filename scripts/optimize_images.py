"""Create responsive WebP/AVIF assets from the portfolio's original images.

The originals remain untouched. Output goes to public/images/optimized so the
website can use small thumbnails for cards and a reasonable full-size image for
the certificate dialog.
"""

from pathlib import Path

from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public"
OUTPUT = SOURCE / "images" / "optimized"

IMAGES = {
    "profile": SOURCE / "foto.png",
    "bnsp-2024": SOURCE / "sertifikat" / "BNSP 2024.jpg",
    "bnsp-2023": SOURCE / "sertifikat" / "BNSP 2023.jpg",
    "bangkit": SOURCE / "sertifikat" / "bangkit.jpg",
    "akreditasi": SOURCE / "sertifikat" / "akreditasi.jpg",
    "pbi": SOURCE / "sertifikat" / "pbi.jpg",
    "pedas": SOURCE / "sertifikat" / "pedas.jpg",
    "netacad-2024": SOURCE / "sertifikat" / "netacad 2024.jpg",
    "netacad-2025": SOURCE / "sertifikat" / "netacad 2025.jpg",
}


def resize(image: Image.Image, max_edge: int) -> Image.Image:
    result = ImageOps.exif_transpose(image)
    result.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
    return result


def save_variants(image: Image.Image, basename: str) -> None:
    rgb = image.convert("RGB")
    rgb.save(OUTPUT / f"{basename}.webp", "WEBP", quality=82, method=6)
    rgb.save(OUTPUT / f"{basename}.avif", "AVIF", quality=55)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    for name, source in IMAGES.items():
        with Image.open(source) as image:
            full_size = 512 if name == "profile" else 2200
            thumbnail_size = 360 if name == "profile" else 720
            save_variants(resize(image, full_size), name)
            save_variants(resize(image, thumbnail_size), f"{name}-thumb")


if __name__ == "__main__":
    main()
