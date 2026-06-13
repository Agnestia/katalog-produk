import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getHeroImages } from "../services/settingService";

import {
  FaTiktok,
  FaInstagram,
  FaShoppingBag,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function TentangKami() {
  const [imageUrl, setImageUrl] = useState(
    "https://i.ibb.co.com/p6fdYJWG/kluarga2vic.jpg"
  );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const data = await getHeroImages();

        if (data && data.profile5) {
          setImageUrl(data.profile5);
        }
      } catch (error) {
        console.error("Gagal memuat gambar tentang kami:", error);
      }
    };

    fetchImage();
  }, []);

  const imageVariant = {
    hidden: { opacity: 0, x: -60, rotate: -3 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { type: "spring", duration: 1.2, bounce: 0.3 },
    },
  };

  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  return (
    <section id="tentang" className="bg-[#F5E6CC]/40 border-y border-[#F5E6CC] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C97B63] font-bold tracking-[4px] text-xs uppercase">
            Tentang Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#6B4F3A] mt-3">
            Pusat Distribusi Snack & Camilan
          </h2>
          <p className="text-[#6B4F3A]/70 mt-4 max-w-3xl mx-auto">
            Supplier snack grosir terpercaya dari Semarang yang melayani toko,
            reseller, agen dan distributor ke seluruh Indonesia.
          </p>
        </motion.div>

        {/* GRID UTAMA (FOTO & KONTEN) */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* KIRI: Foto */}
          <motion.div variants={imageVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <img
              src={imageUrl}
              alt="Victory Snack"
              className="w-full h-[450px] object-cover rounded-3xl border-4 border-white shadow-xl"
            />
          </motion.div>

          {/* KANAN: Statistik & Informasi */}
          <motion.div variants={textContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-5 text-center border border-[#F5E6CC]">
                <h3 className="text-3xl font-black text-[#C97B63]">10K+</h3>
                <p className="text-xs text-[#6B4F3A]/70">Toko Mitra</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center border border-[#F5E6CC]">
                <h3 className="text-3xl font-black text-[#C97B63]">999+</h3>
                <p className="text-xs text-[#6B4F3A]/70">Produk</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center border border-[#F5E6CC]">
                <h3 className="text-3xl font-black text-[#C97B63]">100+</h3>
                <p className="text-xs text-[#6B4F3A]/70">Kota</p>
              </div>
            </div>

            <p className="text-[#6B4F3A]/80 leading-relaxed mb-5">
              Victory Snack merupakan pusat distribusi snack dan camilan yang berlokasi di Kota Semarang. 
              Kami menyediakan berbagai produk makanan ringan berkualitas untuk toko kelontong, 
              reseller, agen, distributor hingga grosir.
            </p>
            <p className="text-[#6B4F3A]/80 leading-relaxed mb-8">
              Dengan stok yang stabil, harga kompetitif, dan jaringan pengiriman yang luas, 
              Victory Snack telah dipercaya ribuan pelanggan di berbagai kota Indonesia untuk 
              memenuhi kebutuhan camilan usaha mereka.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <a href="https://www.tiktok.com/@victorysnack21semarang" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-black text-white p-4 rounded-2xl hover:scale-105 transition">
                <FaTiktok size={22} />
                <div>
                  <p className="font-semibold">TikTok</p>
                  <span className="text-xs opacity-70">Video Gudang</span>
                </div>
              </a>
              <a href="https://www.instagram.com/victorysnack21/" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-2xl hover:scale-105 transition">
                <FaInstagram size={22} />
                <div>
                  <p className="font-semibold">Instagram</p>
                  <span className="text-xs opacity-90">Aktivitas Harian</span>
                </div>
              </a>
              <a href="https://shopee.co.id/victorysnack21" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#EE4D2D] text-white p-4 rounded-2xl hover:scale-105 transition">
                <FaShoppingBag size={22} />
                <div>
                  <p className="font-semibold">Shopee</p>
                  <span className="text-xs opacity-90">Rating & Penjualan</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* MAPS: DI TENGAH BAWAH */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#F5E6CC] p-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#F5E6CC] p-3 rounded-xl">
              <FaMapMarkerAlt className="text-[#C97B63]" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-[#6B4F3A] text-lg">Gudang Victory Snack</h4>
              <p className="text-sm text-[#6B4F3A]/60">Semarang • Jawa Tengah</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl">
<iframe
  src="https://maps.google.com/maps?q=Victory%20Snack%20Semarang&t=&z=15&ie=UTF8&iwloc=&output=embed"
  width="100%"
  height="300"
  style={{ border: 0 }}
  loading="lazy"
  title="Victory Snack"
/>
          </div>

          <a
            href="https://share.google/TduwDwKFs7WON5xQ1"
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex items-center justify-center gap-2 bg-[#C97B63] text-white py-3 rounded-xl font-semibold hover:bg-[#B2644D] transition w-full"
          >
            <FaMapMarkerAlt /> Buka Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}