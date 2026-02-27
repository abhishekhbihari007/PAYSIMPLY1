import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }, []);

  const navItems = [
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav className="nav nav--pill" aria-label="Main navigation">
      <div className="nav__pill">
        <div className="nav__inner">
          <Link
            to="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollTo("hero");
              }
            }}
            className="nav__brand"
          >
            <img src="/logo.svg" alt="PaySimply logo" className="nav__logo-img" />
          </Link>

          {/* Desktop links */}
          <div className="nav__links">
            {!isAuthPage
              ? navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.id);
                    }}
                    className="nav__link"
                  >
                    {item.label}
                  </a>
                ))
              : null}
          </div>

          <div className="nav__cta-wrap">
            {isAuthPage ? (
              <>
                <Link to="/" className="nav__cta-icon" aria-label="Go Home">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 7L7 17M7 17H17M7 17V7" />
                  </svg>
                </Link>
                <Link to="/" className="nav__cta">
                  Go Home
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="nav__cta hidden md:inline-flex">
                  Get Started
                </Link>
                <Link to="/signup" className="nav__cta-icon hidden md:inline-flex" aria-label="Get Started">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen((o) => !o)}
                  className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {mobileOpen ? (
                      <path d="M18 6L6 18M6 6l12 12" />
                    ) : (
                      <>
                        <path d="M4 8h16" />
                        <path d="M4 16h16" />
                      </>
                    )}
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && !isAuthPage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-background rounded-2xl shadow-xl border border-border/60 p-4 z-50"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="mt-2 bg-secondary text-secondary-foreground px-4 py-3 rounded-xl text-sm font-semibold text-center hover:brightness-95 transition-all"
              >
                Get Started →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
