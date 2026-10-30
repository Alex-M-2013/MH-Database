// script to convert MH4U DB file to JSON
// run with node from project root
import Database from "better-sqlite3";
import fs from "node:fs";

const db = new Database("originals/mh4u.db", { readonly: true });

const query = (sql, param) => param !== undefined ? db.prepare(sql).all(param) : db.prepare(sql).all();

const types = { Boss: "large", Minion: "small" };

const monsters = query("SELECT * FROM monsters ORDER BY _id").map((m) => ({
    id: m._id,
    name: m.name,
    type: types[m.class],
    signature_move: m.signature_move,
    icon_name: m.icon_name,
    // eslint-disable-next-line no-unused-vars
    ailments: query("SELECT * FROM monster_ailment WHERE monster_id = ? ORDER BY _id", m._id).map(({_id, monster_id, ailment }) => ailment),
    // eslint-disable-next-line no-unused-vars
    weaknesses: query("SELECT * FROM monster_weakness WHERE monster_id = ? ORDER BY _id", m._id).map(({ _id, monster_id, state, fire, water, thunder, ice, dragon, poison, paralysis, sleep, ...items }) => ({
        state,
        elements: { fire, water, thunder, ice, dragon },
        status: { poison, paralysis, sleep },
        items,
    })),
}));

fs.writeFileSync("public/data/mh4u_monsters.json", JSON.stringify(monsters));

console.log("Converted to JSON");
