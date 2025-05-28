const swaggerComment = {
  "/comments/{videoId}": {
    post: {
      tags: ["Comments"],
      summary: "Add a comment",
      description: "Add a new comment to a video.",
      parameters: [
        {
          name: "videoId",
          in: "path",
          required: true,
          description: "ID of the video to add comment to",
          schema: { type: "string", example: "1234232" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: { type: "string", example: "dads2233" },
                videoId: { type: "string", example: "dada1212" },
                comment: { type: "string", example: "This is a comment" },
              },
              example: {
                userId: "dads2233",
                videoId: "dada1212",
                comment: "This is a comment",
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
                  message: { type: "string", example: "Comment added" },
                  comment: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "6834312133b6" },
                      userId: { type: "string", example: "6834312133b" },
                      content: { type: "string", example: "This is a comment" },
                      videoId: { type: "string", example: "6834312133b6" },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-05-28T11:34:41.478Z",
                      },
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
    get: {
      tags: ["Comments"],
      summary: "Retrieve a list of comments",
      description: "Get a list of comments on a video.",
      parameters: [
        {
          name: "videoId",
          in: "path",
          required: true,
          description: "ID of the video to add comment to",
          schema: { type: "string", example: "1234232" },
        },
      ],
      responses: {
        200: {
          description: "List of comments",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "68344fadb612da1f47eface3",
                    },
                    content: {
                      type: "string",
                      example: "Nice",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-05-26T11:25:33.644Z",
                    },
                    commenter: {
                      type: "string",
                      example: "test@gmail.com",
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

export default swaggerComment;
