import { PrismaClient } from '@prisma/client';
import process from 'process';


const prisma = new PrismaClient();

async function main() {
  const newProduct = await prisma.product.create({
    data: {
      name: 'Sample Product',
      price: 19.99,
      stock: true,
    },
  });

  console.log(newProduct);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
