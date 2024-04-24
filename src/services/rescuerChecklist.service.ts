import DataSource from '../dataSource';
import { RescuerChecklist } from '../models/rescuerChecklist.model';

const repository = DataSource.getRepository(RescuerChecklist);

export async function findByDutyId(dutyId: string) {
  try {
    return repository.find({ where: { dutyId } });
  } catch (error) {
    throw error;
  }
}

export async function findRescuerChecklistPaged(page: number, pageSize: number) {
  try {
    return repository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: 'DESC' },
      relations: { duty: true, vehicle: true, createdByUser: true  },
    });
  } catch (error) {
    throw error;
  }
}

export async function findRescuerChecklistById(id: string) {
  try {
    return repository.findOne({
      where: { id },
      relations: { createdByUser: true, duty: true, vehicle: true },
    });
  } catch (error) {
    throw error;
  }
}
