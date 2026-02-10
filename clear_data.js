
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log("Veritabanı temizleniyor...");
    const deleted = await prisma.order.deleteMany({})
    console.log(`✅ Başarılı! Toplam ${deleted.count} sipariş silindi.`);
}

main()
    .catch(e => { console.error(e) })
    .finally(async () => { await prisma.$disconnect() })
