import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/zeroday-logo.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border/60">
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Zero Day Team" className="h-7 w-7 object-contain" />
          <span className="text-sm font-bold tracking-[0.18em] uppercase">
            Zero Day <span className="text-foreground/60">Team</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="hover:opacity-60 transition" activeProps={{ className: "font-semibold" }}>Home</Link>
          <Link to="/about" className="hover:opacity-60 transition" activeProps={{ className: "font-semibold" }}>About</Link>
          <Link to="/portfolio" className="hover:opacity-60 transition" activeProps={{ className: "font-semibold" }}>Portfolio</Link>
          <Link to="/contact" className="hover:opacity-60 transition" activeProps={{ className: "font-semibold" }}>Contact</Link>
        </nav>
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-full border border-border p-2"
        >
          <Menu size={18} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-3 text-sm">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/portfolio" onClick={() => setOpen(false)}>Portfolio</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
