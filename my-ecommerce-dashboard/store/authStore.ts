import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, 
  login: (user, pass) => {
    if (user === "admin" && pass === "123456") {
      set({ isLoggedIn: true }); 
      return true;
    }
    return false;
  },
  logout: () => set({ isLoggedIn: false }),
}));