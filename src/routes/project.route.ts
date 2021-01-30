import { Router } from 'express';
import { getRepository } from 'typeorm';
import { ProjectORM } from '../entities/project.entity';

const projectRoute = Router();

projectRoute.get('/', async (request, response) => {
  try {
    const take = Number((request.query.take) || 5);
    const skip = Number((request.query.skip) || 0);

    const projectRepository = getRepository(ProjectORM);

    const projects = await projectRepository.find({ take, skip });

    return response.json(projects);
  } catch (error) {
    return response.status(404).json({ message: error });
  }
});

projectRoute.post('/', (request, response) => {});

projectRoute.put('/:id_project', (request, response) => {});

projectRoute.delete('/:id_project', (request, response) => {});

export default projectRoute;
