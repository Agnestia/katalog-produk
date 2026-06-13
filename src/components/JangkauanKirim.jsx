import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../data/snackData';

export default function JangkauanKirim() {
  const cities = [
    { name: "Semarang", top: "50%", left: "45%", isMain: true },
    { name: "Kudus", top: "38%", left: "55%" },
    { name: "Pati", top: "30%", left: "60%" },
    { name: "Solo", top: "65%", left: "55%" },
    { name: "Jogja", top: "75%", left: "45%" },
    { name: "Kalimantan", top: "20%", left: "70%" },
    { name: "Sulawesi", top: "25%", left: "85%" },
    { name: "Sumatra", top: "30%", left: "15%" },
  ];

  return (
    <section id="wilayah" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center overflow-hidden">
      {/* HEADER Teks */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="max-w-2xl mx-auto mb-12"
      >
        <span className="text-[#C97B63] font-bold tracking-widest text-xs uppercase block mb-3">
          JANGKAUAN PENGIRIMAN
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[#6B4F3A] tracking-tight mb-4">
          Melayani Pengiriman ke Seluruh Indonesia
        </h2>
        <p className="text-[#6B4F3A]/70 leading-relaxed text-sm sm:text-base">
          Pengiriman rutin area Jawa Tengah dan luar pulau menggunakan armada logistik terpercaya dengan layanan aman, cepat, dan terjadwal.
        </p>
      </motion.div>

      {/* KOTAK PETA */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="bg-white border-2 border-[#F5E6CC] rounded-[2rem] shadow-xl shadow-[#C97B63]/5 max-w-5xl mx-auto relative overflow-hidden h-[400px] sm:h-[500px] flex flex-col justify-between"
      >
        {/* Latar Belakang Dotted */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: "radial-gradient(#6B4F3A 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>

        {/* Statistik (Mobile: Stacked, Desktop: Absolute top-right) */}
        <div className="absolute top-4 right-4 z-30 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm border border-[#F5E6CC]">
            <p className="text-lg sm:text-xl font-black text-[#C97B63]">100+</p>
            <span className="text-[9px] sm:text-[10px] text-[#6B4F3A]/70 uppercase">Kota</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm border border-[#F5E6CC]">
            <p className="text-lg sm:text-xl font-black text-[#C97B63]">24/7</p>
            <span className="text-[9px] sm:text-[10px] text-[#6B4F3A]/70 uppercase">Siaga</span>
          </div>
        </div>

        {/* Titik Kota */}
        {cities.map((city, index) => (
          <div key={index} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: city.top, left: city.left }}>
            <div className="relative flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.8], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }} className={`absolute w-3 h-3 rounded-full ${city.isMain ? 'bg-[#C97B63]' : 'bg-[#6B4F3A]'}`}></motion.div>
              <div className={`relative z-10 w-2 h-2 rounded-full border border-white ${city.isMain ? 'bg-[#C97B63] w-3 h-3' : 'bg-[#6B4F3A]'}`}></div>
            </div>
            <span className="hidden sm:block mt-1 text-[9px] font-bold text-[#6B4F3A]/60 whitespace-nowrap">{city.name}</span>
          </div>
        ))}

        {/* Animasi Truk */}
        <motion.div animate={{ x: ["-10vw", "110vw"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-[45%] text-2xl sm:text-5xl z-20">
          🚚
        </motion.div>

        {/* Panel Informasi Bawah */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/95 to-transparent pt-12 pb-6 px-4 z-30">
          <div className="max-w-3xl mx-auto">
            <p className="font-semibold text-[#6B4F3A] text-xs sm:text-sm leading-relaxed mb-4">
              Jawa Tengah: Semarang, Ungaran, Bawen, Salatiga, Boyolali, Genuk, Kudus, Pati, Blora, Jepara, Sragen, Solo, Jogja, Ponorogo. 
              <span className="hidden sm:inline"> Luar Pulau: Sumatra, Kalimantan, Sulawesi, hingga seluruh wilayah Indonesia.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Area Jawa Tengah", "Antar Pulau", "Kargo Nasional"].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#F5E6CC] text-[10px] sm:text-xs font-bold text-[#6B4F3A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}