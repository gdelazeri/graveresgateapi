import { IsNull, MoreThanOrEqual } from 'typeorm';
import DataSource from '../dataSource';
import { DutyRequest } from '../models/dutyRequest.model';
import DutyShift from '../enum/duty/DutyShift';

const dutyRequestRepository = DataSource.getRepository(DutyRequest);

export async function create(input: any) {
  try {
    return dutyRequestRepository.save(dutyRequestRepository.create(input)) as unknown as Promise<DutyRequest>;
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, input: any) {
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
    const date = new Date();
    date.setDate(date.getDate() - 2);
    const startDate = date.toISOString().substring(0, 10)

    return dutyRequestRepository.find({
      where: { userId, deletedAt: IsNull(), date: MoreThanOrEqual(startDate) },
      order: { date: 'ASC', shift: 'ASC' },
    })
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
