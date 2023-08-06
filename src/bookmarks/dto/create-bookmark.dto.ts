import { PickType } from '@nestjs/swagger';
import { Bookmark, createBookmarkDTO } from '../entities/bookmark.entity';

export class CreateBookmarkDto extends PickType(Bookmark, createBookmarkDTO) {}
