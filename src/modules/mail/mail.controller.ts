import { Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { MailService } from './mail.service';
import { Request } from "express";

@Controller("mail")
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post("/send-mail")
    async sendMail(@Req() request: Request) {
        try {
            let { email, body, subject } = request.body;
            return await this.mailService.sendMail(email, body, subject);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
