import { doc, getDoc } from 'firebase/firestore';
import { firestoreInfoPages } from '../firebase/firebaseInforPages';

/**
 * Busca um documento específico na coleção "info_pages" e retorna os dados.
 * @param idTela A tela que você está buscando os dados.
 * @returns Os dados do documento se encontrado, caso contrário uma mensagem de erro.
 */
export async function fBuscaInfoPages(idTela: string): Promise<any> {
  try {
    const docRef = doc(firestoreInfoPages, 'info_pages', idTela);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      throw new Error(`Documento com ID ${idTela} não encontrado na coleção "info_pages".`);
    }
  } catch (error: any) {
    console.error('Erro na busca do documento:', error);
    throw new Error('Erro ao buscar o documento: ' + error.message);
  }
}
