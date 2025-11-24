import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SlaPolicy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    pipeline: string; // ID or Name, keeping simple as string for now or relation

    @Column()
    priority: string;

    @Column()
    start_stage: string;

    @Column()
    end_stage: string;

    @Column()
    resolution_time_hour: number;

    @Column()
    resolution_time_minute: number;

    @Column({ type: 'jsonb', nullable: true })
    operational_hours: Record<string, { start: string; end: string }>;
}
