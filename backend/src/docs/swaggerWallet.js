const swaggerWallet = {
  "/wallet": {
    get: {
      tags: ["Wallet"],
      summary: "Retrieve amount in wallet",
      description: "Get amount in wallet of the user.",
      responses: {
        200: {
          description: "Retrieve amount in wallet",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Wallet fetched successful",
                  },
                  balance: {
                    type: "integer",
                    example: 461,
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

export default swaggerWallet;
