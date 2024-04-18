import { IsNull } from 'typeorm';
import DataSource from '../dataSource';
import { Vehicle } from '../models/vehicle.model';

const vehicleRepository = DataSource.getRepository(Vehicle);

export async function createVehicle(input: any) {
  try {
    return vehicleRepository.save(
      vehicleRepository.create(input),
    ) as unknown as Promise<Vehicle>;
  } catch (error) {
    throw error;
  }
}

export async function updateVehicle(id: string, input: any) {
  try {
    return vehicleRepository.update(id, input);
  } catch (error) {
    throw error;
  }
}

export async function findById(id: string) {
  try {
    return vehicleRepository.findOne({ where: { id, deletedAt: IsNull() } });
  } catch (error) {
    throw error;
  }
}

export async function findAll() {
  try {
    return vehicleRepository.find({
      where: { deletedAt: IsNull() },
      order: { isAvailable: 'DESC', name: 'ASC' },
    });
  } catch (error) {
    throw error;
  }
}

export async function findAvailable() {
  try {
    return vehicleRepository.find({
      where: { isAvailable: true, deletedAt: IsNull() },
      order: { name: 'ASC' },
    });
  } catch (error) {
    throw error;
  }
}

export async function softDelete(id: string) {
  try {
    return vehicleRepository.update(id, { deletedAt: new Date() });
  } catch (error) {
    throw error;
  }
}
