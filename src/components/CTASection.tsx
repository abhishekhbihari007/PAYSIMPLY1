import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlowFade } from "@/lib/animations";

const CTASection = () => {
  return (
    <section className="py-12 bg-background">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="cta-gradient rounded-[28px] px-8 py-16 md:px-16 md:py-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
            <div className="h-full max-w-[800px] mx-auto flex">
              <div className="flex-1 border-l border-primary-foreground" />
              <div className="flex-1 border-l border-primary-foreground" />
              <div className="flex-1 border-l border-r border-primary-foreground" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-normal tracking-[-0.02em] text-primary-foreground mb-4 leading-tight max-w-3xl mx-auto relative z-10 overflow-hidden">
            <GlowFade text="Ready to Take Control of Your Payments?" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-primary-foreground/55 text-sm max-w-md mx-auto mb-8 relative z-10"
          >
            Create your page in minutes. Share one link. Get paid directly to your UPI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
            className="mb-8 relative z-10"
          >
            <button className="bg-secondary text-secondary-foreground px-8 py-4 rounded-full text-sm font-semibold hover:brightness-95 transition-all">
              Create UPI payment link
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-primary-foreground/70 text-sm relative z-10"
          >
            {["No credit card", "Setup in 30 seconds", "0% commission"].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-secondary" /> {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
