import { Controller } from '@nestjs/common';
import { FileService } from './files.service';
@Controller()
export class FileController {
    constructor(private readonly filesService: FileService) { }
}
