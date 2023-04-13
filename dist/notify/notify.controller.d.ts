import { NotifyService } from './notify.service';
import { Dtonotify } from './dto';
export declare class NotifyController {
    private nService;
    constructor(nService: NotifyService);
    sendEmail(dto: Dtonotify): import(".prisma/client").Prisma.Prisma__NotifyClient<import(".prisma/client").Notify, never>;
    pendingNotifications(): Promise<import(".prisma/client").Notify[]>;
}
