import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passwordSabin = await bcrypt.hash('testtesttest', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'test@test.fr' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'test@test.fr',
      name: 'test TEST',
      password: passwordSabin,
    },
  });

  console.log({ user1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
