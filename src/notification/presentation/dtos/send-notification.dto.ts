import { IsString } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  type: string;

  @IsString()
  userId: string;

  @IsString()
  message: string;
}
