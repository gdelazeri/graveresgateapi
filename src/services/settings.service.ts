import DataSource from '../dataSource';
import { Setting } from '../models/setting.model';

const settingRepository = DataSource.getRepository(Setting);

export async function getSettingValue(key: string) {
  try {
    return settingRepository.findOne({ where: { key } });
  } catch (error) {
    throw error;
  }
}
