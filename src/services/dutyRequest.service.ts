import { IsNull } from 'typeorm';
import DataSource from '../dataSource';
import { DutyRequest } from '../models/dutyRequest.model';
import DutyShift from '../enum/duty/DutyShift';

const dutyRequestRepository = DataSource.getRepository(DutyRequest);

export async function createDutyRequest(input: any) {
  try {
    return dutyRequestRepository.save(
      dutyRequestRepository.create(input),
    ) as unknown as Promise<DutyRequest>;
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
    const dutyList = await dutyRequestRepository.query(`
      SELECT
        id,
        date,
        shift,
        "userId",
        "startAt",
        "endAt",
        note,
        CASE WHEN EXISTS (
          SELECT 1
          FROM duty d
          WHERE dr."date" = d."date" 
            AND d.shift = dr.shift
            AND (dr."userId" = d."leaderId"
              OR dr."userId" = d."driverId"
              OR dr."userId" = d."firstRescuerId"
              OR dr."userId" = d."secondRescuerId"
              OR dr."userId" = d."radioOperatorId"
              OR dr."userId" = d."assistantRadioOperatorId"
              OR dr."userId" = d."traineeId"
            )
          ) THEN 'APPROVED' ELSE 'PENDING' END AS status
      FROM "dutyRequest" dr
      WHERE dr.id = '${id}'
    `);

    if (dutyList.length === 1) return dutyList[0];
    return null;
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
    return dutyRequestRepository.find({
      where: { date, shift, deletedAt: IsNull() },
      order: { createdAt: 'ASC' },
    });
  } catch (error) {
    throw error;
  }
}

export async function findExistent(
  date: string,
  shift: DutyShift,
  userId: string,
) {
  try {
    return dutyRequestRepository.findOne({
      where: { date, shift, userId, deletedAt: IsNull() },
    });
  } catch (error) {
    throw error;
  }
}

export async function findByUser(userId: string) {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const startDate = date.toISOString().substring(0, 10);

    return dutyRequestRepository.query(
      `
      SELECT
        id,
        date,
        shift,
        "userId",
        "startAt",
        "endAt",
        note,
        "createdAt",
        CASE WHEN EXISTS (
          SELECT 1
          FROM duty d
          WHERE dr."date" = d."date" 
            AND d.shift = dr.shift
            AND (dr."userId" = d."leaderId"
              OR dr."userId" = d."driverId"
              OR dr."userId" = d."firstRescuerId"
              OR dr."userId" = d."secondRescuerId"
              OR dr."userId" = d."radioOperatorId"
              OR dr."userId" = d."assistantRadioOperatorId"
              OR dr."userId" = d."traineeId"
            )
          ) THEN 'APPROVED' ELSE 'PENDING' END AS status
      FROM "dutyRequest" dr
      WHERE dr."userId" = '${userId}'
        AND dr."deletedAt" IS NULL
        AND dr."date" >= '${startDate}'
      ORDER BY dr."date" ASC
    `,
      [],
    );
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
