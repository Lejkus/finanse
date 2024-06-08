import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function loginUser(userdata) {
  try {
    //find user with mail
    const user = await prisma.user.findUnique({
      where: {
        email: userdata.email,
      },
    });
    //if user is null (not find)
    if (!user) {
      throw new Error("Cannot find user in database");
    }

    const checkPassword = await bcrypt.compare(userdata.password, user.password);
    
    if (!checkPassword) {
      throw new Error("Wrong password!");
    }

    return user.id;
  } catch (error) {
    throw error;
  }

  //return userid
}
