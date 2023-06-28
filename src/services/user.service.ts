import { DocumentDefinition, Error } from 'mongoose';
import Status from '../enum/user/UserStatus';
import LoginRequest from '../interfaces/LoginRequest';
import User, { UserDocument } from '../models/user.model';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  try {
    return await User.findOne({ email });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function checkLogin(payload: LoginRequest) {
  try {
    const user = await User.findOne({ email: payload.email, status: { $in: [Status.ACTIVE, Status.PENDING] } });
    
    if (user && user.comparePassword(payload.password)) {
      return user;
    }

    return null;

  } catch (error: any) {
    throw new Error(error);
  }
}
