import DataSource from '../dataSource';
import { DriverChecklist } from '../models/driverChecklist.model';

const repository = DataSource.getRepository(DriverChecklist);

export async function findByDutyId(dutyId: string) {
  try {
    return repository.find({ where: { dutyId } });
  } catch (error) {
    throw error;
  }
}

export async function findDriverChecklistPaged(page: number, pageSize: number) {
  try {
    return repository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: 'DESC' },
      relations: { duty: true, vehicle: true },
    });
  } catch (error) {
    throw error;
  }
}

export async function findDriverChecklistById(id: string) {
  try {
    return repository.findOne({
      where: { id },
      relations: { createdByUser: true, duty: true, vehicle: true },
    });
  } catch (error) {
    throw error;
  }
}
