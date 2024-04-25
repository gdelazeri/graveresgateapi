import DataSource from '../dataSource';
import { RadioOperatorChecklist } from '../models/radioOperatorChecklist.model';

const repository = DataSource.getRepository(RadioOperatorChecklist);

export async function findByDutyId(dutyId: string) {
  try {
    return repository.find({ where: { dutyId } });
  } catch (error) {
    throw error;
  }
}

export async function findRadioOperatorChecklistPaged(page: number, pageSize: number) {
  try {
    return repository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: 'DESC' },
      relations: { duty: true, createdByUser: true  },
    });
  } catch (error) {
    throw error;
  }
}

export async function findRadioOperatorChecklistById(id: string) {
  try {
    return repository.findOne({
      where: { id },
      relations: { createdByUser: true, duty: true },
    });
  } catch (error) {
    throw error;
  }
}
