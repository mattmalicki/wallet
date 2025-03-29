import { Schema, Types, model } from "mongoose";
import { TransactionType } from "./transaction";

interface IChildCategory {
  id: Types.ObjectId;
  title: string;
}

interface IParentCategory {
  title: string;
  type: TransactionType;
  childCategories: IChildCategory[];
}

const categorySchema = new Schema<IParentCategory>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  childCategories: [
    {
      id: Types.ObjectId,
      title: String,
    },
  ],
});

const Token = model("token", categorySchema);

export { Token, IParentCategory };
