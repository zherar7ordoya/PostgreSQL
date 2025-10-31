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

    /* const users = await prisma.user.findMany(
        {
            where: {
                name: { equals: 'Mary' }
            }
        });
    console.log('Users Found:', users); */


    /* const user = await prisma.user.upsert({
        where: { email: 'ryan@example.com' },
        create: {
            name: 'John',
            email: 'john@example.com',
        },
        update: {
            lastname: 'Carter'
        }
    });
    console.log('Upserted User:', user); */


    /* const newUser = await prisma.user.create({
        data: {
            name: 'Joe',
            email: 'joe@example.com'
        }
    });
    console.log('New User:', newUser);

    const newPost = await prisma.post.create({
        data: {
            title: 'Hello World',
            content: 'This is my first post.',
            // Method 1: Connect by ID
            //authorId: newUser.id

            // Method 2: Connect using relation (preferred)
            author: {
                connect: { id: newUser.id }
            }
        }
    });
    console.log('New Post:', newPost); */


    /* const newAuthorWithPost = await prisma.user.create({
        data: {
            name: 'Alice',
            lastname: 'Smith',
            email: 'salice@example.com',
            posts: {
                create: {
                    title: 'Hello Alice',
                    content: 'This is Alice\'s first post.'
                    // Relationship to author is handled automatically.
                }
            }
        }
    });
    console.log('New Author with Post:', newAuthorWithPost);

    const postsByAlice = await prisma.post.findMany({
        where: {
            authorId: newAuthorWithPost.id
        }
    });
    console.log('Posts by Alice:', postsByAlice); */

    const usersWithPosts = await prisma.user.findMany({
        include: {
            posts: true
        }
    });
    usersWithPosts.map(user => {
        console.log(`User: ${user.name} (${user.email})`);
        user.posts.forEach((post, i) => {
            console.log(`\t${i + 1}. ${post.title}`);
        });
    });
}

main();



