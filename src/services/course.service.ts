import DataSource from '../dataSource';
import { Course } from '../models/course.model';

const courseRepository = DataSource.getRepository(Course);

export async function findAll() {
  try {
    return courseRepository.find({ order: { name: 'ASC' } });
  } catch (error) {
    throw error;
  }
}
