import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {

    /* const newUsers = await prisma.user.createMany({
        data: [
            {
                name: 'Lauryn',
                email: 'lauryn@example.com'
            },
            {
                name: 'Meredith',
                email: 'meredith@example.com'
            },
            {
                name: 'Bryan',
                email: 'bryan@example.com'
            }
        ]
    });
    newUsers.map(user => {
        console.log(`User ID: ${user.id}, Name: ${user.name}`);
    }); */


    /* const user = await prisma.user.findFirst({
        where: {
            OR: [
                { id: 1 },
                { email: 'john@example.com' }
            ]
        }
    });
    console.log('First User:', user); */


    /* try {
        const user = await prisma.user.delete({
            where: {
                id: 100
            }
        });
        console.log('First User:', user);
    } catch (error) {
        //console.error('Error deleting user:', error.message);
        //console.error('Error deleting user:', error.meta.cause);
        console.error('Error deleting user.');
    } */

    /* try {
        const counter = await prisma.user.updateMany({
            where: {
                name: 'Mary'
            },
            data: {
                lastname: 'Peretz'
            }
        });
        console.log('Updated User Count:', counter.count);
    } catch (error) {
        console.error('Error updating user:', error.meta.cause);
    } */

    const users = await prisma.user.findMany(
        {
            where: {
                name: { equals: 'Mary' }
            }
        });
    console.log('Users Found:', users);
}

main();
