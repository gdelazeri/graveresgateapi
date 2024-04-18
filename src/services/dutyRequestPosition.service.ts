import DataSource from '../dataSource';
import { DutyRequestPosition } from '../models/dutyRequestPosition.model';

const dutyRequestPositionRepository =
  DataSource.getRepository(DutyRequestPosition);

export async function createDutyRequestPosition(input: any) {
  try {
    return dutyRequestPositionRepository.save(
      dutyRequestPositionRepository.create(input),
    );
  } catch (error) {
    throw error;
  }
}

export async function findByDutyRequestId(dutyRequestId: string) {
  try {
    return dutyRequestPositionRepository.findBy({ dutyRequestId });
  } catch (error) {
    throw error;
  }
}
