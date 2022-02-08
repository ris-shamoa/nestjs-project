import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalStrategy } from "../strategies/local.strategy";


@Injectable()
export class localAuthGuard extends AuthGuard('local') {}