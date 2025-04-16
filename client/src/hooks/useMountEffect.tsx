import { useEffect } from "react";

const useMountEffect = (fun: Function) => {
  useEffect(fun(), []);
};

export { useMountEffect };
