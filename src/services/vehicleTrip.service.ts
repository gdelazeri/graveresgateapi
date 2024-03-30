import DataSource from '../dataSource';
import { VehicleTrip } from '../models/vehicleTrip.model';

const repository = DataSource.getRepository(VehicleTrip);

export async function createVehicleTrip(input: any) {
  try {
    return repository.save(repository.create(input)) as unknown as Promise<VehicleTrip>;
  } catch (error) {
    throw error;
  }
}

export async function updateVehicleTrip(id: string, input: any) {
  try {
    return repository.update(id, input);
  } catch (error) {
    throw error;
  }
}

export async function findById(id: string) {
  try {
    return repository.findOne({ where: { id } });
  } catch (error) {
    throw error;
  }
}

export async function findByVehicle(vehicleId: string) {
  try {
    return repository.find({ where: { vehicleId }, order: { createdAt: 'DESC' } });
  } catch (error) {
    throw error;
  }
}
