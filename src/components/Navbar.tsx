// Top pill-shaped nav bar with logo on left,
// smooth scrolling links, and primary "Get Started" CTA.

import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav className="nav nav--pill">
      <div className="nav__pill">
        <div className="nav__inner">
          {/* Brand logo pill – dark green pill with the PaySimply logo inside */}
          <Link
            to="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                scrollTo("hero");
              }
            }}
            className="nav__brand"
          >
            {/* This logo file is defined as /public/logo.svg */}
            <img src="/logo.svg" alt="PaySimply logo" className="nav__logo-img" />
          </Link>

          {/* Center links – smooth scroll on main page */}
          <div className="nav__links">
            {!isAuthPage ? (
              <>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("features");
                  }}
                  className="nav__link"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("how-it-works");
                  }}
                  className="nav__link"
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("pricing");
                  }}
                  className="nav__link"
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("faq");
                  }}
                  className="nav__link"
                >
                  FAQ
                </a>
              </>
            ) : null}
          </div>

          {/* Right side CTA – pill button and arrow icon button */}
          <div className="nav__cta-wrap">
            {isAuthPage ? (
              <>
                <Link
                  to="/"
                  className="nav__cta-icon"
                  aria-label="Go Home"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 7L7 17M7 17H17M7 17V7" />
                  </svg>
                </Link>
                <Link to="/" className="nav__cta">
                  Go Home
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="nav__cta">
                  Get Started
                </Link>
                <Link
                  to="/signup"
                  className="nav__cta-icon"
                  aria-label="Get Started"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
