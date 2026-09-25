# SiteForLehaSTR

Одностраничный адаптивный сайт-портфолио о YouTube/Twitch-блогере **LehaSTR (Lehastroff)**.

[![GitHub Pages](https://github.com/TeivrimOriginal/siteForLehaSTR/actions/workflows/pages.yml/badge.svg)](https://github.com/TeivrimOriginal/siteForLehaSTR/actions/workflows/pages.yml)

## Что внутри

- редакционный первый экран с главным CTA и быстрым доступом к YouTube/Twitch;
- фильтры «Всё / Выпуски / Моменты» и интерактивный просмотр видео;
- игровой explorer по Europa Universalis, Kenshi, Victoria 3, HOI4, Dota 2 и Hearthstone;
- практический раздел «Алабуга Политех» с направлениями и планом поездки;
- раздел «Великие деятели» с расширяемым списком имён;
- PWA-манифест, иконки приложения, service worker и офлайн-режим;
- системное «Поделиться», индикатор сети и прогресс прокрутки;
- SEO/Open Graph, JSON-LD, sitemap, robots.txt, RSS и мобильная страница 404;
- автоматическая публикация через GitHub Pages.

## Стек

- React 19
- TypeScript
- Vite
- Lucide React
- собственный CSS + адаптивная вёрстка

## Запуск

```bash
npm install
npm run dev
```

Сайт будет доступен на `http://localhost:8087/siteForLehaSTR/`.

## Production-сборка

```bash
npm run typecheck
npm run build
npm run preview
```

Готовые файлы появятся в `dist/`. В production service worker автоматически регистрируется в `main.tsx`.

## Публикация

1. Внести изменения в `main`.
2. Отправить их в GitHub.
3. GitHub Actions соберёт `dist/` и опубликует сайт через Pages.

Публичный адрес: <https://teivrimoriginal.github.io/siteForLehaSTR/>
