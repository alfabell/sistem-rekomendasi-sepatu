import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const shoes = await prisma.shoes.findMany();

    return Response.json({
      success: true,
      data: shoes,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}