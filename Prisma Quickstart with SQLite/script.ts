import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client.js'

const prisma = new PrismaClient()

async function main() {

    const usersWithPosts = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });
    console.dir(usersWithPosts, { depth: null });

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });