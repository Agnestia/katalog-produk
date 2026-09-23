import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Halaman (Pages) Utama
import HalamanUtama from "./pages/Home";
import ProdukDetail from "./pages/ProdukDetail";
import Pemesanan from "./pages/order/Pemesanan";

// Import Halaman Admin
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import EditHero from "./pages/admin/EditHero";

// Import Komponen Global yang muncul di semua halaman
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF9] text-[#6B4F3A] flex flex-col justify-between">

        {/* Konten Utama Aplikasi */}
        <main className="flex-grow">
          <Routes>

            {/* =========================
                HALAMAN UTAMA
            ========================== */}
            <Route
              path="/"
              element={<HalamanUtama />}
            />

            {/* =========================
                KATALOG PRODUK
            ========================== */}
            <Route
              path="/produk"
              element={<ProdukDetail />}
            />

            {/* =========================
                HALAMAN PEMESANAN
            ========================== */}
            <Route
              path="/pesan"
              element={<Pemesanan />}
            />

            {/* =========================
                ADMIN
            ========================== */}
            <Route
              path="/admin/login"
              element={<Login />}
            />

            <Route
              path="/admin/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/admin/add-product"
              element={<AddProduct />}
            />

            <Route
              path="/admin/edit-product/:id"
              element={<EditProduct />}
            />

            {/* =========================
                EDIT HERO
            ========================== */}
            <Route
              path="/admin/edit-hero"
              element={<EditHero />}
            />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}