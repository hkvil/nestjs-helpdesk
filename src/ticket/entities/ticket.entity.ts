import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Reporter } from './reporter.entity';
import { TicketStage } from './ticket-stage.entity';
import { TicketAssignee } from './ticket-assignee.entity';
import { TicketAttachment } from './ticket-attachment.entity';
import { TicketAssociation } from './ticket-association.entity';

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Reporter)
    @JoinColumn({ name: 'reporter_id' })
    reporter: Reporter;

    @Column()
    company: string;

    @Column()
    area: string;

    @Column()
    sub_area: string;

    @Column()
    position: string;

    @Column()
    channel: string;

    @Column()
    category: string;

    @Column()
    sub_category: string;

    @Column()
    pipeline: string;

    @Column()
    number: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    stage: string;

    @Column({ nullable: true })
    assignee: string;

    @Column()
    priority: string;

    @Column()
    source: string;

    @Column({ type: 'timestamp' })
    created_date: Date;

    @Column({ type: 'timestamp', nullable: true })
    due_date: Date;

    @Column({ nullable: true })
    note: string;

    @Column({ nullable: true })
    sla_policy: string;

    @OneToMany(() => TicketStage, (stage) => stage.ticket)
    stages: TicketStage[];

    @OneToMany(() => TicketAssignee, (assignee) => assignee.ticket)
    assignees: TicketAssignee[];

    @OneToMany(() => TicketAttachment, (attachment) => attachment.ticket)
    attachments: TicketAttachment[];

    @OneToMany(() => TicketAssociation, (association) => association.ticket)
    associations: TicketAssociation[];
}
