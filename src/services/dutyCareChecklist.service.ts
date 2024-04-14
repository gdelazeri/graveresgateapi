import DataSource from '../dataSource';
import { DutyCareChecklist } from '../models/dutyCareChecklist.model';

const dutyCareChecklistRepository = DataSource.getRepository(DutyCareChecklist);

export async function findByDutyId(dutyId: string) {
  try {
    return dutyCareChecklistRepository.find({ where: { dutyId } });
  } catch (error) {
    throw error;
  }
}

export async function findDutyCareCheclistPaged(page: number, pageSize: number) {
  try {
    return dutyCareChecklistRepository.find({ skip: (page - 1) * pageSize, take: pageSize });
  } catch (error) {
    throw error;
  }
}

export async function findDutyCareChecklistId(id: string) {
  try {
    return dutyCareChecklistRepository.findOne({ where: { id } });
  } catch (error) {
    throw error;
  }
}
