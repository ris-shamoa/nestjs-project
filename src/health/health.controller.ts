import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { UserHealthIndicator } from './user.health';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator,
        private userHealthIndicator: UserHealthIndicator
    ) { }

    @Get("/db-healthcheck")
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
        ]);
    }

    @Get('/user-healthcheck')
    @HealthCheck()
    healthCheck() {
        return this.health.check([
            async () => this.userHealthIndicator.isHealthy(),
        ])
    }
}
