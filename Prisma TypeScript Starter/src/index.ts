import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {

    const newUser = await prisma.user.create({
        data: {
            name: 'Jonathan Percy',
            email: 'jonathan@example.com',
        },
    });
    console.log('The new user:', newUser);

    const users = await prisma.user.findMany();
    console.log('All users:', users);
}

main();
