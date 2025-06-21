import Footer from "./Footer";
import NavBar from "./NavBar";

export default function MainLayout({ children }) {
  return (
    <div className="">
      <NavBar />
      {/* Main content grows to fill space */}
      <main className="">{children}</main>

      {/* Footer fixed at bottom when content is short */}
      <Footer />
    </div>
  );
}
