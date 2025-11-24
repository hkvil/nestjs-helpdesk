import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Channel } from './master-data/entities/channel.entity';
import { Category } from './master-data/entities/category.entity';
import { SubCategory } from './master-data/entities/sub-category.entity';
import { Pipeline } from './master-data/entities/pipeline.entity';
import { PicGroup } from './master-data/entities/pic-group.entity';
import { PicGroupMember } from './master-data/entities/pic-group-member.entity';
import { SlaPolicy } from './sla/entities/sla-policy.entity';
import { Reporter } from './ticket/entities/reporter.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { User, UserRole } from './users/entities/user.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);

    console.log('Seeding database...');

    // Repositories
    const channelRepo = dataSource.getRepository(Channel);
    const categoryRepo = dataSource.getRepository(Category);
    const subCategoryRepo = dataSource.getRepository(SubCategory);
    const pipelineRepo = dataSource.getRepository(Pipeline);
    const picGroupRepo = dataSource.getRepository(PicGroup);
    const picGroupMemberRepo = dataSource.getRepository(PicGroupMember);
    const slaPolicyRepo = dataSource.getRepository(SlaPolicy);
    const reporterRepo = dataSource.getRepository(Reporter);
    const ticketRepo = dataSource.getRepository(Ticket);
    const userRepo = dataSource.getRepository(User);

    // 0. Users
    const usersData = [
        { username: 'admin', email: 'admin@lppnpi.co.id', role: UserRole.SUPER_ADMIN },
        { username: 'pic_sdm', email: 'pic.sdm@lppnpi.co.id', role: UserRole.PIC },
        { username: 'tech_it', email: 'tech.it@lppnpi.co.id', role: UserRole.TECHNICIAN },
        { username: 'reporter1', email: 'reporter1@lppnpi.co.id', role: UserRole.REPORTER },
    ];

    for (const u of usersData) {
        if (!(await userRepo.findOneBy({ username: u.username }))) {
            await userRepo.save(userRepo.create(u));
        }
    }

    // 1. Master Data - Channels
    const channels: Channel[] = [];
    for (const name of ['SDM', 'IT', 'Finance', 'General Affair']) {
        let channel = await channelRepo.findOneBy({ name });
        if (!channel) {
            channel = channelRepo.create({ name });
            await channelRepo.save(channel);
        }
        channels.push(channel);
    }

    // 2. Master Data - Categories & SubCategories
    const categoriesData = [
        {
            name: 'Gaji dan Tunjangan',
            channel: channels[0], // SDM
            subs: ['Tunjangan Rutin', 'Gaji Pokok', 'Lembur'],
        },
        {
            name: 'Aplikasi',
            channel: channels[1], // IT
            subs: ['e-CHAIN', 'Email', 'SAP'],
        },
        {
            name: 'Hardware',
            channel: channels[1], // IT
            subs: ['Printer', 'Laptop', 'Network'],
        },
    ];

    const subCategories: SubCategory[] = [];
    for (const catData of categoriesData) {
        let category = await categoryRepo.findOneBy({ name: catData.name });
        if (!category) {
            category = categoryRepo.create({ name: catData.name, channel: catData.channel });
            await categoryRepo.save(category);
        }

        for (const subName of catData.subs) {
            let sub = await subCategoryRepo.findOneBy({ name: subName });
            if (!sub) {
                sub = subCategoryRepo.create({ name: subName, category, priority: 'medium' });
                await subCategoryRepo.save(sub);
            }
            subCategories.push(sub);
        }
    }

    // 3. Pipelines
    const pipelineNames = ['Tiket untuk SDM', 'Tiket untuk IT'];
    for (const name of pipelineNames) {
        if (!(await pipelineRepo.findOneBy({ name }))) {
            await pipelineRepo.save(pipelineRepo.create({ name }));
        }
    }

    // 4. SLA Policy
    if (!(await slaPolicyRepo.findOneBy({ name: 'Standard SLA' }))) {
        await slaPolicyRepo.save(
            slaPolicyRepo.create({
                name: 'Standard SLA',
                description: 'Standard 24h SLA',
                pipeline: 'Tiket untuk IT',
                priority: 'medium',
                start_stage: 'New',
                end_stage: 'Done',
                resolution_time_hour: 24,
                resolution_time_minute: 0,
                operational_hours: {
                    Monday: { start: '08:00', end: '17:00' },
                    Tuesday: { start: '08:00', end: '17:00' },
                    Wednesday: { start: '08:00', end: '17:00' },
                    Thursday: { start: '08:00', end: '17:00' },
                    Friday: { start: '08:00', end: '17:00' },
                },
            }),
        );
    }

    // 5. Reporter
    let reporter = await reporterRepo.findOneBy({ persnum: '12345' });
    if (!reporter) {
        reporter = reporterRepo.create({
            organization_assignment: '1001',
            start_date: new Date(),
            end_date: new Date('2099-12-31'),
            persnum: '12345',
            name: 'ASEP',
            company: 'LPPNPI',
            area: 'Tangerang',
            sub_area: 'Head Office',
            position: 'Staff',
        });
        await reporterRepo.save(reporter);
    }

    // 6. Tickets (20 Data)
    console.log('Seeding 20 tickets...');
    const priorities = ['low', 'medium', 'high', 'critical'];
    const stages = ['New', 'Assigned', 'In Progress', 'Done'];
    const sources = ['Portal', 'Email', 'WhatsApp'];

    for (let i = 1; i <= 20; i++) {
        const randomSub = subCategories[Math.floor(Math.random() * subCategories.length)];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
        const randomStage = stages[Math.floor(Math.random() * stages.length)];
        const randomSource = sources[Math.floor(Math.random() * sources.length)];

        // Check if ticket number exists to avoid duplicates on re-run
        const ticketNum = `T202511${i.toString().padStart(4, '0')}`;
        const existingTicket = await ticketRepo.findOneBy({ number: ticketNum });

        if (!existingTicket) {
            await ticketRepo.save(
                ticketRepo.create({
                    reporter,
                    company: reporter.company,
                    area: reporter.area,
                    sub_area: reporter.sub_area,
                    position: reporter.position,
                    channel: randomSub.category.channel.name,
                    category: randomSub.category.name,
                    sub_category: randomSub.name,
                    pipeline: randomSub.category.channel.name === 'SDM' ? 'Tiket untuk SDM' : 'Tiket untuk IT',
                    number: ticketNum,
                    name: `Issue #${i} - ${randomSub.name} Problem`,
                    description: `This is a generated description for ticket #${i}. Please investigate the issue regarding ${randomSub.name}.`,
                    stage: randomStage,
                    priority: randomPriority,
                    source: randomSource,
                    created_date: new Date(),
                    due_date: new Date(Date.now() + 24 * 60 * 60 * 1000), // +1 day
                }),
            );
        }
    }

    console.log('Seeding complete!');
    await app.close();
}
bootstrap();
