import { Error } from 'mongoose';
import { In } from 'typeorm';
import bcrypt from 'bcrypt';
import Status from '../enum/user/UserStatus';
import { LoginPayload } from '../interfaces/User';
import { User } from '../models/user.model';
import DataSource from '../models';
import { createAccessToken, createRefreshToken } from '../utils/JsonWebToken';

const userRepository = DataSource.getRepository(User)

export async function createUser(input: any) {
  try {
    return userRepository.save(userRepository.create(input));
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id: string, input: User) {
  try {
    return userRepository.update(id, input);
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  try {
    return userRepository.findOne({ where: { email } });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUserById(id: string) {
  try {
    return userRepository.findOne({ where: { id }, select: { password: false } });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUsers() {
  try {
    return userRepository.find({
      where: { status: In([Status.ACTIVE, Status.PENDING]) },
      select: ['id', 'name', 'imageUrl'],
      order: { name: 'ASC' }
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function checkValidUser(id: string) {
  try {
    return userRepository.findOne({ where: { id, status: In([Status.ACTIVE, Status.PENDING]) } });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function checkLogin(payload: LoginPayload) {
  try {
    const user = await userRepository.findOne({ where: { email: payload.email, status: In([Status.ACTIVE, Status.PENDING]) } });

    if (user && bcrypt.compareSync(payload.password, user.password)) {
      return user;
    }

    return null;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function softDeleteUser(id: string, deletedBy: string) {
  try {
    return userRepository.update(id, { status: Status.DELETED, deletedAt: new Date(), deletedBy });
  } catch (error) {
    throw error;
  }
}

export function generateTokens(user: any) {
  try {
    return {
      accessToken: createAccessToken({ userId: user.id, permission: user.permission }),
      refreshToken: createRefreshToken({ userId: user.id }),
    }
  } catch (error) {
    throw error;
  }
}
