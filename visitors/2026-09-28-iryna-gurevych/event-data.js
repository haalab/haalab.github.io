/*
 * HAA Lab visiting speaker template
 * ---------------------------------
 * For a new event, copy the whole `visitors/template` folder, then edit only
 * this object. The HTML, poster and print layout all read from the same data.
 */
window.HAA_EVENT = {
  eyebrow: "HAA Lab Guest Lecture",
  title: "NLP for Mental Health: Promise, Risk, Responsibility",
  topicLine: "Mental Health NLP · Clinical AI · Responsible Evaluation",

  speaker: {
    name: "Iryna Gurevych",
    role: "Professor of Ubiquitous Knowledge Processing",
    affiliation: "Department of Computer Science · TU Darmstadt",
    photo: "iryna-gurevych.png",
    photoAlt: "Portrait of Professor Iryna Gurevych",
    website: "https://psych.ukp-lab.de/",
    websiteLabel: "psych.ukp-lab.de"
  },

  schedule: {
    date: "September 28, 2026",
    time: "09:30-11:15 JST",
    venue: "Room 1512 · In person + Remote",
    format: "Hybrid guest lecture"
  },

  /* Keep posterSummary around 55–90 words for the best A4 balance. */
  posterSummary:
    "More than a billion people live with a mental health condition while access to care remains limited. This talk shows how clinically grounded NLP can structure therapy transcripts, use synthetic data to ease privacy constraints, and evaluate systems around what clinicians actually value. It closes with a vision for personalized, privacy-aware tools that support clinicians rather than replace them.",

  posterBio:
    "Iryna Gurevych is Professor at TU Darmstadt and a leading NLP researcher. A past ACL President and ACL/ELLIS Fellow, she received the Royal Society's 2025 Milner Award for major contributions to natural language processing and artificial intelligence.",

  host: "Hosted by HAA Lab · Human-Agent Ally Lab",
  organizer: "National Institute of Informatics, Tokyo",
  language: "English",

  /* Optional. Supply ISO timestamps to enable “Add to calendar”. */
  start: "2026-09-28T09:30:00+09:00",
  end: "2026-09-28T11:15:00+09:00",
  eventUrl: "https://psych.ukp-lab.de/"
};
