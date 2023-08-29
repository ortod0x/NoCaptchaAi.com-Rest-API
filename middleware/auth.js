const dotenv = require('dotenv')
const LicenseModel = require('../models/license_model'); // Add this line to import LicenseModel

const Log = require('../utils/logger')

dotenv.config();

const dateTime = require('node-datetime');
const dt = dateTime.create();
const formattedDt = dt.format('Y-m-d');

const auth = () => {

	return async function (req, res, next){
		try{
            const rxbyHeader = req.headers['rxby-license-key'];

			if(!rxbyHeader){
				return res.send({success: false, message: 'access_denied'});
			}

			const user = await LicenseModel.findOne('hwid', rxbyHeader);

			if(!user){
				return res.send({success: false, message: 'invalid_license'});
			}

			const isExpired = await LicenseModel.checkUserLicense('hwid', rxbyHeader);

			if(formattedDt >= isExpired['userResult']['expiredDate']){
				await LicenseModel.setExpired(rxbyHeader);
				return res.send({success: false, message: 'expired_license'});
			}

			req.currentUser = user;
			next();

		} catch (e) {
			e.status = 401;
			next(e);
		}
	}

}


module.exports = auth;