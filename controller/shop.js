const Shop = require('../models/shop');

exports.createShop = async (req, res) => {
    try {
        const newShop = await Shop(req.body).save();
        res.send(newShop)
    } catch (error) {
        console.log(error);
    }
}
exports.shopAddMenu = async (req, res) => {
    try {
        const shop = await Shop.findById(req.token._id)
        shop.menu = shop.menu.concat(req.body)
        await shop.save();
        res.send(shop.menu)
        
    } catch (error) {
        console.log(error);
    }
}
