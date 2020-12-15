const Admin = require('../models/admin');

exports.addAdminAccount = async (req, res) => {
    try{
        const newAdmin = await new Admin(req.body).save()
        res.send(newAdmin)
    } catch(err) {
        console.log(err);
    }
}
exports.test = async (req, res) => {
    const listAd = await Admin.find()
    res.send(listAd)
}