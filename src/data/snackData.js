export const products = [
    {
        title: "Bagelan Gosyen",
        desc: "Roti kering manis berbentuk bulat, tekstur renyah dan cocok untuk sarapan di pagi hari",
        price: "83.000",
        heavy: "2kg",
        tag: "tangan pertama",
        img: "",
    },
    {
        title:"Sus bulat original Gosyen",
        desc: "Sus original berbentuk bulat, renyah dan garing",
        price: "106.500",
        heavy: "2kg",
        tag: "tangan pertama",
        img: "",
    },
    {
        title: "Sus panjang original Gosyen",
        desc: "Sus panjang orignal, renyah dan garing",
        price: "104.500",
        heavy: "2kg",
        tag: "tangan pertama",
        img: "",
    },
    {
        title:"Sus coklat GG",
        desc: "Sus coklat bulat, coklatnya lumer, kualitas paling bagus",
        price: "111.000",
        heavy: "2kg",
        tag: "kualitas paling top",
        img: "",
    },
];

export const testimonials = [
    {
        id: 1,
        name: "Bu Ana",
        role: "Pemilik Toko Snack Semarang",
        rating: "5",
        content: "Sudah lebih dari 10 tahun menjadi pelanggan setia. Kualitas produk, kecepatan pengiriman, dan kelengkapan stoknya selalu konsisten. Sangat direkomendasikan!",
    },
    {
        id: 2,
        name: "Pusat Oleh-Oleh Semarang",
        role: "Mitra Bisnis",
        rating: "5",
        content: "Produknya sangat laris manis di toko kami. Victory Snack benar-benar mitra yang solutif, pelayanannya cepat dan sangat membantu kami dalam urusan pemasaran produk.",
    },
    {
        id: 3,
        name: "Pusat Oleh-Oleh Kalimantan",
        role: "Agen Grosir Kalimantan",
        rating: "5",
        content: "Kualitas rasa tidak pernah mengecewakan. Bagi pelanggan kami yang merindukan cita rasa asli Jawa, Victory Snack selalu menjadi pilihan utama yang paling pas.",
    }
];
// Varian animasi standar untuk scroll-reveal
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};