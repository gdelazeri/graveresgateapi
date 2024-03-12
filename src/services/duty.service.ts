import moment from 'moment';
import DataSource from '../dataSource';
import { ListDutyPeriod } from '../interfaces/Duty';
import { Duty } from '../models/duty.model';
import DutyShift from '../enum/duty/DutyShift';

const dutyRepository = DataSource.getRepository(Duty);

export async function createDuty(input: any) {
  try {
    return dutyRepository.save(dutyRepository.create(input)) as unknown as Promise<Duty>;
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, input: any) {
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

export async function findDutyByDateAndShift(date: string, shift: DutyShift) {
  try {
    return dutyRepository.findOne({ where: { date, shift } });
  } catch (error) {
    throw error;
  }
}

export async function listDutyByPeriod({
  period,
}: {
  period: ListDutyPeriod
}) {
  try {
    let conditions = '1=1';
    let order = 'd.date ASC, d.shift ASC'

    switch (period) {
      case ListDutyPeriod.CURRENT: {
        const dateMin = moment().startOf('month').format('YYYY-MM-DD')
        const dateMax = moment().endOf('month').format('YYYY-MM-DD')
        conditions = `date >= '${dateMin}' AND date <= '${dateMax}'`;
        order = 'd.date ASC, d.shift ASC'
        break;
      }
      case ListDutyPeriod.FUTURE: {
        const dateMin = moment().add(1, 'month').startOf('month').format('YYYY-MM-DD')
        const dateMax = moment().add(1, 'month').endOf('month').format('YYYY-MM-DD')
        conditions = `date >= '${dateMin}' AND date <= '${dateMax}'`;
        order = 'd.date ASC, d.shift ASC'
        break;
      }
      case ListDutyPeriod.PAST: {
        const dateMax = moment().startOf('month').format('YYYY-MM-DD')
        conditions = `date < '${dateMax}'`;
        order = 'd.date DESC, d.shift DESC'
        break;
      }
    }

    return dutyRepository.query(`
      SELECT
        d.id,
        d.date,
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
      WHERE ${conditions}
      ORDER BY ${order}
    `);
  } catch (error) {
    throw error;
  }
}