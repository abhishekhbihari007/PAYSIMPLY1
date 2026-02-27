import { motion } from "framer-motion";
import { ArrowUpRight, Link, QrCode, MousePointerClick, Globe, FileText, Image } from "lucide-react";
import { WordSlideUp } from "@/lib/animations";

const features = [
  { icon: Link, tag: "Most Popular", title: "UPI Payment Link", description: "Create unlimited UPI links. Fixed or custom amounts. Share anywhere." },
  { icon: QrCode, tag: null, title: "QR Code Generator", description: "Instant QR codes. Download, print, share. Works with all UPI apps." },
  { icon: MousePointerClick, tag: null, title: "Payment Buttons", description: "One-tap buttons for instant payments. Tips, donations, orders." },
  { icon: Globe, tag: "Recommended", title: "Payment Page", description: "Your own page — paysimply.in/yourname. Professional & clean." },
  { icon: FileText, tag: null, title: "GST Invoices", description: "GST-compliant invoices with embedded UPI QR. GSTIN, HSN codes included." },
  { icon: Image, tag: "New", title: "Image to PDF", description: "Convert receipts to PDF with QR watermark. Nothing stored on servers." },
];

const ServicesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-normal tracking-[-0.02em] text-foreground leading-tight overflow-hidden">
            <WordSlideUp text="Everything You Need to" />
            <br />
            <WordSlideUp text="Accept UPI Payments" />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground mt-4 max-w-[540px] mx-auto text-[15px]"
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
                className={`group rounded-[20px] p-8 border border-border/60 bg-background hover:shadow-xl transition-shadow duration-500 cursor-pointer relative flex flex-col justify-between min-h-[220px] ${colSpan}`}
              >
                <div>
                  {feature.tag && (
                    <span className="absolute top-6 right-6 bg-secondary/20 text-primary px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide border border-secondary/40">
                      {feature.tag}
                    </span>
                  )}
                  <motion.div
                    initial={{ opacity: 0, rotate: -90, scale: 0 }}
                    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08, type: "spring", stiffness: 200 }}
                    className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6"
                  >
                    <Icon className="w-6 h-6 text-foreground" />
                  </motion.div>
                  <h3 className="font-heading font-normal tracking-[-0.02em] text-xl text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all mt-6">
                  Get started <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
