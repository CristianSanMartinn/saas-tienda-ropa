// apps/web/src/auth/AuthContext.tsx

import { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../services/auth.service';


interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user:   User | null
    isLogged: boolean
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
}

// Create the AuthContext with a default value of null osea 
// que no hay usuario autenticado inicialmente. El tipo de contexto es AuthContextType 
// o null.
const AuthContext = createContext< AuthContextType | null >(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    
    // El estado del usuario se inicializa con una función que intenta cargar el usuario desde el localStorage.
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('web_user');
        return stored ? JSON.parse(stored) : null;
    })

    // El estado isLogged se inicializa como true si hay un usuario en el localStorage, o false si no lo hay.
    const login = useCallback( async (email: string, password: string) => {
        const data = await authService.login(email, password);
        setUser(data.user);
        localStorage.setItem('web_user', JSON.stringify(data.user));
    }, []) // El método login llama al servicio de autenticación para iniciar sesión, actualiza el estado del usuario y guarda el usuario en el localStorage.

    // El método register hace lo mismo pero para el registro de nuevos usuarios.
    const register = useCallback( async (name: string, email: string, password: string) => {
        const data = await authService.register(name, email, password);
        setUser(data.user);
        localStorage.setItem('web_user', JSON.stringify(data.user));
    }, []); // El método logout borra el usuario del estado y del localStorage.

    // El valor del contexto se memoiza para evitar renders innecesarios.
    const logout = useCallback(() => {
        // El método logout llama al servicio de autenticación para cerrar sesión, 
        // elimina el usuario del localStorage y actualiza el estado del usuario a null.
        authService.logout();
        localStorage.removeItem('web_user');
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isLogged: !!user,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return ctx; 
}

