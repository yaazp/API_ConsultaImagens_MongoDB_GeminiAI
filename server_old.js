import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 2,
        descricao: "Gatinho fofo",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 3,
        descricao: "Gato dormindo",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 4,
        descricao: "Gato brincando",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 5,
        descricao: "Gato curioso",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 6,
        descricao: "Gato com chapéu",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 7,
        descricao: "Gato no jardim",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 8,
        descricao: "Gato na janela",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 9,
        descricao: "Gato preto",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 10,
        descricao: "Gato branco",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 11,
        descricao: "Gato laranja",
        imagem: "https://placecats.com/millie/300/150",
    }
];


//instanciar o express (servidor)
const app = express();

//indicar que as respostas serão em Jason ("serializar")
app.use(express.json());

//iniciar o servidor
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

//função assíncrona para pegar todos os posts 
async function getPosts() {
    //conectando no banco - tabela
    const db = conexao.db("imersao_instabites");

    //capturando os dados dos posts
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

//definindo uma rota
app.get("/api", (req, res) => {
    res.status(200).send("HELLO DEV!");     //status(200) --> status de resposta http.cat
});


app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.status(200).json(posts);     
});


//função para buscar imagem de acordo com id
function buscarPostPorId(id){
    return posts.findIndex((post) => {
       return post.id === Number(id)
    })
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id) //utilizamos o parametro da requisição para pegar o id
    res.status(200).json(posts[index]);     
});