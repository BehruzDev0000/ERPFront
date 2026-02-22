import { createContext, useState, type FC, type ReactNode } from "react";


interface ContextType{
collapsed: boolean;
setCollapsed: (collapsed: boolean) => void;
}
export const Context=createContext<ContextType>({} as ContextType);
export const GlobalContext:FC<{children:ReactNode}>=({children})=>{

const [collapsed, setCollapsed] = useState(false)

  return(
    <Context.Provider value={{collapsed, setCollapsed}}>
      {children}
    </Context.Provider>
  )
}

