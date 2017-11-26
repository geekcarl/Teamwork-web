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
        //用户名正则，4到16位（字母，数字，下划线，减号）
        NAME: /^[a-zA-Z0-9_-]{4,16}$/,
        //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        PWD: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
        IDNUM: /^\w+$/,
        VCODE: /^.{4}$/
    }
};
// 失去焦点时检测
weui.form.checkIfBlur('#form', regexp);
module.exports = new Vue({
        el: '#tab',
        data: {
            name: 'zengdaxin',
            pwd: null,
            pwd2: null,
            employId: 'wx406690',
            tel: '18317068408'
        },
        methods: {
            submitClick: function() {
                var __this = this;
                if(this.pwd !== this.pwd2) {
                    weui.topTips('两次密码不一致');
                    return;
                }
                weui.form.validate('#form', function (error) {
                    console.log(error);
                    if (!error) {
                        var loading = weui.loading('注册中...');
                        Api.getCall(RestUrl.userRegisterUrl, {
                            name: __this.name,
                            pwd: __this.pwd,
                            employId: __this.employId,
                            tel: __this.tel
                        }, function(data, errMsg){
                            loading.hide();
                            if(errMsg) {
                                weui.topTips(errMsg);
                            } else if(data) {
                                // weui.alert(response.data.errorMsg);
                                weui.toast('注册成功', 3000);
                            }
                        });

                    }
                }, regexp);
            }
        }
    });
