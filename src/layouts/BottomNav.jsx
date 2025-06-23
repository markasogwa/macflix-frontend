import {
  FaFilter,
  FaHome,
  FaRegClock,
  FaRegHeart,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function BottomNav() {
  const {
    auth: { user },
  } = useAuth();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: "/", icon: FaHome, label: "" },
    { to: "/search", icon: FaSearch, label: "" },
    { to: "/filter", icon: FaFilter, label: "" },
    { to: "/watchlist", icon: FaRegClock, label: "", requiresLogin: true },
    { to: "/favorite", icon: FaRegHeart, label: "", requiresLogin: true },
    { to: "/profile", icon: FaUser, label: "" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around text-gray-400 sm:hidden z-50">
      {navItems
        .filter(({ requiresLogin }) => !requiresLogin || user)
        .map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center py-2 px-4 ${
              isActive(to) ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1 select-none">{label}</span>
          </Link>
        ))}
    </nav>
  );
}
