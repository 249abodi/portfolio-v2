# Third-Party Corroboration Checklist

GEO works when AI can find your claims backed by external sources. This doc maps external profiles and signals that verify entity claims.

## External Profiles (sameAs)

| Platform | URL | Verified |
|----------|-----|----------|
| GitHub | `https://github.com/249abodi` | ✓ Public profile |
| YouTube | `https://www.youtube.com/@3kbbb` | ✓ |
| Instagram | `https://www.instagram.com/249_abodii` | ✓ |
| Facebook | `https://www.facebook.com/profile.php?id=61576883101977` | ✓ |

## Product Corroboration

| Product | Live URL | Corroborates |
|---------|----------|--------------|
| QAVENO | `https://qaveno.vercel.app/` | Pricing claims ($29-$199/mo), features, tech stack |
| ZELVOA | `https://zelvoa.vercel.app/` | Pricing claims (Free-RM199/mo), features, tech stack |
| portfolio-v2 | `https://249abodii.vercel.app/` | Technical claims, architecture |

## Academic / Location Claims

| Claim | Source | Notes |
|-------|--------|-------|
| Software Engineering student | Page title, About section | Self-declared |
| Universiti Teknologi Malaysia (UTM) | About section, Person JSON-LD | University name used without affiliation claim |
| Based in Malaysia | Footer, Person JSON-LD | Location field in Schema.org |

## Weekly Corroboration Prompts (Manual)

Run these periodically to find external citations:

### Week 1: Name
```
"Abdulrahman Mohammed" software engineering developer
```

### Week 2: Projects
```
QAVENO POS electron OR "ZELVOA" social media SaaS
```

### Week 3: Keywords
```
"MERN stack developer Malaysia" OR "Electron POS system"
```

### Week 4: Competitors
```
POS system electron desktop OR social media SaaS dashboard
```

## What NOT to Corroborate

- No fabricated affiliations
- No "featured on" claims that aren't real
- No fake awards, certifications, or company names

## How to Add a New Corroborating Source

1. Create the external profile/account
2. Add the URL to `sameAs` in `src/lib/seo.ts` `personJsonLd()`
3. Add it to the GEO.md entities table
4. Update this checklist
