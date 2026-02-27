import { motion } from "framer-motion";
import { ArrowUpRight, Link as LinkIcon, QrCode, MousePointerClick, Globe, FileText, Image } from "lucide-react";
import { Link } from "react-router-dom";
import { WordSlideUp } from "@/lib/animations";

const features = [
  { icon: LinkIcon, tag: "Most Popular", title: "UPI Payment Link", description: "Create unlimited UPI links. Fixed or custom amounts. Share anywhere.", hoverBg: "hover:bg-emerald-50" },
  { icon: QrCode, tag: null, title: "QR Code Generator", description: "Instant QR codes. Download, print, share. Works with all UPI apps.", hoverBg: "hover:bg-amber-50" },
  { icon: MousePointerClick, tag: null, title: "Payment Buttons", description: "One-tap buttons for instant payments. Tips, donations, orders.", hoverBg: "hover:bg-sky-50" },
  { icon: Globe, tag: "Recommended", title: "Payment Page", description: "Your own page — paysimply.in/yourname. Professional & clean.", hoverBg: "hover:bg-violet-50" },
  { icon: FileText, tag: null, title: "GST Invoices", description: "GST-compliant invoices with embedded UPI QR. GSTIN, HSN codes included.", hoverBg: "hover:bg-rose-50" },
  { icon: Image, tag: "New", title: "Image to PDF", description: "Convert receipts to PDF with QR watermark. Nothing stored on servers.", hoverBg: "hover:bg-orange-50" },
];

const ServicesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-normal tracking-[-0.02em] text-foreground leading-tight overflow-hidden">
            <WordSlideUp text="Everything You Need to Accept UPI Payments" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto text-[15px]"
          >
            We generate everything else. No apps. No complicated setup. No payment gateway required.
          </motion.p>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16"
        >
          {[
            { value: "6+", label: "Powerful tools" },
            { value: "0%", label: "Commission" },
            { value: "30s", label: "Setup time" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <span className="text-2xl md:text-3xl font-heading font-normal tracking-[-0.02em] text-foreground">{stat.value}</span>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const colSpan = [0, 4].includes(i) ? "md:col-span-7" : [1, 5].includes(i) ? "md:col-span-5" : "md:col-span-6";
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group rounded-[20px] p-6 border border-border/60 bg-background ${feature.hoverBg} hover:shadow-xl transition-all duration-500 cursor-pointer relative ${colSpan}`}
              >
                {feature.tag && (
                  <span className="absolute top-5 right-5 bg-secondary/20 text-primary px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide border border-secondary/40">
                    {feature.tag}
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ opacity: 0, rotate: -90, scale: 0 }}
                    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, type: "spring", stiffness: 200 }}
                    className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center shrink-0"
                  >
                    <Icon className="w-5 h-5 text-foreground" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-normal tracking-[-0.02em] text-lg text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    <Link to="/signup" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all mt-3">
                      Get started <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
