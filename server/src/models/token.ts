import { Schema, Types, model } from "mongoose";

interface IToken {
  userId: Types.ObjectId;
  refreshToken: string;
  expiresIn: Date;
  createdAt: Date;
  status: boolean;
}

const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Token = model("token", tokenSchema);

export { Token, IToken };
