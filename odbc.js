const sql = process.argv[2];
const eradaniConnect = require('@eradani-inc/eradani-connect');
//const transport = new eradaniConnect.transports.Xml('*LOCAL', 'TEST', 'eradani', { "host": "localhost", "port": 57700, "path": "/cgi-bin/xmlcgi.pgm", debug: true, usePOST: true });
const transport = new eradaniConnect.transports.Odbc('DSN=*LOCAL');
const sqlModel = new eradaniConnect.run.Sql(sql);

async function test() {
    const startTime = +new Date();
    try {
        console.log(`===== Running SQL: ${sql} =====`);
        const results = await transport.execute(sqlModel);
        console.log(results);
        console.log(`===== Retrieved in ${(+new Date()) - startTime}ms =====`);
        return results;
    } catch(e) {
        console.error(e);
        console.log(`===== Errored in ${(+new Date()) - startTime}ms =====`);
        throw e;
    }
}

test();
