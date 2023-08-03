import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { IsExist } from 'src/validation/isExist.validation';
import { Video } from 'src/videos/entities/video.entity';

export class CreateLikeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsExist(User)
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsExist(Video)
  videoId: string;
}
