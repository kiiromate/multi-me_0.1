---
description: When to use it: When your content needs change and you have to add new fields to Sanity (like adding a "Live URL" button to your projects or a "Read Time" field to your blog).
---

# Task: Update Sanity Schema and Frontend
I need to add a new field to the [Project/Post/About] schema. The field should capture [describe what it is, e.g., a URL link to a live demo].

# Execution Plan Required
Before writing any code, please outline:
1. The exact modifications you will make to the schema file in `sanity/schemas/`.
2. How you will update the TypeScript interface in `lib/sanity/types.ts` or `types/sanity.ts`.
3. How you will update the GROQ query in `lib/sanity/queries.ts`.
4. How you will surface this new data safely in the UI component.

Remember to utilize our `safeFetch` utility for all data retrieval. Acknowledge this plan, and wait for my approval to execute.