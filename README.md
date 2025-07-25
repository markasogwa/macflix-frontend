# 🎬 Movie App Frontend Documentation

**Frontend Stack**: React.js + Vite, React Router, Tailwind CSS, Axios
**State Management**: useState, useContext, useEffect  
**Authentication**: JWT-based (Token stored in localStorage)  
**Backend API**: [Movie App Backend](./Movie_App_Backend_Documentation.md)  
**Deployment**: Netlify

---

## 🌐 Project Structure

```
src/
├── assets/             # Static files (images, logos, icons)
├── components/         # Reusable components (Navbar, Footer, MovieCard, etc.)
├── context/            # AuthContext or Global state
├── pages/              # Page views (Home, MovieDetails, Login, Profile)
├── services/           # API service handlers
├── hooks/              # Custom React hooks (e.g., useAuth, useFetch)
├── App.jsx             # Main App component with routing
├── main.jsx            # Entry point
```

---

## 🚦 Routing (React Router)

- `/` — Home (Popular Movies)
- `/login` — Login Page
- `/register` — Register Page
- `/movie/:id` — Movie Details Page
- `/profile` — User Profile (Protected)
- `/watchlist` — User’s Watchlist (Protected)
- `/favorites` — User’s Favorites (Protected)

> Protected routes use `PrivateRoute` to check authentication.

---

## 🧠 State Management

- `AuthContext` provides user data and login/logout methods.
- `localStorage` stores JWT token.
- Global user state accessed via `useContext(AuthContext)`.

---

## 🔐 Authentication Flow

1. On login/register, token is received and saved to `localStorage`.
2. Token is included in API requests via headers:

```js
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
```

3. Protected pages redirect unauthenticated users to `/login`.

---

## 📦 Core Features

### ✅ Authentication

- User login and registration
- Token-based route protection
- Persistent login using localStorage

### 🔍 Movie Discovery

- Browse Popular Movies (`/movie/popular`)
- Search Movies (`/movie/search?query=`)
- Movie Details Page (`/movie/:id`)
- Trailers fetched from TMDB

### 📋 User Features

- Watchlist Management (add/remove)
- Favorites Management (add/remove)
- Profile Editing (username, bio, social links, profile picture)
- View submitted reviews

### ✍️ Reviews

- Add, edit, and delete reviews on movies
- Star ratings displayed

---

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Responsive layout with flex/grid
- Dark mode support (optional)

---

## 🔧 API Service (services/api.js)

Example of authenticated request:

```js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

---

## 🚀 Deployment

1. Build the app:

```bash
npm run build
```

2. Deploy `/dist` folder to Netlify/Vercel

3. Ensure backend URL is set via `.env`:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🧪 Testing

- Use dev tools and Postman to inspect network requests
- Test each route manually (public and protected)
- Check mobile responsiveness

---

## 🛠️ Future Improvements

- Add PWA support
- Implement infinite scrolling or pagination
- Add user avatars and comments on reviews
- Notification system
- Multi-language support

---

## 📬 Contact

For frontend issues or suggestions, reach out to: **you@example.com**
