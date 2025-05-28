import * as commentRepository from '../repositories/commentRepository.js';

// Add comment
export const addComment = async (req, res) => {
    const context = { req, res };
    try {
        const data = await commentRepository.addComment(context);
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
};

// Get all comments for a video
export const getComments = async (req, res) => {
    const context = { req, res };
    try {
        const data = await commentRepository.getComments(context);
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
};