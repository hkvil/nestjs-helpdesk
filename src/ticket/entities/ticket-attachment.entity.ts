import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.attachments)
  ticket: Ticket;

  @Column()
  file_name: string;

  @Column({ nullable: true })
  file_text: string;
}
