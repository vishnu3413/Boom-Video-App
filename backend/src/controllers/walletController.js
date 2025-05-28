import * as walletRepository from '../repositories/walletRepository.js';

// Get all comments for a video
export const getWallet = async (req, res) => {
    const context = { req, res };
    try {
        const data = await walletRepository.getWallet(context);
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
};