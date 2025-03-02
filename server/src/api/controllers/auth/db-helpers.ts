import { User, IUser } from "../../../models/user";

async function registerUser(user: IUser) {
  const { email, password, firstName, lastName } = user;
  if (await User.findOne({ email })) {
    throw Error("Unable to create user, try different email.");
  }
  const createdUser = new User({ email, firstName, lastName });
  createdUser.setPassword(password);
  await createdUser.save();
  return createdUser;
}

async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user || !user.validatePassword(password)) {
    throw Error("Invalid email or password");
  }
  if (!user.verified) {
    throw Error("User not verified.");
  }
  return user;
}

async function logoutUser(id: string) {
  const user = await User.findById(id);
  if (!user || !user.getToken()) {
    throw Error("Unauthorized.");
  }
  user.clearToken();
}

async function getUser(id: string) {
  const user = await User.findById(id);
  if (!user) {
    throw Error("Unauthorized.");
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
    throw Error("Unauthorized");
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
}

export { registerUser, loginUser, logoutUser, getUser, updateUser };
