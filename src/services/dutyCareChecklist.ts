import DataSource from '../dataSource';
import { DutyCareChecklist } from '../models/dutyCareChecklist.model';

const dutyCareChecklistRepository = DataSource.getRepository(DutyCareChecklist);
