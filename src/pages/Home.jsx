import React from "react";
import { Link } from "react-router-dom";
// Import komponen-komponen kamu yang lain di sini
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TentangKami from "../components/TentangKami";
import BestSeller from "../components/BestSeller";
import JangkauanKirim from "../components/JangkauanKirim";
import TikTokGudang from "../components/TikTokGudang";
import Testimoni from "../components/Testimoni";
import Pencapaian from "../components/Pencapaian";
import Keunggulan from "../components/Keunggulan";
import CtaWhatsapp from "../components/CtaWhatsapp";
import Footer from "../components/Footer";
// 1. PASTIKAN ADA FUNGSI UTAMA INI
export default function Home() {
  
  // 2. KODE RETURN HARUS DI DALAM FUNGSI INI
  return (
    <div>
      {/* Semua komponen landing page kamu dimasukkan ke dalam sini */}
      <Navbar />
      <Hero />
      <TentangKami/>
      <BestSeller/>
      <JangkauanKirim/>
      <TikTokGudang />
      <Keunggulan/>
      <Pencapaian />
      <Testimoni />
      <CtaWhatsapp />
    </div>
  ); // <-- Kurung penutup return
} // <-- Kurung penutup fungsi Home (Pastikan ini ada di paling bawah file!)