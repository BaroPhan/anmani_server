import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryBookmarkDto } from './dto/query-bookmark.dto';

@Controller({ path: 'bookmarks', version: '1' })
@ApiTags('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarksService.create(createBookmarkDto);
  }

  @Get()
  findAll(@Query() queryBookmarkDto: QueryBookmarkDto) {
    return this.bookmarksService.findAll(queryBookmarkDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarksService.findOne(id);
  }

  @Get('user/:id')
  findByUserId(@Param('id') userId: string) {
    return this.bookmarksService.findByUserId(userId);
  }

  @Get('video/:id')
  findByVideoId(@Param('id') videoId: string) {
    return this.bookmarksService.findByVideoId(videoId);
  }

  @Get('product/:id')
  findByProductId(@Param('id') productId: string) {
    return this.bookmarksService.findByProductId(productId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarksService.update(id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarksService.remove(id);
  }
}
