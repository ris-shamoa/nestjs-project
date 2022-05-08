import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
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
}