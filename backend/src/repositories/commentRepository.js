import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add comment
export const addComment = async (context) => {
  try {
    const userId = context.req.user.id;
    const { videoId } = context.req.params;
    const { content } = context.req.body;

    const video = await prisma.video.findUnique({ where: { id: videoId } });
    if (!video)
      return context.res.status(404).json({ message: "Video not found" });

    const comment = await prisma.comment.create({
      data: {
        userId,
        videoId,
        content,
      },
    });

    return context.res.status(201).json({
      message: "Comment added",
      comment,
    });
  } catch (error) {
    throw error;
  }
};

// Get all comments for a video
export const getComments = async (context) => {
  try {
    const { videoId } = context.req.params;

    const comments = await prisma.comment.findMany({
      where: { videoId },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { email: true } } },
    });

    const formattedComments = comments.map((c) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      commenter: c.user.email,
    }));

    return context.res.status(200).json(formattedComments);
  } catch (error) {
    throw error;
  }
};
