import 'dotenv/config'      //adicionado para pegar as configurações para funcionar na nuvem
import { ObjectId } from "mongodb";
import conectarAoBanco from "../dbConfig.js";

//Conectar no banco de dados
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

//função assíncrona para pegar todos os posts 
export async function getPosts() {
    //conectando no banco - tabela
    const db = conexao.db("imersao_instabites");
    //capturando os dados dos posts
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

//função para criar um novo post na tabela do banco de dados
export async function criarPost(novoPost) {
    //conectando no banco - tabela
    const db = conexao.db("imersao_instabites");
    //capturando os dados dos posts
    const colecao = db.collection("posts");

    return colecao.insertOne(novoPost)

}


//função para criar um novo post na tabela do banco de dados
export async function atualizarPost(id, novoPost) {
    //conectando no banco - tabela
    const db = conexao.db("imersao_instabites");
    //capturando os dados dos posts
    const colecao = db.collection("posts");

    //obtendo o id do objeto para poder utilizar no mongo
    const objId = ObjectId.createFromHexString(id);

    return colecao.updateOne({ _id: new ObjectId(objId) }, {$set:novoPost})

}
