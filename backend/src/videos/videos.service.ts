import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly repo: Repository<Video>,
  ) {}

  findAll(): Promise<Video[]> {
    return this.repo.find({ order: { order: 'ASC' } });
  }

  create(data: Partial<Video>): Promise<Video> {
    const vid = this.repo.create(data);
    return this.repo.save(vid);
  }

  update(id: number, data: Partial<Video>): Promise<Video> {
    return this.repo.save({ id, ...data });
  }

  remove(id: number): Promise<void> {
    return this.repo.delete(id).then(() => {});
  }
}
