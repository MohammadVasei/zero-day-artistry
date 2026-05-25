import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/zeroday-logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pt-4">
      <header
        className={`pointer-events-auto transition-all duration-500 ease-out
          rounded-full border backdrop-blur-xl
          ${
            scrolled
              ? "px-4 py-2 max-w-2xl border-neon/30 bg-neon/[0.06] shadow-neon-sm"
              : "px-6 py-3 max-w-4xl border-neon/15 bg-background/60"
          }`}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={logo}
              alt="Zero Day Team"
              className="h-6 w-6 object-contain invert transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_var(--neon)]"
            />
            <span
              className={`font-heading font-bold tracking-[0.15em] uppercase transition-all duration-500 ${
                scrolled ? "text-xs" : "text-sm"
              }`}
            >
              <span className="text-neon">Zero</span> Day
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative py-1 text-muted-foreground hover:text-neon transition-colors duration-200
                  after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-neon
                  after:transition-all after:duration-300 after:rounded-full hover:after:w-full"
                activeProps={{
                  className: "text-neon after:w-full",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium
                bg-neon text-background transition-all duration-300
                hover:shadow-neon hover:scale-105"
            >
              Start a Project
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-full border border-neon/20 p-2 transition-colors hover:bg-neon/10 hover:border-neon/40"
          >
            {open ? (
              <X size={16} className="text-neon" />
            ) : (
              <Menu size={16} />
            )}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-64 mt-3 pt-3 border-t border-neon/10" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-2 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-lg font-medium hover:text-neon hover:bg-neon/5 transition-all"
                activeProps={{ className: "text-neon bg-neon/5" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 text-center rounded-full py-2 bg-neon text-background font-medium text-sm"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
