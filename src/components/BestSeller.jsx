import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "../services/productService";
import { fadeInUp, staggerContainer } from "../data/snackData";

export default function BestSeller({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchPinnedProducts();
  }, []);

  const fetchPinnedProducts = async () => {
    try {
      const data = await getProducts();
      // Filter produk yang memiliki properti pinned: true dan ambil maksimal 4
      const pinned = data.filter((item) => item.pinned === true).slice(0, 4);
      setProducts(pinned);
    } catch (err) {
      console.error("Gagal memuat produk", err);
    }
  };

  // Fungsi untuk mengarahkan ke WhatsApp
  const handleWAOrder = (product) => {
    const phoneNumber = "6281326280000";
    const hargaAsli = Number(product.harga);
    const hargaDiskon = hargaAsli - 3000;
    const message = `Halo Admin Victory Snack, saya tertarik untuk memesan produk *${product.nama}* (Harga ${hargaAsli.toLocaleString('id-ID')} atau ${hargaDiskon.toLocaleString('id-ID')} jika diambil di tempat). Boleh info lebih lanjut?`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, "_blank");
  };

  return (
    <section id="produk" className="max-w-7xl mx-auto px-6 py-24 relative">
      {/* Header */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[#C97B63] font-bold tracking-widest text-xs uppercase block mb-3">🔥 PRODUK PALING DICARI</span>
        <h2 className="text-3xl md:text-4xl font-black text-[#6B4F3A] tracking-tight mb-4">Camilan Terlaris Siap Kirim</h2>
        <p className="text-[#6B4F3A]/70">Paling disukai konsumen, perputaran stok cepat, cocok untuk mendongkrak omzet tokomu.</p>
        <div className="mt-10">
          <Link to="/produk" className="inline-flex items-center gap-2 bg-[#C97B63] hover:bg-[#B2644D] text-white font-bold px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:-translate-y-1">
            Lihat Lebih Detail & Kategori
          </Link>
        </div>
      </motion.div>

      {/* Product Grid */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const hargaAsli = Number(p.harga);
          return (
            <motion.div
              key={p.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              onClick={() => {
                setSelectedProduct({
                  img: p.gambar,
                  title: p.nama,
                  desc: p.deskripsi,
                  tag: p.kategori,
                  hargaAsli: hargaAsli,
                  hargaDiskon: hargaAsli - 3000
                });
                if (onSelectProduct) onSelectProduct(p);
              }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-[#F5E6CC] hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden bg-[#FAF7F2]">
                <span className="absolute top-4 left-4 z-10 bg-[#FAF7F2] border border-[#F5E6CC] text-[#C97B63] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase">{p.kategori}</span>
                <img src={p.gambar || 'https://via.placeholder.com/300'} alt={p.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-black text-[#6B4F3A] mb-2 group-hover:text-[#C97B63] transition-colors">{p.nama}</h3>
                <p className="text-xs text-[#6B4F3A]/70 leading-relaxed mb-4 line-clamp-2">{p.deskripsi}</p>
                <div className="mt-auto pt-4 border-t border-[#FAF7F2] flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-[#6B4F3A]/60 block">Harga Grosir</span>
                    <span className="text-lg font-black text-[#C97B63]">Rp {hargaAsli.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* MODAL POP-UP DETAIL PRODUK */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6B4F3A]/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-[2rem] overflow-hidden shadow-2xl max-w-md w-full relative flex flex-col max-h-[90vh]">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors">✕</button>

              <div className="relative h-64 bg-[#FAF7F2] shrink-0">
                <img src={selectedProduct.img} alt={selectedProduct.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 overflow-y-auto">
                <span className="inline-block bg-[#F5E6CC] text-[#C97B63] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase">{selectedProduct.tag}</span>
                <h3 className="text-2xl font-black text-[#6B4F3A] mb-2 leading-tight">{selectedProduct.title}</h3>
                <p className="text-sm text-[#6B4F3A]/80 leading-relaxed mb-6">{selectedProduct.desc}</p>

                <div className="bg-[#FAF7F2] rounded-2xl p-4 mb-6 border border-[#F5E6CC]">
                  <span className="text-xs text-[#6B4F3A]/70 block mb-1">Harga Grosir</span>
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-[#C97B63]">Rp {selectedProduct.hargaDiskon.toLocaleString('id-ID')}</span>
                    <span className="text-sm text-[#6B4F3A]/50 line-through">Rp {selectedProduct.hargaAsli.toLocaleString('id-ID')}</span>
                    <span className="text-[10px] text-[#C97B63] mt-2 font-bold italic">*Harga lebih murah (Rp {selectedProduct.hargaDiskon.toLocaleString('id-ID')}) jika diambil di tempat.</span>
                  </div>
                </div>

                <button onClick={() => handleWAOrder(selectedProduct)} className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300">
                  <span>Pesan via WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}