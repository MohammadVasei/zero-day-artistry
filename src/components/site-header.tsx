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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass border-b border-border/40 shadow-card" : "bg-transparent"
      }`}
    >
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="Zero Day Team"
            className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-sm font-heading font-bold tracking-[0.15em] uppercase">
            Zero Day
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative py-1 text-muted-foreground hover:text-foreground transition-colors duration-200
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent-gold
                after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{
                className: "text-foreground after:w-full",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className="pill-accent text-xs">
            Start a Project
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-full border border-border p-2 transition-colors hover:bg-secondary"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-72 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="glass px-6 py-4 flex flex-col gap-3 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="py-2 font-medium hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="pill-accent text-center mt-2"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
