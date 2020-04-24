var http = require('http');

async function getData(){

    let data;
    
    function resolveAfter2Seconds(x) { 
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 2000);
        });
    }
    
    async function f1() {
        var x = await resolveAfter2Seconds(10);
        return x;
    }
    
    data = await f1();
    
    return data;

}

exports.getData = getData;