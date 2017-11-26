const DEBUG = true;
module.exports = {
    genRqParam : map => {
        var params = '';
        map.forEach(element => {
            params += element + '=' + map[element] + '&';
        });
        return params.substr(0, params.length-1);
    },
    l : content => {
        if(DEBUG){
            console.log(content);
        }
    },
    e : content => {
        console.log(content);
    },


};