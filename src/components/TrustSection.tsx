import { motion } from "framer-motion";
import { ShieldOff, Eye, HardDrive, Ban } from "lucide-react";
import { RotateReveal } from "@/lib/animations";

const trustCards = [
  { icon: ShieldOff, title: "Access your bank account", description: "We never touch your banking credentials or account." },
  { icon: Eye, title: "Read your transactions", description: "Your payment history is completely private." },
  { icon: HardDrive, title: "Store your files", description: "Invoices and PDFs are generated on-demand only." },
  { icon: Ban, title: "Interfere with payments", description: "Direct UPI-to-UPI transfers only. No middleman." },
];

const TrustSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-normal tracking-[-0.02em] text-foreground leading-tight overflow-hidden">
            <RotateReveal text="Privacy & Trust" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-md mx-auto text-[15px]"
          >
            Your security is our priority. Here's what we <strong className="text-foreground">DON'T</strong> do:
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          {trustCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 150 }}
                className="bg-background rounded-[20px] p-5 md:p-6 border border-border/60 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring" }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-3 md:mb-4"
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                </motion.div>
                <h3 className="font-heading font-normal tracking-[-0.02em] text-foreground mb-1 md:mb-2 text-sm md:text-base">{card.title}</h3>
                <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-primary rounded-2xl px-6 md:px-8 py-5 md:py-6 text-center"
        >
          <h4 className="font-heading font-normal tracking-[-0.02em] text-primary-foreground text-lg md:text-xl mb-2">Direct UPI-to-UPI</h4>
          <p className="text-primary-foreground/60 text-xs md:text-sm max-w-lg mx-auto">
            Transactions happen directly between payer and your UPI app. Your data remains yours. We're just a link generator.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
