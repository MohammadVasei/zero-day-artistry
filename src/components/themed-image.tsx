import { useState, useEffect } from "react";

/**
 * Renders a theme-aware image that swaps between dark/light variants
 * when the user toggles the theme. Listens for the `light` class on <html>.
 */
export function ThemedImage({
  baseName,
  alt,
  className = "",
  style,
}: {
  baseName: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () =>
      setIsDark(!document.documentElement.classList.contains("light"));
    check();

    // Watch for theme toggle via MutationObserver on <html> class
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const src = `/images/${baseName}-${isDark ? "dark" : "light"}.png`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );
}
