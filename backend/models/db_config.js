const db_name = "lecteurs-et-livres-db";
const db_port = 27017;

module.exports = {
    DB_URI : 'mongodb://localhost:'+ db_port + '/' + db_name,
    SERVER_PORT : 3000 
};
