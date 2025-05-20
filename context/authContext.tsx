import React, { createContext, useContext } from "react";


const AuthContext = createContext(null)


function AuthProvider({children}: {children: React.ReactNode}){

    return(
        <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthContext ,AuthProvider, useAuth }