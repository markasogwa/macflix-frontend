import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function NavBar() {
  const {
    auth: { user },
    logout,
  } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-950 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-red-500"
        >
          MacFlix
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="hover:text-red-400 transition">
            Home
          </Link>
          <Link to="/search" className="hover:text-red-400 transition">
            Search Movies
          </Link>

          {!user ? (
            <>
              {/* <Link to="/login" className="hover:text-red-400 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-red-400 transition">
                Register
              </Link> */}
            </>
          ) : (
            <>
              <Link to="/watchlist" className="hover:text-red-400 transition">
                My Watchlist
              </Link>
              <Link to="/favorite" className="hover:text-red-400 transition">
                My Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition cursor-pointer"
              >
                Logout
              </button>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <img
                    src={
                      user?.profilePicture
                        ? `${import.meta.env.VITE_BASE_URL}${
                            user.profilePicture
                          }?t=${Date.now()}`
                        : "/default-avatar.png"
                    }
                    crossOrigin="anonymous"
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-red-500 cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  align="end"
                  alignOffset={-10}
                  sideOffset={5}
                  className="bg-white text-black rounded-md shadow-xl p-2 z-50 min-w-[160px]"
                >
                  <DropdownMenu.Item
                    disabled
                    className="px-3 py-1 text-gray-700 font-semibold cursor-default select-none"
                  >
                    {user.username}
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="h-px my-2 bg-gray-200" />
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/profile"
                      className="block px-3 py-1 text-blue-600 hover:bg-gray-100 rounded-md transition"
                    >
                      View Profile
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col space-y-2">
          <Link to="/" className="hover:text-red-400 transition">
            Home
          </Link>
          <Link to="/search" className="hover:text-red-400 transition">
            Search Movies
          </Link>

          {!user ? (
            <>
              {/* <Link to="/login" className="hover:text-red-400 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-red-400 transition">
                Register
              </Link> */}
            </>
          ) : (
            <>
              <Link to="/watchlist" className="hover:text-red-400 transition">
                My Watchlist
              </Link>
              <Link to="/favorite" className="hover:text-red-400 transition">
                My Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition text-left"
              >
                Logout
              </button>
              <Link
                to="/profile"
                className="hover:text-red-400 transition text-left"
              >
                View Profile
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
