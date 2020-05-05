const express = require("express");
const ejs = require("ejs-blocks");
const bodyParser = require("body-parser");
const sql = require("./config/db_connect");
const { check, validationResult} = require("express-validator");

const validation = [
    check("nom","Le nom de l'article doit avoir au moins 3 caracteres").isLength({min:3, max: 20}),
    check("type","Le type de l'article doit avoir au moins 5 caracteres").isLength({min:5, max: 20}),
    check("prix","Le prix doit etre un chiffre ").isInt(),
    check("marque","la marque ne doit pas etre vide ").isLength({min:1}),
    check("quantite","La quantite doit etre un chiffre ").isInt(),
    check("taille","La taille doit etre un chiffre ").isInt(),
]

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

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
    res.render("articles/ajouter", {title: "Ajouter", form :null, erreurs : null})
})

app.post("/articles",validation,(req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors.array());
        
        return res.render("articles/ajouter", {title : "Ajouter", erreurs: errors.array(), form : req.body})
    }

    sql.query(`insert into articles(nom, type, prixUHT, marque, quantite, taille ) values(?,?,?,?,?,?)`,[req.body.nom,req.body.type,parseInt(req.body.prix), req.body.marque,parseInt(req.body.quantite),parseInt(req.body.taille)],(error, result)=>{
        if (error){
            throw error
        }else{
            return res.redirect("/articles");
        }
    })
})


app.listen(port, () => {
    console.log(`le serveur tourne sur le port ${port}`);
    
})

