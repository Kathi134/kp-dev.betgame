import { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
    const [header, setHeader] = useState({
        title: "",
        values: [],
        activeValue: null,
        onValueChange: () => { },
        displayValue: (v) => v
    });

    return (
        <HeaderContext.Provider value={{ ...header, setHeader }}>
            {children}
        </HeaderContext.Provider>
    );
}

export function useHeader() {
    return useContext(HeaderContext);
}