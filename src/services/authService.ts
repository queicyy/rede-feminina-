import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

// Registra usuário
export async function registerUser(userEmail: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, userEmail, password);
    return res;
  } catch (error: any) {
    return { error };
  }
}

// Login de usuário
export async function loginUser(userEmail: string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, userEmail, password);
    return res;
  } catch (error: any) {
    return { error };
  }
}

// Login de usuário com Google
export async function loginUserWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    return res;
  } catch (error: any) {
    console.error('Erro no login com Google:', error);
    return { error };
  }
}
