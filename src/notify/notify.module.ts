import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { Dtonotify } from './dto';

@Module({
  controllers: [NotifyController],
  providers: [NotifyService,Dtonotify]
})
export class NotifyModule {}
