const axios = require('axios');
const Log = require('../utils/logger');

const endpointApi = "https://token.nocaptchaai.com";

class ApiController {
    inApi = async (req, res, next) => {
        const apiKey = process.env.NO_CAPTCHA_AI_API_KEY;
        const method = req.body.method;
        const siteKey = req.body.sitekey;
        const pageurl = req.body.pageurl;

        if(!apiKey || !method || !siteKey || !pageurl){
            return res.send({success: false, data: 'missing_parameter'});
        } else {
            try {
                const response = await axios.post(
                    endpointApi + '/in.php',
                    'key='+apiKey+'&method='+method+'&sitekey='+siteKey+'&pageurl='+pageurl, {
                        headers: {
                            'User-Agent': 'NoCaptchaAI/RestAPICallback'
                        },
                        timeout: 120000, // Set timeout to 2 minute (120,000 milliseconds)
                    }
                );
                const responseData = response.data;
                const responseSplit = responseData.split('|');
                const responseStatus = responseSplit[0];
                const responseId = responseSplit[1];
                if(responseStatus === 'OK'){
                    return res.send({success: true, data: responseId});
                } else {
                    Log.error("Error triggered in inApi (api_controller.js) on line 38\nError: " + responseData);
                    return res.send({success: false, data: "Error"});
                }
            } catch(e) {
                Log.error("Error triggered in inApi (api_controller.js) on line 42\nError: " + e);
                return res.send({success: false, data: 'something_went_wrong'});
            }
        }
    }

    resApi = async (req, res, next) => {
        const apiKey = process.env.NO_CAPTCHA_AI_API_KEY;
        const id = req.body.id;

        if(!apiKey || !id){
            return res.send({success: false, data: 'missing_parameter'});
        } else {
            try {
                const response = await axios.get(
                    endpointApi + '/res.php?key='+apiKey+'&action=get&id='+id, {
                        headers: {
                            'User-Agent': 'NoCaptchaAI/RestAPICallback'
                        },
                        timeout: 120000, // Set timeout to 2 minute (120,000 milliseconds)
                    }
                );
                const responseData = response.data;
                const responseSplit = responseData.split('|');
                const responseStatus = responseSplit[0];
                const responseToken = responseSplit[1];
                if(responseStatus === 'OK'){
                    return res.send({success: true, data: responseToken});
                } else {
                    Log.error("Error triggered in resApi (api_controller.js) on line 72\nError: " + responseData);
                    return res.send({success: false, data: "Error"});
                }
            } catch (e){
                Log.error("Error triggered in resApi (api_controller.js) on line 67\nError: " + e);
                return res.send({success: false, data: 'something_went_wrong'});
            }
        }
    }
}

module.exports = new ApiController;