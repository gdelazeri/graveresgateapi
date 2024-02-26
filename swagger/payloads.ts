import Permission from "../src/enum/user/UserPermission";
import Status from "../src/enum/user/UserStatus";

const payloads = {
  PostNewUser: {
    name: 'string',
    email: 'string',
    password: 'string',
  },
  PutUser: {
    registrationId: 'string',
    name: 'string',
    email: 'string',
    permission: Object.values(Permission).join(' | '),
    status: Object.values(Status).join(' | '),
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
}

export default payloads;
