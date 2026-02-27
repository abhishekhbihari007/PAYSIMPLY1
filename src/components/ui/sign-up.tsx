import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Loader } from "lucide-react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = true,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="hidden"
      variants={defaultVariants}
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const GradientBackground = () => (
  <>
    <style>
      {`
        @keyframes float1 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
          100% { transform: translate(0, 0); }
        }
      `}
    </style>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute top-0 left-0 w-full h-full"
    >
      <defs>
        <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "var(--color-primary)", stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-chart-3)", stopOpacity: 0.6 }} />
        </linearGradient>
        <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "var(--color-chart-4)", stopOpacity: 0.9 }} />
          <stop offset="50%" style={{ stopColor: "var(--color-secondary)", stopOpacity: 0.7 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-chart-1)", stopOpacity: 0.6 }} />
        </linearGradient>
        <radialGradient id="rev_grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--color-destructive)", stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-chart-5)", stopOpacity: 0.4 }} />
        </radialGradient>
        <filter id="rev_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35" /></filter>
        <filter id="rev_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25" /></filter>
        <filter id="rev_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45" /></filter>
      </defs>
      <g style={{ animation: "float1 20s ease-in-out infinite" }}>
        <ellipse cx="200" cy="500" rx="250" ry="180" fill="url(#rev_grad1)" filter="url(#rev_blur1)" transform="rotate(-30 200 500)" />
        <rect x="500" y="100" width="300" height="250" rx="80" fill="url(#rev_grad2)" filter="url(#rev_blur2)" transform="rotate(15 650 225)" />
      </g>
      <g style={{ animation: "float2 25s ease-in-out infinite" }}>
        <circle cx="650" cy="450" r="150" fill="url(#rev_grad3)" filter="url(#rev_blur3)" opacity="0.7" />
        <ellipse cx="50" cy="150" rx="180" ry="120" fill="var(--color-accent)" filter="url(#rev_blur2)" opacity="0.8" />
      </g>
    </svg>
  </>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0">
    <g fillRule="evenodd" fill="none">
      <g fillRule="nonzero" transform="translate(3, 2)">
        <path fill="#4285F4" d="M57.8123,30.1515 C57.8123,27.7263 57.6155,25.9566 57.1896,24.1213 L29.4961,24.1213 L29.4961,35.0675 L45.7516,35.0675 C45.424,37.7877 43.6542,41.8844 39.7213,44.6373 L39.6662,45.0037 L48.4224,51.787 L49.029,51.8476 C54.6004,46.7021 57.8123,39.1314 57.8123,30.1515" />
        <path fill="#34A853" d="M29.4961,58.9922 C37.4599,58.9922 44.1456,56.3702 49.029,51.8476 L39.7213,44.6373 C37.2306,46.3743 33.8876,47.5869 29.4961,47.5869 C21.6961,47.5869 15.0759,42.4416 12.716,35.3298 L12.3701,35.3592 L3.2652,42.4054 L3.1462,42.7364 C7.9966,52.3718 17.9597,58.9922 29.4961,58.9922" />
        <path fill="#FBBC05" d="M12.716,35.3298 C12.0933,33.4945 11.7329,31.5279 11.7329,29.4961 C11.7329,27.464 12.0933,25.4977 12.6832,23.6624 L12.6667,23.2715 L3.4478,16.112 L3.1462,16.2555 C1.1471,20.2539 0,24.7439 0,29.4961 C0,34.2482 1.1471,38.738 3.1462,42.7364 L12.716,35.3298" />
        <path fill="#EB4335" d="M29.4961,11.4051 C35.0347,11.4051 38.7708,13.7975 40.9012,15.7968 L49.2256,7.669 L44.1131,2.9168 C37.4599,0 29.4961,0 17.9597,0 C7.9966,6.6202 3.1462,16.2555 12.6832,23.6624 C15.0759,16.5506 21.6961,11.4051 29.4961,11.4051" />
      </g>
    </g>
  </svg>
);

export interface AuthComponentProps {
  logo?: React.ReactNode;
  brandName?: string;
  hideTopBar?: boolean;
  onGoogleLogin?: () => Promise<void> | void;
  onGoogleSignUp?: () => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
}

export const AuthComponent = ({
  hideTopBar = false,
  onGoogleLogin,
  onGoogleSignUp,
  loading = false,
  error = null,
}: AuthComponentProps) => {
  return (
    <div className="bg-background min-h-screen w-screen flex flex-col">
      <div
        className={cn(
          "flex w-full flex-1 min-h-screen items-center justify-center bg-card",
          "relative overflow-hidden py-8 sm:py-12"
        )}
      >
        <div className="absolute inset-0 z-0">
          <GradientBackground />
        </div>
        <fieldset
          disabled={loading}
          className="relative z-10 flex flex-col items-center gap-10 w-full max-w-[520px] mx-auto px-5 sm:px-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="google-only"
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full flex flex-col items-center gap-8"
            >
              <BlurFade delay={0.25} className="w-full">
                <div className="text-center">
                  <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
                    Get started with Us
                  </h1>
                  <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-sm mx-auto">
                    Log in or sign up with your Google account to continue.
                  </p>
                </div>
              </BlurFade>

              <BlurFade
                delay={0.5}
                className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              >
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onGoogleLogin?.()}
                  className="glass-btn flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed min-h-[56px] sm:min-h-[60px] py-3.5 px-8 sm:py-4 sm:px-10"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-7 h-7">
                    {loading ? (
                      <Loader className="h-6 w-6 text-foreground animate-spin" />
                    ) : (
                      <GoogleIcon />
                    )}
                  </div>
                  <span className="font-semibold text-foreground text-sm sm:text-base whitespace-nowrap">
                    {loading ? "Signing in..." : "Login with Google"}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onGoogleSignUp?.()}
                  className="glass-btn flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed min-h-[56px] sm:min-h-[60px] py-3.5 px-8 sm:py-4 sm:px-10"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-7 h-7">
                    {loading ? (
                      <Loader className="h-6 w-6 text-foreground animate-spin" />
                    ) : (
                      <GoogleIcon />
                    )}
                  </div>
                  <span className="font-semibold text-foreground text-sm sm:text-base whitespace-nowrap">
                    {loading ? "Signing up..." : "Sign up with Google"}
                  </span>
                </button>
              </BlurFade>

              {error && (
                <p className="text-sm sm:text-base text-destructive text-center max-w-sm px-2" role="alert">
                  {error}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </fieldset>
      </div>
    </div>
  );
};
