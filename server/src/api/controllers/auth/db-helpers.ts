import { BadRequestError } from "../../../config/classes";
import { User, IUser } from "../../../models/user";

async function updateBalance(id: string) {
  const user = await getUser(id);
  const transactions = await user.populate("transaction", "amount");
  console.log(transactions);
}

async function registerUser(user: IUser) {
  const { email, password, firstName, lastName } = user;
  if (await User.findOne({ email })) {
    throw new BadRequestError({
      message: "Unable to create user, try different email.",
    });
  }
  const createdUser = new User({ email, firstName, lastName });
  createdUser.setPassword(password);
  await createdUser.save();
  return createdUser;
}

async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email }).select(["+password", "+verified"]);
  if (!user || !user.validatePassword(password)) {
    throw new BadRequestError({ message: "Invalid email or password" });
  }
  if (!user.verified) {
    throw new BadRequestError({ message: "User not verified." });
  }
  return user;
}

async function getUser(id: string) {
  const user = await User.findById(id);
  if (!user) {
    throw new BadRequestError({ message: "Unauthorized." });
  }
  return user;
}

async function updateUser(
  id: string,
  email?: string,
  password?: string,
  firstName?: string,
  lastName?: string
) {
  const user = await User.findById(id);
  if (!user) {
    throw new BadRequestError({ message: "Unauthorized" });
  }
  if (email) {
    user.email = email;
  }
  if (password) {
    user.setPassword(password);
  }
  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
  user.save();
  return user;
}

async function deleteUser(id: string) {
  await User.findByIdAndDelete(id);
}

export { registerUser, loginUser, getUser, updateUser, deleteUser };
