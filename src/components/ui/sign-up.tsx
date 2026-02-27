// Glassmorphism sign-up / login experience
// with Google buttons, animated gradients, confetti, and
// a 3-step password flow (email → password → confirm).

import { cn } from "@/lib/utils";
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
  createContext,
  Children,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ArrowRight,
  Mail,
  Gem,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  X,
  AlertCircle,
  PartyPopper,
  Loader,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  Variants,
  Transition,
} from "framer-motion";
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";
import confetti from "canvas-confetti";

type Api = { fire: (options?: ConfettiOptions) => void };
export type ConfettiRef = Api | null;
const ConfettiContext = createContext<Api>({} as Api);

const Confetti = forwardRef<
  ConfettiRef,
  React.ComponentPropsWithRef<"canvas"> & {
    options?: ConfettiOptions;
    globalOptions?: ConfettiGlobalOptions;
    manualstart?: boolean;
  }
>((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    ...rest
  } = props;
  const instanceRef = useRef<ConfettiInstance | null>(null);
  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      if (node !== null) {
        if (instanceRef.current) return;
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true,
        });
      } else {
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions]
  );
  const fire = useCallback(
    (opts: ConfettiOptions = {}) => instanceRef.current?.({ ...options, ...opts }),
    [options]
  );
  const api = useMemo(() => ({ fire }), [fire]);
  useImperativeHandle(ref, () => api, [api]);
  useEffect(() => {
    if (!manualstart) fire();
  }, [manualstart, fire]);
  return <canvas ref={canvasRef} {...rest} />;
});
Confetti.displayName = "Confetti";

type TextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  stopOnEnd?: boolean;
};

