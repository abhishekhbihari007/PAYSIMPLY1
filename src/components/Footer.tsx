import { motion } from "framer-motion";

const footerLinks = {
  "Quick Links": ["Features", "Pricing", "How It Works", "FAQ"],
  Legal: ["Privacy Policy", "Terms of Service", "Refund Policy"],
};

const Footer = () => {
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
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <img src="/logo.svg" alt="PaySimply logo" className="h-8 w-auto" />
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-[300px]">
              The smarter way to share your UPI. Accept payments without a payment gateway.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], groupIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + groupIndex * 0.08 }}
            >
              <h4 className="font-heading font-normal tracking-[-0.02em] text-primary-foreground mb-5 text-sm">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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
