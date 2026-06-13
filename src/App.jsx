import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Halaman (Pages) Utama
import HalamanUtama from "./pages/Home";
import ProdukDetail from "./pages/ProdukDetail";

// Import Halaman Admin
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from './pages/admin/EditProduct';
import EditHero from './pages/admin/EditHero'; // <-- 1. IMPORT HALAMAN EDIT HERO

// Import Komponen Global yang muncul di semua halaman
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF9] text-[#6B4F3A] flex flex-col justify-between">
        
        {/* Konten Utama Aplikasi */}
        <main className="flex-grow">
          <Routes>
            {/* Rute untuk Landing Page Utama */}
            <Route path="/" element={<HalamanUtama />} />
            
            {/* Rute untuk Halaman Katalog Produk Lengkap & Kategori */}
            <Route path="/produk" element={<ProdukDetail />} />

            {/* Rute Akses Admin */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            
            {/* Rute untuk Edit Gambar Halaman Utama (Hero) */}
            <Route path="/admin/edit-hero" element={<EditHero />} /> {/* <-- 2. DAFTARKAN RUTE DI SINI */}
            
          </Routes>
        </main>

        {/* Footer akan selalu muncul di bagian paling bawah setiap halaman */}
        <Footer />
        
      </div>
    </Router>
  );
}