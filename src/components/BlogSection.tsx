import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ScaleBounce } from "@/lib/animations";

const plans = [
  {
    tag: "Early Access", name: "Launch Special", price: "₹89",
    period: "One Time Payment · Lifetime Access",
    features: ["Personal Payment Page", "Custom QR Code", "GST Invoice Generator", "Image to PDF Tool", "Payment Buttons", "Lifetime Access"],
    cta: "Claim Early Access", highlighted: true,
  },
  {
    tag: "Regular", name: "Regular Price", price: "₹129",
    period: "After First 100 Users",
    features: ["Everything in Early Access", "Priority Support", "Future Features", "Lifetime Updates", "No Hidden Fees"],
    cta: "Join Waitlist", highlighted: false,
  },
];

const BlogSection = () => {
  return (
    <section id="pricing" className="py-24 bg-muted/50">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-normal tracking-[-0.02em] text-foreground leading-tight overflow-hidden">
            <ScaleBounce text="Simple, Transparent Pricing" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-md mx-auto text-[15px]"
          >
            No subscriptions. No recurring charges. Pay once, use forever.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-7 max-w-[800px] mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`rounded-[24px] p-8 relative ${plan.highlighted ? "bg-primary text-primary-foreground shadow-xl" : "bg-background border border-border/60"}`}
            >
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide mb-4 ${plan.highlighted ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                {plan.tag}
              </span>
              <h3 className="font-heading font-normal tracking-[-0.02em] text-xl md:text-2xl mb-1">{plan.name}</h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                className="flex items-baseline gap-1 mb-1"
              >
                <span className="text-4xl font-heading font-normal tracking-[-0.02em]">{plan.price}</span>
              </motion.div>
              <p className={`text-xs mb-6 ${plan.highlighted ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{plan.period}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, fi) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.1 + fi * 0.05 }}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-secondary" : "text-primary"}`} />
                    <span className={plan.highlighted ? "text-primary-foreground/80" : "text-foreground/80"}>{f}</span>
                  </motion.li>
                ))}
              </ul>
              <button className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all ${plan.highlighted ? "bg-secondary text-secondary-foreground hover:brightness-95" : "bg-primary text-primary-foreground hover:brightness-110"}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
