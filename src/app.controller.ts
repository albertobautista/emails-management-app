import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const buffer = file.buffer; // Obtiene el buffer del archivo
    const data = await this.appService.parseCsvFromBuffer(buffer);
    console.log('data', data); // Aquí puedes manejar los datos como desees
    return { message: 'File uploaded', rows: data.length };
  }
}
