import React from 'react';
import { motion } from 'framer-motion';

export default function CtaWhatsapp() {
  return (
    <section id="kontak" className="bg-[#2F3E34] text-[#FAF7F2] py-20 text-center px-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Siap Menjadi Mitra Victory Snack?
        </h2>
        
        <p className="text-sm text-[#FAF7F2]/80 mb-8 max-w-md mx-auto leading-relaxed">
          Konsultasikan kebutuhan toko Anda sekarang. Dapatkan penawaran harga grosir khusus hari ini.
        </p>
        
        {/* Wrapper untuk animasi tombol melayang (Floating effect) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="inline-block"
        >
          <motion.a 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 15px 30px rgba(201, 123, 99, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/6281326280000?text=Halo%20Victory%20Snack,%20saya%20tertarik%20tanya%20harga%20grosir%20dan%20katalognya." 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#C97B63] hover:bg-[#C97B63]/90 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 text-base cursor-pointer"
          >
            {/* Animasi Ikon Bergoyang/Berdering */}
            <motion.span
              animate={{ rotate: [0, -14, 14, -8, 8, 0] }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                repeatDelay: 2,
                ease: "easeInOut" 
              }}
              className="origin-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </motion.span>
            
            <span>Hubungi Via WhatsApp</span>
          </motion.a>
        </motion.div>
        
      </motion.div>
    </section>
  );
}