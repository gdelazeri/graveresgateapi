import { DocumentDefinition, Error } from 'mongoose';
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
