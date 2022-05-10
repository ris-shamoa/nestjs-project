import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
    constructor(
        private configService: ConfigService,
    ) { }

    async sendMail(email_address: string, body: string, subject: string) {
        var AWS = require('aws-sdk');
        AWS.config.update({ region: this.configService.get("AMAZON_REGION") });

        var params = {
            Destination: {
                ToAddresses: [
                    email_address
                ]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `<u>${body}</u>`
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            Source: "risalatshamoa@gmail.com",
        };
        var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
        sendPromise.then(
            function (data) {
                console.log(data.MessageId);
            }).catch(
                function (err) {
                    console.error(err, err.stack);
                });

    }
}