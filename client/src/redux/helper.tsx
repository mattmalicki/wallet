import { PayloadAction } from "@reduxjs/toolkit";

const isPendingAction = (startWith: string, action: PayloadAction) => {
  return action.type.startsWith(startWith) && action.type.endsWith("/pending");
};

const isRejectAction = (startWith: string, action: PayloadAction) => {
  return action.type.startsWith(startWith) && action.type.endsWith("/rejected");
};

const isFulfilledAction = (startWith: string, action: PayloadAction) => {
  return (
    action.type.startsWith(startWith) && action.type.endsWith("/fulfilled")
  );
};

export { isPendingAction, isRejectAction, isFulfilledAction };
