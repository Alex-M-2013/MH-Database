import fs from "node:fs";

const start = performance.now();

const file = fs.readFileSync("originals/rise_monster_db.json")
const data = JSON.parse(file)

// Claude additions
const additions = [
    {
        id: 71,
        name: "Chaotic Gore Magala",
        species: "???",
        elements: [],
        ailments: ["Frenzy Virus"],
        resistances: [{ condition: "immune", element: "water" }],
        weaknesses: [
            { element: "dragon", stars: 2 },
            { element: "thunder", stars: 2 },
            { element: "fire", stars: 3 },
            { element: "ice", stars: 1 },
            { element: "poison", stars: 1 },
            { element: "stun", stars: 1 },
            { element: "paralysis", stars: 1 },
            { element: "sleep", stars: 1 },
            { element: "blast", stars: 2 },
            { element: "exhaust", stars: 1 },
            { element: "fireblight", stars: 2 },
            { element: "waterblight", stars: 1 },
            { element: "thunderblight", stars: 1 },
            { element: "iceblight", stars: 1 },
        ],
    },
    {
        id: 72,
        name: "Velkhana",
        species: "elder dragon",
        elements: ["ice"],
        ailments: ["Iceblight"],
        resistances: [{ condition: "immune", element: "exhaust" }, { element: "ice" }, { element: "water" }],
        weaknesses: [
            { element: "fire", stars: 3 },
            { element: "dragon", stars: 2 },
            { element: "fireblight", stars: 2 },
            { element: "waterblight", stars: 1 },
            { element: "thunderblight", stars: 1 },
            { element: "iceblight", stars: 1 },
        ],
    },
    {
        id: 73,
        name: "Risen Kushala Daora",
        species: "elder dragon",
        elements: [],
        ailments: ["Iceblight", "Dragonblight"],
        resistances: [{ condition: "immune", element: "ice" }, { element: "water" }, { condition: "immune", element: "exhaust" }],
        weaknesses: [
            { element: "dragon", stars: 1 },
            { element: "thunder", stars: 2 },
            { element: "fire", stars: 1 },
            { element: "poison", stars: 1 },
            { element: "stun", stars: 1 },
            { element: "blast", stars: 3 },
            { element: "fireblight", stars: 1 },
            { element: "waterblight", stars: 1 },
            { element: "thunderblight", stars: 2 },
            { element: "iceblight", stars: 1 },
        ],
    },
    {
        id: 74,
        name: "Risen Teostra",
        species: "elder dragon",
        elements: ["fire"],
        ailments: ["Fireblight", "Blastblight"],
        resistances: [{ condition: "immune", element: "fire" }, { element: "thunder" }, { element: "dragon" }],
        weaknesses: [
            { element: "water", stars: 2 },
            { element: "ice", stars: 1 },
            { element: "poison", stars: 1 },
            { element: "stun", stars: 1 },
            { element: "blast", stars: 2 },
            { element: "fireblight", stars: 1 },
            { element: "waterblight", stars: 2 },
            { element: "thunderblight", stars: 1 },
            { element: "iceblight", stars: 1 },
        ],
    },
    {
        id: 75,
        name: "Risen Crimson Glow Valstrax",
        species: "elder dragon",
        elements: ["dragon"],
        ailments: ["Dragonblight"],
        resistances: [{ condition: "immune", element: "dragon" }],
        weaknesses: [
            { element: "thunder", stars: 3 },
            { element: "fire", stars: 3 },
            { element: "water", stars: 3 },
            { element: "ice", stars: 3 },
            { element: "blast", stars: 2 },
            { element: "fireblight", stars: 1 },
            { element: "waterblight", stars: 1 },
            { element: "thunderblight", stars: 1 },
            { element: "iceblight", stars: 1 },
        ],
    },
    {
        id: 76,
        name: "Amatsu",
        species: "elder dragon",
        elements: ["thunder"],
        ailments: ["Stun"],
        resistances: [],
        weaknesses: [
            { element: "fire", stars: 3 },
            { element: "dragon", stars: 2 },
        ],
    },
    {
        id: 77,
        name: "Risen Shagaru Magala",
        species: "elder dragon",
        elements: [],
        ailments: ["Frenzy Virus"],
        resistances: [{ condition: "immune", element: "water" }, { element: "ice" }],
        weaknesses: [
            { element: "dragon", stars: 3 },
            { element: "thunder", stars: 1 },
            { element: "fire", stars: 2 },
            { element: "poison", stars: 3 },
            { element: "stun", stars: 1 },
            { element: "fireblight", stars: 2 },
            { element: "waterblight", stars: 1 },
            { element: "thunderblight", stars: 1 },
            { element: "iceblight", stars: 1 },
        ],
    },
    {
        id: 78,
        name: "Primordial Malzeno",
        species: "elder dragon",
        elements: ["else"],
        ailments: ["Bloodblight"],
        resistances: [
            { condition: "immune", element: "water" },
            { condition: "immune", element: "thunder" },
        ],
        weaknesses: [
            { element: "dragon", stars: 3 },
            { element: "fire", stars: 2 },
            { element: "ice", stars: 1 },
            { element: "stun", stars: 1 },
            { element: "blast", stars: 2 },
            { element: "fireblight", stars: 1 },
            { element: "waterblight", stars: 1 },
            { element: "thunderblight", stars: 1 },
            { element: "iceblight", stars: 2 },
        ],
    },
];

const monsters = [...data, ...additions].map((m) => ({
    id: m.id,
    name: m.name,
    type: "large",
    species: m.species,
    ailments: m.ailments.filter(a => a !== "else"),
    weaknesses: m.weaknesses
        .filter((w) => w.stars > 0)
        .map((w) => ({
            name: w.element,
            value: w.stars,
        })),
}));


fs.writeFileSync("public/data/rise_monsters.json", JSON.stringify(monsters));

const end = performance.now();
console.log(`Done in ${(end - start).toFixed(4)} ms`);
