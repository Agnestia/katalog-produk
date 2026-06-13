import React from 'react';
import { motion } from 'framer-motion';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  // Logika harga
  const hargaAsli = product.price || 0;
  const hargaDiskon = hargaAsli - 3000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[2rem] max-w-md w-full overflow-hidden shadow-2xl border border-[#F5E6CC] relative flex flex-col max-h-[90vh]"
      >
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
        >
          ✕
        </button>
        
        {/* Gambar */}
        <div className="h-72 w-full bg-[#FAF7F2] shrink-0 overflow-hidden flex items-center justify-center p-2">
          <img src={product.img} alt={product.title} className="w-full h-full object-contain" />
        </div>

        {/* Konten Detail */}
        <div className="p-6 overflow-y-auto flex flex-col">
          <span className="inline-block bg-[#F5E6CC] text-[#C97B63] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase w-max">
            {product.tag}
          </span>
          
          <h3 className="text-2xl font-black text-[#6B4F3A] mb-2 leading-tight">{product.title}</h3>
          <p className="text-sm text-[#6B4F3A]/80 leading-relaxed mb-6">{product.desc}</p>

          {/* Box Harga & Ketentuan */}
          <div className="bg-[#FAF7F2] rounded-2xl p-4 mb-6 border border-[#F5E6CC]">
            <span className="text-xs text-[#6B4F3A]/70 block mb-2 font-medium">Harga Grosir</span>
            
            <div className="flex items-center gap-3 mb-3">
              {/* Harga Utama: Harga Asli (Sebelum Diskon) */}
              <span className="text-2xl font-black text-[#6B4F3A]">
                Rp{hargaAsli.toLocaleString('id-ID')}
              </span>
            </div>
            
            {/* Harga Setelah Diskon Pengambilan di Tempat */}
            <div className="text-sm text-[#C97B63] font-bold mb-3">
              Jadi hanya <span className="font-black">Rp{hargaDiskon.toLocaleString('id-ID')}</span> jika diambil di tempat
            </div>
            
            <p className="text-[10px] font-bold text-[#6B4F3A] italic">
              *Potongan Rp3.000 khusus pengambilan di tempat. Luar kota berlaku syarat minimal order.
            </p>
          </div>
          
          {/* Tombol Pesan WA Interaktif */}
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/6281326280000?text=Halo%20Victory%20Snack,%20saya%20tertarik%20produk%20*${encodeURIComponent(product.title)}*.%0A%0ASaya%20ingin%20tanya:%0A1.%20Apakah%20bisa%20dikirim%20ke%20kota%20saya?%0A2.%20Atau%20apakah%20saya%20bisa%20ambil%20di%20tempat%20untuk%20dapat%20potongan%20harga?`}
            target="_blank" 
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-[#25D366]/30 transition-all duration-300"
          >
            <span>Konsultasi Order via WA</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}