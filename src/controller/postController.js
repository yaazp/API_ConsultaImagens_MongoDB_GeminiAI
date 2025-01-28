//LIDAR COM AS REQUISIÇÕES E RESPOSTAS (exportando)
import fs from "fs"
import { atualizarPost, criarPost, getPosts } from "../models/postModel.js";
import  { gerarDescricaoComGemini, gerarTextoAlternativoComGemini } from "../services/geminiService.js";

//função para listar todos os posts que estão no banco de dados
export async function listarPosts(req, res) {
    // Buscar todos os posts
    const posts = await getPosts();

    // Enviar uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
}

//função para retornar um texto
export function mandarHello(req, res) {
    // Enviar uma resposta HTTP com status 200 (OK) e os posts no formato string
    res.status(200).send("HELLO DEV!");
}


//função para inserir um novo dado no banco de dados
export async function inserirPost(req, res) {
    const novoPost = req.body;

    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }
    catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

//função para inserir uma imagem nova no banco de dados
export async function uploadImagem(req, res) {
    const novoPost = //req.body;
    {
        descricao: "",
        img_url: req.file.originalname,
        txt_alternativo: "uma descrição para a imagem"
    }
    console.log(novoPost);

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    }
    catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

//função para atualizar um novo dado no banco de dados
export async function atualizarPosts(req, res) {
    
    const id = req.params.id;
    //item feito para conseguir visualizar as imagens no navegador
    const urlImagem = `http://localhost:3000/${id}.png`
    
    try {
        const imagemBuffer = fs.readFileSync(`uploads/${id}.png`)
        const imagemgDesc = await gerarDescricaoComGemini(imagemBuffer); 
        const imagemgTxtAlt = await gerarTextoAlternativoComGemini(imagemBuffer);
        
        const postAtualizado = {
            descricao: imagemgDesc,     //req.body.descricao,
            img_url: urlImagem,
            txt_alternativo: imagemgTxtAlt //req.body.txt_alternativo
        }
        
        const postCriado = await atualizarPost(id, postAtualizado);
        res.status(200).json(postCriado);
    }
    catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}