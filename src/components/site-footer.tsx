import { Link } from "@tanstack/react-router";
import logo from "@/assets/zeroday-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-background pt-20">
      <div className="mx-auto max-w-7xl px-6 pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Zero Day Team" className="h-8 w-8 object-contain" />
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© 2025 Zero Day Team. All rights reserved.</p>
      </div>
      <div className="overflow-hidden">
        <h2 className="font-display text-[clamp(5rem,22vw,22rem)] leading-[0.85] text-center -mb-6 select-none">
          Zero Day.
        </h2>
      </div>
    </footer>
  );
}

