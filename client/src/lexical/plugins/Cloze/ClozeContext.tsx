import { ReactNode, createContext, useContext, useState } from 'react';

const ClozeContext = createContext(null);
 
export function ClozeProvider({ children }: { children: ReactNode }) {
    const [clozeCount, setClozeCount] = useState<number>(0);

    return (
        // @ts-ignore
        <ClozeContext.Provider value={{ clozeCount, setClozeCount }}>
            {children}
        </ClozeContext.Provider>
    );
}

export function useCloze() {
    return useContext(ClozeContext);
}
