# Celestea Project — CLAUDE.md

## Что это за проект
**Celestea** — русскоязычный эзотерический/астрологический блог, построенный на **Astro framework** (TypeScript).

Тематика: астрология, нумерология, эзотерика, ритуалы, демонология (Lilith, Azazel, Asmodey и т.д.), восточные практики, китайский гороскоп, зодиакальные знаки.

Аудитория: русскоязычная, интересующаяся духовными практиками.

## Структура проекта
- `src/content/blog/` — статьи в формате Markdown (frontmatter: title, description, pubDate, image, tags, category, slug)
- `src/pages/` — страницы: index, zodiac/[sign], blog/, category/[category], matrix, contacts, about, disclaimer, privacy
- `src/components/` — компоненты Astro
- `src/layouts/` — лейауты
- `src/data/` — данные
- `src/styles/` — стили
- `public/` — статичные файлы (изображения и т.д.)
- `dist/` — билд

## Категории статей (category в frontmatter)
- `horoscope` — гороскопы, восточный календарь
- прочие категории — ритуалы, нумерология, демонология и т.д.

## Frontmatter шаблон для новых статей
```md
---
title: "Заголовок статьи"
description: "Краткое описание для SEO (150-160 символов)"
pubDate: YYYY-MM-DD
image: "/assets/img/blog/имя-файла.jpg"
category: "horoscope"
tags: ["тег1", "тег2", "тег3"]
slug: "url-slug"
---
```

## Важно
- Все статьи пишутся на **русском языке**
- Тон: личный, живой, иногда мистический («мурашки по коже», «я провела несколько вечеров»)
- SEO важен — хорошие title, description, теги, структура с H2/H3
- Текущих статей: ~30 штук
