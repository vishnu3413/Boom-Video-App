import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Gift the creator
export const giftCreator = async (context) => {
  try {
    const userId = context.req.user.id;
    const videoId = context.req.body.videoId;
    const amount = context.req.body.amount;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return context.res.status(404).json({ message: "No user found!!!" });

    const video = await prisma.video.findUnique({ where: { id: videoId } });
    if (!video) return context.res.status(404).json({ message: "Video not found!!!" });

    const creator = await prisma.user.findUnique({ where: { id: video.creatorId } });
    if (!creator) return context.res.status(404).json({ message: "Creator not found!!!" });

    if(userId === creator.id) return context.res.status(400).json({ message: "You cannot gift yourself!!!" }); 

    if(user.wallet < amount){
        return context.res.status(400).json({ message: "Insufficient balance!!!" }); 
    }

    // Deduct gift amount from user
    await prisma.user.update({
      where: { id: userId },
      data: { wallet: user.wallet - amount },
    });

    // Add gift amount to the creator
    await prisma.user.update({
      where: { id: creator.id },
      data: { wallet: creator.wallet + amount },
    });

    return context.res.status(200).json({ message: `${user.email} gifted ₹${amount} to ${creator.email}` });
  } catch (error) {
    throw error;
  }
};
