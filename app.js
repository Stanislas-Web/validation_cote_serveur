const express = require("express");
const ejs = require("ejs-blocks");
const sql = require("./config/db_connect")


const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");
app.engine("ejs", ejs);

app.get("/articles", (req, res) => {
    sql.query(`select * from articles`, (error, result) => {
        if (error) 
        {
            throw error;    
        }
        else
        {
            res.render("articles/index", {title: "Articles", articles: result})
        }
    })

    
});

app.get("/articles/ajouter", (req, res) => {
    res.render("articles/ajouter", {title: "Ajouter"})
})


app.listen(port, () => {
    console.log(`le serveur tourne sur le port ${port}`);
    
})

