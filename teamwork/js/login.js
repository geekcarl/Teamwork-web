import FastClick from 'fastclick';
import weui from '../../components/weui';
import Api from './api';
import Vue from '../lib/vue.min';
import RestUrl from './restUrl';

FastClick.attach(document.body);

/* form */
// 约定正则
var regexp = {
    regexp: {
        // IDNUM: /(?:^\d{15}$)|(?:^\d{18}$)|^\d{17}[\dXx]$/,
        // VCODE: /^.{4}$/
        IDNUM: /^\w+$/,
        VCODE: /^.{4}$/
    }
};
// 失去焦点时检测
weui.form.checkIfBlur('#form', regexp);
module.exports = new Vue({
        el: '#tab',
        data: {
            employId: null,
            pwd: null
        },
        methods: {
            submitClick: function() {
                var __this = this;
                weui.form.validate('#form', function (error) {
                    console.log(error);
                    if (!error) {
                        var loading = weui.loading('登录中...');
                        Api.getCall(RestUrl.userLoginUrl, {
                            employId: __this.employId,
                            pwd: __this.pwd
                        }, function(data, errMsg){
                            loading.hide();
                            if(errMsg) {
                                weui.topTips(errMsg);
                            } else if(data) {
                                // weui.alert(response.data.errorMsg);
                                weui.toast('登录成功', 3000);
                            }
                        });

                    }
                }, regexp);
            }
        }
    });
