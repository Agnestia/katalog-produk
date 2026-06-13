import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// Komponen pembantu untuk animasi angka
function AnimatedCounter({ value, decimals = 0, prefix = "", suffix = "" }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Animasi dari 0 ke nilai target dengan durasi 2.5 detik
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(latest) {
          if (nodeRef.current) {
            nodeRef.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
          }
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, decimals, prefix, suffix]);

  return (
    <span 
      ref={nodeRef} 
      className="block text-3xl font-black text-[#C97B63]"
    >
      0
    </span>
  );
}

export default function Pencapaian() {
  return (
    <section className="bg-white border-y border-[#F5E6CC] py-12 text-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* 10.000+ Toko Mitra */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedCounter value={10000} suffix="+" />
          <span className="text-xs text-[#6B4F3A]/70 font-semibold uppercase tracking-wide mt-1 block">
            Toko Mitra
          </span>
        </motion.div>

        {/* 500+ Reseller Aktif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedCounter value={500} suffix="+" />
          <span className="text-xs text-[#6B4F3A]/70 font-semibold uppercase tracking-wide mt-1 block">
            Reseller Aktif
          </span>
        </motion.div>

        {/* 50+ Kota Pengiriman */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatedCounter value={50} suffix="+" />
          <span className="text-xs text-[#6B4F3A]/70 font-semibold uppercase tracking-wide mt-1 block">
            Kota Pengiriman
          </span>
        </motion.div>

        {/* ⭐ 4.9 Rating Pelanggan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <AnimatedCounter value={4.9} decimals={1} prefix="⭐ " />
          <span className="text-xs text-[#6B4F3A]/70 font-semibold uppercase tracking-wide mt-1 block">
            Rating Pelanggan
          </span>
        </motion.div>

      </div>
    </section>
  );
}