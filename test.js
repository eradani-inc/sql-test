const limit = parseInt(process.argv[2], 10);
const sql = process.argv[3];
const eradaniConnect = require('@eradani-inc/eradani-connect');
// const transport = new eradaniConnect.transports.Xml('*LOCAL', 'TEST', 'eradani', { "host": "localhost", "port": 57700, "path": "/cgi-bin/xmlcgi.pgm", debug: true, usePOST: true });
const transport = new eradaniConnect.transports.Odbc('DSN=*LOCAL');
const sqlModel = new eradaniConnect.run.Sql(sql);

async function test(limit) {
    const promises = [];
    for (let i = 0; i < limit; i++) {
        promises.push(transport.execute(sqlModel));
    }
    return Promise.all(promises);
}

let startTime;
test(1).then(() => {
    console.log(`===== Initialization Complete. Testing SQL ${limit} Times =====`);
    startTime = +new Date();
}).then(() => test(limit)).then(results => {
    console.log(`===== Test completed ${limit} executions in ${+new Date() - startTime}ms =====`);
});
