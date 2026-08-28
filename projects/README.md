# HAA Lab project pages

Each public research project lives in its own folder:

```text
projects/
├── shared/
│   ├── project-base.css       # HAA Lab identity + shared foundation
│   └── project.js             # tiny shared behaviours
├── _template/                 # copy this folder to start a project
└── mm-compliance/             # one complete example
```

## Start a project page

1. Copy `_template/` to a short lowercase slug, such as `project-name/`.
2. Replace the placeholder title, description, metadata, copy, links, and publication details.
3. Design the page's main content in its local `project.css`.
4. Add a `Project Page` link to the corresponding record in `js/publications-data.js`, pointing directly to `projects/project-name/index.html` so local previews do not open a directory listing.
5. Test links, keyboard focus, mobile layout, and reduced-motion behaviour.

## What stays consistent

- The HAA Lab identity bar and logo at the top.
- The HAA Lab footer, Lab website link, and ownership statement.
- Shared accessibility, sizing, and responsive foundations from `shared/project-base.css`.
- Project metadata that identifies HAA Lab as the author or publisher.

## What can change

- Project palette and typography accents through the CSS variables in local `project.css`.
- Hero composition, diagrams, section order, cards, demos, leaderboards, videos, and interaction.
- Project navigation labels and resource types.

Keep changes for one project inside that project's folder. Only edit `shared/` when the change should apply to every project page.
