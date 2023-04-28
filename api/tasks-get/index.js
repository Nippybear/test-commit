const mongoClient = require("mongodb").MongoClient;
const header = req.headers['x-ms-client-principal'];
const encoded = Buffer.from(header, 'base64');
const decoded = encoded.toString('ascii');
const user = JSON.parse(decoded);
const client = await mongoClient.connect(process.env.COSMOSDB_CONNECTION_STRING);
const database = client.db("swa-db");
const response = await database.collection("tasks").find({
    userId: user.userId
});

const tasks = await response.toArray();




module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    const tasks = [
        {
            id: 1,
            label: "Eat",
            status: ""
        },
        {
            id: 2,
            label: "sleep",
            status: ""
        },
        {
            id: 3, 
            label: "Code",
            status: ""
        }
        
    ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}