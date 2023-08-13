import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/isPublic.decorator';

@Controller({ path: 'likes', version: '1' })
@ApiTags('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get('user/:id')
  findByUserId(@Param('id') userId: string) {
    return this.likesService.findByUserId(userId);
  }

  @IsPublic()
  @Get('video/:id')
  findByVideoId(@Param('id') videoId: string) {
    return this.likesService.findByVideoId(videoId);
  }
}
