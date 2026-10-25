// run with node
import { readdir, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_SIZE = 480;

const files = (await readdir("public/assets/icons/Monsters", { recursive: true })).filter((file) => file.endsWith(".png"));

for (const file of files) {
    const src = path.join("public/assets/icons/Monsters", file);
    const { dir, name } = path.parse(src);
    const dest = path.join(dir, name + ".webp");

    const input = await readFile(src);

    await sharp(input).resize(MAX_SIZE, MAX_SIZE, { fit: "inside", withoutEnlargement: true }).webp({ quality: 100 }).toFile(dest);
    await unlink(src);
}

console.log(`Converted ${files.length} images`);
