import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../data/snackData';

export default function Keunggulan() {
  return (
    <section id="kenapakami" className="bg-[#2F3E34] text-[#FAF7F2] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#FAF7F2]/60 font-bold tracking-widest text-xs uppercase block mb-3">
            KEUNGGULAN KAMI
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Kenapa Harus Victory Snack?
          </h2>
        </motion.div>

        {/* Grid Keunggulan */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            { title: "Harga Tangan Pertama", desc: "Harga grosir murni langsung dari produsen, profit margin tokomu jadi makin maksimal.", icon: "💰" },
            { title: "Rasa Otentik & Lezat", desc: "Racikan bumbu tradisional nusantara melimpah, rasa konsisten tidak berubah-ubah.", icon: "✨" },
            { title: "Kualitas Premium Higienis", desc: "Bahan baku pilihan diproses bersih, bebas bau apek, dan aman dikonsumsi jangka panjang.", icon: "⭐" },
            { title: "Stok Melimpah Selalu Ready", desc: "Gudang penyimpanan memadai memastikan pasokan camilanmu aman sepanjang musim.", icon: "📦" },
            { title: "Pengiriman Cepat & Utuh", desc: "Bekerja sama dengan kargo terpercaya, memastikan kemasan aman dan minim remuk.", icon: "⚡" },
            { title: "Pelayanan Ramah & Responsif", desc: "Konsultasi kebutuhan grosir tokomu dibantu CS berpengalaman via WhatsApp.", icon: "🤝" }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-colors cursor-default shadow-lg shadow-black/5"
            >
              {/* Efek getar ringan pada icon saat card di-hover */}
              <motion.div 
                whileHover={{ rotate: [0, -15, 15, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
                className="text-3xl mb-4 w-fit"
              >
                {item.icon}
              </motion.div>
              
              <h3 className="text-lg font-bold mb-2 text-white">
                {item.title}
              </h3>
              
              <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}