const    name_db = "lecteurs-et-livres-db";
const    port_db = 27017;

module.exports = {
    DB_URI : 'mongodb://localhost:'+ port_db + '/' + name_db,
    SERVER_PORT : 3000 /* expressJS server. Should be read from the server plateform*/
};
