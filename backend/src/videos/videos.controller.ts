import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videos: VideosService) {}

  @Get()
  findAll(): Promise<Video[]> {
    return this.videos.findAll();
  }

  @Post()
  create(@Body() body: Partial<Video>): Promise<Video> {
    return this.videos.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Video>,
  ): Promise<Video> {
    return this.videos.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.videos.remove(+id);
  }
}
