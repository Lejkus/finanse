import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function deleteRecentTokens() {
  // Oblicz datę i godzinę sprzed 6 godzin
  //const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
  const teenSecondAgo = new Date(Date.now() -  10 * 1000);

  // Usuń tokeny starsze  niż 6 godzin lub 10 s :)
  const deletejwt = await prisma.jwtTokens.deleteMany({
    where: {
      createdDate: {
        lt: teenSecondAgo, // `lt` oznacza "less  than"
      },    
    },
  });

  console.log(`Usunięto ${deletejwt.count} tokenów.`);
}
