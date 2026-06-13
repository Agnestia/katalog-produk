import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { getHeroImages } from '../services/settingService';

// Komponen khusus untuk animasi angka berjalan
const AnimatedCounter = ({ from = 0, to, duration = 2 }) => {
  const count = useMotionValue(from);
  
  const rounded = useTransform(count, (latest) => 
    Math.round(latest).toLocaleString('id-ID')
  );

  useEffect(() => {
    const controls = animate(count, to, { 
      duration: duration, 
      ease: "easeOut",
      delay: 0.5
    });
    
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
};

export default function Hero() {
  // State untuk menyimpan URL gambar yang diambil dari Firebase
  const [heroImages, setHeroImages] = useState({
    profile1: "https://i.ibb.co.com/Q3mPwL5D/keluarga-victory-snack.jpg",
    profile2: "https://i.ibb.co.com/QF8hD9sK/prodile4.jpg",             
    profile3: "https://i.ibb.co.com/Zzq5qr5f/profile3.jpg",             
    profile4: "https://i.ibb.co.com/3YszX7NL/produk-tes.jpg"
  });

  // Mengambil data gambar dari Firestore saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const data = await getHeroImages();
        if (data) {
          setHeroImages({
            profile1: data.profile1 || heroImages.profile1,
            profile2: data.profile2 || heroImages.profile2,
            profile3: data.profile3 || heroImages.profile3,
            profile4: data.profile4 || heroImages.profile4
          });
        }
      } catch (error) {
        console.error("Gagal memuat gambar hero dari Firebase:", error);
      }
    };

    fetchHeroImages();
  }, []);

  const textContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const textItem = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 12 } 
    },
  };

  const imageContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const imageItem = {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 70, damping: 15 } 
    },
  };

  return (
    <div id="home" className="relative min-h-[75vh] flex items-center bg-[#FAF7F2] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* KOLOM KIRI: TEKS */}
        <motion.div 
          variants={textContainer}
          initial="hidden"
          animate="show"
          className="text-left z-10"
        >
          <motion.div variants={textItem}>
            <motion.span
              animate={{
                y: [0, -6, 0],
                boxShadow: [
                  "0 0 0 rgba(201,123,99,0.2)",
                  "0 10px 20px rgba(201,123,99,0.35)",
                  "0 0 0 rgba(201,123,99,0.2)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#F5E6CC] text-[#6B4F3A] mb-6 uppercase tracking-wider"
            >
              📦 Supplier Snack Grosir Terpercaya dari Semarang
            </motion.span>
          </motion.div>

        <motion.h1
          variants={textItem}
          className="text-4xl md:text-6xl font-black text-[#6B4F3A] leading-[1.1] tracking-tight mb-6"
        >
          VICTORY SNACK
          <br />
          <span className="text-[#C97B63]">
            Supplier Snack Grosir
          </span>
          <br />
          <span className="text-[#6B4F3A] text-3xl md:text-5xl">
            Terpercaya dari Semarang
          </span>
        </motion.h1>

          <motion.p
            variants={textItem}
            className="text-base md:text-lg text-[#6B4F3A]/80 mb-8 leading-relaxed max-w-xl"
          >
            Berpusat di Semarang, Victory Snack menyediakan berbagai
            produk snack dan camilan pilihan untuk toko, reseller,
            agen, distributor, hingga grosir. Dengan stok stabil,
            harga kompetitif, dan pengiriman ke seluruh Indonesia.
          </motion.p>
          
          <motion.div
            variants={textItem}
            className="flex flex-wrap gap-3 mb-8"
          >
            <span className="px-3 py-2 bg-[#F5E6CC] rounded-full text-xs font-semibold text-[#6B4F3A]">
              📍 Semarang
            </span>

            <span className="px-3 py-2 bg-[#F5E6CC] rounded-full text-xs font-semibold text-[#6B4F3A]">
              🚚 Kirim Seluruh Indonesia
            </span>

            <span className="px-3 py-2 bg-[#F5E6CC] rounded-full text-xs font-semibold text-[#6B4F3A]">
              🏪 10.000+ Toko Mitra
            </span>
          </motion.div>

          <motion.div
            variants={textItem}
            className="grid grid-cols-3 gap-4 border-t border-[#F5E6CC] pt-6 mb-8 text-center sm:text-left"
          >
            <div>
              <p className="text-2xl font-black text-[#C97B63]">
                <AnimatedCounter to={10000} duration={2.5} />+
              </p>
              <p className="text-xs text-[#6B4F3A]/60 font-medium">
                Toko Mitra
              </p>
            </div>

            <div>
              <p className="text-2xl font-black text-[#C97B63]">
                <AnimatedCounter to={500} duration={2} />+
              </p>
              <p className="text-xs text-[#6B4F3A]/60 font-medium">
                Varian Produk
              </p>
            </div>

            <div>
              <p className="text-2xl font-black text-[#C97B63]">
                <AnimatedCounter to={875} duration={2.3} />+
              </p>
              <p className="text-xs text-[#6B4F3A]/60 font-medium">
                Kota Pengiriman
              </p>
            </div>
          </motion.div>

          <motion.div variants={textItem} className="flex flex-col sm:flex-row gap-4">
            <motion.a 
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#produk" 
              className="group flex items-center justify-center gap-2 bg-[#C97B63] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#C97B63]/30 hover:shadow-[#C97B63]/50 transition-all duration-300"
            >
              <span>Lihat Produk & Harga Grosir</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* KOLOM KANAN: TATA LETAK ESTETIK GAMBAR */}
        <motion.div 
          variants={imageContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3 h-[450px] w-full md:w-[90%] md:ml-auto"
        >
          {/* Gambar Keluarga: Melebar ke samping (Landscape) di atas */}
          <div className="w-full h-[55%]">
            <motion.img 
              variants={imageItem}
              whileHover={{ scale: 1.02 }}
              src={heroImages.profile1} 
              alt="Keluarga Victory Snack" 
              className="w-full h-full object-cover rounded-3xl border-4 border-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow" 
            />
          </div>

          {/* 3 Produk: Berjajar ke samping di bawah */}
          <div className="grid grid-cols-3 gap-3 h-[45%]">
            <motion.img 
              variants={imageItem}
              whileHover={{ scale: 1.03 }}
              src={heroImages.profile2} 
              alt="Profil 2" 
              className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow" 
            />
            <motion.img 
              variants={imageItem}
              whileHover={{ scale: 1.03 }}
              src={heroImages.profile3} 
              alt="Profil 3" 
              className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow" 
            />
            <motion.img 
              variants={imageItem}
              whileHover={{ scale: 1.03 }}
              src={heroImages.profile4} 
              alt="Profil 4" 
              className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow" 
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}