const swaggerVideo = {
  "/videos": {
    post: {
      tags: ["Videos"],
      summary: "Upload a video",
      description: "Upload a new video to the feed.",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "My Video Title",
                },
                description: {
                  type: "string",
                  example: "This is a description of the video.",
                },
                videoType: {
                  type: "string",
                  example: "mp4",
                },
                price: {
                  type: "number",
                  example: 9.99,
                },
                video: {
                  type: "string",
                  example: "https://www.youtube.com/watch?v=asasasasa",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Video uploaded",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Video uploaded" },
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
      tags: ["Videos"],
      summary: "Retrieve a list of all videos",
      description: "Get a list of all videos in the system.",
      responses: {
        200: {
          description: "List of all videos",
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
                    title: {
                      type: "string",
                      example: "New Music",
                    },
                    description: {
                      type: "string",
                      example: "music",
                    },
                    videoType: {
                      type: "string",
                      example: "Long-Form",
                    },
                    videoUrl: {
                      type: "string",
                      example: "https://www.youtube.com/watch?v=6EEW-9",
                    },
                    price: {
                      type: "integer",
                      example: 20,
                    },
                    creatorName: {
                      type: "string",
                      example: "test@gmail.com",
                    },
                    purchased: {
                      type: "boolean",
                      example: true,
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-05-26T11:25:33.644Z",
                    }
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

export default swaggerVideo;
