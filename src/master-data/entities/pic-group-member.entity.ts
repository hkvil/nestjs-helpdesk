import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PicGroup } from './pic-group.entity';

@Entity()
export class PicGroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PicGroup, (group) => group.members)
  group: PicGroup;

  @Column()
  persnum: string;

  @Column()
  name: string;

  @Column({ default: true })
  active: boolean;
}
