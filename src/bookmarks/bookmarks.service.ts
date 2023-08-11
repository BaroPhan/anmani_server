import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { QueryBookmarkDto } from './dto/query-bookmark.dto';

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

  findAll(queryBookmarkDto: QueryBookmarkDto) {
    const { page, limit, sort, order, ...query } = queryBookmarkDto;
    return this.bookmarkRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: query,
      order: { [sort]: order },
    });
  }

  findOne(id: string) {
    return this.bookmarkRepository.findOne({ where: { id } });
  }

  findByUserId(userId: string) {
    return this.bookmarkRepository.findBy({ userId });
  }

  findByProductId(productId: string) {
    return this.bookmarkRepository.findBy({ productId });
  }

  findByVideoId(videoId: string) {
    return this.bookmarkRepository.findBy({ videoId });
  }

  update(id: string, updateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkRepository.update(id, updateBookmarkDto);
  }

  remove(id: string) {
    return this.bookmarkRepository.delete(id);
  }
}
