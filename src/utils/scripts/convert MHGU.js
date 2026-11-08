// script to convert MHGU DB file to JSON
// run with node from project root
import Database from "better-sqlite3";
import fs from "node:fs";

const start = performance.now();

const db = new Database("originals/mhgu.db", { readonly: true });

const query = (sql, param) => (param !== undefined ? db.prepare(sql).all(param) : db.prepare(sql).all());

const types = { 0: "large", 1: "small", 2: "deviant" };
const weaknesses = ["fire", "water", "thunder", "ice", "dragon", "poison", "paralysis", "sleep"];

const monsters = query("SELECT * FROM monsters ORDER BY _id")
    .filter((m) => m.class !== "1")
    .map((m) => ({
        id: m._id,
        name: m.name,
        type: types[m.class],
        base_hp: m.base_hp,
        icon_name: m.icon_name,
        // eslint-disable-next-line no-unused-vars
        ailments: query("SELECT * FROM monster_ailment WHERE monster_id = ? ORDER BY _id", m._id).map(({ _id, monster_id, ailment }) => ailment),
        weaknesses: Object.entries(query("SELECT * FROM monster_weakness WHERE monster_id = ? ORDER BY _id", m._id)[0])
            .filter(([name, value]) => weaknesses.includes(name) && value > 0)
            .map(([name, value]) => ({ name: name, value: value })),
    }));

fs.writeFileSync("public/data/mhgu_monsters.json", JSON.stringify(monsters));

const end = performance.now();
console.log(`Converted to JSON in ${(end - start).toFixed(4)} ms`);
