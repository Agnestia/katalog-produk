import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/productService';

export default function EditProduct() {
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kategori, setKategori] = useState('manis');
  const [berat, setBerat] = useState('1 kg');
  const [rating, setRating] = useState('5.0');
  const [gambar, setGambar] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    try {
      const data = await getProductById(id);
      setNama(data.nama || '');
      setHarga(data.harga || '');
      setDeskripsi(data.deskripsi || '');
      setKategori(data.kategori || 'manis');
      setBerat(data.berat || '1 kg');
      setRating(data.rating || '5.0');
      setGambar(data.gambar || '');
    } catch (err) {
      alert('Gagal memuat data produk.');
      navigate('/admin/dashboard');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = { nama, harga: Number(harga), deskripsi, kategori, berat, rating, gambar };
    
    try {
      await updateProduct(id, productData);
      alert('Produk berhasil diperbarui!');
      navigate('/admin/dashboard'); 
    } catch (err) {
      alert('Gagal memperbarui produk.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-[#6B4F3A] mb-6">Edit Produk</h1>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-2xl border border-[#F5E6CC] flex flex-col gap-4 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Nama Produk</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Harga Grosir (Rp / kg)</label>
            <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} required className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm" />
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
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Deskripsi Produk</label>
          <textarea rows="3" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm"></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Link URL Foto Produk</label>
          <input type="text" value={gambar} onChange={(e) => setGambar(e.target.value)} required className="w-full border p-3 rounded-xl border-[#F5E6CC] text-sm" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#6B4F3A] text-white font-bold p-3 rounded-xl mt-4 transition-colors text-sm">
          {loading ? 'Memperbarui...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  );
}