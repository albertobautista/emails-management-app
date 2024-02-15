import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import * as csvParser from 'csv-parser';

@Injectable()
export class AppService {
  async parseCsvFromBuffer(buffer: Buffer): Promise<any[]> {
    const results = [];

    return new Promise((resolve, reject) => {
      const tempFilePath = './temp.csv'; // Ruta temporal para el archivo CSV
      fs.writeFile(tempFilePath, buffer, async (err) => {
        if (err) {
          reject(err);
        } else {
          fs.createReadStream(tempFilePath)
            .pipe(csvParser())
            .on('data', (data) => {
              results.push(data);
            })
            .on('end', () => {
              resolve(results);
              // Elimina el archivo temporal después de procesarlo
              fs.unlink(tempFilePath, (err) => {
                if (err) {
                  console.error('Error eliminando archivo temporal:', err);
                }
              });
            })
            .on('error', (error) => {
              reject(error);
            });
        }
      });
    });
  }
}
