import * as giftRepository from '../repositories/giftRepository.js';

// Gift the creator
export const giftCreator = async (req, res) => {
    const context = { req, res };
    try {
        const data = await giftRepository.giftCreator(context);
        return data;
    } catch (err) {
        console.log(err)
        return "";
    }
};
