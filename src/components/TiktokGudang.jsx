import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../data/snackData';
import img1 from '../assets/grosir-snack-besar.png';
import img2 from '../assets/cemal-cemil-semarang.png';
import img3 from '../assets/banyak-mikir-jualan-snack-gampang.png';
import img4 from '../assets/sendangguwo-tembalang.png';
import img5 from '../assets/tips-jualan-snack.png';

export default function TikTokGudang() {
  // 5 Data Video
const videos = [
    {
      id: 1,
      handle: "@victorysnack21semarang",
      desc: "Grosir Snack Besar di Kota Semarang",
      img: img1, // Menggunakan import
      url: "https://www.tiktok.com/@victorysnack21semarang/video/7629223782472797448"
    },
    {
      id: 2,
      handle: "@victorysnack.grosir",
      desc: "Cemal Cemil di Semarang, Prodk Makanan yang selalu fresh ga pernah stok barang",
      img: img2,
      url: "https://www.tiktok.com/@victorysnack21semarang/video/7632556573931425042"
    },
    {
      id: 3,
      handle: "@victorysnack.official",
      desc: "Jangan asal jualan snack kalau blm tips satu ini!! wajib di perhatikan!",
      img: img3,
      url: "https://www.tiktok.com/@victorysnack21semarang/video/7625187299533278471"
    },
    {
      id: 4,
      handle: "@victorysnack.kuliner",
      desc: "Semarangnya Sendangguwo Tembalang mas",
      img: img4,
      url: "https://www.tiktok.com/@victorysnack21semarang/video/7615393900336794898"
    },
    {
      id: 5,
      handle: "@victorysnack.distro",
      desc: "Tips Jualan Snack!!",
      img: img5,
      url: "https://www.tiktok.com/@victorysnack21semarang/video/7626355923497422087"
    }
  ];

  // State untuk carousel desktop (pusat ada di index 2 secara default)
  const [activeIndex, setActiveIndex] = useState(2);

  const nextVideo = () => setActiveIndex((prev) => (prev + 1) % 5);
  const prevVideo = () => setActiveIndex((prev) => (prev - 1 + 5) % 5);

  // Logika posisi untuk 5 elemen (Desktop Cover Flow)
  const getDesktopStyle = (index) => {
    if (index === activeIndex) {
      // Tengah (Paling Besar)
      return { x: 0, scale: 1, zIndex: 10, opacity: 1, filter: "blur(0px)" };
    }
    
    const left1 = (activeIndex - 1 + 5) % 5;
    const right1 = (activeIndex + 1) % 5;
    const left2 = (activeIndex - 2 + 5) % 5;
    const right2 = (activeIndex + 2) % 5;

    if (index === left1) return { x: -260, scale: 0.82, zIndex: 7, opacity: 0.7, filter: "blur(0.5px)" };
    if (index === right1) return { x: 260, scale: 0.82, zIndex: 7, opacity: 0.7, filter: "blur(0.5px)" };
    if (index === left2) return { x: -480, scale: 0.65, zIndex: 5, opacity: 0.4, filter: "blur(1.5px)" };
    if (index === right2) return { x: 480, scale: 0.65, zIndex: 5, opacity: 0.4, filter: "blur(1.5px)" };
    
    return { x: 0, scale: 0.5, zIndex: 0, opacity: 0 };
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 overflow-hidden relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-40">
        <span className="text-[#C97B63] font-bold tracking-widest text-xs uppercase block mb-3">
          PROSES PACKING & GUDANG
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-[#6B4F3A] tracking-tight mb-4">
          Intip Keseruan Kami di TikTok dan Instagram
        </h2>
        <p className="text-[#6B4F3A]/70">
          Lihat langsung realitas proses pengemasan higienis dan muat barang harian kami.
        </p>
      </div>

      {/* ======================================================== */}
      {/* 1. TAMPILAN KHUSUS LAPTOP (Cover Flow 3D - 5 Video)       */}
      {/* ======================================================== */}
{/* 1. TAMPILAN KHUSUS LAPTOP (Perhatikan perubahan di bawah) */}
<div className="hidden lg:flex relative h-[520px] w-full items-center justify-center">
  <AnimatePresence initial={false}>
    {videos.map((vid, index) => {
      const isActive = index === activeIndex;
      return (
        <motion.div
          key={vid.id}
          animate={getDesktopStyle(index)}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className={`absolute w-[280px] aspect-[9/16] bg-[#6B4F3A] rounded-3xl overflow-hidden shadow-2xl border border-[#F5E6CC] flex-shrink-0 select-none ${
            isActive ? 'cursor-default' : 'cursor-pointer hover:border-[#C97B63]'
          }`}
          onClick={() => setActiveIndex(index)}
        >
          {/* LINK DITAMBAHKAN DISINI */}
          <a 
            href={vid.url || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full h-full relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            
            <img 
              src={vid.img} 
              alt="Video Proses" 
              className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'opacity-85 scale-100' : 'opacity-60 scale-105'}`} 
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg font-bold pl-1 transition-colors duration-300 ${isActive ? 'bg-[#C97B63] text-white' : 'bg-white/30 text-white/70 backdrop-blur-sm'}`}>
                ▶
              </div>
            </div>

            <motion.div 
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
              className="absolute bottom-6 left-5 right-5 z-20 text-white pointer-events-none"
            >
              <span className="text-[10px] font-bold bg-[#C97B63] px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
                {vid.handle}
              </span>
              <p className="text-xs font-semibold mt-3 leading-snug drop-shadow-md line-clamp-2">
                {vid.desc}
              </p>
            </motion.div>
          </a>
        </motion.div>
      );
    })}
  </AnimatePresence>
</div>

      {/* Navigasi Tombol Khusus Desktop */}
      <div className="hidden lg:flex justify-center items-center gap-6 mt-10 relative z-40">
        <button 
          onClick={prevVideo}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#F5E6CC] text-[#6B4F3A] shadow-md hover:bg-[#F5E6CC] hover:text-[#C97B63] transition-all hover:-translate-x-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <div className="flex gap-2">
          {videos.map((_, idx) => (
            <span 
              key={idx} 
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-[#C97B63]' : 'w-2 bg-[#D1C8BA]'}`}
            />
          ))}
        </div>

        <button 
          onClick={nextVideo}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#F5E6CC] text-[#6B4F3A] shadow-md hover:bg-[#F5E6CC] hover:text-[#C97B63] transition-all hover:translate-x-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 2. TAMPILAN NORMAL HP & TABLET (Grid Statis)             */}
      {/* ======================================================== */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:hidden gap-8 max-w-3xl mx-auto"
      >
        {videos.map((vid) => (
<motion.a // Ganti motion.div menjadi motion.a
    key={vid.id}
    href={vid.url || "#"} // Tambahkan href
    target="_blank"
    rel="noopener noreferrer"
    variants={fadeInUp} 
    whileHover={{ y: -6 }} 
    className="block aspect-[9/16] bg-[#6B4F3A] rounded-3xl overflow-hidden shadow-md border border-[#F5E6CC] relative group cursor-pointer"
  >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            
            <img 
              src={vid.img} 
              alt="TikTok Konten" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <span className="h-14 w-14 bg-[#C97B63] text-white rounded-full flex items-center justify-center shadow-md font-bold pl-1">▶</span>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white pointer-events-none">
              <span className="text-[10px] font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                {vid.handle}
              </span>
              <p className="text-xs font-semibold mt-3 leading-snug drop-shadow-md">
                {vid.desc}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}