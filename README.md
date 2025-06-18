# MovieMe 🍿

<!--
Add preview screenshots here!
Example:
![MovieMe Home](./screenshots/home.png)
![MovieMe Details](./screenshots/details.png)
-->

---

## Overview

**MovieMe** is a modern, visually engaging web app for discovering popular movies and TV shows. Built with React, TypeScript, and Vite, MovieMe offers a fast, interactive, and mobile-friendly experience. Enjoy smooth animations, creative loaders, and a playful cinema-inspired design.

---

## ✨ Features

- **Browse Popular Movies & TV Shows**: Instantly explore trending and top-rated content.
- **Search**: Find your favorite movies and shows with a fast, live search and dropdown suggestions.
- **Details & Trailers**: View detailed info, ratings, and watch trailers for each title.
- **Parallax Cinema Items**: Fun, animated popcorn, soda, and ticket graphics float around the UI (hidden on mobile for clarity).
- **Creative Loader**: Custom animated loader with popcorn and dots for a delightful waiting experience.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices. Cinema items and parallax effects are hidden on phones for a clean look.
- **Modern UI**: Beautiful, accessible, and easy-to-navigate interface with smooth transitions and theming.
- **Error Handling**: Friendly error messages and retry options for network issues.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS Modules, custom animations, and parallax effects
- **Routing**: React Router
- **State & Context**: React Context for page state (e.g., navbar opacity)
- **Animation**: [framer-motion](https://www.framer.com/motion/) for loaders and transitions
- **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/) for all movie and show data

---

## 📱 Responsiveness

- All pages are fully responsive for desktop, tablet, and mobile.
- CinemaItems and parallax effects are automatically hidden on phones for clarity and performance.
- Navbar, search, and page controls adapt for touch and small screens.
- Video backgrounds scale and fit perfectly on all devices.

---

## 🖼️ Screenshots

<!--
Add screenshots in the /screenshots folder and link them here.
-->

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 🔗 API & Credits

- This product uses the TMDB API but is not endorsed or certified by TMDB.
- All movie and show data, posters, and trailers are fetched live from [The Movie Database (TMDB)](https://www.themoviedb.org/).

---

## 📂 Project Structure

```
MovieMe/
├── public/                # Static assets (video, images)
├── src/
│   ├── assets/            # Images for cinema items
│   ├── components/
│   │   ├── pages/         # Main, About, Details, MovieCatalog, ShowsCatalog
│   │   └── shared/        # Navbar, Loader, CinemaItem, PageController, etc.
│   ├── context/           # React context for page state
│   ├── hooks/             # Custom hooks (e.g., useLoader, useMovies)
│   ├── types/             # TypeScript types
│   └── utils/             # API requester and helpers
├── README.md
├── package.json
└── ...
```

---

## 🧩 Customization & Extending

- **Add new features**: Easily extend with new pages, hooks, or API endpoints.
- **Styling**: All styles are modular and can be customized per component/page.
- **Loader & Animations**: Swap out or enhance the loader and parallax effects as desired.

---

## 📝 License

This project is for educational and demonstration purposes. See TMDB's [terms of use](https://www.themoviedb.org/terms-of-use) for API usage.

---

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for the amazing free movie & TV data API.
- [Framer Motion](https://www.framer.com/motion/) for beautiful React animations.
- [Vite](https://vitejs.dev/) for fast, modern development tooling.

---

Enjoy MovieMe! 🍿
