import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get wallet details
export const getWallet = async (context) => {
  try {
    const userId = context.req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return context.res.status(404).json({ message: "No user found!!!" });
    return context.res.status(200).json({ message: "Wallet fetched successful", balance: user.wallet });
  } catch (error) {
    throw error;
  }
};
