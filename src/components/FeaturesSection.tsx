import { motion } from "framer-motion";
import { BlurFadeIn } from "@/lib/animations";

const steps = [
  { number: "01", badge: "SETUP", title: "Enter your UPI ID", description: "Quick setup with Google login. Your credentials stay safe. We only need your UPI ID to generate your payment page." },
  { number: "02", badge: "GENERATE", title: "Get your payment page", description: "A clean, professional payment page and QR code that's uniquely yours. Instant setup.", highlight: "paysimply.in/yourname" },
  { number: "03", badge: "EARN", title: "Share and get paid", description: "Share your link anywhere. Payer taps → UPI app opens → payment goes directly to your bank. We're not involved in the transaction." },
];

const FeaturesSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-primary">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-normal tracking-[-0.02em] text-primary-foreground leading-tight overflow-hidden">
            <BlurFadeIn text="How to Create a" />
            <br />
            <BlurFadeIn text="UPI Payment Link" />
          </h2>
          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-primary-foreground/55 mt-4 max-w-md mx-auto text-[15px]"
          >
            Three simple steps. That's it.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i === 0 ? -50 : i === 2 ? 50 : 0, y: i === 1 ? 50 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-[20px] p-7 border border-primary-foreground/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}
                  className="text-3xl font-heading font-normal tracking-[-0.02em] text-secondary"
                >
                  {step.number}
                </motion.span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em]">
                  {step.badge}
                </span>
              </div>
              <h3 className="font-heading font-normal tracking-[-0.02em] text-xl text-primary-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed">{step.description}</p>
              {step.highlight && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: "auto" }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-4 bg-secondary/20 text-secondary px-4 py-2 rounded-xl text-sm font-mono font-semibold overflow-hidden"
                >
                  {step.highlight}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary-foreground/5 rounded-2xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-primary-foreground/10"
        >
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            Your data remains yours. We're just a link generator.
          </p>
          <a href="#" className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-95 transition-all whitespace-nowrap">
            Get started
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
