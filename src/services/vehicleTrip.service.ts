import DataSource from '../dataSource';
import { VehicleTrip } from '../models/vehicleTrip.model';

const repository = DataSource.getRepository(VehicleTrip);

export async function createVehicleTrip(input: any) {
  try {
    return repository.save(
      repository.create(input),
    ) as unknown as Promise<VehicleTrip>;
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
    return repository.findOne({
      where: { id },
      relations: { createdByUser: true, driver: true, vehicle: true },
      select: {
        createdByUser: {
          name: true,
        },
        driver: {
          name: true,
        },
        vehicle: {
          name: true,
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function findPaged(
  page: number,
  pageSize: number,
  vehicleId?: string,
) {
  try {
    let where = {};
    if (vehicleId) {
      where = { vehicleId };
    }

    return repository.find({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: { driver: true, vehicle: true },
      select: {
        driver: {
          name: true,
        },
        vehicle: {
          name: true,
        },
      },
    });
  } catch (error) {
    throw error;
  }
}
