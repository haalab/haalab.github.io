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
    name: "Prof. Iryna Gurevych",
    role: "Ubiquitous Knowledge Processing Lab (UKP Lab)",
    affiliation: "Department of Computer Science · Technical University of Darmstadt, Germany",
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
    "More than a billion people live with a mental health condition, yet care remains scarce and often a poor fit for the person receiving it, so people increasingly turn to unsupervised chatbots to fill the gap. Because language is the richest signal we have into someone's psychological state, natural language processing is the key to doing this better. In this talk, I argue that NLP can genuinely help, but solving it takes clinical grounding, real data, and responsible evaluation, not just larger models. Drawing on work from my group, I show how large language models can turn therapy transcripts into treatment-relevant structure, how clinically grounded synthetic data eases the field's privacy bottleneck, and why evaluation must reflect what clinicians actually care about, not just what's easy to benchmark. I close with an invitation to build mental health AI that is personalized, privacy-aware, and responsibly evaluated: tools that support clinicians, not replace them.",

  posterBio:
    "Iryna Gurevych is Professor in the Department of Computer Science at the Technical University of Darmstadt in Germany, where she leads the Ubiquitous Knowledge Processing Lab (UKP Lab). She is also an adjunct professor at MBZUAI in Abu Dhabi, UAE, and an affiliated professor at INSAIT in Sofia, Bulgaria. She is widely known for fundamental contributions to natural language processing and machine learning. Professor Gurevych is a past president of the Association for Computational Linguistics (ACL), the leading professional society in NLP. Her many accolades include being a Fellow of the ACL, an ELLIS Fellow, and the recipient of an ERC Advanced Grant. Most recently, she received the 2025 Milner Award of the British Royal Society for major contributions to NLP and artificial intelligence that combine deep understanding of human language and cognitive faculty with the latest paradigms in machine learning.",

  host: "Hosted by HAA Lab · Human-Agent Ally Lab",
  organizer: "National Institute of Informatics, Tokyo",
  language: "English",

  /* Optional. Supply ISO timestamps to enable “Add to calendar”. */
  start: "2026-09-28T09:30:00+09:00",
  end: "2026-09-28T11:15:00+09:00",
  eventUrl: "https://psych.ukp-lab.de/"
};
