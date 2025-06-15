import { createContext, useContext } from "react";

export const PageContext = createContext({ isMain: true });
export const usePageContext = () => useContext(PageContext);
