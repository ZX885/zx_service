import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access");
        setIsAuth(!!token);
    }, [])

    const login = (access, refresh) => {
        localStorage.setItem("access");
        localStorage.setItem("refresh");
        setIsAuth(true);
    };
    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuth(false);
    };

    return (
        <div>
            <AuthContext.Provider value={{isAuth, login, logout}}>
                {children}
            </AuthContext.Provider>
        </div>
    );

}

export function  useAuth(){
    return useContext(AuthContext);
}