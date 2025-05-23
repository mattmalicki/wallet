import { Schema, Types, model } from "mongoose";

interface IToken {
  userId: Types.ObjectId;
  refreshToken: string;
  expiresIn: number;
  createdAt: number;
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
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Token = model<IToken>("token", tokenSchema);

export { Token, IToken };
