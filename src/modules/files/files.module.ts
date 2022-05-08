import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './files.controller';
import { FileService } from './files.service';
@Module({
    imports: [ConfigModule],
    providers: [FileService],
    controllers: [FileController],
    exports: [FileService]
})
export class FileModule { }
