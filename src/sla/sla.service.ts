import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SlaPolicy } from './entities/sla-policy.entity';
import { CreateSlaDto } from './dto/create-sla.dto';
import { UpdateSlaDto } from './dto/update-sla.dto';

@Injectable()
export class SlaService {
  constructor(
    @InjectRepository(SlaPolicy) private slaRepo: Repository<SlaPolicy>,
  ) {}
  calculateDueDate(policy: SlaPolicy, startDate: Date): Date {
    if (!policy.operational_hours) {
      // If no operational hours, just add the time directly
      const totalMinutes =
        policy.resolution_time_hour * 60 + policy.resolution_time_minute;
      return new Date(startDate.getTime() + totalMinutes * 60000);
    }

    let remainingMinutes =
      policy.resolution_time_hour * 60 + policy.resolution_time_minute;
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
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[dayIndex];
  }

  // CRUD helpers
  create(dto: CreateSlaDto) {
    const p = this.slaRepo.create(dto);
    return this.slaRepo.save(p);
  }

  findAll() {
    return this.slaRepo.find();
  }

  async findOne(id: number) {
    const s = await this.slaRepo.findOneBy({ id });
    if (!s) throw new NotFoundException(`SLA policy ${id} not found`);
    return s;
  }

  async update(id: number, dto: UpdateSlaDto) {
    const s = await this.findOne(id);
    Object.assign(s, dto);
    return this.slaRepo.save(s);
  }

  async remove(id: number) {
    const s = await this.findOne(id);
    await this.slaRepo.remove(s);
    return { deleted: true };
  }
}
