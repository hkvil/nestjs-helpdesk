import { Injectable } from '@nestjs/common';
import { SlaPolicy } from './entities/sla-policy.entity';

@Injectable()
export class SlaService {
    calculateDueDate(policy: SlaPolicy, startDate: Date): Date {
        if (!policy.operational_hours) {
            // If no operational hours, just add the time directly
            const totalMinutes = policy.resolution_time_hour * 60 + policy.resolution_time_minute;
            return new Date(startDate.getTime() + totalMinutes * 60000);
        }

        let remainingMinutes = policy.resolution_time_hour * 60 + policy.resolution_time_minute;
        let currentDate = new Date(startDate);

        // Safety break to prevent infinite loops
        let loops = 0;
        const MAX_LOOPS = 1000;

        while (remainingMinutes > 0 && loops < MAX_LOOPS) {
            loops++;
            const dayName = this.getDayName(currentDate.getDay());
            const opHours = policy.operational_hours[dayName];

            if (!opHours) {
                // Non-operational day, move to next day 00:00
                currentDate.setDate(currentDate.getDate() + 1);
                currentDate.setHours(0, 0, 0, 0);
                continue;
            }

            const [startHour, startMinute] = opHours.start.split(':').map(Number);
            const [endHour, endMinute] = opHours.end.split(':').map(Number);

            const opStart = new Date(currentDate);
            opStart.setHours(startHour, startMinute, 0, 0);

            const opEnd = new Date(currentDate);
            opEnd.setHours(endHour, endMinute, 0, 0);

            // If current time is after opEnd, move to next day
            if (currentDate >= opEnd) {
                currentDate.setDate(currentDate.getDate() + 1);
                currentDate.setHours(0, 0, 0, 0);
                continue;
            }

            // If current time is before opStart, move to opStart
            if (currentDate < opStart) {
                currentDate = opStart;
            }

            // Calculate available minutes in this day
            const diffMs = opEnd.getTime() - currentDate.getTime();
            const availableMinutes = Math.floor(diffMs / 60000);

            if (availableMinutes >= remainingMinutes) {
                // Can finish today
                return new Date(currentDate.getTime() + remainingMinutes * 60000);
            } else {
                // Consume all available minutes today and move to next day
                remainingMinutes -= availableMinutes;
                currentDate.setDate(currentDate.getDate() + 1);
                currentDate.setHours(0, 0, 0, 0);
            }
        }

        return currentDate;
    }

    private getDayName(dayIndex: number): string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayIndex];
    }
}
