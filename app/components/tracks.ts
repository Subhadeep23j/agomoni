import type { Playlist } from "./types";

// ─── How to add a track ───────────────────────────────────────────────────
// 1. Add a [id, title, artist] tuple to the relevant array below.
// 2. Set `videoId` to an authorized, embeddable YouTube video ID.
//    Leave empty ("") if no authorized video is available yet.
// ──────────────────────────────────────────────────────────────────────────

const mitaTracks: [string, string, string][] = [
  ["mita-01", "Gold Priter Sari", "Mita Chatterjee"],
  ["mita-02", "O Sona Reshmi", "Mita Chatterjee"],
  ["mita-03", "Moyna Shudhu Bole", "Mita Chatterjee"],
  ["mita-04", "O Sangi O Sangi", "Mita Chatterjee"],
  ["mita-05", "Bolbo Na Katha", "Mita Chatterjee"],
  ["mita-06", "Muchki Hanshi", "Mita Chatterjee"],
  ["mita-07", "Ami Bhadhbo Na", "Mita Chatterjee"],
  ["mita-08", "Ja Pakhi Jare Ure", "Mita Chatterjee"],
  ["mita-09", "Dubdub Pankouri", "Mita Chatterjee"],
  ["mita-10", "Pujoy Ebar Chaina Amar Benarasi Saree", "Mita Chatterjee"],
];

const pujaTracks: [string, string, string][] = [
  ["puja-01", "Elo Je Maa", "Abhijeet / Shreya Ghoshal / Jeet Ganguly"],
  ["puja-02", "Apur Paayer Chhaap", "Parambrata / Perno / Arijit / Indraadip / Kaushik"],
  ["puja-03", "Ebar Jeno Onno Rokom Pujo", "Dev / Mimi / Raj Chakraborty / SVF"],
  ["puja-04", "Ashtami Sondhyamaya", "Kaushik Ganguly / Arijit Singh / Indraadip Dasgupta"],
  ["puja-05", "Dugga Maa", "Arijit Singh / Bolo Dugga Maaki / Ankush / Nusrat / Arindam"],
  ["puja-06", "Dhaker Taley", "Poran / Jaal Jole Re / Dev / Subhashree / Abhijeet / Parinita"],
  ["puja-07", "Esho Hey", "Je Chhilo Raja / Jisshu / Shreya / Ishan / Indraadip / Srijat"],
  ["puja-08", "Shundori Komola", "Villain / Ankush / Mimi / Armaan / Antara"],
  ["puja-09", "Doob De Re Mon", "Durgashorer Guptodhon / Abir / Arjun / Ishaa / Bikram Ghosh"],
  ["puja-10", "Maa Go Tui", "Durgashorer Guptodhon / Abir / Ishaa / Arjun / Anupam Roy"],
  ["puja-11", "Agomoni Gaan", "Original Song / SVF Music"],
  ["puja-12", "Durga Elo", "Piyali? / Priyanka Sarkar / Arijit Kakkar / Ajay S / Babul Yadav / Joy"],
  ["puja-13", "Bolo Dugga Maaki", "Jeet Ganguly / Nakash Aziz / John / Sahana"],
  ["puja-14", "Bolo Dugga Elo", "Sunidhi Chauhan / Kaushik / Guddu / Indraadip / Purnam"],
  ["puja-15", "The Pujo Song", "Srinikant? / Dhrubo Banerjee / Darshana / Rajnandini / Shreya"],
  ["puja-16", "Elo Re Pujo Elo", "Nakash Shau? / Debajit / John / Shreya"],
  ["puja-17", "Bolo Dugga Elo", "Sunidhi Chauhan / Kaushik / Guddu / Indraadip / Purnam"],
  ["puja-18", "Elo Re Pujo Elo", "Nakash / Shreya / Debajit / John / Shreya"],
  ["puja-19", "Bolo Dugga Elo", "LOFI / Sunidhi / Kaushik / Guddu / SVF Music"],
  ["puja-20", "Koka Kola", "Fandare Poriya Boga Keande Re / Srabanti / Soham / Samidh / SVF"],
  ["puja-21", "Elo Je Maa", "Challenge 2 / Dev / Puja / Abhijeet / Shreya / Jeet Ganguly / SVF"],
  ["puja-22", "Doob De Re Mon", "Lyrical / Durgashorer Guptodhon / Abir / Arjun / Ishaa / Bikram"],
  ["puja-23", "Shundori Komola", "Villain / Ankush / Mimi / Armaan / Antara / Subho JAMB..."],
  ["puja-24", "Maa Go Tui", "Durgashorer Guptodhon / Abir / Ishaa / Arjun / Anupam Roy"],
  ["puja-25", "Behaya", "Ekannoborti / Lagnajita / Prasenjit / Debol / Malai / SVF Music"],
  ["puja-26", "Pujar Gaan", "HoichoiGaami / Anirban / Subhadeep / Debl / Gopinath / SVF"],
  ["puja-27", "Agomoni Gaan", "Lyrical / Original / Anupam Roy / Durga Puja"],
  ["puja-28", "Jaago Uma", "Lyrical / Uma / Rupankar Bagchi / Anupam Roy / Jisshu / Sara"],
  ["puja-29", "Shajao Shajao", "Lyrical / Ballabhpur / Roopkotha / Ishana / Sahana / Debra"],
  ["puja-30", "Best of Durga Puja Hits", "Durga Puja Songs / Bengali Durga Puja Hits / SVF"],
  ["puja-31", "Elo Re Pujo Elo", "Lyrical / Nakash / Shreya / Debajit / John"],
  ["puja-32", "Dugga Ma", "Lyrical / Bolo Dugga Maaki / Arijit Singh / Ankush / Nusrat / SVF Music"],
  ["puja-33", "Bolo Dugga Elo", "Sunidhi Chauhan / Kaushik / Guddu / Indraadip / Purnam"],
  ["puja-34", "Elo Je Maa", "Challenge 2 / Dev / Puja / Abhijeet / Shreya / Jeet Ganguly / SVF"],
  ["puja-35", "Charpaase Aalo Hok", "Lyrical / Durga Puja Bengali Song / SVF Music"],
  ["puja-36", "Dhaker Taley", "Poran / Jaal Jole Re / Dev / Abhijeet / Subhashree"],
  ["puja-37", "Thakur Thakbe Kothay", "Shontaan / Mithun C / Amit / Jeet G / Priyanka / SVF Music"],
  ["puja-38", "Koka Kola", "Fandare Porja Boga Keande Re / Srabanti / Soham / Samidh / SVF"],
];

