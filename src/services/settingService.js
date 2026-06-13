import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; // Pastikan path file firebase.js kamu benar

// Fungsi untuk MENGAMBIL data gambar hero dari Firebase
export const getHeroImages = async () => {
  try {
    const docRef = doc(db, 'settings', 'hero');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Dokumen hero tidak ditemukan!");
      return null;
    }
  } catch (error) {
    console.error("Error mengambil gambar hero:", error);
    throw error;
  }
};

// Fungsi untuk MENGUBAH data gambar hero (Nanti dipakai oleh Admin)
export const updateHeroImages = async (newImages) => {
  try {
    const docRef = doc(db, 'settings', 'hero');
    await updateDoc(docRef, newImages);
    return true;
  } catch (error) {
    console.error("Error update gambar hero:", error);
    throw error;
  }
};