import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";

const DISKON_PER_PRODUK = 3000;

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(number) || 0);
};

export default function Pemesanan() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [kategoriTerpilih, setKategoriTerpilih] = useState("semua");
  const [pencarian, setPencarian] = useState("");

  const [orderType, setOrderType] = useState("pickup");

  const [selectedProducts, setSelectedProducts] = useState({});

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    kelurahan: "",
    kecamatan: "",
    city: "",
    notes: "",
  });

  // =========================
  // AMBIL PRODUK DARI FIREBASE
  // =========================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data || []);
    } catch (error) {
      console.error("Gagal memuat produk:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // KATEGORI
  // =========================
  const daftarKategori = [
    { id: "semua", nama: "Semua Kategori" },
    { id: "manis", nama: "🍬 Manis" },
    { id: "pedas", nama: "🌶️ Pedas" },
    { id: "asin", nama: "🧂 Asin" },
    { id: "kacang", nama: "🥜 Kacang" },
    { id: "pisang", nama: "🍌 Pisang" },
    { id: "coklat", nama: "🍫 Coklat" },
    { id: "snack-sehat", nama: "🌿 Snack Sehat" },
  ];

  // =========================
  // FILTER PRODUK
  // =========================
  const produkTersaring = products.filter((produk) => {
    const cocokKategori =
      kategoriTerpilih === "semua" ||
      produk.kategori?.toLowerCase() === kategoriTerpilih;

    const cocokNama = produk.nama
      ?.toLowerCase()
      .includes(pencarian.toLowerCase());

    return cocokKategori && cocokNama;
  });

  // =========================
  // DATA PELANGGAN
  // =========================
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // PILIH / UNCHECK PRODUK
  // =========================
  const handleProductToggle = (produk) => {
    setSelectedProducts((prev) => {
      const updated = { ...prev };

      if (updated[produk.id]) {
        delete updated[produk.id];
      } else {
        updated[produk.id] = {
          qty: 1,
        };
      }

      return updated;
    });
  };

  // =========================
  // UBAH QTY
  // =========================
  const handleQuantityChange = (productId, quantity) => {
    const qty = Math.max(1, Number(quantity) || 1);

    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        qty,
      },
    }));
  };

  // =========================
  // PRODUK YANG DIPILIH
  // =========================
  const selectedItems = useMemo(() => {
    return products
      .filter((produk) => selectedProducts[produk.id])
      .map((produk) => {
        const hargaNormal = Number(produk.harga) || 0;
        const qty = selectedProducts[produk.id].qty;

        // Jika ambil di toko:
        // setiap produk mendapat diskon Rp3.000
        const hargaAmbil = Math.max(
          0,
          hargaNormal - DISKON_PER_PRODUK
        );

        // Tentukan harga sesuai metode pesanan
        const hargaPerUnit =
          orderType === "pickup"
            ? hargaAmbil
            : hargaNormal;

        const subtotal = hargaPerUnit * qty;

        // Total diskon produk ini
        const diskonProduk =
          orderType === "pickup"
            ? DISKON_PER_PRODUK * qty
            : 0;

        return {
          ...produk,
          hargaNormal,
          hargaAmbil,
          hargaPerUnit,
          qty,
          diskonProduk,
          subtotal,
        };
      });
  }, [products, selectedProducts, orderType]);

  // =========================
  // TOTAL HARGA NORMAL
  // =========================
  const subtotalNormal = useMemo(() => {
    return selectedItems.reduce(
      (total, item) =>
        total + item.hargaNormal * item.qty,
      0
    );
  }, [selectedItems]);

  // =========================
  // TOTAL DISKON
  // =========================
  const totalDiskon = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + item.diskonProduk,
      0
    );
  }, [selectedItems]);

  // =========================
  // TOTAL AKHIR
  // =========================
  const total = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );
  }, [selectedItems]);

  // =========================
  // SUBMIT PESANAN
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer.name.trim()) {
      alert("Nama pelanggan wajib diisi.");
      return;
    }

    if (!customer.phone.trim()) {
      alert("Nomor WhatsApp wajib diisi.");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Silakan pilih minimal satu produk.");
      return;
    }

    if (
      orderType === "delivery" &&
      !customer.address.trim()
    ) {
      alert(
        "Alamat lengkap wajib diisi untuk pesanan yang diantar."
      );
      return;
    }

    const orderText = selectedItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.nama} x${item.qty} = ${formatRupiah(
            item.subtotal
          )}`
      )
      .join("\n");

    const message = `
