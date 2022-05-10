import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
@Module({
    imports: [ConfigModule],
    providers: [MailService],
    controllers: [MailController],
    exports: [MailService]
})
export class MailModule { }
