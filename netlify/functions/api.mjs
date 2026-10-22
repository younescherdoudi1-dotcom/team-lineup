import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

export const config = { path: "/api/*" };

const MAX_LINEUPS = 30;
const TOKEN_TTL_MS = 12 * 3600 * 1000;

const DEFAULT_LINEUP = {
  id: "default",
  isDefault: true,
  formation: "2-2",
  players: [
    { num: "6", name: "الحارس", photo: "" },
    { num: "", name: "لاعب 1", photo: "" },
    { num: "", name: "لاعب 2", photo: "" },
    { num: "", name: "لاعب 3", photo: "" },
    { num: "", name: "لاعب 4", photo: "" },
  ],
  subs: ["بديل 1", "بديل 2"],
  opponent: "",
  date: "",
  time: "",
  venue: "",
  note: "",
  coach: "كمال طاهر",
  coachPhoto: "/coach.jpg",
  updatedAt: "2026-10-22T00:00:00.000Z",
};

function store() {
  return globalThis.__TEST_STORE || getStore({ name: "football", consistency: "strong" });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    stat
