# GEO Citation Ledger

Track how each core entity is referenced across the site and externally. A minimum of 3 pages per entity is the target for stable citation by LLMs.

## Entity: Abdulrahman Mohammed (Person)

| # | Page | Locale | Type | Canonical URL |
|---|------|--------|------|---------------|
| 1 | Home | EN | Person JSON-LD + hero title + footer | `https://249abodii.vercel.app/` |
| 2 | About | EN | Section heading | `https://249abodii.vercel.app/#about` |
| 3 | CV | EN | Section heading | `https://249abodii.vercel.app/#cv` |
| 4 | FAQ | EN | Free text (Q&A about him) | `https://249abodii.vercel.app/#faq` |
| 5 | Contact | EN | Email field | `https://249abodii.vercel.app/#contact` |
| 6 | Home | AR | Person JSON-LD (Arabic) + sections | `https://249abodii.vercel.app/ar/` |
| 7 | About | AR | Section heading (Arabic) | `https://249abodii.vercel.app/ar/#about` |
| 8 | QAVENO case | EN | Author mention | `https://249abodii.vercel.app/projects/qaveno/` |
| 9 | ZELVOA case | EN | Author mention | `https://249abodii.vercel.app/projects/zelvoa/` |
| 10 | llms.txt | — | Name + one-liner | `https://249abodii.vercel.app/llms.txt` |

## Entity: QAVENO (SoftwareApplication)

| # | Page | Locale | Type | Canonical URL |
|---|------|--------|------|---------------|
| 1 | Projects list | EN | Project card link | `https://249abodii.vercel.app/#projects` |
| 2 | QAVENO case | EN | SoftwareApplication JSON-LD + FAQ + arch diagram | `https://249abodii.vercel.app/projects/qaveno/` |
| 3 | QAVENO case | AR | SoftwareApplication JSON-LD + FAQ (Arabic) | `https://249abodii.vercel.app/ar/projects/qaveno/` |
| 4 | FAQ | EN | Mentioned in Q&A | `https://249abodii.vercel.app/#faq` |
| 5 | llms.txt | — | Product listing | `https://249abodii.vercel.app/llms.txt` |
| 6 | QAVENO site | — | External product site | `https://qaveno.vercel.app/` |

## Entity: ZELVOA (SoftwareApplication)

| # | Page | Locale | Type | Canonical URL |
|---|------|--------|------|---------------|
| 1 | Projects list | EN | Project card link | `https://249abodii.vercel.app/#projects` |
| 2 | ZELVOA case | EN | SoftwareApplication JSON-LD + FAQ + arch diagram | `https://249abodii.vercel.app/projects/zelvoa/` |
| 3 | ZELVOA case | AR | SoftwareApplication JSON-LD + FAQ (Arabic) | `https://249abodii.vercel.app/ar/projects/zelvoa/` |
| 4 | FAQ | EN | Mentioned in Q&A | `https://249abodii.vercel.app/#faq` |
| 5 | llms.txt | — | Product listing | `https://249abodii.vercel.app/llms.txt` |
| 6 | ZELVOA site | — | External product site | `https://zelvoa.vercel.app/` |

## Updated After Each Page/Section Addition

When adding a new section or page:
1. Identify which entities appear on it
2. Add a row to the table above
3. If an entity has <3 rows, plan where to add another reference
4. Keep one-liners consistent with `site.ts` / `llms.txt` / JSON-LD
