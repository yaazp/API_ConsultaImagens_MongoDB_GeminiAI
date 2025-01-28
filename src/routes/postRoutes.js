import express from "express";
import multer from "multer";
import cors from "cors";
import { atualizarPosts, inserirPost, listarPosts, mandarHello, uploadImagem } from "../controller/postController.js";


//meio de acesso para front que tem um local host diferente
const corsOptions ={
    origin: "http://localhost:8000", 
    optionsSuccessStatus: 200
}

//código utilizado para que o multer funcione corretamente no windows (O mesmo nome da pasta vai ser o mesmo da cloud)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})
//const upload = multer({ dest: "./uploads" })

//empacotando todas as rotas
const routes = (app) => {
    //indicar que as respostas serão em Jason ("serializar")
    app.use(express.json());

    //indicar que o local host do front pode acessar
    app.use(cors(corsOptions));

    //rota para buscar API
    app.get("/api", mandarHello);
    //rota para buscar POSTS
    app.get("/posts", listarPosts);
    
    //rota para inserir POST 
    app.post("/posts", inserirPost)
    app.post("/upload", upload.single("imagem"), uploadImagem)

    //rota para atualizar PUT
    app.put("/upload/:id", atualizarPosts)    

}

//exportando rotas
export default routes;