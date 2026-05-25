import { Link } from "@tanstack/react-router";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/zeroday-logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pt-4">
      <header
        ref={headerRef}
        className={`pointer-events-auto transition-all duration-500 ease-out
          rounded-full border backdrop-blur-xl relative overflow-hidden
          ${
            scrolled
              ? "px-4 py-2 max-w-2xl border-neon/30 bg-neon/[0.06] shadow-neon-sm"
              : "px-6 py-3 max-w-4xl border-neon/15 bg-background/60"
          }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-neon transition-all duration-150 ease-out rounded-full"
          style={{
            width: `${progress}%`,
            opacity: progress > 0 ? 1 : 0,
            boxShadow:
              progress > 0
                ? "0 0 8px oklch(0.85 0.25 145 / 0.6), 0 0 20px oklch(0.85 0.25 145 / 0.3)"
                : "none",
          }}
        />

        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={logo}
              alt="ZeroDayTeam"
              className={`h-6 w-6 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_var(--neon)] ${theme === "dark" ? "invert" : ""}`}
            />
            <span
              className={`font-heading font-bold tracking-[0.15em] uppercase transition-all duration-500 ${
                scrolled ? "text-xs" : "text-sm"
              }`}
            >
              <span className="text-neon">Zero</span>DayTeam
            </span>
          </Link>

          {/* Desktop Nav */}
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

          {/* Right side: theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="rounded-full p-1.5 border border-border hover:border-neon/40
                hover:bg-neon/10 transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun size={14} className="text-muted-foreground hover:text-neon" />
              ) : (
                <Moon size={14} className="text-muted-foreground hover:text-neon" />
              )}
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium
                bg-neon text-background transition-all duration-300
                hover:shadow-neon hover:scale-105"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="rounded-full p-2 border border-border hover:border-neon/40
                hover:bg-neon/10 transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun size={14} className="text-muted-foreground" />
              ) : (
                <Moon size={14} className="text-muted-foreground" />
              )}
            </button>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="rounded-full border border-neon/20 p-2 transition-colors hover:bg-neon/10 hover:border-neon/40"
            >
              {open ? (
                <X size={16} className="text-neon" />
              ) : (
                <Menu size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
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
