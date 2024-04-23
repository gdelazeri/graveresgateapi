import moment from 'moment';
import DataSource from '../dataSource';
import { ListDutyMonth } from '../interfaces/Duty';
import { Duty } from '../models/duty.model';
import DutyShift from '../enum/duty/DutyShift';

const dutyRepository = DataSource.getRepository(Duty);

export async function createDuty(input: any) {
  try {
    return dutyRepository.save(
      dutyRepository.create(input),
    ) as unknown as Promise<Duty>;
  } catch (error) {
    throw error;
  }
}

export async function updateDuty(id: string, input: any) {
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

export async function getDutyByDateAndShift(date: string, shift: DutyShift) {
  try {
    return dutyRepository.findOne({ where: { date, shift } });
  } catch (error) {
    throw error;
  }
}

export async function getDutyByDateAndShiftWithUserNames(
  date: string,
  shift: DutyShift,
) {
  try {
    const duty = await dutyRepository.query(`
      SELECT
        d.id,
        TO_CHAR("date" , 'YYYY-MM-DD') as "date",
        d.shift,
        d."isAvailable",
        d.note,
        d."leaderId",
        u.name as "leaderName",
        u."imageUrl" as "leaderImageUrl",
        d."driverId",
        u2."name" as "driverName",
        u2."imageUrl" as "driverImageUrl",
        d."firstRescuerId",
        u3."name" as "firstRescuerName",
        u3."imageUrl" as "firstRescuerImageUrl",
        d."secondRescuerId",
        u4."name" as "secondRescuerName",
        u4."imageUrl" as "secondRescuerImageUrl",
        d."radioOperatorId",
        u5."name" as "radioOperatorName",
        u5."imageUrl" as "radioOperatorImageUrl",
        d."assistantRadioOperatorId",
        u6."name" as "assistantRadioOperatorName",
        u6."imageUrl" as "assistantRadioOperatorImageUrl",
        d."traineeId",
        u7."name" as "traineeName",
        u7."imageUrl" as "traineeImageUrl"
      FROM duty d
        left join "user" u on u.id = "leaderId"
        left join "user" u2 on u2.id = "driverId"
        left join "user" u3 on u3.id = "firstRescuerId"
        left join "user" u4 on u4.id = "secondRescuerId"
        left join "user" u5 on u5.id = "radioOperatorId"
        left join "user" u6 on u6.id = "assistantRadioOperatorId"
        left join "user" u7 on u7.id = "traineeId"
      WHERE date = '${date}' AND shift = '${shift}'
      LIMIT 1
    `);

    if (duty.length > 0) {
      return duty[0];
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function listDutyByMonth({
  month,
}: {
  month: ListDutyMonth;
}): Promise<Duty[]> {
  try {
    let conditions = '1=1';

    switch (month) {
      case ListDutyMonth.CURRENT: {
        const dateMin = moment().startOf('month').format('YYYY-MM-DD');
        const dateMax = moment().endOf('month').format('YYYY-MM-DD');
        conditions = `date >= '${dateMin}' AND date <= '${dateMax}'`;
        break;
      }
      case ListDutyMonth.NEXT: {
        const dateMin = moment()
          .add(1, 'month')
          .startOf('month')
          .format('YYYY-MM-DD');
        const dateMax = moment()
          .add(1, 'month')
          .endOf('month')
          .format('YYYY-MM-DD');
        conditions = `date >= '${dateMin}' AND date <= '${dateMax}'`;
        break;
      }
    }

    return dutyRepository.query(`
      SELECT
        d.id,
        TO_CHAR("date" , 'YYYY-MM-DD') as "date",
        d.shift,
        d."isAvailable",
        d."leaderId",
        u.name as "leaderName",
        d."driverId",
        u2."name" as "driverName",
        d."firstRescuerId",
        u3."name" as "firstRescuerName",
        d."secondRescuerId",
        u4."name" as "secondRescuerName",
        d."radioOperatorId",
        u5."name" as "radioOperatorName",
        d."assistantRadioOperatorId",
        u6."name" as "assistantRadioOperatorName",
        d."traineeId",
        u7."name" as "traineeName"
      FROM duty d
        left join "user" u on u.id = "leaderId"
        left join "user" u2 on u2.id = "driverId"
        left join "user" u3 on u3.id = "firstRescuerId"
        left join "user" u4 on u4.id = "secondRescuerId"
        left join "user" u5 on u5.id = "radioOperatorId"
        left join "user" u6 on u6.id = "assistantRadioOperatorId"
        left join "user" u7 on u7.id = "traineeId"
      WHERE ${conditions}
      ORDER BY d.date ASC, d.shift ASC
    `);
  } catch (error) {
    throw error;
  }
}

export async function listPreviousDuty({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<Duty[]> {
  try {
    const dateMax = moment().startOf('month').format('YYYY-MM-DD');

    return dutyRepository.query(`
      SELECT
        d.id,
        TO_CHAR("date" , 'YYYY-MM-DD') as "date",
        d.shift,
        d."leaderId",
        d."isAvailable",
        u.name as "leaderName",
        d."driverId",
        u2."name" as "driverName",
        d."firstRescuerId",
        u3."name" as "firstRescuerName",
        d."secondRescuerId",
        u4."name" as "secondRescuerName",
        d."radioOperatorId",
        u5."name" as "radioOperatorName",
        d."assistantRadioOperatorId",
        u6."name" as "assistantRadioOperatorName",
        d."traineeId",
        u7."name" as "traineeName"
      FROM duty d
        left join "user" u on u.id = "leaderId"
        left join "user" u2 on u2.id = "driverId"
        left join "user" u3 on u3.id = "firstRescuerId"
        left join "user" u4 on u4.id = "secondRescuerId"
        left join "user" u5 on u5.id = "radioOperatorId"
        left join "user" u6 on u6.id = "assistantRadioOperatorId"
        left join "user" u7 on u7.id = "traineeId"
      WHERE date < '${dateMax}'
      ORDER BY d.date DESC, d.shift DESC
      LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
    `);
  } catch (error) {
    throw error;
  }
}

export async function listDutiesByDate({
  dateMin,
  dateMax,
}: {
  dateMin: string;
  dateMax: string;
}): Promise<Duty[]> {
  try {
    return dutyRepository.query(`
      SELECT
        d.id,
        TO_CHAR("date" , 'YYYY-MM-DD') as "date",
        d.shift,
        d."leaderId",
        u.name as "leaderName",
        d."driverId",
        u2."name" as "driverName",
        d."firstRescuerId",
        u3."name" as "firstRescuerName",
        d."secondRescuerId",
        u4."name" as "secondRescuerName",
        d."radioOperatorId",
        u5."name" as "radioOperatorName",
        d."assistantRadioOperatorId",
        u6."name" as "assistantRadioOperatorName",
        d."traineeId",
        u7."name" as "traineeName"
      FROM duty d
        left join "user" u on u.id = "leaderId"
        left join "user" u2 on u2.id = "driverId"
        left join "user" u3 on u3.id = "firstRescuerId"
        left join "user" u4 on u4.id = "secondRescuerId"
        left join "user" u5 on u5.id = "radioOperatorId"
        left join "user" u6 on u6.id = "assistantRadioOperatorId"
        left join "user" u7 on u7.id = "traineeId"
      WHERE date >= '${dateMin}' AND date <= '${dateMax}' AND "isAvailable" = true
      ORDER BY d.date DESC, d.shift DESC
    `);
  } catch (error) {
    throw error;
  }
}
