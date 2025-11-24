import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketAssociation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.associations)
  ticket: Ticket;

  @Column()
  sub_category: string;

  @Column()
  name: string; // Key

  @Column()
  key: string;

  @Column()
  key_text: string;

  @Column()
  value: string;

  @Column()
  value_text: string;
}
