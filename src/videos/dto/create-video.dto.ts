import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { IsExist } from 'src/decorators/isExist.decorator';
import { Video } from '../entities/video.entity';

export class CreateVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsExist(Video)
  stories: string[];
}
