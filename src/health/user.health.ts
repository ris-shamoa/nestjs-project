import { Injectable } from "@nestjs/common";
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";
//comments added here.
export interface User {
    name: string;
    type: string;
}

@Injectable()
export class UserHealthIndicator extends HealthIndicator {
    private users: User[] = [
        { name: 'Fido', type: 'goodperson' },
        { name: 'Rex', type: 'badperson' },
    ];
    async isHealthy(): Promise<HealthIndicatorResult> {
        const badperson = this.users.filter(user => user.type === 'badperson');
        const isHealthy = badperson.length === 0;
        const result = this.getStatus('user', isHealthy, { badperson: badperson.length });
        if (isHealthy)
            return result
        else
            throw new HealthCheckError('User check failed', result);
    }
}