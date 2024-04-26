import { User } from './user.model';
import { DutyRequest } from './dutyRequest.model';
import { DutyRequestPosition } from './dutyRequestPosition.model';
import { Duty } from './duty.model';
import { Vehicle } from './vehicle.model';
import { Course } from './course.model';
import { VehicleTrip } from './vehicleTrip.model';
import { DutyCareChecklist } from './dutyCareChecklist.model';
import { Checklist } from './checklist.model';
import { ChecklistFilled } from './checklistFilled.model';
import { ChecklistQuestion } from './checklistQuestion.model';
import { ChecklistQuestionItem } from './checklistQuestionItem.model';
import { ChecklistQuestionOption } from './checklistQuestionOption.model';
import { ChecklistFilledAnswer } from './checklistFilledAnswer.model';
import { Setting } from './setting.model';
import { DriverChecklist } from './driverChecklist.model';
import { RescuerChecklist } from './rescuerChecklist.model';
import { RadioOperatorChecklist } from './radioOperatorChecklist.model';

export default [
  User,
  DutyRequest,
  DutyRequestPosition,
  Duty,
  Vehicle,
  Course,
  VehicleTrip,
  DutyCareChecklist,
  Checklist,
  ChecklistFilled,
  ChecklistQuestion,
  ChecklistQuestionItem,
  ChecklistQuestionOption,
  ChecklistFilledAnswer,
  Setting,
  DriverChecklist,
  RescuerChecklist,
  RadioOperatorChecklist
];
