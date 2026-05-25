import { Link } from "@tanstack/react-router";
import logo from "@/assets/zeroday-logo.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative bg-[oklch(0.06_0.005_155)] border-t border-neon/15 overflow-hidden">
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-8">
        <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-border">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src={logo}
                alt="Zero Day Team"
                className="h-7 w-7 object-contain invert"
              />
              <span className="text-sm font-heading font-bold tracking-[0.15em] uppercase">
                Zero Day
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              A specialized engineering collective building the invisible
              infrastructure that powers modern enterprises.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-heading font-bold tracking-widest uppercase text-muted-foreground mb-4">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-neon transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-heading font-bold tracking-widest uppercase text-muted-foreground mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="hover:text-neon transition-colors">hello@zerodayteam.site</span>
              <span className="hover:text-neon transition-colors">Stockholm / Berlin / Remote</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Zero Day Team. All rights
            reserved.
          </p>
        </div>
      </div>

      <div className="overflow-hidden pointer-events-none select-none data-flow">
        <h2 className="text-giant text-center text-neon/[0.12] -mb-[0.15em]">
          Zero Day.
        </h2>
      </div>
    </footer>
  );
}
