import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import faqImage from "@/assets/faq-new.png";
import { SlideFromLeft } from "@/lib/animations";

const faqs = [
  { question: "What is a UPI payment link and how does it work?", answer: "A UPI payment link is a URL that opens a UPI app with payment details pre-filled for instant transfer. When someone clicks your PaySimply link, their UPI app opens with your details ready. No manual entry." },
  { question: "How to create a payment link for Instagram bio?", answer: "Enter your UPI ID on PaySimply, generate your link (e.g. paysimply.in/yourname), add it to your Instagram bio. Followers tap to pay via any UPI app. No gateway needed." },
  { question: "Does PaySimply charge any commission on payments?", answer: "No. Money goes directly via UPI. We are a link tool, not a payment processor. You keep 100%." },
  { question: "Can I create a payment link without GST number?", answer: "Yes. No GST, business license, or KYC needed. If you have GSTIN, our invoice generator supports GST-compliant invoices." },
  { question: "Is PaySimply RBI approved? Do you need a license?", answer: "PaySimply is a link generator; we don't process or hold money, so RBI payment aggregator license isn't required. Payments go through your UPI app (RBI-regulated)." },
  { question: "Do I need a payment gateway to use PaySimply?", answer: "No. No gateway or merchant account. No setup fees, monthly charges, or commissions; instant settlements." },
  { question: "Can I generate a UPI QR code online for free?", answer: "Yes. Generate and download a UPI QR instantly; works with all UPI apps. Print or share digitally." },
  { question: "What's the difference between payment link and payment gateway?", answer: "Gateway processes and holds money, charges 2–3%, settles in 3–7 days. Payment link (PaySimply) opens UPI app—money to your bank instantly, 0% commission." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="mx-auto px-6 lg:px-16 max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-normal tracking-[-0.02em] text-foreground leading-tight mb-4 overflow-hidden">
              <SlideFromLeft text="Frequently Asked" />
              <br />
              <SlideFromLeft text="Questions" />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md"
            >
              Find helpful answers about UPI payment links, setup, and features — designed to get you started without friction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl overflow-hidden hidden lg:block"
            >
              <img src={faqImage} alt="FAQ illustration" className="w-full h-auto max-h-[340px] object-cover rounded-2xl" />
            </motion.div>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-primary" : "bg-muted"}`}
                >
                  <button
                    id={buttonId}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className={`font-body text-sm md:text-base pr-4 ${isOpen ? "text-primary-foreground font-medium" : "text-foreground"}`}>
                      {i + 1}. {faq.question}
                    </span>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isOpen ? "bg-primary-foreground text-primary" : "bg-foreground text-background"}`}>
                      {isOpen ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-primary-foreground/10">
                          <p className="text-sm leading-relaxed text-primary-foreground/75 pt-4">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
