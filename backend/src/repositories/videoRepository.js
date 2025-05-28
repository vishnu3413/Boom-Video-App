import { PrismaClient } from "@prisma/client";
import cloudinary from "../utils/cloudinary.js";

const prisma = new PrismaClient();

// Upload video
export const addVideo = async (context) => {
  try {
    const { title, description, videoType, price } = context.req.body;

    if (videoType == "Short-Form" && !context.req.file)
      return context.res
        .status(400)
        .json({ message: "No video file provided" });

    if (videoType == "Long-Form" && !context.req.body.videoUrl)
      return context.res.status(400).json({ message: "No video url provided" });

    if (videoType == "Short-Form") {
      const uploadResponse = await cloudinary.uploader.upload(
        context.req.file.path,
        {
          resource_type: "video",
        }
      );

      await prisma.video.create({
        data: {
          title,
          description,
          videoType,
          price: 0,
          videoUrl: uploadResponse.secure_url,
          creatorId: context.req.user.id,
        },
      });
    } else {
      await prisma.video.create({
        data: {
          title,
          description,
          videoType,
          price: videoType === "Long-Form" ? parseInt(price) : 0,
          videoUrl: context.req.body.videoUrl,
          creatorId: context.req.user.id,
        },
      });
    }

    return context.res.status(201).json({ message: "Video uploaded" });
  } catch (error) {
    throw error;
  }
};

// Get all videos
export const getAllVideos = async (context) => {
  try {
    const userId = context.req.user.id;
    const { skip = 0, take = 10 } = context.req.query;

    // Fetch videos sorted by newest
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
      skip: parseInt(skip),
      take: parseInt(take),
      include: {
        creator: { select: { email: true } },
        purchases: { where: { userId } },
      },
    });

    // Map videos to include purchase info for current user
    const feed = videos.map((v) => ({
      id: v.id,
      title: v.title,
      description: v.description,
      videoType: v.videoType,
      videoUrl: v.videoUrl,
      price: v.price,
      creatorName: v.creator.email,
      purchased: v.purchases.length > 0,
      createdAt: v.createdAt,
    }));

    return context.res.status(200).json(feed);
  } catch (error) {
    throw error;
  }
};
