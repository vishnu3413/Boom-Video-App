const swaggerAuth = {
    '/auth/register': {
        post: {
            tags: ['Auth'],
            summary: 'Register a user',
            description: 'Resgiter a new user to the system.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: { type: 'string', example: 'test@gmail.com' },
                                password: { type: 'string', example: '12345' }
                            },
                            example: {
                                email: 'test@gmail.com',
                                password: '12345'
                            }
                        }
                        
                    }
                }
                
            },
            responses: {
                200: {
                    description: 'User registered successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'User registered successfully' },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: '6834312133b6' },
                                            email: { type: 'string', example: 'test@gmail.com' }
                                        }
                                    },
                                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzQzMTIxMzNiNjQ' },
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Failure' }
                                }
                            }
                        }
                    }
                }
            },
            security: [{ bearerAuth: [] }]
        }
    },
    '/auth/login': {
        post: {
            tags: ['Auth'],
            summary: 'Login user',
            description: 'Login an existing user to the system.',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: { type: 'string', example: 'test@gmail.com' },
                                password: { type: 'string', example: '12345' }
                            },
                            example: {
                                email: 'test@gmail.com',
                                password: '12345'
                            }
                        }
                        
                    }
                }
                
            },
            responses: {
                200: {
                    description: 'Login successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Login successful' },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer', example: '6834312133b6' },
                                            email: { type: 'string', example: 'test@gmail.com' }
                                        }
                                    },
                                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzQzMTIxMzNiNjQ' },
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Failure' }
                                }
                            }
                        }
                    }
                }
            },
            security: [{ bearerAuth: [] }]
        }
    },
};

export default swaggerAuth;