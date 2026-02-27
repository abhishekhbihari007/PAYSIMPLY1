import { motion } from "framer-motion";

const LogoMarquee = () => {
  const text = "All you need is your UPI ID ✦ ";
  const repeated = Array(8).fill(text).join("");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="py-4 bg-primary overflow-hidden"
    >
      <div className="relative">
        <div className="flex marquee items-center">
          <span className="text-secondary font-body font-semibold text-sm tracking-[0.2em] uppercase whitespace-nowrap">
            {repeated}
          </span>
          <span className="text-secondary font-body font-semibold text-sm tracking-[0.2em] uppercase whitespace-nowrap">
            {repeated}
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default LogoMarquee;
