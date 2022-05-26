import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { UserHealthIndicator } from './user.health';

@Module({
    imports: [TerminusModule],
    controllers: [HealthController],
    providers: [UserHealthIndicator]
})
export class HealthModule {}
