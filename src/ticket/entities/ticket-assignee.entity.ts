import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketAssignee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.assignees)
  ticket: Ticket;

  @Column()
  persnum: string;

  @Column()
  name: string;

  @Column({ default: false })
  accept: boolean;

  @Column({ type: 'timestamp', nullable: true })
  accept_datetime: Date;

  @Column({ nullable: true })
  note: string;
}
