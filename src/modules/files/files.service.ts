import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as pdf from 'html-pdf';
import { S3 } from "aws-sdk";

@Injectable()
export class FileService {
    constructor(
        private configService: ConfigService,
    ) { }

    async uploadFile(base64Image: any, filename: string, userId: any, type) {
        const s3 = new S3();
        let key: string;
        if (type != "prescription_upload") {
            var buf = Buffer.from(base64Image, 'base64');
            key = `${userId}-${filename}.png`;
        }
        else {
            buf = base64Image;
            key = `${userId}-${filename}.pdf`
        }
        const { Location } = await s3.upload({
            Bucket: this.configService.get('AMAZON_BUCKET_NAME'),
            Body: buf,
            Key: key
        })
            .promise();

        return Location;
    }

    async convertHtmlPage(data, userId) {
        console.log("---- html in side the function -----", data)
        var options: pdf.CreateOptions = { format: 'Letter', localUrlAccess: true };
        
        pdf.create(data, options).toFile('./businesscard.pdf', (err: Error, res: pdf.FileInfo) => {
          if (err) return console.log("-- error -----",err);
          console.log("---- response ----",res); // { filename: '/app/businesscard.pdf' }
        });
        // let Location;
        // let fileName = "src/common/files/invoice.pdf";
        // console.log("--- fileName ---", pdf);
        // let buffer = await pdf.create(data).toFile(fileName, function (error, res) {
        //     console.log("-- error ---", error);
        //     console.log(res);
        // });

    
        // tofile(async function (error, buffer) {
        //     console.log("-- error ---", error);
        //     console.log("---- buffer ----", buffer);
        // });
        // console.log("----- buffer after the create ----", buffer);
        // Location = await this.uploadFile(buffer, fileName, userId, "htmlToPdf");
        // return Location;
    }
}