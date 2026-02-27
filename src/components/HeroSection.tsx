import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, Share2, X, Copy, Check } from "lucide-react";
import { LetterReveal3D } from "@/lib/animations";
import AnimatedShaderHero from "@/components/ui/animated-shader-hero";

const PhoneMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 60, rotateY: -8 }}
    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
    className="relative"
  >
    <div className="bg-primary-foreground/10 backdrop-blur-md rounded-[32px] border border-primary-foreground/15 p-3 w-[260px] md:w-[280px] mx-auto shadow-2xl">
      <div className="bg-background rounded-[24px] overflow-hidden">
        <div className="bg-primary px-4 py-3 flex items-center justify-between">
          <span className="text-[10px] text-primary-foreground/60">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-2 rounded-sm bg-primary-foreground/40" />
            <div className="w-3 h-2 rounded-sm bg-primary-foreground/40" />
          </div>
        </div>
        <div className="bg-primary px-5 pb-5 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
            <span className="font-heading font-normal text-secondary-foreground text-lg">R</span>
          </div>
          <h4 className="font-heading font-normal tracking-[-0.02em] text-primary-foreground text-sm">Rahul Sharma</h4>
          <p className="text-primary-foreground/40 text-[11px]">@rahul-pay</p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Amount</label>
            <div className="text-2xl font-heading font-normal tracking-[-0.02em] text-foreground mt-1">₹500</div>
            <p className="text-xs text-muted-foreground mt-0.5">For design services</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[11px] font-semibold text-foreground">G</div>
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[11px] font-semibold text-foreground">P</div>
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[11px] font-semibold text-foreground">B</div>
          </div>
          <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl text-sm font-semibold">
            Pay ₹500
          </button>
          <div className="flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Secured by UPI</span>
          </div>
        </div>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, x: -40, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="absolute -left-6 md:-left-16 top-1/3 bg-background rounded-xl px-4 py-2.5 shadow-lg border border-border/60 flex items-center gap-2"
    >
      <CheckCircle className="w-4 h-4 text-secondary" />
      <span className="text-xs font-semibold text-foreground whitespace-nowrap">Payment received!</span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 40, y: -20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="absolute -right-4 md:-right-14 top-2/3 bg-background rounded-xl px-4 py-2.5 shadow-lg border border-border/60 flex items-center gap-2"
    >
      <Share2 className="w-4 h-4 text-primary" />
      <span className="text-xs font-semibold text-foreground whitespace-nowrap">Link shared</span>
    </motion.div>
  </motion.div>
);

/* Demo Modal */
const DemoModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [upiId, setUpiId] = useState("");
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedLink = `paysimply.in/${name.toLowerCase().replace(/\s+/g, "-") || "your-name"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${generatedLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="bg-background rounded-[24px] w-full max-w-md shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10">
              <X className="w-5 h-5" />
            </button>

            <div className="bg-primary px-6 py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-primary-foreground font-heading text-xl mb-1">Create Your Payment Link</h3>
              <p className="text-primary-foreground/50 text-sm">Just 2 steps. No signup needed.</p>
            </div>

            <div className="p-6">
              {step === 0 ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Your Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Rahul Sharma" className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Your UPI ID</label>
                    <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourname@upi" className="w-full border border-border rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50" />
                  </div>
                  <button onClick={() => setStep(1)} className="w-full bg-secondary text-secondary-foreground py-3.5 rounded-xl text-sm font-semibold hover:brightness-95 transition-all mt-2">Generate My Link →</button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                  <div className="text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-3" />
                    </motion.div>
                    <p className="text-foreground font-heading text-lg mb-1">Your link is ready!</p>
                    <p className="text-muted-foreground text-sm">Share it anywhere to start receiving payments</p>
                  </div>
                  <div className="bg-muted rounded-xl p-4 flex items-center justify-between gap-3">
                    <span className="text-sm text-foreground font-medium truncate">{generatedLink}</span>
                    <button onClick={handleCopy} className="flex-shrink-0 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-center text-muted-foreground text-xs">This is a demo. Sign up to create a real payment link.</p>
                  <button onClick={() => { setStep(0); setName(""); setUpiId(""); }} className="w-full border border-border text-foreground py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors">← Try Another</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HeroSection = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section id="hero" className="bg-background px-4 md:px-6 lg:px-8 pb-0 relative">
      <AnimatedShaderHero>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          <div className="h-full max-w-[1400px] mx-auto flex">
            <div className="flex-1 border-l border-primary-foreground" />
            <div className="flex-1 border-l border-primary-foreground" />
            <div className="flex-1 border-l border-primary-foreground" />
            <div className="flex-1 border-l border-r border-primary-foreground" />
          </div>
        </div>

        <div className="mx-auto px-6 lg:px-16 max-w-[1400px] relative z-10 pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5 }} className="mb-6">
                <span className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground/80 px-5 py-2 rounded-full text-xs font-semibold border border-primary-foreground/10">
                  <img src="https://flagcdn.com/w40/in.png" alt="Indian flag" className="w-5 h-3.5 inline-block" /> Made in India · All you need is your UPI ID
                </span>
              </motion.div>

              <div className="mb-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal leading-[1.08] tracking-[-0.02em]">
                  <LetterReveal3D text="Stop Sending UPI IDs." className="text-primary-foreground" />
                  <br />
                  <LetterReveal3D text="Send a " className="text-primary-foreground" />
                  <LetterReveal3D text="Link" className="text-secondary" />
                  <LetterReveal3D text=" Instead." className="text-primary-foreground/30" />
                </h1>
              </div>

              <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.3 }} className="text-secondary font-heading font-normal tracking-[-0.02em] text-lg md:text-xl mb-4">
                Sharper. Safer. Smarter.
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.4 }} className="text-primary-foreground/55 text-sm md:text-[15px] max-w-[520px] mx-auto lg:mx-0 mb-2 leading-relaxed">
                Create a clean, secure payment page using just your UPI ID.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.5 }} className="text-primary-foreground/40 text-xs md:text-sm max-w-[480px] mx-auto lg:mx-0 mb-8 leading-relaxed">
                Share one simple link. Let anyone pay you instantly. Perfect for Instagram creators, freelancers & small businesses in India.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col items-center lg:items-start gap-3">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="bg-secondary text-secondary-foreground px-8 py-4 rounded-full text-sm font-semibold hover:brightness-95 transition-all"
                  >
                    Create Free UPI Payment Link →
                  </button>
                  <span className="text-primary-foreground/40 text-xs">No KYC · No commission</span>
                </div>
              </motion.div>
            </div>

            <div className="hidden md:flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </AnimatedShaderHero>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
};

export default HeroSection;
