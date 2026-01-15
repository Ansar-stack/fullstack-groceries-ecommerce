import { createContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
// Create Context
export const AppContext = createContext();
// Function to Provide Context
export const AppContextProvider = ({children})=>{
    const navigate = useNavigate();
    const [user, setUser] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    const value = {navigate, user, setUser, isSeller, setIsSeller};
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}