import DataSource from '../dataSource';
import { DutyRequest } from '../models/dutyRequest.model';
import DutyShift from '../enum/duty/DutyShift';
import { IsNull } from 'typeorm';

const dutyRequestRepository = DataSource.getRepository(DutyRequest);

export async function create(input: any) {
  try {
    return dutyRequestRepository.save(dutyRequestRepository.create(input)) as unknown as Promise<DutyRequest>;
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, input: DutyRequest) {
  try {
    return dutyRequestRepository.update(id, input);
  } catch (error) {
    throw error;
  }
}

export async function findById(id: string) {
  try {
    return dutyRequestRepository.findOneBy({ id });
  } catch (error) {
    throw error;
  }
}

export async function findAll() {
  try {
    return dutyRequestRepository.find();
  } catch (error) {
    throw error;
  }
}

export async function findByDateAndShift(date: string, shift: DutyShift) {
  try {
    return dutyRequestRepository.find({ where: { date, shift, deletedAt: IsNull() }});
  } catch (error) {
    throw error;
  }
}

export async function findByUser(userId: string) {
  try {
    return dutyRequestRepository.find({ where: { userId, deletedAt: IsNull() }});
  } catch (error) {
    throw error;
  }
}

export async function softDelete(id: string, deletedBy: string) {
  try {
    return dutyRequestRepository.update(id, {
      deletedAt: new Date(),
      deletedBy,
    });
  } catch (error) {
    throw error;
  }
}
