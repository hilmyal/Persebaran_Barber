var developmentDatabase = {
    postgres: {
    host: 'ec2-54-154-101-45.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'dbkm7m6tlkd44p',
    user: 'nhyaxbbvrrkknq',
    password: '574fa383d33c62783130e664cf843c270a9b6861583f325e4f890facfdd4e890',
    }
    }
    
    var connectionString ="postgres://nhyaxbbvrrkknq:574fa383d33c62783130e664cf843c270a9b6861583f325e4f890facfdd4e890@ec2-54-154-101-45.eu-west-1.compute.amazonaws.com:5432/dbkm7m6tlkd44p?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }