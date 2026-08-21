const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.appSettings.upsert({
    where: { key: 'emergency_stop' },
    update: {},
    create: { key: 'emergency_stop', value: 'false' }
  });

  await prisma.appSettings.upsert({
    where: { key: 'donation_url' },
    update: {},
    create: { key: 'donation_url', value: 'https://buy.stripe.com/example' }
  });

  console.log('✅ Seeded app settings.');
}

main().catch(e => { console.error(e); process.exit(1); });
