import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/productService';
import ProductModal from '../components/ProductModal';

export default function ProdukDetail() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kategoriTerpilih, setKategoriTerpilih] = useState('semua');
  const [produkPilihan, setProdukPilihan] = useState(null);
  const [pencarian, setPencarian] = useState('');
  const [keranjang, setKeranjang] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Gagal memuat produk", err);
    } finally {
      setLoading(false);
    }
  };

  const daftarKategori = [
    { id: 'semua', nama: 'Semua Kategori' },
    { id: 'manis', nama: '🍬 Manis' },
    { id: 'pedas', nama: '🌶️ Pedas' },
    { id: 'asin', nama: '🧂 Asin' },
    { id: 'kacang', nama: '🥜 Kacang' },
    { id: 'pisang', nama: '🍌 Pisang' },
    { id: 'coklat', nama: '🍫 Coklat' },
    { id: 'snack-sehat', nama: '🌿 Snack Sehat' },
  ];

  const toggleKeranjang = (e, produk) => {
    e.stopPropagation();
    if (keranjang.find(p => p.id === produk.id)) {
      setKeranjang(keranjang.filter(p => p.id !== produk.id));
    } else {
      setKeranjang([...keranjang, produk]);
    }
  };

  const kirimWA = () => {
    const listProduk = keranjang.map(p => `• ${p.nama}`).join('%0A');
    const pesan = `Halo Victory Snack, saya ingin bertanya tentang produk berikut:%0A${listProduk}%0A%0AApakah stok ready dan harganya masih sama?`;
    window.open(`https://wa.me/6281326280000?text=${pesan}`, '_blank');
  };

  const produkTersaring = products.filter(p => {
    const cocokKategori = kategoriTerpilih === 'semua' || p.kategori?.toLowerCase() === kategoriTerpilih;
    const cocokNama = p.nama?.toLowerCase().includes(pencarian.toLowerCase());
    return cocokKategori && cocokNama;
  });

  const bukaModalDetail = (produk) => {
    setProdukPilihan({
      img: produk.gambar,
      title: produk.nama,
      desc: produk.deskripsi,
      tag: produk.kategori,
      price: Number(produk.harga) // Harga tertinggi
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {keranjang.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={kirimWA}
            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-4 px-6 rounded-2xl shadow-2xl transition-all animate-bounce"
          >
            Tanya {keranjang.length} Produk via WA
          </button>
        </div>
      )}

      <button onClick={() => navigate('/')} className="text-sm font-semibold text-[#C97B63] hover:underline mb-6 inline-block">
        ← Kembali ke Beranda
      </button>

      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C97B63] bg-[#F5E6CC] px-3 py-1 rounded-full">Katalog Lengkap</span>
        <h1 className="text-3xl md:text-4xl font-black text-[#6B4F3A] mt-2">Cari Camilan Favoritmu</h1>
        <div className="mt-6 max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Cari nama produk..." 
            value={pencarian}
            onChange={(e) => setPencarian(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-[#F5E6CC] focus:outline-none focus:ring-2 focus:ring-[#C97B63] text-center"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {daftarKategori.map((kat) => (
          <button
            key={kat.id}
            onClick={() => setKategoriTerpilih(kat.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${kategoriTerpilih === kat.id ? 'bg-[#6B4F3A] text-white border-[#6B4F3A] shadow-md' : 'bg-white text-[#6B4F3A] border-[#F5E6CC] hover:bg-[#FAF3E0]'}`}
          >
            {kat.nama}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#6B4F3A]/60">Memuat data produk...</div>
      ) : produkTersaring.length === 0 ? (
        <div className="text-center py-12 text-[#6B4F3A]/60">Produk tidak ditemukan.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produkTersaring.map((produk) => {
            const hargaTertinggi = Number(produk.harga);
            const hargaDiskon = hargaTertinggi - 3000;
            const isSelected = keranjang.find(p => p.id === produk.id);

            return (
              <div key={produk.id} className="bg-white border border-[#F5E6CC] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group" onClick={() => bukaModalDetail(produk)}>
                <div className="relative h-48 bg-[#FAF3E0] overflow-hidden">
                  <img src={produk.gambar || 'https://via.placeholder.com/200'} alt={produk.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 left-2 bg-[#FAF3E0] text-[#6B4F3A] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide border border-[#F5E6CC]">{produk.kategori}</span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between pointer-events-none">
                  <div>
                    <h3 className="text-lg font-bold text-[#6B4F3A] mb-2">{produk.nama}</h3>
                    <p className="text-xs text-[#6B4F3A]/70 line-clamp-2 mb-4">{produk.deskripsi}</p>
                  </div>

                  <div onClick={(e) => e.stopPropagation()} className="pointer-events-auto">
                    <div className="border-t border-[#FAF3E0] pt-3 flex items-center justify-between">
                      {/* Menampilkan harga utama sebagai harga diskon, dan harga coret sebagai harga tertinggi */}
                      <div className="flex flex-col">
                        <span className="text-base font-black text-[#C97B63]">
                          Rp {hargaDiskon.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-[#6B4F3A]/50 line-through">
                          Rp {hargaTertinggi.toLocaleString('id-ID')}
                        </span>
                      </div>
                      
                      <button 
                        onClick={(e) => toggleKeranjang(e, produk)}
                        className={`text-xs font-bold px-3 py-2 rounded-full transition-all ${isSelected ? 'bg-[#6B4F3A] text-white' : 'bg-[#FAF3E0] text-[#6B4F3A] hover:bg-[#F5E6CC]'}`}
                      >
                        {isSelected ? '✓ Dipilih' : '+ Tanya'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ProductModal product={produkPilihan} onClose={() => setProdukPilihan(null)} />
    </div>
  );
}