// run with node from project root
import fs from "node:fs";

const start = performance.now()

const url = new URL("https://wilds.mhdb.io/en/monsters");
url.searchParams.set("q", JSON.stringify({ kind: "large" }));

const response = await fetch(url);
const data = await response.json();

const monsters = data.map((m) => ({
    id: m.id,
    name: m.name,
    type: m.kind,
    species: m.species,
    description: m.description,
    features: m.features,
    tips: m.tips,
    baseHealth: m.baseHealth,
    weaknesses: m.weaknesses.map(w => ({
        name: w.element ?? w.status ?? w.effect,
        value: w.level,
        condition: w.condition
    }))
}));

fs.writeFileSync("public/data/wilds_monsters.json", JSON.stringify(monsters));

const end = performance.now()
console.log(`Done in ${(end - start).toFixed(4)} ms`)