import * as purchaseRepository from '../repositories/purchaseRepository.js';

// Upload video
export const purchaseVideo = async (req, res) => {
    const context = { req, res };
    try {
        const data = await purchaseRepository.purchaseVideo(context);
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
};

// Get purchased video
export const getPurchasedVideos = async (req, res) => {
    const context = { req, res };
    try {
        const data = await purchaseRepository.getPurchasedVideos(context);
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
};