Halo Victory Snack, saya ingin melakukan pemesanan.

Nama: ${customer.name}
WhatsApp: ${customer.phone}

Metode Pesanan: ${
      orderType === "pickup"
        ? "Ambil di Toko"
        : "Diantar / Dikirim"
    }

Pesanan:
${orderText}

Harga Normal: ${formatRupiah(subtotalNormal)}
${
  orderType === "pickup"
    ? `Diskon Ambil: - ${formatRupiah(totalDiskon)}`
    : "Harga Pengiriman: Harga normal / Free Ongkir"
}
Total: ${formatRupiah(total)}

${
  orderType === "delivery"
    ? `Alamat Pengiriman:
${customer.address}
Kelurahan/Desa: ${customer.kelurahan || "-"}
Kecamatan: ${customer.kecamatan || "-"}
Kota/Kabupaten: ${customer.city || "-"}`
    : ""
}

Catatan:
${customer.notes || "-"}

Terima kasih.
    `.trim();

    const whatsappNumber = "6281326280000";

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 px-4 sm:px-6">

      {/* CUSTOM SCROLLBAR */}
      <style>{`
        .product-scroll-area::-webkit-scrollbar {
          width: 8px;
        }

        .product-scroll-area::-webkit-scrollbar-track {
          background: #FAF7F2;
          border-radius: 20px;
        }

        .product-scroll-area::-webkit-scrollbar-thumb {
          background: #C97B63;
          border-radius: 20px;
        }

        .product-scroll-area::-webkit-scrollbar-thumb:hover {
          background: #A95F4A;
        }

        .product-scroll-area {
          scrollbar-width: thin;
          scrollbar-color: #C97B63 #FAF7F2;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
          {/* =========================
      TOMBOL KEMBALI
  ========================== */}
  <button
    type="button"
    onClick={() => navigate("/")}
    className="flex items-center gap-2 text-sm font-bold text-[#C97B63] hover:text-[#6B4F3A] transition-all mb-6"
  >
    <span className="text-xl">←</span>
    <span>Kembali ke Beranda</span>
  </button>


        {/* =========================
            HEADER
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-[#F5E6CC] text-[#6B4F3A] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Pemesanan Victory Snack
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-[#6B4F3A]">
            Ayo Ndang Kulakan Keburu Habis!
          </h1>

          <p className="text-[#6B4F3A]/70 mt-3 max-w-2xl mx-auto">
            Pilih produk yang ingin dipesan,
            tentukan jumlahnya, lalu isi data
            pelanggan untuk melanjutkan pemesanan.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">

            {/* ==================================
                BAGIAN KIRI
            =================================== */}
            <div className="space-y-8">

              {/* =========================
                  1. DATA PELANGGAN
              ========================== */}
              <section className="bg-white rounded-3xl border border-[#F5E6CC] p-6 shadow-sm">

                <div className="mb-6">

                  <h2 className="text-xl font-black text-[#6B4F3A]">
                    1. Data Pelanggan
                  </h2>

                  <p className="text-sm text-[#6B4F3A]/60 mt-1">
                    Isi data untuk memudahkan kami
                    menghubungi Anda.
                  </p>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-bold text-[#6B4F3A] mb-2">
                      Nama Lengkap
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={customer.name}
                      onChange={handleCustomerChange}
                      placeholder="Contoh: Agnestia"
                      className="w-full border border-[#F5E6CC] rounded-xl px-4 py-3 outline-none focus:border-[#C97B63]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#6B4F3A] mb-2">
                      Nomor WhatsApp
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleCustomerChange}
                      placeholder="08xxxxxxxxxx"
                      className="w-full border border-[#F5E6CC] rounded-xl px-4 py-3 outline-none focus:border-[#C97B63]"
                    />
                  </div>

                </div>

              </section>

              {/* =========================
                  2. PRODUK
              ========================== */}
              <section className="bg-white rounded-3xl border border-[#F5E6CC] p-6 shadow-sm">

                <div className="mb-6">

                  <h2 className="text-xl font-black text-[#6B4F3A]">
                    2. Pilih Produk
                  </h2>

                  <p className="text-sm text-[#6B4F3A]/60 mt-1">
                    Cari dan checklist produk yang
                    ingin Anda pesan.
                  </p>

                </div>

                {/* SEARCH */}
                <div className="mb-5">

                  <input
                    type="text"
                    placeholder="🔎 Cari nama produk..."
                    value={pencarian}
                    onChange={(e) =>
                      setPencarian(e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#F5E6CC] focus:outline-none focus:ring-2 focus:ring-[#C97B63]"
                  />

                </div>

                {/* KATEGORI */}
                <div className="flex flex-wrap gap-2 mb-6">

                  {daftarKategori.map((kat) => (

                    <button
                      key={kat.id}
                      type="button"
                      onClick={() =>
                        setKategoriTerpilih(kat.id)
                      }
                      className={`px-3 py-2 rounded-full text-xs font-bold transition-all border ${
                        kategoriTerpilih === kat.id
                          ? "bg-[#6B4F3A] text-white border-[#6B4F3A] shadow-md"
                          : "bg-white text-[#6B4F3A] border-[#F5E6CC] hover:bg-[#FAF3E0]"
                      }`}
                    >
                      {kat.nama}
                    </button>

                  ))}

                </div>

                {/* AREA PRODUK SCROLL */}
                <div className="bg-[#FAF7F2] border border-[#F5E6CC] rounded-2xl p-3">

                  <div className="flex items-center justify-between mb-3 px-2">

                    <p className="text-xs font-bold text-[#6B4F3A]/60">
                      {produkTersaring.length} produk tersedia
                    </p>

                    <p className="text-[10px] text-[#6B4F3A]/50">
                      ↕ Scroll untuk melihat produk
                    </p>

                  </div>

                  {loading ? (

                    <div className="text-center py-12 text-[#6B4F3A]/60">
                      Memuat data produk...
                    </div>

                  ) : produkTersaring.length === 0 ? (

                    <div className="text-center py-12 text-[#6B4F3A]/60">
                      Produk tidak ditemukan.
                    </div>

                  ) : (

                    <div
                      className="
                        product-scroll-area
                        max-h-[500px]
                        md:max-h-[600px]
                        overflow-y-auto
                        pr-2
                      "
                    >

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {produkTersaring.map((produk) => {

                          const selected =
                            Boolean(
                              selectedProducts[produk.id]
                            );

                          const hargaNormal =
                            Number(produk.harga) || 0;

                          const hargaAmbil = Math.max(
                            0,
                            hargaNormal - DISKON_PER_PRODUK
                          );

                          const hargaTampil =
                            orderType === "pickup"
                              ? hargaAmbil
                              : hargaNormal;

                          return (

                            <div
                              key={produk.id}
                              className={`bg-white border rounded-2xl overflow-hidden transition-all ${
                                selected
                                  ? "border-[#C97B63] ring-2 ring-[#C97B63]/20"
                                  : "border-[#F5E6CC]"
                              }`}
                            >

                              {/* GAMBAR */}
                              <div className="relative h-40 bg-[#FAF3E0]">

                                <img
                                  src={
                                    produk.gambar ||
                                    "https://via.placeholder.com/400"
                                  }
                                  alt={produk.nama}
                                  className="w-full h-full object-cover"
                                />

                                <span className="absolute top-2 left-2 bg-[#FAF3E0] text-[#6B4F3A] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide border border-[#F5E6CC]">
                                  {produk.kategori}
                                </span>

                              </div>

                              {/* DETAIL */}
                              <div className="p-4">

                                <h3 className="font-bold text-[#6B4F3A]">
                                  {produk.nama}
                                </h3>

                                <p className="text-xs text-[#6B4F3A]/60 line-clamp-2 mt-1 mb-3">
                                  {produk.deskripsi}
                                </p>

                                {/* HARGA */}
                                <div className="mb-4">

                                  {orderType === "pickup" ? (

                                    <>
                                      <div className="flex items-center gap-2 flex-wrap">

                                        <span className="text-base font-black text-[#C97B63]">
                                          {formatRupiah(hargaAmbil)}
                                        </span>

                                        <span className="text-[10px] text-[#6B4F3A]/45 line-through">
                                          {formatRupiah(hargaNormal)}
                                        </span>

                                      </div>

                                      <p className="text-[10px] text-green-600 font-semibold mt-1">
                                        🏪 Harga ambil di toko
                                      </p>
                                    </>

                                  ) : (

                                    <>
                                      <span className="text-base font-black text-[#C97B63]">
                                        {formatRupiah(hargaNormal)}
                                      </span>

                                      <p className="text-[10px] text-green-600 font-semibold mt-1">
                                        🚚 Harga normal • Free Ongkir
                                      </p>
                                    </>

                                  )}

                                </div>

                                {/* CHECK + QTY */}
                                <div className="flex items-center justify-between gap-3">

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleProductToggle(
                                        produk
                                      )
                                    }
                                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                      selected
                                        ? "bg-[#6B4F3A] text-white"
                                        : "bg-[#FAF3E0] text-[#6B4F3A] hover:bg-[#F5E6CC]"
                                    }`}
                                  >
                                    {selected
                                      ? "✓ Dipilih"
                                      : "+ Pilih"}
                                  </button>

                                  {selected && (

                                    <input
                                      type="number"
                                      min="1"
                                      value={
                                        selectedProducts[
                                          produk.id
                                        ].qty
                                      }
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          produk.id,
                                          e.target.value
                                        )
                                      }
                                      className="w-20 border border-[#F5E6CC] rounded-xl px-2 py-2 text-center font-bold text-[#6B4F3A] outline-none focus:border-[#C97B63]"
                                    />

                                  )}

                                </div>

                              </div>

                            </div>

                          );

                        })}

                      </div>

                    </div>

                  )}

                </div>

              </section>

              {/* =========================
                  3. METODE PESANAN
              ========================== */}
              <section className="bg-white rounded-3xl border border-[#F5E6CC] p-6 shadow-sm">

                <div className="mb-6">

                  <h2 className="text-xl font-black text-[#6B4F3A]">
                    3. Metode Pesanan
                  </h2>

                  <p className="text-sm text-[#6B4F3A]/60 mt-1">
                    Pilih apakah pesanan akan diambil
                    atau diantar.
                  </p>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  {/* AMBIL */}
                  <button
                    type="button"
                    onClick={() =>
                      setOrderType("pickup")
                    }
                    className={`text-left p-5 rounded-2xl border-2 transition ${
                      orderType === "pickup"
                        ? "border-[#C97B63] bg-[#FAF7F2]"
                        : "border-[#F5E6CC] bg-white"
                    }`}
                  >

                    <div className="text-2xl mb-2">
                      🏪
                    </div>

                    <h3 className="font-black text-[#6B4F3A]">
                      Ambil di Toko
                    </h3>

                    <p className="text-sm text-green-600 mt-1 font-semibold">
                      Diskon Rp3.000 / produk
                    </p>

                    {orderType === "pickup" && (
                      <div className="mt-3 text-xs font-bold text-[#C97B63]">
                        ✓ Dipilih
                      </div>
                    )}

                  </button>

                  {/* ANTAR */}
                  <button
                    type="button"
                    onClick={() =>
                      setOrderType("delivery")
                    }
                    className={`text-left p-5 rounded-2xl border-2 transition ${
                      orderType === "delivery"
                        ? "border-[#C97B63] bg-[#FAF7F2]"
                        : "border-[#F5E6CC] bg-white"
                    }`}
                  >

                    <div className="text-2xl mb-2">
                      🚚
                    </div>

                    <h3 className="font-black text-[#6B4F3A]">
                      Diantar / Dikirim
                    </h3>

                    <p className="text-sm text-green-600 mt-1 font-semibold">
                      Harga normal • Free Ongkir
                    </p>

                    {orderType === "delivery" && (
                      <div className="mt-3 text-xs font-bold text-[#C97B63]">
                        ✓ Dipilih
                      </div>
                    )}

                  </button>

                </div>

              </section>

              {/* =========================
                  4. ALAMAT
              ========================== */}
              {orderType === "delivery" && (

                <section className="bg-white rounded-3xl border border-[#F5E6CC] p-6 shadow-sm">

                  <div className="mb-6">

                    <h2 className="text-xl font-black text-[#6B4F3A]">
                      4. Alamat Pengiriman
                    </h2>

                    <p className="text-sm text-[#6B4F3A]/60 mt-1">
                      Lengkapi alamat agar pesanan
                      dapat dikirim.
                    </p>

                  </div>

                  <div className="space-y-5">

                    {/* ALAMAT */}
                    <div>

                      <label className="block text-sm font-bold text-[#6B4F3A] mb-2">
                        Alamat Lengkap
                      </label>

                      <textarea
                        name="address"
                        value={customer.address}
                        onChange={handleCustomerChange}
                        rows="4"
                        placeholder="Nama jalan, nomor rumah, RT/RW, patokan, dll."
                        className="w-full border border-[#F5E6CC] rounded-xl px-4 py-3 outline-none focus:border-[#C97B63] resize-none"
                      />

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                      {/* KELURAHAN */}
                      <div>

                        <label className="block text-sm font-bold text-[#6B4F3A] mb-2">
                          Kelurahan / Desa
                        </label>

                        <input
                          type="text"
                          name="kelurahan"
                          value={customer.kelurahan}
                          onChange={handleCustomerChange}
                          className="w-full border border-[#F5E6CC] rounded-xl px-4 py-3 outline-none focus:border-[#C97B63]"
                        />

                      </div>

                      {/* KECAMATAN */}
                      <div>

                        <label className="block text-sm font-bold text-[#6B4F3A] mb-2">
                          Kecamatan
                        </label>

                        <input
                          type="text"
                          name="kecamatan"
                          value={customer.kecamatan}
                          onChange={handleCustomerChange}
                          className="w-full border border-[#F5E6CC] rounded-xl px-4 py-3 outline-none focus:border-[#C97B63]"
                        />

                      </div>

                      {/* KOTA */}
                      <div>

                        <label className="block text-sm font-bold text-[#6B4F3A] mb-2">
                          Kota / Kabupaten
                        </label>

                        <input
                          type="text"
                          name="city"
                          value={customer.city}
                          onChange={handleCustomerChange}
                          className="w-full border border-[#F5E6CC] rounded-xl px-4 py-3 outline-none focus:border-[#C97B63]"
                        />

                      </div>

                    </div>

                  </div>

                </section>

              )}

              {/* =========================
                  CATATAN
              ========================== */}
              <section className="bg-white rounded-3xl border border-[#F5E6CC] p-6 shadow-sm">

                <h2 className="text-xl font-black text-[#6B4F3A] mb-4">
                  Catatan Pesanan
                </h2>

                <textarea
                  name="notes"
                  value={customer.notes}
                  onChange={handleCustomerChange}
                  rows="3"
                  placeholder="Contoh: Tolong dipisahkan per jenis produk."
                  className="w-full border border-[#F5E6CC] rounded-xl px-4 py-3 outline-none focus:border-[#C97B63] resize-none"
                />

              </section>

            </div>

            {/* ==================================
                BAGIAN KANAN - RINGKASAN
            =================================== */}
            <div className="lg:sticky lg:top-6 h-fit">

              <section className="bg-white rounded-3xl border border-[#F5E6CC] p-6 shadow-lg">

                <h2 className="text-xl font-black text-[#6B4F3A] mb-6">
                  Ringkasan Pesanan
                </h2>

                {selectedItems.length === 0 ? (

                  <div className="text-center py-10 text-[#6B4F3A]/50">

                    <div className="text-4xl mb-3">
                      🛒
                    </div>

                    <p className="text-sm">
                      Belum ada produk yang dipilih.
                    </p>

                  </div>

                ) : (

                  <div className="space-y-4">

                    {/* LIST PESANAN */}
<div
  className="
    max-h-[380px]
    overflow-y-auto
    pr-2
    space-y-4
    product-scroll-area
  "
>
  {selectedItems.map((item) => (
    <div
      key={item.id}
      className="border-b border-[#F5E6CC] pb-4"
    >
      <div className="flex justify-between gap-4">

        <div>
          <p className="font-bold text-sm text-[#6B4F3A]">
            {item.nama}
          </p>

          <p className="text-xs text-[#6B4F3A]/60 mt-1">
            {item.qty} × {formatRupiah(item.hargaPerUnit)}
          </p>

          {orderType === "pickup" && (
            <p className="text-[10px] text-green-600 mt-1 font-semibold">
              Hemat {formatRupiah(item.diskonProduk)}
            </p>
          )}
        </div>

        <p className="font-bold text-sm text-[#C97B63] whitespace-nowrap">
          {formatRupiah(item.subtotal)}
        </p>

      </div>
    </div>
  ))}
</div>

                    {/* TOTAL */}
                    <div className="space-y-3 pt-2">

                      {/* HARGA NORMAL */}
                      <div className="flex justify-between text-sm">

                        <span className="text-[#6B4F3A]/70">
                          Harga Normal
                        </span>

                        <span className="font-bold text-[#6B4F3A]">
                          {formatRupiah(
                            subtotalNormal
                          )}
                        </span>

                      </div>

                      {/* DISKON PER PRODUK */}
                      {totalDiskon > 0 && (

                        <div className="flex justify-between text-sm">

                          <span className="text-green-600">
                            Diskon Ambil
                          </span>

                          <span className="font-bold text-green-600">
                            - {formatRupiah(
                              totalDiskon
                            )}
                          </span>

                        </div>

                      )}

                      {/* FREE ONGKIR */}
                      {orderType === "delivery" && (
                        <div className="flex justify-between text-sm">

                          <span className="text-green-600">
                            Pengiriman
                          </span>

                          <span className="font-bold text-green-600">
                            Free Ongkir
                          </span>

                        </div>
                      )}

                      {/* TOTAL */}
                      <div className="border-t border-[#F5E6CC] pt-4 flex justify-between items-center">

                        <span className="font-black text-[#6B4F3A]">
                          Total
                        </span>

                        <span className="text-2xl font-black text-[#C97B63]">
                          {formatRupiah(total)}
                        </span>

                      </div>

                    </div>

                  </div>

                )}

                {/* CHECKOUT */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-[#2F3E34] hover:bg-[#253129] text-white py-4 rounded-xl font-black transition-all shadow-lg"
                >
                  💬 Konfirmasi Pesanan
                </button>

                <p className="text-[11px] text-center text-[#6B4F3A]/50 mt-3">
                  Pesanan akan dilanjutkan melalui WhatsApp.
                </p>

              </section>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}