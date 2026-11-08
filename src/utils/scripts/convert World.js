import fs from "node:fs";

const start = performance.now();

const file = fs.readFileSync("originals/mhw_db.json");
const data = JSON.parse(file);

const seen = new Set();
const monsters = data
    .filter((m) => {
        if (m.type !== "large" || seen.has(m.name)) return false;
        seen.add(m.name);
        return true;
    })
    .map((m) => ({
        id: m.id,
        name: m.name,
        type: m.type,
        species: m.species,
        description: m.description,
        ailments: m.ailments.map((a) => ({
            name: a.name,
            description: a.description,
        })),
        weaknesses: m.weaknesses
            .filter((w) => w.stars > 0)
            .map((w) => ({
                name: w.element,
                value: w.stars,
                condition: w.condition,
            })),
    }));

fs.writeFileSync("public/data/world_monsters.json", JSON.stringify(monsters));

const end = performance.now();
console.log(`Done in ${(end - start).toFixed(4)} ms`);
