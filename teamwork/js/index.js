import FastClick from 'fastclick';
import weui from '../../components/weui';

FastClick.attach(document.body);

// 表单提交
document.querySelector('#formSubmitBtn').addEventListener('click', function () {
        location = '../login.html';
        console.log('login...');
    });


document.querySelector('#formRegisterBtn').addEventListener('click', function () {
        location = '../register.html';
        console.log('register...');
    });


document.querySelector('#wxLoginBtn').addEventListener('click', function () {
        location = '/wx/login';
        console.log('wx login...');
    });
