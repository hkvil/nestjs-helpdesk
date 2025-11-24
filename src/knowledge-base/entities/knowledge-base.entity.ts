import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class KnowledgeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column()
    channel: string;

    @Column()
    category: string;

    @Column()
    sub_category: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    file_name: string;

    @Column({ nullable: true })
    file_text: string;

    @Column({ type: 'enum', enum: ['draft', 'pending', 'final'], default: 'draft' })
    status: string;
}
