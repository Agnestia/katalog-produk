import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct, updateProduct } from '../../services/productService';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Ambil data produk saat halaman dibuka
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
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

  // Fungsi Hapus Produk
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
        alert('Produk berhasil dihapus!');
        fetchProducts(); // Refresh daftar produk setelah dihapus
      } catch (err) {
        alert('Gagal menghapus produk.');
        console.error(err);
      }
    }
  };

  // Fungsi Pin / Unpin Produk
  const togglePin = async (item) => {
    // Cek jika produk yang di-pin sudah ada 4
    const pinnedCount = products.filter(p => p.pinned).length;
    if (!item.pinned && pinnedCount >= 4) {
      alert("Maksimal produk yang dapat di-pin adalah 4!");
      return;
    }

    try {
      await updateProduct(item.id, { pinned: !item.pinned });
      fetchProducts(); // Refresh daftar produk
    } catch (err) {
      alert("Gagal mengubah status pin produk.");
      console.error(err);
    }
  };

  // Fungsi Logout Admin
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (err) {
      console.error("Gagal logout", err);
    }
  };

  // Fungsi pencarian produk berdasarkan nama
  const filteredProducts = products.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Dashboard */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl border border-[#F5E6CC] shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-[#6B4F3A]">Dashboard Admin</h1>
            <p className="text-xs text-[#6B4F3A]/70 mt-1">Kelola katalog Victory Snack dengan mudah</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/add-product" className="bg-[#2F3E34] hover:bg-[#2F3E34]/90 text-white font-bold px-4 py-3 rounded-xl text-xs transition-colors">
              + Tambah Barang
            </Link>
            <button onClick={handleLogout} className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-3 rounded-xl text-xs transition-colors border border-red-100">
              Keluar (Logout)
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          {/* TAMBAHKAN TOMBOL INI */}
          <Link to="/admin/edit-hero" className="bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 font-bold px-4 py-3 rounded-xl text-xs transition-colors">
            ✏️ Edit Foto Hero
          </Link>
          
          <Link to="/admin/add-product" className="bg-[#2F3E34] hover:bg-[#2F3E34]/90 text-white font-bold px-4 py-3 rounded-xl text-xs transition-colors">
            + Tambah Barang
          </Link>
          
          <button onClick={handleLogout} className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-3 rounded-xl text-xs transition-colors border border-red-100">
            Keluar (Logout)
          </button>
        </div>

        {/* Tabel List Produk */}
        <div className="bg-white rounded-2xl border border-[#F5E6CC] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#F5E6CC] flex justify-between items-center flex-wrap gap-4">
            <h2 className="font-bold text-sm text-[#6B4F3A]">Daftar Produk Saat Ini</h2>
            
            {/* Input Pencarian */}
            <input 
              type="text" 
              placeholder="Cari nama produk..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#F5E6CC] p-2.5 rounded-xl text-xs w-64 focus:outline-none focus:border-[#6B4F3A]"
            />
          </div>

          {loading ? (
            <p className="p-8 text-center text-xs text-[#6B4F3A]/60">Memuat data produk...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="p-8 text-center text-xs text-[#6B4F3A]/60">
              {searchTerm ? 'Produk tidak ditemukan.' : 'Belum ada produk. Silakan tambahkan barang baru!'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FAF7F2] text-[#6B4F3A] text-xs font-bold border-b border-[#F5E6CC]">
                    <th className="p-4">Foto</th>
                    <th className="p-4">Nama Produk</th>
                    <th className="p-4">Harga (Rp)</th>
                    <th className="p-4">Berat</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4 text-center">Pin (Max 4)</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5E6CC]">
                  {filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF7F2]/40">
                      <td className="p-4">
                        <img src={item.gambar || 'https://via.placeholder.com/60'} alt={item.nama} className="w-12 h-12 object-cover rounded-xl border border-[#F5E6CC]" />
                      </td>
                      <td className="p-4 font-bold text-[#6B4F3A]">{item.nama}</td>
                      <td className="p-4">Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                      <td className="p-4">{item.berat || '-'}</td>
                      <td className="p-4">
                        <span className="bg-[#FAF7F2] px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#C97B63] uppercase tracking-wider">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => togglePin(item)} 
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all border ${
                            item.pinned 
                              ? 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100' 
                              : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          {item.pinned ? '📌 Unpin' : 'Pin'}
                        </button>
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <Link to={`/admin/edit-product/${item.id}`} className="text-blue-600 font-bold hover:underline mr-4 text-xs">Edit</Link>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-xs font-bold">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}