import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
    SUPER_ADMIN = 'super_admin',
    PIC = 'pic',
    TECHNICIAN = 'technician',
    REPORTER = 'reporter',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.REPORTER })
    role: UserRole;

    @Column({ default: true })
    active: boolean;

    // Optional password field for future auth.
    // We set `select: false` so password doesn't come back in normal queries.
    @Column({ nullable: true, select: false })
    password?: string;
}
