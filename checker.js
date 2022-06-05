const fs = require('fs');
const request = require('request');

function test_proxy(proxy) {
    request({
        url:'https://httpbin.org/ip',
        method: "GET",
        proxy:'http://' + proxy,
        timeout: 1000
    }, (err, resp, bdy) => {
        if (!err) {
            console.log(`${proxy} - Alive - ${resp.statusCode}`);
            fs.appendFile('alive.txt', proxy + '\n', err => {});
        } else {
            console.log(`${proxy} - Dead`);
        }
    })
}

function main() {
    try {
        var proxies_file = fs.readFileSync('proxies.txt', 'UTF-8');
        const PROXIES = proxies_file.split(/\r?\n/);

        PROXIES.forEach(proxy => {
            test_proxy(proxy.trim());
        });
    } catch (err) {
        console.error(err);
    }
}

main();