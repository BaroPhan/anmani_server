import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  create(createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkRepository.save(
      this.bookmarkRepository.create(createBookmarkDto),
    );
  }

  findAll() {
    return this.bookmarkRepository.find();
  }

  findOne(id: string) {
    return this.bookmarkRepository.findOne({ where: { id } });
  }

  update(id: string, updateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkRepository.update(id, updateBookmarkDto);
  }

  remove(id: string) {
    return this.bookmarkRepository.delete(id);
  }
}
