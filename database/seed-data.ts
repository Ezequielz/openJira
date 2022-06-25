
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;

}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: node js and python which is good?',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'In-Progress: You cannot compair. Python is a programming language',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Finish: You cannot compair. Python is a programming language ',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}