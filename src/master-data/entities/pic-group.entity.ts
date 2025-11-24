import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PicGroupMember } from './pic-group-member.entity';

@Entity()
export class PicGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pic_group: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => PicGroupMember, (member) => member.group)
    members: PicGroupMember[];
}
