'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import type { User } from '@/domain/entities/User';
import { signInWithFirebase, signOutFirebase } from '@/infra/firebase/firebaseAuth';
import { register as apiRegister, loginWithToken } from '@/infra/repositories/AuthRepository';
import { LuminaApiError } from '@/infra/api/luminaApiClient';

const STORAGE_USER  = 'lumina_user';
const STORAGE_TOKEN = 'lumina_token';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]   = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const storedUser  = localStorage.getItem(STORAGE_USER);
      const storedToken = localStorage.getItem(STORAGE_TOKEN);
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch {
      // localStorage inaccesible (SSR, private mode, etc.) — no bloqueamos
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistSession = useCallback((u: User, t: string) => {
    setUser(u);
    setToken(t);
    try {
      localStorage.setItem(STORAGE_USER,  JSON.stringify(u));
      localStorage.setItem(STORAGE_TOKEN, t);
    } catch { /* noop */ }
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem(STORAGE_USER);
      localStorage.removeItem(STORAGE_TOKEN);
    } catch { /* noop */ }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const idToken    = await signInWithFirebase(email, password);
    const backendUser = await loginWithToken(idToken);
    persistSession(backendUser, idToken);
  }, [persistSession]);

  const register = useCallback(
    async (email: string, password: string, username: string) => {
      await apiRegister({ email, password, username });
      await login(email, password);
    },
    [login],
  );

  const logout = useCallback(async () => {
    try {
      await signOutFirebase();
    } catch { /* noop — siempre limpiamos local aunque Firebase falle */ }
    clearSession();
  }, [clearSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}

export function parseAuthError(error: unknown): string {
  if (error instanceof LuminaApiError) {
    if (error.status === 409) return 'Este email ya está registrado.';
    if (error.status === 401) return 'Credenciales incorrectas.';
    if (error.status === 400) return 'Datos inválidos. Revisa el formulario.';
    return error.message;
  }

  const msg = (error as { code?: string; message?: string })?.code ?? '';
  if (msg.includes('user-not-found') || msg.includes('wrong-password') || msg.includes('invalid-credential')) {
    return 'Email o contraseña incorrectos.';
  }
  if (msg.includes('email-already-in-use')) {
    return 'Este email ya está registrado.';
  }
  if (msg.includes('weak-password')) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  if (msg.includes('network-request-failed')) {
    return 'Sin conexión. Verifica tu internet.';
  }

  return 'Ocurrió un error inesperado. Intenta de nuevo.';
}
