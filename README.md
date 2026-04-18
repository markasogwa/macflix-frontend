# Movie Recommendation App

> **⚠️ COPYRIGHT NOTICE:** This project and all its source code are the intellectual property of the author. **No part of this codebase may be copied, reproduced, distributed, or used — in whole or in part — without explicit written permission from the author.** Unauthorized use is a violation of copyright law.

---

A modern, responsive **Movie Recommendation Web Application** built with **React.js**, powered by the TMDB API, and backed by a custom Node.js/Express REST API. Built as my **Software Development Capstone** project through the 3MTT Nigeria & Darey.io program.

**Live Demo:** [View app](https://macflix-movie-app.netlify.app/)
**Backend Repo:** [Backend Code](https://github.com/markasogwa/macflix-backend)

---

## Features

- 🔍 **Search & Discovery** — Browse trending movies and search by title, genre in real time
- 🎥 **Movie Detail Pages** — Ratings, overviews, cast info, and posters
- 🔐 **Authentication** — Secure JWT-based login and registration
- ❤️ **Favorites & Watchlist** — Save movies to personal lists
- 📝 **User Reviews** — Add, edit, and delete your own reviews
- 👤 **Profile Management** — Update personal details and profile picture
- 📱 **Responsive Design** — Works across mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React.js |
| Styling | Tailwind CSS |
| Routing | React Router |
| Data Fetching | TanStack Query (React Query) |
| HTTP Client | Axios |
| Auth | JWT |
| Movie Data | TMDB API |

---

## Architecture

The app follows a modular, component-driven structure with clear separation between UI, logic, and services:

- **Component-based** design for reusability and maintainability
- **Centralized API service layer** using Axios interceptors
- **Server state management** via React Query (caching, refetching, loading states)
- **Protected routes** for authenticated-only pages
- **Environment-based config** for flexible deployment

---

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Route-level page components
├── hooks/           # Custom React hooks
├── services/        # API calls and service utilities
├── context/         # Global app state (where applicable)
├── assets/          # Images and static files
└── App.jsx          # App entry point and route config
```
---

## Deployment

| Layer | Platform |
|---|---|
| Frontend | Netlify |
| Backend | Render (see backend repo) |

---

## Key Learnings

- Architecting scalable, maintainable React applications
- Server-state management with React Query
- JWT authentication and protected routing
- Third-party API integration (TMDB)
- Full-stack deployment and environment management

---

## Planned Improvements

- [ ] AI-powered personalized recommendations
- [ ] Push notifications for watchlist updates
- [ ] Advanced genre/rating filters with pagination
- [ ] Multi-language support
- [ ] Performance optimization (lazy loading, image compression)

---

## Acknowledgements

- [TMDB API](https://www.themoviedb.org/) for movie data
- [3MTT Nigeria](https://3mtt.nitda.gov.ng/) & [Darey.io](https://darey.io/) for training and mentorship

---

## License & Copyright

© Mark Okechukwu Asogwa 2025. All rights reserved.

This project is **not open source**. The source code, design, and structure of this project are protected under copyright law. You may **not** copy, modify, distribute, or use any part of this project without the author's explicit written permission.

For inquiries, reach out via the contact links below.

---

## Contact

- 💼 LinkedIn: [Contact me](https://www.linkedin.com/in/asogwa-mark-okechukwu/)
  Email: asogwaoke@gmail.com
