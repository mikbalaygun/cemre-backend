
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const username = 'cemre';
    const passwordPlain = '2026!?';
    const passwordHash = await bcrypt.hash(passwordPlain, 10);

    // Upsert user: create if not exists, update password if exists
    const user = await prisma.user.upsert({
        where: { username },
        update: { password: passwordHash },
        create: {
            username,
            password: passwordHash
        }
    });

    console.log(`User '${user.username}' created/updated successfully.`);
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
