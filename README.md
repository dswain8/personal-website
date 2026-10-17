# Debjeet Swain — Personal Website

Personal site for [debjeetswain.com](https://debjeetswain.com). React + TypeScript + Vite SPA with a **pocket-radio** metaphor: four stations, dial + keys `1`–`4`, interactive rooms.

## Routes

| Path | Room |
|------|------|
| `/` | Radio home (dial). `/?tune=build` opens already locked. |
| `/build` | Build something — skill bookcase |
| `/quiet` | Find a little quiet — thought field |
| `/try` | Try what I've made — workshop bench |
| `/life` | Off the clock — cutaway house |
| `/wonder-journal`, `/pm-dojo`, `/postcard-desk` | Project write-ups |
| `/contact` | Say hello |

Legacy paths `/projects`, `/living`, `/stack`, `/about` redirect into the radio map.

## Stack

- React 19, TypeScript, Vite, React Router
- Design system ported from the radio prototype (`public/radio.css`)
- Skill library: `public/skills-clean/` (+ `public/commands/` kept)
- Vercel static SPA (`vercel.json` rewrites)

## Local Development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Notes

- Radio shell + rooms live under `src/radio/`.
- Prototype CSS is served as `/radio.css` (not bundled through Tailwind) for nesting / view-transition fidelity.
- Optional Web Audio: radio static (Sound switch) and Quiet-page drone.
