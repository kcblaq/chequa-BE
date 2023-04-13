import { PrismaconService } from 'src/prismacon/prismacon.service';
import { Dtonotify } from './dto';
export declare class NotifyService {
    private prisma;
    constructor(prisma: PrismaconService);
    getEmail(dto: Dtonotify): import(".prisma/client").Prisma.Prisma__NotifyClient<import(".prisma/client").Notify, never>;
    pendingNotifications(): Promise<import(".prisma/client").Notify[]>;
}
