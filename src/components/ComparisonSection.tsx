import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const rows = [
  { feature: "Setup Time", paysimply: "30 seconds", others: "2-7 days" },
  { feature: "KYC Required", paysimply: "No", others: "Yes (documents, verification)" },
  { feature: "Monthly Fee", paysimply: "₹0", others: "₹500-2,000" },
  { feature: "Commission", paysimply: "0%", others: "2-3% + GST" },
  { feature: "Money Goes To", paysimply: "Your bank directly (instant)", others: "Gateway → You (T+3 days)" },
  { feature: "Best For", paysimply: "Freelancers, creators, small businesses", others: "E-commerce stores" },
];

const ComparisonSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-normal tracking-[-0.02em] text-foreground leading-tight">
            PaySimply vs Payment Gateways
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-lg mx-auto text-[15px]"
          >
            Why freelancers and creators choose PaySimply over traditional payment gateways
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[20px] border border-border/60"
        >
          <div className="grid grid-cols-3 bg-primary text-primary-foreground">
            <div className="p-3 md:p-5 font-heading font-normal tracking-[-0.02em] text-xs md:text-sm">Feature</div>
            <div className="p-3 md:p-5 font-heading font-normal tracking-[-0.02em] text-xs md:text-sm text-center">PaySimply</div>
            <div className="p-3 md:p-5 font-heading font-normal tracking-[-0.02em] text-xs md:text-sm text-center">Others</div>
          </div>
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-muted/30" : "bg-background"}`}
            >
              <div className="p-3 md:p-5 text-xs md:text-sm font-medium text-foreground">{row.feature}</div>
              <div className="p-3 md:p-5 text-xs md:text-sm text-center flex items-center justify-center gap-1 md:gap-2">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-secondary flex-shrink-0" />
                <span className="text-foreground font-medium">{row.paysimply}</span>
              </div>
              <div className="p-3 md:p-5 text-xs md:text-sm text-center flex items-center justify-center gap-1 md:gap-2">
                <X className="w-3 h-3 md:w-4 md:h-4 text-destructive flex-shrink-0" />
                <span className="text-muted-foreground">{row.others}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link to="/signup" className="bg-secondary text-secondary-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:brightness-95 transition-all inline-block">
            Start for free — 0% commission
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
