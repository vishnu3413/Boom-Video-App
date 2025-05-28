import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerDefinition } from '../docs/swaggerDefinition.js';  // Base Swagger definition
import swaggerAuth from '../docs/swaggerAuth.js';  // Auth  API documentation
import swaggerComment from '../docs/swaggerComment.js';  // Comment  API documentation
import swaggerGift from '../docs/swaggerGift.js';  // Gift  API documentation
import swaggerPurchase from '../docs/swaggerPurchase.js';  // Purchase  API documentation
import swaggerVideo from '../docs/swaggerVideo.js';  // Video  API documentation
import swaggerWallet from '../docs/swaggerWallet.js';  // Wallet  API documentation

// Generate the base Swagger specification
const swaggerSpec = swaggerJsDoc({
    definition: swaggerDefinition,
    apis: [],  // APIs are combined manually
});

// Combine all paths into a single Swagger spec
const combinedSwaggerSpec = {
    ...swaggerSpec,
    paths: {
        ...swaggerSpec.paths,  // Base paths from the generated Swagger spec
        ...swaggerAuth,
        ...swaggerComment,
        ...swaggerGift,
        ...swaggerPurchase,
        ...swaggerVideo,
        ...swaggerWallet
        // Add other paths here
    }
};

// Export the combined Swagger specification and the Swagger UI setup
export { combinedSwaggerSpec, swaggerUi };
