import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wallet, CreditCard, Users } from "lucide-react";
import { StaggerFade } from "@/lib/animations";

import imgProfessionals from "@/assets/testimonial-professionals.png";
import imgVendor from "@/assets/testimonial-vendor.png";
import imgCreator from "@/assets/testimonial-creator.png";
import imgStudents from "@/assets/testimonial-students.png";
import imgFreelancer from "@/assets/testimonial-freelancer.png";
import imgShopowner from "@/assets/testimonial-shopowner.png";
import imgYoutuber from "@/assets/testimonial-youtuber.png";

const testimonials = [
  { image: imgProfessionals, description: "Share payment links with clients after consultations. Get paid instantly without invoicing delays or chasing follow-ups.", category: "Professionals" },
  { image: imgVendor, description: "Show your QR code to customers at your stall. Accept UPI payments without expensive POS machines or card terminals.", category: "Street Vendors" },
  { image: imgCreator, description: "Put your payment link in your Instagram bio. Let followers support you or buy your products with just one tap.", category: "Content Creators" },
  { image: imgStudents, description: "Split bills, collect group funds for trips or fests, and accept payments for freelance gigs — all with one link.", category: "Students" },
  { image: imgFreelancer, description: "Add your payment page to proposals and contracts. No more chasing payments or dealing with complex invoicing tools.", category: "Freelancers" },
  { image: imgShopowner, description: "Print your QR code for the counter. Customers love the convenience, and you save on payment terminal costs.", category: "Shop Owners" },
  { image: imgYoutuber, description: "Drop your payment link in video descriptions. Accept tips, course payments, and donations with zero setup required.", category: "Video Creators" },
];

if (typeof window !== "undefined") {
  testimonials.forEach((t) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = t.image;
    document.head.appendChild(link);
  });
}

const notCards = [
  { icon: Wallet, title: "Not a wallet", description: "We don't hold your money. Ever." },
  { icon: CreditCard, title: "Not a payment gateway", description: "No merchant account needed." },
  { icon: Users, title: "Not an intermediary", description: "Direct UPI-to-UPI. Zero middlemen." },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    setActiveIndex((prev) =>
      dir === "left" ? (prev - 1 + testimonials.length) % testimonials.length : (prev + 1) % testimonials.length
    );
  }, []);

  const progress = ((activeIndex + 1) / testimonials.length) * 100;
  const current = testimonials[activeIndex];

  return (
    <section className="py-24 bg-primary overflow-hidden">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-heading font-normal tracking-[-0.02em] text-primary-foreground leading-tight overflow-hidden">
            <StaggerFade text="What Our Users Say" />
            <br />
            <StaggerFade text="About PaySimply" />
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="bg-primary-foreground/[0.06] rounded-[28px] p-5 md:p-8 mb-8"
        >
          <div className="bg-background rounded-[20px] overflow-hidden shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                className="grid md:grid-cols-[1fr_1.2fr] items-stretch"
              >
                <div className="relative h-[280px] md:h-[420px] overflow-hidden bg-muted/30 flex items-center justify-center rounded-l-[20px]">
                  <img src={current.image} alt={current.category} className="w-full h-full object-contain" loading="eager" decoding="sync" fetchPriority="high" />
                </div>
                <div className="flex flex-col justify-center px-6 md:px-10 py-8 md:py-10">
                  <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-[11px] font-semibold mb-5 w-fit">{current.category}</span>
                  <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed">{current.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-16">
          <motion.button onClick={() => scroll("left")} className="w-11 h-11 rounded-full bg-primary-foreground/10 border border-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          </motion.button>
          <div className="w-48 md:w-80 h-[5px] bg-primary-foreground/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary-foreground rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
          <motion.button onClick={() => scroll("right")} className="w-11 h-11 rounded-full bg-primary-foreground/10 border border-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {notCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, rotateY: 30 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-primary-foreground/5 rounded-[18px] p-6 border border-primary-foreground/10 text-center"
              >
                <Icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h4 className="font-heading font-normal tracking-[-0.02em] text-primary-foreground mb-2">{card.title}</h4>
                <p className="text-sm text-primary-foreground/50">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
