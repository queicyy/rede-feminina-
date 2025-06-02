import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';


export async function fBuscaInfoPages(idTela: string): Promise<any> {
  try {
    const docRef = doc(firestore, 'info_pages', idTela);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      throw new Error('Documento não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    throw error;
  }
}

