import { Injectable } from '@nestjs/common';
import { PrismaconService } from 'src/prismacon/prismacon.service';
import { Dtonotify } from './dto';

@Injectable()
export class NotifyService {
    constructor(private prisma: PrismaconService,
    ) { }
    getEmail(dto: Dtonotify) { 
        const newemail = this.prisma.notify.create({
            data: {
                email: dto.email,

            }
        })
        return newemail;
    }

    async pendingNotifications(){
        const allemail = await this.prisma.notify.findMany()
        return allemail
    }
}
