import { createContext, useContext, useState } from "react";

interface SessionContextType {
    isLoggedIn: boolean;
    user: User;
    login: (user: User) => void;
    logout: (data: { message: string }) => void;
}

const SessionContext = createContext<SessionContextType>({
    isLoggedIn: false,
    user: {},
    login: () => {},
    logout: () => {},
});

export const useSession = () => useContext(SessionContext);
export interface User {
    // Add properties as needed, for example:
    id?: string;
    name?: string;
    email?: string;
    isMfaActive?: boolean;
}

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const login = (user: User) => {
        setIsLoggedIn(true);
        setUser(user);
    }

    const logout = (data:{ message: string }) => {
        if(data){
            setIsLoggedIn(false);
            setUser({});
        }
    }

    return (
        <SessionContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </SessionContext.Provider>
    )
}
