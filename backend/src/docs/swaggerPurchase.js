const swaggerPurchase = {
  "/purchases/{videoId}": {
    post: {
      tags: ["Purchases"],
      summary: "Purchase a video",
      description: "Purchase a new video to watch.",
      parameters: [
        {
          name: "videoId",
          in: "path",
          required: true,
          description: "ID of the video to purchase",
          schema: { type: "string", example: "1234232" },
        },
      ],
      responses: {
        200: {
          description: "Purchase successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Purchase successful" },
                  purchase: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "6834312133b6" },
                      userId: { type: "string", example: "6834312133b" },
                      videoId: { type: "string", example: "6834312133b6" },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-05-28T11:34:41.478Z",
                      },
                    },
                  },
                  newWalletBalance: { type: "integer", example: 480 },
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
    },
  },
  "/purchases": {
    get: {
      tags: ["Purchases"],
      summary: "Retrieve a list of purchased videos",
      description: "Get a list of purchased videos on a video.",
      responses: {
        200: {
          description: "List of purchased videos",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Purchases fetched successful",
                  },
                  purchasedVideos: {
                    type: "array",
                    items: {
                      type: "string",
                      example: "6834578168a0dcd959276b90",
                    },
                  },
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
    },
  },
};

export default swaggerPurchase;
