(function () {
  "use strict";

  const event = window.HAA_EVENT;
  if (!event) return;

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value || "";
    });
  };

  setText('[data-field="eyebrow"]', event.eyebrow);
  setText('[data-field="title"]', event.title);
  setText('[data-field="topicLine"]', event.topicLine);
  setText('[data-field="speaker.name"]', event.speaker.name);
  setText('[data-field="speaker.role"]', event.speaker.role);
  setText('[data-field="speaker.affiliation"]', event.speaker.affiliation);
  setText('[data-field="schedule.date"]', event.schedule.date);
  setText('[data-field="schedule.time"]', event.schedule.time);
  setText('[data-field="schedule.venue"]', event.schedule.venue);
  setText('[data-field="schedule.format"]', event.schedule.format);
  setText('[data-field="posterSummary"]', event.posterSummary);
  setText('[data-field="posterBio"]', event.posterBio);
  setText('[data-field="host"]', event.host);
  setText('[data-field="organizer"]', event.organizer);
  setText('[data-field="language"]', event.language);

  document.querySelectorAll('[data-field="speaker.photo"]').forEach((image) => {
    image.src = event.speaker.photo;
    image.alt = event.speaker.photoAlt || `Portrait of ${event.speaker.name}`;
  });

  document.querySelectorAll('[data-field="speaker.website"]').forEach((link) => {
    if (!event.speaker.website) {
      link.hidden = true;
      return;
    }
    link.hidden = false;
    link.href = event.speaker.website;
    link.querySelector("span").textContent = event.speaker.websiteLabel || event.speaker.website;
  });

  const title = `${event.title} · ${event.speaker.name} | HAA Lab`;
  document.title = title;
  document.querySelectorAll('[data-field="title"]').forEach((heading) => {
    heading.classList.toggle("long-title", event.title.length > 72);
  });
  document.querySelector('meta[name="description"]').content = event.posterSummary;

  const calendarButton = document.querySelector('[data-action="calendar"]');
  if (!event.start || !event.end) {
    calendarButton.hidden = true;
  } else {
    calendarButton.addEventListener("click", () => {
      const stamp = (value) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
      const escapeICS = (value) => String(value || "").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
      const location = event.schedule.venue;
      const description = `${event.posterSummary}\n\n${event.eventUrl || ""}`;
      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//HAA Lab//Guest Lecture//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@haalab.github.io`,
        `DTSTAMP:${stamp(new Date())}`,
        `DTSTART:${stamp(event.start)}`,
        `DTEND:${stamp(event.end)}`,
        `SUMMARY:${escapeICS(event.title)}`,
        `DESCRIPTION:${escapeICS(description)}`,
        `LOCATION:${escapeICS(location)}`,
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");
      const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "haa-lab-guest-talk.ics";
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  document.querySelector('[data-action="print"]').addEventListener("click", () => window.print());

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.posterSummary,
    startDate: event.start || undefined,
    endDate: event.end || undefined,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: { "@type": "Place", name: event.schedule.venue },
    performer: {
      "@type": "Person",
      name: event.speaker.name,
      jobTitle: event.speaker.role,
      affiliation: { "@type": "Organization", name: event.speaker.affiliation }
    },
    organizer: {
      "@type": "ResearchOrganization",
      name: "Human-Agent Ally Lab",
      url: "https://haalab.github.io/"
    },
    url: event.eventUrl || undefined
  };
  const schemaNode = document.createElement("script");
  schemaNode.type = "application/ld+json";
  schemaNode.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaNode);
})();
