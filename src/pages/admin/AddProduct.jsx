import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/productService';

export default function AddProduct() {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kategori, setKategori] = useState('manis');
  const [berat, setBerat] = useState(''); 
  const [rating, setRating] = useState('5.0');
  const [gambar, setGambar] = useState(''); // Menggunakan string URL gambar
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = { nama, harga: Number(harga), deskripsi, kategori, berat, rating, gambar };
    
    try {
      await addProduct(productData);
      alert('Produk berhasil ditambahkan!');
      navigate('/admin/dashboard'); 
    } catch (err) {
      alert('Gagal menambah produk.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-[#6B4F3A] mb-6">Tambah Produk Baru</h1>

      <form onSubmit={handleSumbit} className="bg-white p-6 rounded-2xl border border-[#F5E6CC] flex flex-col gap-4 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Nama Produk</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Harga Grosir (Rp)</label>
            <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} required placeholder="Cth: 82000" className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Berat Produk</label>
            <input type="text" value={berat} onChange={(e) => setBerat(e.target.value)} required placeholder="Cth: 1 kg atau 500 gr" className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Kategori</label>
            <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm">
              <option value="manis">Manis</option>
              <option value="pedas">Pedas</option>
              <option value="asin">Asin</option>
              <option value="kacang">Kacang</option>
              <option value="pisang">Pisang</option>
              <option value="coklat">Coklat</option>
              <option value="snack-sehat">Snack Sehat</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Rating</label>
            <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} required placeholder="Cth: 5.0" className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Deskripsi Produk</label>
          <textarea rows="3" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm"></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Link URL Foto Produk (Contoh: dari imgbb.com)</label>
          <input 
            type="text" 
            value={gambar} 
            onChange={(e) => setGambar(e.target.value)} 
            placeholder="https://i.ibb.co/xxx/foto.jpg"
            required 
            className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm" 
          />
          <p className="text-[10px] text-[#6B4F3A]/60 mt-1">Upload foto ke imgbb.com, klik kanan pada gambar &gt; "Copy image link" / "Salin tautan gambar", lalu paste di sini.</p>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#2F3E34] text-white font-bold p-3 rounded-xl mt-4 transition-colors text-sm">
          {loading ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </form>
    </div>
  );
}