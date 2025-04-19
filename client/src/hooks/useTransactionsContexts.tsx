import { createContext, useContext } from "react";

type ContentType<T> = {
  value: T;
  setValue: (v: T) => void;
};

const TypeContext = createContext<ContentType<"income" | "expense">>({
  value: "income",
  setValue: () => {},
});
const useTypeContext = () => useContext(TypeContext);

export { TypeContext, useTypeContext };

const CommentContext = createContext<ContentType<string>>({
  value: "",
  setValue: () => {},
});
const useCommentContext = () => useContext(CommentContext);

export { CommentContext, useCommentContext };

const ParentCattegoryContext = createContext<ContentType<string>>({
  value: "",
  setValue: () => {},
});
const useParentCattegoryContext = () => useContext(ParentCattegoryContext);

export { ParentCattegoryContext, useParentCattegoryContext };

const ChildCattegoryContext = createContext<ContentType<string>>({
  value: "",
  setValue: () => {},
});
const useChildCattegoryContext = () => useContext(ChildCattegoryContext);

export { ChildCattegoryContext, useChildCattegoryContext };

const AmountContext = createContext<ContentType<number>>({
  value: 0,
  setValue: () => {},
});
const useAmountContext = () => useContext(AmountContext);

export { AmountContext, useAmountContext };

const DateContext = createContext<ContentType<Date>>({
  value: new Date(),
  setValue: () => {},
});
const useDateContext = () => useContext(DateContext);

export { DateContext, useDateContext };

export type { ContentType };
