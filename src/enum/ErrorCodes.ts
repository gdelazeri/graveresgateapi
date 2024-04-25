export enum UserErrorCodes {
  EmailInUsage = 'USER_0001',
  LoginInvalid = 'USER_0002',
  UserInexistent = 'USER_0003',
  UserInactive = 'USER_0004',
}

export enum DutyRequestErrorCodes {
  DutyRequestInexistent = 'DR_0001',
  DutyRequestExistent = 'DR_0002',
}

export enum GenericErrorCodes {
  WrongFields = 'ERROR_0001',
  PaginationInvalid = 'ERROR_0002',
}

export enum VehicleErrorCodes {
  VehicleInexistent = 'V_0001',
}

export enum DutyErrorCodes {
  NotFound = 'D_0001',
}

export enum VehicleTripErrorCodes {
  UserNotADriver = 'VT_0001',
  VehicleTripInexistent = 'VT_0002',
}

export enum ChecklistErrorCodes {
  NotFound = 'C_0001',
}

export enum SettingErrorCodes {
  NotFound = 'S_0001',
}

export enum DutyCareChecklistErrorCodes {
  NotFound = 'DCC_0001',
}

export enum DriverChecklistErrorCodes {
  NotFound = 'DC_0001',
}

export enum RescuerChecklistErrorCodes {
  NotFound = 'RC_0001',
}

export enum RadioOperatorChecklistErrorCodes {
  NotFound = 'ROC_0001',
}