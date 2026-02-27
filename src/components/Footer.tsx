import { motion } from "framer-motion";
import { useCallback } from "react";

const quickLinks = [
  { label: "Features", target: "features" },
  { label: "Pricing", target: "pricing" },
  { label: "How It Works", target: "how-it-works" },
  { label: "FAQ", target: "faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

const Footer = () => {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <footer className="bg-primary py-16">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14"
        >
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <img src="/logo.svg" alt="PaySimply logo" className="h-8 w-auto" width="32" height="32" />
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-[300px]">
              The smarter way to share your UPI. Accept payments without a payment gateway.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-heading font-normal tracking-[-0.02em] text-primary-foreground mb-5 text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.target);
                    }}
                    className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <h4 className="font-heading font-normal tracking-[-0.02em] text-primary-foreground mb-5 text-sm">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-primary-foreground/40 text-sm">© 2026 PaySimply. All rights reserved.</p>
          <p className="text-primary-foreground/30 text-xs">Built with trust in mind · Made in India with ❤️</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
