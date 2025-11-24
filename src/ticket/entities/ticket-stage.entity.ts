import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketStage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.stages)
  ticket: Ticket;

  @Column({ type: 'timestamp' })
  datetime: Date;

  @Column()
  stage: string;

  @Column()
  percentage: number;

  @Column()
  pic: string;

  @Column()
  pic_text: string;

  @Column({ nullable: true })
  note: string;
}
