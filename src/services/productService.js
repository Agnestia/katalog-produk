import { db } from './firebase';
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// 1. Tambah Produk Baru 
export const addProduct = async (productData) => {
  try {
    // Simpan langsung data (termasuk link gambar) ke Firestore Database
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: new Date()
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// 2. Ambil Semua Produk
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting products: ", error);
    throw error;
  }
};

// 3. Hapus Produk
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

// 4. Ambil spesifik 1 produk berdasarkan ID (untuk form edit)
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Produk tidak ditemukan!");
    }
  } catch (error) {
    console.error("Error getting product by id: ", error);
    throw error;
  }
};

// 5. Perbarui Produk
export const updateProduct = async (id, productData) => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};