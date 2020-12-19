const Admin = require('../models/admin');
const Shop = require('../models/shop')

exports.addAdminAccount = async (req, res) => {
    try{
        const newAdmin = await new Admin(req.body).save()
        res.send(newAdmin)
    } catch(err) {
        console.log(err);
    }
}

exports.getListShop = async (req, res) => {
    const listShop = await Shop.find()
    res.send(listShop)
}

exports.approvalShop = async (req, res) => {
    const shopApproval = await Shop.findById(req.params.id)
    shopApproval.statuses = "active"
    await shopApproval.save()
    res.send(shopApproval)
}

exports.test = async (req, res) => {
    const listAd = await Admin.find()
    res.send(listAd)
}