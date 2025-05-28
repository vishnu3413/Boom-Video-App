export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Boom Backend Service',
        version: '1.0.0',
        description: 'API documentation for boom video application',
    },
    servers: [
        {
            url: 'http://localhost:7110',
            description: 'Local server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            User: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', example: 'Pacific' },
                    password: { type: 'string', example: 'Enterprise' }
                },
                example: {
                    email: 'test@gmail.com',
                    password: '12345'
                }
            },
            Video: {
                type: 'object',
                required: ['title', 'description', 'videoType'],
                properties: {
                    title: { type: 'string', example: 'Funny video' },
                    description: { type: 'string', example: 'New comedy treat' },
                    videoType: { type: 'string', example: 'Long-Form' },
                    videoUrl: { type: 'string', example: 'https://www.youtube.com/watch?v=asasasasa' },
                    price: { type: 'integer', example: 20 }
                },
                example: {
                    title: 'Funny video',
                    description: 'New comedy treat',
                    videoType: 'Long-Form',
                    videoUrl: 'https://www.youtube.com/watch?v=asasasasa',
                    price: 20
                }
            },
            Purchase: {
                type: 'object',
                required: ['userId', 'videoId'],
                properties: {
                    userId: { type: 'string', example: '123456ff' },
                    videoId: { type: 'string', example: 'dsv23' }
                },
                example: {
                    userId: '123456ff',
                    videoId: 'dsv23'
                }
            },
            Comment: {
                type: 'object',
                required: ['userId', 'content', 'videoId'],
                properties: {
                    userId: { type: 'string', example: 'asc223' },
                    content: { type: 'string', example: 'Truly funny!!!' },
                    videoId: { type: 'string', format: 'float', example: 'gfw2' }
                },
                example: {
                    userId: 'asc223',
                    content: 'Truly funny!!!',
                    videoId: 'gfw2'
                }
            },
            Error: {
                type: 'object',
                properties: {
                    error: { type: 'string', example: 'Error message' },
                    details: { type: 'string', example: 'Detailed error information' }
                }
            }
        }
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};
