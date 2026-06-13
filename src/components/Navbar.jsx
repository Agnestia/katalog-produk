import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa'; // Pastikan sudah install react-icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = ["Home", "Produk", "Tentang", "Wilayah", "Kenapa Kami", "Kontak"];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#F5E6CC] shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-10 w-10 bg-[#C97B63] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-[#C97B63]/20">
            V
          </div>
          <h1 className="text-2xl font-black text-[#6B4F3A] tracking-tight">
            Victory<span className="text-[#C97B63]">Snack</span>
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-[#6B4F3A]/80">
          {menuItems.map((menu) => (
            <a key={menu} href={`#${menu.toLowerCase().replace(" ", "")}`} className="relative hover:text-[#C97B63] transition-colors py-2 group text-sm tracking-wide">
              {menu}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C97B63] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTA BUTTON & HAMBURGER */}
        <div className="flex items-center gap-4">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/6281326280000" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 bg-[#2F3E34] text-[#FAF7F2] px-4 py-2 rounded-full font-medium hover:bg-[#2F3E34]/90 transition-all text-xs md:text-sm"
          >
            <span>Tanya Grosir</span>
          </motion.a>

          {/* HAMBURGER BUTTON */}
          <button className="md:hidden text-[#6B4F3A] text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#FAF7F2] border-b border-[#F5E6CC] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map((menu) => (
                <a 
                  key={menu} 
                  href={`#${menu.toLowerCase().replace(" ", "")}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-[#6B4F3A] font-semibold text-lg py-2 border-b border-[#F5E6CC]/50"
                >
                  {menu}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}