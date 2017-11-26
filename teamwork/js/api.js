import axios from 'axios';
import Utils from './utils';

module.exports = {
    responseOK:200,
    responseMsg: data => {
        if(!data) return '';
        return data.errorMsg;
    },
    getCall : function(url, params, callback) {
        axios.get(url, {
            params: params
        })
        .then(function (response) {
            Utils.l( 'response : ' + response);
            if(!response || 200 !== response.status) {
                callback(null, '服务异常');
                Utils.l(url + ' 服务异常');
            }else if(response.data.code !== 200) {
                callback(null, response.data.errorMsg);
                Utils.l(url + response.data.errorMsg);
            }else{
                callback(response.data, null);
                Utils.l(response.data.payload);
            }
        })
        .catch(function (error) {
            Utils.e('error : ' + error);
            callback(null, '服务不可用');
        });
    }

};