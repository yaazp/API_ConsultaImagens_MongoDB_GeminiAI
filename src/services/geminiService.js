import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export  async function gerarDescricaoComGemini(imageBuffer) {
  const prompt =
    "Gere uma descrição em português do brasil para a seguinte imagem. Não inclua comentários.";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}

export  async function gerarTextoAlternativoComGemini(imageBuffer) {
    const prompt =
      "Gere um texto alternativo em português do Brasil de 1 linha para a seguinte imagem. Não inclua comentários. ";
  
    try {
      const image = {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: "image/png",
        },
      };
      const res = await model.generateContent([prompt, image]);
      return res.response.text() || "Alt-text não disponível.";
    } catch (erro) {
      console.error("Erro ao obter alt-text:", erro.message, erro);
      throw new Error("Erro ao obter o alt-text do Gemini.");
    }
  }