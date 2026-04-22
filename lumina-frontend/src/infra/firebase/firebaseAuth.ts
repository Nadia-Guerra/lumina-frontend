import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential,
} from 'firebase/auth';
import { app } from './firebaseConfig';

const auth = getAuth(app);


export async function signInWithFirebase(
  email: string,
  password: string,
): Promise<string> {
  const credential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const idToken = await credential.user.getIdToken();
  return idToken;
}

export async function signOutFirebase(): Promise<void> {
  await signOut(auth);
}
