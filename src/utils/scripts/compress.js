// script to convert original images to .webp
// run with node from project root
import { readdir, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_SIZE = 480;

const src = "orginals/Monsters";
const dest = "public/assets/icons/Monsters";

const files = (await readdir(src, { recursive: true })).filter((file) => file.endsWith(".png"));

for (const file of files) {
    const png = path.join(src, file);
    const { dir, name } = path.parse(file);
    const webp = path.join(dest, dir, `${name}.webp`);

    await mkdir(path.dirname(webp), { recursive: true });

    const input = await readFile(png);
    await sharp(input).resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true }).webp({ quality: 100 }).toFile(webp);
}

console.log(`Converted ${files.length} images`);
