import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reporter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organization_assignment: string;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column()
    persnum: string;

    @Column()
    name: string;

    @Column()
    company: string;

    @Column()
    area: string;

    @Column()
    sub_area: string;

    @Column()
    position: string;
}
