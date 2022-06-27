
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
            description: 'Pendiente: aprender Next',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'In-Progress: aprender typeScript',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Finish: aprender javaScript ',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}