# Medium Info API Server

This repository provides a simple REST API wrapper around the [`medium-info-api`](https://www.npmjs.com/package/medium-info-api) package.  
It allows you to retrieve Medium article details quickly via **HTTP endpoints**.

The API is split into **two separate routes** to keep responses fast:
- `/medium` returns all **non-heavy** information.
- `/medium/avatar` returns **only the author avatar** (which uses Playwright and is slower), on demand.

This ensures you only call the slower part when needed.

---

## Features

| Endpoint | Purpose | Speed | Notes |
|---------|---------|-------|------|
| `/medium` | Fetch title, date, claps, content, hero image, etc. | Fast ✅ | Does *not* include avatar |
| `/medium/avatar` | Fetch author avatar image URL | Slower 🐢 | Uses Playwright internally |

---

## Installation & Setup

1) Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/medium-info-api-server.git
cd medium-info-api-server
```
2) Install Dependencies
```ts
npm install
```
3) Start the Server
```ts
npm run start

```
### API Usage
1. Get Article Information (Fast)
Endpoint
```
``` 
GET /medium?url=<medium_article_url>

Example
```
http://localhost:3000/medium?url=https://medium.com/some-article

```
2. Get Author Avatar (Optional / Slower)
Endpoint
```
``` 
GET /medium/avatar?url=<medium_article_url>

Example
```
http://localhost:3000/medium/avatar?url=https://medium.com/some-article

```
### Why Two Endpoints?
The avatar extraction uses Playwright, which is comparatively slow.
By separating it into /medium/avatar, the main /medium endpoint stays very fast, and you only call the slow part if needed.

This avoids slowing your app for users who do not require author images.

### Example Frontend Usage
```js
const article = await fetch(`/medium?url=${url}`).then(r => r.json());
console.log(article.data);

const avatar = await fetch(`/medium/avatar?url=${url}`).then(r => r.json());
console.log(avatar.data.authorAvatar);

```
### Related Package
This API uses the NPM package:

```bash
medium-info-api
```

You can and is advisable to use, the package directly in Node / Next.js / React / Cloud Functions:

https://www.npmjs.com/package/medium-info-api