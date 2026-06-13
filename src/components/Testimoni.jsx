import React from 'react';
import { motion } from 'framer-motion';
import { testimonials, fadeInUp, staggerContainer } from '../data/snackData';

export default function Testimoni() {
  return (
    <section id="testimoni" className="bg-[#FAF7F2] py-24 border-t border-[#F5E6CC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#C97B63] font-bold tracking-widest text-xs uppercase block mb-3">
            ⭐ REVIEW REAL TOKO SNACK
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#6B4F3A] tracking-tight">
            Bukti Kepuasan Mitra Toko
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white border border-[#F5E6CC] p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-[#C97B63]/5 hover:border-[#C97B63]/40 transition-all cursor-default"
            >
              <div>
                {/* Bagian Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <motion.svg 
                      key={i}
                      whileHover={{ rotate: [0, -15, 15, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      className="cursor-pointer"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </motion.svg>
                  ))}
                  <span className="text-xs font-bold text-[#2F3E34] ml-2 bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#F5E6CC]">
                    Verified
                  </span>
                </div>
                
                {/* Isi Testimoni */}
                <p className="text-[#6B4F3A]/90 italic text-xs leading-relaxed mb-4">
                  "{t.content}"
                </p>
              </div>
              
              {/* Identitas Pengulas */}
              <div className="border-t border-[#FAF7F2] pt-4 mt-2">
                <h4 className="font-bold text-[#6B4F3A] text-sm">
                  {t.name}
                </h4>
                <span className="text-[11px] text-[#C97B63] font-semibold tracking-wide uppercase block mt-0.5">
                  {t.role}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}