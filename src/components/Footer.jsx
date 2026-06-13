import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#F5E6CC] py-8 text-center text-xs text-[#6B4F3A]/60 font-medium">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 Victory Snack Semarang. Semua Hak Dilindungi.</p>
        <div className="flex gap-6">
          <a href="#home" className="hover:text-[#C97B63]">Home</a>
          <a href="#produk" className="hover:text-[#C97B63]">Produk</a>
          <a href="#testimoni" className="hover:text-[#C97B63]">Testimoni</a>
        </div>
      </div>
    </footer>
  );
}