import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Purchase video
export const purchaseVideo = async (context) => {
  try {
    const userId = context.req.user.id;
    const { videoId } = context.req.params;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const video = await prisma.video.findUnique({ where: { id: videoId } });

    if (!video)
      return context.res.status(404).json({ message: "Video not found" });
    if (video.price === 0)
      return context.res.status(400).json({ message: "Video is free" });

    const alreadyPurchased = await prisma.purchase.findFirst({
      where: { userId, videoId },
    });

    if (alreadyPurchased)
      return res.status(400).json({ message: "Video already purchased" });

    if (user.wallet < video.price)
      return res.status(400).json({ message: "Insufficient balance" });

    // Deduct price from wallet & record purchase
    await prisma.user.update({
      where: { id: userId },
      data: { wallet: user.wallet - video.price },
    });

    const purchase = await prisma.purchase.create({
      data: {
        userId,
        videoId,
      },
    });

    return context.res
      .status(201)
      .json({
        message: "Purchase successful",
        purchase,
        newWalletBalance: user.wallet - video.price,
      });
  } catch (error) {
    throw error;
  }
};

// Get purchased video
export const getPurchasedVideos = async (context) => {
  try {
    const userId = context.req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return context.res.status(404).json({ message: "User not found" });

    const purchases = await prisma.purchase.findMany({
      where: { userId: userId },
    });
    const purchasedVideos = purchases.map((purchase) => purchase.videoId);

    return context.res
      .status(200)
      .json({ message: "Purchases fetched successful", purchasedVideos });
  } catch (error) {
    throw error;
  }
};
