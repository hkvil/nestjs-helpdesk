import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pipeline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