// Add an authorized YouTube video ID for each track below.
// Only use videos from rights holders where embedding is enabled.
const mitaVideoIds: Record<string, string> = {
  "mita-01": "zoAIg8_5Cto",
  "mita-02": "ZeXY1vvOlEQ",
  "mita-03": "62efXSP5q2Y",
  "mita-04": "dIivRZmtP1k",
  "mita-05": "qGk3XLeRNkg",
  "mita-06": "Sw-loAqU94U",
  "mita-07": "cGlywqtF9T8",
  "mita-08": "YmTF3Ybechs",
  "mita-09": "HwnyHgKEThY",
  "mita-10": "amuhEEBI7GM",
};

const pujaVideoIds: Record<string, string> = {
  "puja-01": "2U416kTo0as",
  "puja-02": "Rm0lQRu5hxY",
  "puja-03": "E2zfQEo7Q_M",
  "puja-04": "rS9IrdIbW2c",
  "puja-05": "sPuZ0Q3KDWo",
  "puja-06": "hbXuXt7gkFY",
  "puja-07": "zVSihjSChtw",
  "puja-08": "gwjWIawYyNs",
  "puja-09": "4nC72K3Eihc",
  "puja-10": "60tSbJWJCr0",
  "puja-11": "MsqpjM09MrY",
  "puja-12": "xytF80lvSV8",
  "puja-13": "DGNCKijVhJc",
  "puja-14": "XyatKcoBrPw",
  "puja-15": "JTsDy_ftkn4",
  "puja-16": "UElpQ1D3CkA",
  "puja-17": "PiMa4BW9Vrw",
  "puja-18": "XPPkN9QEgKo",
  "puja-19": "nSYHWioN9EM",
  "puja-20": "7u_6gAGu3v4",
  "puja-21": "GSJDim_JP4M",
  "puja-22": "LeoUoUQyIe0",
  "puja-23": "E_6K3no0PD0",
  "puja-24": "SQDammedcuk",
  "puja-25": "armv5XX7re8",
  "puja-26": "cYt_pENoKvA",
  "puja-27": "DlTmarrVrWE",
  "puja-28": "e0CfUyHN2gU",
  "puja-29": "hqen9Wqdmgg",
  "puja-30": "0RUhpbHwM90",
  "puja-31": "zDoAe-UItpk",
  "puja-32": "RUQfRSCxGpU",
  "puja-33": "hxF9zR4k9CU",
  "puja-34": "NAUA2LM9hZc",
  "puja-35": "nKqmDxZ339Q",
  "puja-36": "BhNWsSeP9zc",
  "puja-37": "lXVDQtQmHFQ",
  "puja-38": "RPftQkDdyPY",
};

const mahalayaTracks: [string, string, string][] = [
  ["mahalaya-01", "Mahishasuramardini (Full Mahalaya)", "Birendrakrishna Bhadra / Pankaj Mullick"],
  ["mahalaya-02", "Bajlo Tomar Alor Benu", "Pankaj Mullick / Traditional"],
  ["mahalaya-03", "Jago Durga Jago Dashapraharanadharini", "Asha Bhosle / Traditional"],
  ["mahalaya-04", "Aji Shankhe Shankhe Mangala Gao", "Arati Mukherjee / Traditional"],
];

const mahalayaVideoIds: Record<string, string> = {
  "mahalaya-01": "YQyo8QeoYhc",
  "mahalaya-02": "2U416kTo0as",
  "mahalaya-03": "Rm0lQRu5hxY",
  "mahalaya-04": "E2zfQEo7Q_M",
};

const mahalaya = mahalayaTracks.map(([id, title, artist]) => ({
  id,
  title,
  artist,
  videoId: mahalayaVideoIds[id] ?? "",
}));

const mita = mitaTracks.map(([id, title, artist]) => ({
  id,
  title,
  artist,
  videoId: mitaVideoIds[id] ?? "",
}));

const puja = pujaTracks.map(([id, title, artist]) => ({
  id,
  title,
  artist,
  videoId: pujaVideoIds[id] ?? "",
}));

export const playlists: Playlist[] = [
  {
    id: "mahalaya",
    name: "মহালয়া",
    subtitle: "মহিষাসুরমর্দিনী",
    tracks: mahalaya,
  },
  {
    id: "puja",
    name: "পুজোর গান",
    subtitle: "আগমনী সন্ধ্যা",
    tracks: puja,
  },
  {
    id: "mita",
    name: "মিতা চ্যাটার্জী",
    subtitle: "পুরোনো দিনের গান",
    tracks: mita,
  },
];
