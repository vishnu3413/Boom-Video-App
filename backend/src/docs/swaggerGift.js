const swaggerGift = {
  "/gifts": {
    post: {
      tags: ["Gifts"],
      summary: "Gift the creator",
      description: "Gift the creator for a video.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                videoId: { type: "string", example: "dada1212" },
                amount: { type: "integer", example: 20 },
              },
              example: {
                videoId: "dada1212",
                comment: 20,
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Comment added",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "test@gmail.com gifted ₹20 to new@gmail.com" }
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Failure" },
                },
              },
            },
          },
        },
      },
      security: [{ bearerAuth: [] }],
    }
  },
};

export default swaggerGift;
