// script to convert MH4U DB file to JSON
// run with node from project root
import Database from "better-sqlite3";
import fs from "node:fs";

const start = performance.now();

const db = new Database("originals/mh4u.db", { readonly: true });

const query = (sql, param) => (param !== undefined ? db.prepare(sql).all(param) : db.prepare(sql).all());

const types = { Boss: "large", Minion: "small" };
const weaknesses = ["fire", "water", "thunder", "ice", "dragon", "poison", "paralysis", "sleep"];

const monsters = query("SELECT * FROM monsters ORDER BY _id")
    .filter((m) => m.class === "Boss")
    .map((m) => {
        const seenAilments = new Set();
        const seenWeaknesses = new Set();

        return {
            id: m._id,
            name: m.name,
            type: types[m.class],
            signatureMove: m.signature_move,
            iconName: m.icon_name.slice(0, -4),
            ailments: query("SELECT * FROM monster_ailment WHERE monster_id = ? ORDER BY _id", m._id)
                // eslint-disable-next-line no-unused-vars
                .filter(({ _id, monster_id, ailment }) => {
                    if (seenAilments.has(ailment)) return false;
                    seenAilments.add(ailment);
                    return true;
                }) // eslint-disable-next-line no-unused-vars
                .map(({ _id, monster_id, ailment }) => ({ name: ailment })),
            weaknesses: Object.entries(query("SELECT * FROM monster_weakness WHERE monster_id = ? ORDER BY _id", m._id)[0])
                .filter(([name]) => {
                    if (seenWeaknesses.has(name)) return false;
                    seenWeaknesses.add(name);
                    return true;
                })
                .filter(([name, value]) => weaknesses.includes(name) && value > 0)
                .map(([name, value]) => ({ name: name, value: value })),
        };
    });

fs.writeFileSync("public/data/mh4u_monsters.json", JSON.stringify(monsters));

const end = performance.now();
console.log(`Converted to JSON in ${(end - start).toFixed(4)} ms`);
