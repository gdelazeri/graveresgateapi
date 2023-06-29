import { Error } from 'mongoose';
import Status from '../enum/user/UserStatus';
import { LoginPayload, PostUserPayload, PutOwnUserPayload, PutUserPayload } from '../interfaces/User';
import User, { UserDocument } from '../models/user.model';

export async function createUser(input: PostUserPayload) {
  try {
    return await User.create(input);
  } catch (error) {
    throw error;
  }
}

export async function updateUser(_id: string, input: PutUserPayload | PutOwnUserPayload) {
  try {
    return await User.findByIdAndUpdate(_id, input as UserDocument);
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

export async function findUserById(_id: string) {
  try {
    return await User.findById(_id);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function checkLogin(payload: LoginPayload) {
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

export async function softDeleteUser(_id: string) {
  try {
    return await User.findByIdAndUpdate(_id, { $set: { status: Status.DELETED, deletedAt: Date.now() } });
  } catch (error) {
    throw error;
  }
}
