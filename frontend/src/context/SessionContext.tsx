
import { createContext, useContext, useEffect, useState } from "react";

interface SessionContextType {
    isLoggedIn: boolean;
    loading: boolean;
    user: User;
    login: (user: User) => void;
    logout: (data: { message: string }) => void;
}

const SessionContext = createContext<SessionContextType>({
    isLoggedIn: false,
    loading: false,
    user: {},
    login: () => {},
    logout: () => {},
});

export const useSession = () => useContext(SessionContext);
export interface User {
    // Add properties as needed, for example:
    id?: string;
    username?: string;
    email?: string;
    isMfaActive?: boolean;
}

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    // cookie 
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
    
        if(storedUser){
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
        setLoading(false);
    },[])

    const login = (user: User) => {
        setIsLoggedIn(true);
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    const logout = (data:{ message: string }) => {
        if(data){
            setIsLoggedIn(false);
            setUser({});
            sessionStorage.removeItem("user");
        }
    }

    return (
        <SessionContext.Provider value={{ isLoggedIn,loading, user, login, logout }}>
            {children}
        </SessionContext.Provider>
    )
}