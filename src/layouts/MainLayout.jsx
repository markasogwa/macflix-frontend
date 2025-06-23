import { useState } from "react";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function MainLayout({ children }) {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setFilterOpen((open) => !open);
  };

  return (
    <div className="relative min-h-screen">
      {" "}
      {/* Padding bottom for bottom nav */}
      {/* Desktop Navbar */}
      <div className="hidden sm:block">
        <NavBar />
      </div>
      {/* Main content */}
      <main>{children}</main>
      {/* Footer */}
      <div className="hidden sm:block">
        <Footer />
      </div>
      {/* Bottom navigation for mobile/tablet */}
      <div className="sm:hidden">
        <BottomNav
          onFilterClick={handleFilterClick}
          filterActive={filterOpen}
        />
      </div>
    </div>
  );
}
