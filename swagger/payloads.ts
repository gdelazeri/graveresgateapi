import Permission from "../src/enum/user/UserPermission";
import Status from "../src/enum/user/UserStatus";

const payloads = {
  PostNewUser: {
    name: 'string',
    email: 'string',
    password: 'string',
    birthDate: 'string',
    courseId: 'string',
  },
  PutUser: {
    registrationId: 'string',
    name: 'string',
    email: 'string',
    permission: Object.values(Permission).join(' | '),
    status: Object.values(Status).join(' | '),
    birthDate: 'string',
    courseId: 'string',
  },
  PutOwnUser: {
    name: 'string',
    email: 'string',
  },
  PostLogin: {
    email: 'string',
    password: 'string',
  },
  PostNewDutyRequest: {
    date: "string",
    shift: "string",
    startAt: "string",
    endAt: "string",
    note: "string",
  },
  PostDuty: {
    date: "string",
    shift: "string",
    leaderId: "string",
    driverId: "string",
    firstRescuerId: "string",
    secondRescuerId: "string",
    radioOperatorId: "string",
    assistantRadioOperatorId: "string",
    traineeId: "string",
  },
  PostVehicle: {
    name: "string",
    licensePlate: "string",
  }
}

export default payloads;
