import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { IsExist } from 'src/validation/isExist.validation';
import { Video } from '../entities/video.entity';

export class CreateVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsOptional()
  @IsExist(Video)
  parentId: string;

  @ApiProperty()
  @IsOptional()
  // @IsExist(Video)
  stories: string[];
}
