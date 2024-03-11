import { LessThan, MoreThanOrEqual } from 'typeorm';
import DataSource from '../dataSource';
import { ListDutyType } from '../interfaces/Duty';
import { Duty } from '../models/duty.model';

const dutyRepository = DataSource.getRepository(Duty);

export async function create(input: any) {
  try {
    return dutyRepository.save(dutyRepository.create(input)) as unknown as Promise<Duty>;
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, input: any) {
  try {
    return dutyRepository.update(id, input);
  } catch (error) {
    throw error;
  }
}

export async function findById(id: string) {
  try {
    return dutyRepository.findOne({ where: { id } });
  } catch (error) {
    throw error;
  }
}

export async function findPaginated({
  page,
  pageSize,
  type,
}: {
  page: number
  pageSize: number
  type: ListDutyType
}) {
  try {
    let conditions = {};
    let order = {};

    if (type === ListDutyType.FUTURE) {
      const startDate = new Date().toISOString().substring(0, 10)
      conditions = {
        date: MoreThanOrEqual(startDate),
      };
      order = {
        date: 'ASC',
        shift: 'ASC'
      }
    } else {
      const endDate = new Date().toISOString().substring(0, 10)
      conditions = {
        date: LessThan(endDate),
      };
      order = {
        date: 'DESC',
        shift: 'DESC'
      }
    }

    return dutyRepository.find({ where: conditions, take: pageSize, skip: (page - 1) * pageSize, order });
  } catch (error) {
    throw error;
  }
}
