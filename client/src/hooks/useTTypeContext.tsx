import { createContext, useContext } from "react";

type TTypeContentType = {
  type: "income" | "expense";
  setType: (c: "income" | "expense") => void;
};
const TypeContext = createContext<TTypeContentType>({
  type: "income",
  setType: () => {},
});
const useTypeContext = () => useContext(TypeContext);

export { TypeContext, useTypeContext };

export type { TTypeContentType };
