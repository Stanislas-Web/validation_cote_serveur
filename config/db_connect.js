const mysql = require("mysql");

const sql = mysql.createConnection({
    host: "localhost",
    user: "Stanislas",
    password: "Stanislas2020@",
    database: "jojo"
});

sql.connect( (error) => {
    if (error) 
    {
        throw error    
    }
    else
    {
        console.log("la connexion est etabli");
        
    }
});

module.exports = sql;
