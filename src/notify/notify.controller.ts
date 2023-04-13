import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { Dtonotify } from './dto';

@Controller('notify')
export class NotifyController {
    constructor(private nService: NotifyService) { }
    
    @Post()
    sendEmail(@Body() dto: Dtonotify) {
        return this.nService.getEmail(dto)
    }
    
    @Get() 
    pendingNotifications() {
        return this.nService.pendingNotifications()
    }
}
