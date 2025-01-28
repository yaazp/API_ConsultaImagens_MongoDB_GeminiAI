import express from "express";
import routes from "./src/routes/postRoutes.js";

const app = express();
app.use(express.static("uploads")) //indicando que estamos abrindo a pasta das imagens | servir arquivos estáticos
routes(app)

//iniciar o servidor
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