export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  stopOnEnd = false,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  useEffect(() => {
    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (stopOnEnd && current === items.length - 1) {
          clearInterval(timer);
          return current;
        }
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, stopOnEnd]);

  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div className={cn("relative inline-block whitespace-nowrap", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || motionVariants}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: { hidden: { y: number }; visible: { y: number } };
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
  variant,
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
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="hidden"
      variants={combinedVariants}
      transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const glassButtonVariants = cva(
  "relative isolate all-unset cursor-pointer rounded-full transition-all",
  {
    variants: {
      size: {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tighter",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: { size: "default" },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  contentClassName?: string;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, onClick, ...props }, ref) => {
    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const button = e.currentTarget.querySelector("button");
      if (button && e.target !== button) button.click();
    };
    return (
      <div
        className={cn(
          "glass-button-wrap cursor-pointer rounded-full relative",
          className
        )}
        onClick={handleWrapperClick}
      >
        <button
          className={cn(
            "glass-button relative z-10",
            glassButtonVariants({ size })
          )}
          ref={ref}
          onClick={onClick}
          {...props}
        >
          <span
            className={cn(
              glassButtonTextVariants({ size }),
              contentClassName
            )}
          >
            {children}
          </span>
        </button>
        <div className="glass-button-shadow rounded-full pointer-events-none" />
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

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
        {/* Background gradients use brand colors:
           - var(--color-primary) ~ dark teal (#064030 / #0D4D3E)
           - var(--color-secondary) ~ softer teal
           - var(--color-accent) ~ neon lime (#D4FF00 / #C8F000)
           - var(--color-destructive) ~ warm red for contrast */}
        <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{
              stopColor: "var(--color-primary)",
              stopOpacity: 0.8,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: "var(--color-chart-3)",
              stopOpacity: 0.6,
            }}
          />
        </linearGradient>
        <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{
              stopColor: "var(--color-chart-4)",
              stopOpacity: 0.9,
            }}
          />
          <stop
            offset="50%"
            style={{
              stopColor: "var(--color-secondary)",
              stopOpacity: 0.7,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: "var(--color-chart-1)",
              stopOpacity: 0.6,
            }}
          />
        </linearGradient>
        <radialGradient id="rev_grad3" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{
              stopColor: "var(--color-destructive)",
              stopOpacity: 0.8,
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: "var(--color-chart-5)",
              stopOpacity: 0.4,
            }}
          />
        </radialGradient>
        <filter id="rev_blur1" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
        <filter id="rev_blur2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="25" />
        </filter>
        <filter id="rev_blur3" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="45" />
        </filter>
      </defs>
      <g style={{ animation: "float1 20s ease-in-out infinite" }}>
        <ellipse
          cx="200"
          cy="500"
          rx="250"
          ry="180"
          fill="url(#rev_grad1)"
          filter="url(#rev_blur1)"
          transform="rotate(-30 200 500)"
        />
        <rect
          x="500"
          y="100"
          width="300"
          height="250"
          rx="80"
          fill="url(#rev_grad2)"
          filter="url(#rev_blur2)"
          transform="rotate(15 650 225)"
        />
      </g>
      <g style={{ animation: "float2 25s ease-in-out infinite" }}>
        <circle
          cx="650"
          cy="450"
          r="150"
          fill="url(#rev_grad3)"
          filter="url(#rev_blur3)"
          opacity="0.7"
        />
        <ellipse
          cx="50"
          cy="150"
          rx="180"
          ry="120"
          fill="var(--color-accent)"
          filter="url(#rev_blur2)"
          opacity="0.8"
        />
      </g>
    </svg>
  </>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-7 h-7 sm:w-8 sm:h-8 shrink-0"
  >
    {/* Standard Google colors: blue (#4285F4), green (#34A853),
       yellow (#FBBC05), red (#EB4335) */}
    <g fillRule="evenodd" fill="none">
      <g fillRule="nonzero" transform="translate(3, 2)">
        <path
          fill="#4285F4"
          d="M57.8123,30.1515 C57.8123,27.7263 57.6155,25.9566 57.1896,24.1213 L29.4961,24.1213 L29.4961,35.0675 L45.7516,35.0675 C45.424,37.7877 43.6542,41.8844 39.7213,44.6373 L39.6662,45.0037 L48.4224,51.787 L49.029,51.8476 C54.6004,46.7021 57.8123,39.1314 57.8123,30.1515"
        />
        <path
          fill="#34A853"
          d="M29.4961,58.9922 C37.4599,58.9922 44.1456,56.3702 49.029,51.8476 L39.7213,44.6373 C37.2306,46.3743 33.8876,47.5869 29.4961,47.5869 C21.6961,47.5869 15.0759,42.4416 12.716,35.3298 L12.3701,35.3592 L3.2652,42.4054 L3.1462,42.7364 C7.9966,52.3718 17.9597,58.9922 29.4961,58.9922"
        />
        <path
          fill="#FBBC05"
          d="M12.716,35.3298 C12.0933,33.4945 11.7329,31.5279 11.7329,29.4961 C11.7329,27.464 12.0933,25.4977 12.6832,23.6624 L12.6667,23.2715 L3.4478,16.112 L3.1462,16.2555 C1.1471,20.2539 0,24.7439 0,29.4961 C0,34.2482 1.1471,38.738 3.1462,42.7364 L12.716,35.3298"
        />
        <path
          fill="#EB4335"
          d="M29.4961,11.4051 C35.0347,11.4051 38.7708,13.7975 40.9012,15.7968 L49.2256,7.669 L44.1131,2.9168 C37.4599,0 29.4961,0 17.9597,0 C7.9966,6.6202 3.1462,16.2555 12.6832,23.6624 C15.0759,16.5506 21.6961,11.4051 29.4961,11.4051"
        />
      </g>
    </g>
  </svg>
);

const modalSteps = [
  {
    message: "Signing you up...",
    icon: <Loader className="w-12 h-12 text-primary animate-spin" />,
  },
  {
    message: "Onboarding you...",
    icon: <Loader className="w-12 h-12 text-primary animate-spin" />,
  },
  {
    message: "Finalizing...",
    icon: <Loader className="w-12 h-12 text-primary animate-spin" />,
  },
  {
    message: "Welcome Aboard!",
    icon: <PartyPopper className="w-12 h-12 text-green-500" />,
  },
];

const TEXT_LOOP_INTERVAL = 1.5;

const DefaultLogo = () => (
  <div className="bg-primary text-primary-foreground rounded-md p-1.5">
    <Gem className="h-4 w-4" />
  </div>
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
  logo = <DefaultLogo />,
  brandName = "PaySimply",
  hideTopBar = false,
  onGoogleLogin,
  onGoogleSignUp,
  loading = false,
  error = null,
}: AuthComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authStep, setAuthStep] = useState<
    "email" | "password" | "confirmPassword"
  >("email");
  const [modalStatus, setModalStatus] = useState<
    "closed" | "loading" | "error" | "success"
  >("closed");
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const confettiRef = useRef<ConfettiRef>(null);

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword.length >= 6;

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const fireSideCanons = () => {
    const fire = confettiRef.current?.fire;
    if (fire) {
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
      };
      const particleCount = 50;
      fire({ ...defaults, particleCount, origin: { x: 0, y: 1 }, angle: 60 });
      fire({ ...defaults, particleCount, origin: { x: 1, y: 1 }, angle: 120 });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalStatus !== "closed" || authStep !== "confirmPassword") return;

    if (password !== confirmPassword) {
      setModalErrorMessage("Passwords do not match!");
      setModalStatus("error");
    } else {
      setModalStatus("loading");
      const loadingStepsCount = modalSteps.length - 1;
      const totalDuration = loadingStepsCount * TEXT_LOOP_INTERVAL * 1000;
      setTimeout(() => {
        fireSideCanons();
        setModalStatus("success");
      }, totalDuration);
    }
  };

  const handleProgressStep = () => {
    if (authStep === "email") {
      if (isEmailValid) setAuthStep("password");
    } else if (authStep === "password") {
      if (isPasswordValid) setAuthStep("confirmPassword");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleProgressStep();
    }
  };

  const handleGoBack = () => {
    if (authStep === "confirmPassword") {
      setAuthStep("password");
      setConfirmPassword("");
    } else if (authStep === "password") {
      setAuthStep("email");
    }
  };

  const closeModal = () => {
    setModalStatus("closed");
    setModalErrorMessage("");
  };

  useEffect(() => {
    if (authStep === "password")
      setTimeout(() => passwordInputRef.current?.focus(), 500);
    else if (authStep === "confirmPassword")
      setTimeout(() => confirmPasswordInputRef.current?.focus(), 500);
  }, [authStep]);

  useEffect(() => {
    if (modalStatus === "success") {
      fireSideCanons();
    }
  }, [modalStatus]);

  const Modal = () => (
    <AnimatePresence>
      {modalStatus !== "closed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-card/80 border-4 border-border rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 mx-2"
          >
            {(modalStatus === "error" || modalStatus === "success") && (
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {modalStatus === "error" && (
              <>
                <AlertCircle className="w-12 h-12 text-destructive" />
                <p className="text-lg font-medium text-foreground">
                  {modalErrorMessage}
                </p>
                <GlassButton onClick={closeModal} size="sm" className="mt-4">
                  Try Again
                </GlassButton>
              </>
            )}
            {modalStatus === "loading" && (
              <TextLoop interval={TEXT_LOOP_INTERVAL} stopOnEnd>
                {modalSteps.slice(0, -1).map((step, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-4"
                  >
                    {step.icon}
                    <p className="text-lg font-medium text-foreground">
                      {step.message}
                    </p>
                  </div>
                ))}
              </TextLoop>
            )}
            {modalStatus === "success" && (
              <div className="flex flex-col items-center gap-4">
                {modalSteps[modalSteps.length - 1].icon}
                <p className="text-lg font-medium text-foreground">
                  {modalSteps[modalSteps.length - 1].message}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="bg-background min-h-screen w-screen flex flex-col">
      {/* Input + button styling, glassmorphism, and autofill fixes */}
      <style>{`/* Placeholder: add your glassmorphism CSS here if needed. */`}</style>

      <Confetti
        ref={confettiRef}
        manualstart
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]"
      />
      <Modal />

      {/* Optional fixed brand bar; Nav already shows brand so we usually hide this */}
      {!hideTopBar && (logo != null || brandName) ? (
        <div className="fixed top-5 left-5 z-20 flex items-center gap-3">
          {logo}
          {brandName ? (
            <span className="text-lg sm:text-xl font-bold text-foreground">
              {brandName}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Main auth card */}
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
              <BlurFade delay={0.25 * 1} className="w-full">
                <div className="text-center">
                  <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
                    Get started with Us
                  </h1>
                  <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-sm mx-auto">
                    Log in or sign up with your Google account to continue.
                  </p>
                </div>
              </BlurFade>

              {/* Dual Google buttons: Login vs Sign up */}
              <BlurFade
                delay={0.25 * 2}
                className="w-full flex flex-row gap-3 sm:gap-4"
              >
                <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground text-center">
                    Already have an account?
                  </p>
                  <div className="glass-input-wrap w-full">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => onGoogleLogin?.()}
                      className="glass-input w-full flex items-center justify-center gap-2 sm:gap-3 border-0 cursor-pointer font-inherit text-inherit rounded-full disabled:opacity-70 disabled:cursor-not-allowed min-h-[52px] sm:min-h-[56px] py-3 px-4 sm:py-4 sm:px-5 text-sm sm:text-base"
                    >
                      <span
                        className="glass-input-text-area"
                        aria-hidden="true"
                      />
                      <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7">
                        {loading ? (
                          <Loader className="h-5 w-5 sm:h-6 sm:w-6 text-foreground animate-spin" />
                        ) : (
                          <GoogleIcon />
                        )}
                      </div>
                      <span className="relative z-10 font-semibold text-foreground whitespace-nowrap">
                        {loading ? "Signing in..." : "Login with Google"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground text-center">
                    New here?
                  </p>
                  <div className="glass-input-wrap w-full">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => onGoogleSignUp?.()}
                      className="glass-input w-full flex items-center justify-center gap-2 sm:gap-3 border-0 cursor-pointer font-inherit text-inherit rounded-full disabled:opacity-70 disabled:cursor-not-allowed min-h-[52px] sm:min-h-[56px] py-3 px-4 sm:py-4 sm:px-5 text-sm sm:text-base"
                    >
                      <span
                        className="glass-input-text-area"
                        aria-hidden="true"
                      />
                      <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7">
                        {loading ? (
                          <Loader className="h-5 w-5 sm:h-6 sm:w-6 text-foreground animate-spin" />
                        ) : (
                          <GoogleIcon />
                        )}
                      </div>
                      <span className="relative z-10 font-semibold text-foreground whitespace-nowrap">
                        {loading ? "Signing up..." : "Sign up with Google"}
                      </span>
                    </button>
                  </div>
                </div>
              </BlurFade>

              {error && (
                <p
                  className="text-sm sm:text-base text-destructive text-center max-w-sm px-2"
                  role="alert"
                >
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

