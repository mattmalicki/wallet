import { createContext, useContext } from "react";

type ActionT = "add" | "edit";

type ActionTypeContent = {
  actionType: ActionT;
  setActionType: (a: ActionT) => void;
};

const ActionContent = createContext<ActionTypeContent>({
  actionType: "add",
  setActionType: () => {},
});

const useActionContext = () => useContext(ActionContent);

export { ActionContent, useActionContext };

export type { ActionT };
