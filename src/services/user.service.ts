import { In, IsNull, Not } from 'typeorm';
import bcrypt from 'bcrypt';
import Status from '../enum/user/UserStatus';
import { LoginPayload } from '../interfaces/User';
import { User } from '../models/user.model';
import DataSource from '../dataSource';
import { createAccessToken, createRefreshToken } from '../utils/JsonWebToken';

const userRepository = DataSource.getRepository(User);

export async function createUser(input: any) {
  try {
    const user = await userRepository.save(userRepository.create(input));
    return user[0];
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
    return userRepository.findOne({ where: { email, deletedAt: IsNull() } });
  } catch (error) {
    throw error;
  }
}

export async function findUserById(id: string) {
  try {
    return userRepository.findOne({
      where: { id, deletedAt: IsNull() },
      select: { password: false },
      relations: { course: true },
    });
  } catch (error) {
    throw error;
  }
}

export async function findUsers(statusList: Status[], filters: any = {}) {
  try {
    const where = {
      status: In(statusList),
      deletedAt: IsNull(),
      ...filters,
    };

    return userRepository.find({
      where,
      select: [
        'id',
        'name',
        'imageUrl',
        'isLeader',
        'isDriver',
        'status',
        'permission',
      ],
      order: { name: 'ASC' },
      relations: { course: true },
    });
  } catch (error) {
    throw error;
  }
}

export async function checkValidUser(id: string) {
  try {
    return userRepository.findOne({
      where: {
        id,
        status: In([Status.ACTIVE, Status.PENDING]),
        deletedAt: IsNull(),
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function checkUserActive(id: string) {
  try {
    return userRepository.findOne({
      where: { id, status: Status.ACTIVE, deletedAt: IsNull() },
    });
  } catch (error) {
    throw error;
  }
}

export async function checkLogin(payload: LoginPayload) {
  try {
    const user = await userRepository.findOne({
      where: {
        email: payload.email,
        status: In([Status.ACTIVE, Status.PENDING]),
        deletedAt: IsNull(),
      },
    });

    if (user && bcrypt.compareSync(payload.password, user.password)) {
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
}

export async function softDeleteUser(id: string, deletedBy: string) {
  try {
    return userRepository.update(id, {
      status: Status.DELETED,
      deletedAt: new Date(),
      deletedBy,
    });
  } catch (error) {
    throw error;
  }
}

export async function findLatestRegistrationId() {
  try {
    return userRepository.findOne({
      where: { registrationId: Not(IsNull()), deletedAt: IsNull() },
      select: { registrationId: true },
      order: { registrationId: 'DESC' },
    });
  } catch (error) {
    throw error;
  }
}

export function generateTokens(user: any) {
  try {
    return {
      accessToken: createAccessToken({
        userId: user.id,
        permission: user.permission,
      }),
      refreshToken: createRefreshToken({ userId: user.id }),
    };
  } catch (error) {
    throw error;
  }
}
