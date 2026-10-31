// script to convert MHGU DB file to JSON
// run with node from project root
import Database from "better-sqlite3";
import fs from "node:fs";

const db = new Database("originals/mhgu.db", { readonly: true });

const query = (sql, param) => (param !== undefined ? db.prepare(sql).all(param) : db.prepare(sql).all());

const types = { 0: "large", 1: "small", 2: "deviant" };

const monsters = query("SELECT * FROM monsters ORDER BY _id").map((m) => ({
    id: m._id,
    name: m.name,
    type: types[m.class],
    base_hp: m.base_hp,
    icon_name: m.icon_name,
    // eslint-disable-next-line no-unused-vars
    ailments: query("SELECT * FROM monster_ailment WHERE monster_id = ? ORDER BY _id", m._id).map(({ _id, monster_id, ailment }) => ailment),
    // eslint-disable-next-line no-unused-vars
    weaknesses: query("SELECT * FROM monster_weakness WHERE monster_id = ? ORDER BY _id", m._id).map(({ _id, monster_id, state, fire, water, thunder, ice, dragon, poison, paralysis, sleep, ...items }) => ({
        state,
        elements: { fire, water, thunder, ice, dragon },
        status: { poison, paralysis, sleep },
        items,
    })),
}));

fs.writeFileSync("public/data/mhgu_monsters.json", JSON.stringify(monsters));

console.log("Converted to JSON");
