import * as videoRepository from '../repositories/videoRepository.js';

// Upload video
export const addVideo = async (req, res) => {
    const context = { req, res };
    try {
        const data = await videoRepository.addVideo(context);
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
};

// Get all videos
export const getAllVideos = async (req, res) => {
    const context = { req, res };
    try {
        const data = await videoRepository.getAllVideos(context);
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
};
