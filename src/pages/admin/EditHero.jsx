import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getHeroImages, updateHeroImages } from '../../services/settingService';

export default function EditHero() {
  const [images, setImages] = useState({
    profile1: '',
    profile2: '',
    profile3: '',
    profile4: '',
    profile5: '', // <-- Tambahkan profile 5
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getHeroImages();
      if (data) {
        setImages({
          profile1: data.profile1 || '',
          profile2: data.profile2 || '',
          profile3: data.profile3 || '',
          profile4: data.profile4 || '',
          profile5: data.profile5 || '', // <-- Muat profile 5
        });
      }
    } catch (err) {
      console.error("Gagal memuat pengaturan gambar", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImages((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateHeroImages(images);
      alert('Foto Bagian Atas berhasil diperbarui!');
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Gagal memperbarui foto.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-xs text-[#6B4F3A]">Memuat pengaturan...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl border border-[#F5E6CC] shadow-sm">
        <h1 className="text-xl font-black text-[#6B4F3A] mb-2">Edit Foto Halaman (Hero & Tentang Kami)</h1>
        <p className="text-xs text-[#6B4F3A]/70 mb-6">Masukkan link gambar (misal dari imgbb / ibb.co) pada kolom di bawah ini.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Link Gambar Utama (Profile 1 - Landscape Atas)</label>
            <input type="text" name="profile1" value={images.profile1} onChange={handleChange} className="w-full border border-[#F5E6CC] p-3 rounded-xl text-xs focus:outline-none focus:border-[#6B4F3A]" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Link Gambar Produk 1 (Profile 2)</label>
            <input type="text" name="profile2" value={images.profile2} onChange={handleChange} className="w-full border border-[#F5E6CC] p-3 rounded-xl text-xs focus:outline-none focus:border-[#6B4F3A]" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Link Gambar Produk 2 (Profile 3)</label>
            <input type="text" name="profile3" value={images.profile3} onChange={handleChange} className="w-full border border-[#F5E6CC] p-3 rounded-xl text-xs focus:outline-none focus:border-[#6B4F3A]" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Link Gambar Produk 3 (Profile 4)</label>
            <input type="text" name="profile4" value={images.profile4} onChange={handleChange} className="w-full border border-[#F5E6CC] p-3 rounded-xl text-xs focus:outline-none focus:border-[#6B4F3A]" required />
          </div>

          {/* INPUT BARU UNTUK PROFILE 5 */}
          <div>
            <label className="block text-xs font-bold text-[#6B4F3A] mb-1">Link Gambar Tentang Kami (Profile 5 - Bagian Bawah)</label>
            <input type="text" name="profile5" value={images.profile5} onChange={handleChange} className="w-full border border-[#F5E6CC] p-3 rounded-xl text-xs focus:outline-none focus:border-[#6B4F3A]" required />
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={saving} className="flex-1 bg-[#C97B63] hover:bg-[#C97B63]/90 text-white font-bold p-3.5 rounded-xl text-xs transition-colors">
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            <Link to="/admin/dashboard" className="bg-gray-100 hover:bg-gray-200 text-[#6B4F3A] font-bold p-3.5 rounded-xl text-xs transition-colors text-center">
              Kembali
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}