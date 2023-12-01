import axios from 'axios';
import Livro from '@/core/Livro';


interface ApiResponse {
  content: Livro[];
}

const BASE_URL = 'http://localhost:8080';

export const fetchLivros = async (): Promise<Livro[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/livros`);
    return response.data.content;
  } catch (error) {
    console.error('Erro na solicitação:', error);
    throw new Error('Erro ao buscar livros');
  }
  
};

export const cadastrarLivro = async (livro: Livro): Promise<Livro> => {
  try {
    const response = await axios.post<Livro>(`${BASE_URL}/livros`, livro);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);
    throw error;
  }
  
};

export const atualizarLivro = async (livro: Livro): Promise<Livro> => {
  try {
    const response = await axios.put<Livro>(
      `${BASE_URL}/livros/${livro.id}`, livro);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    throw error;
  }
};

export const excluirLivro = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/livros/${id}`);
  } catch (error) {
    console.error("Erro ao excluir livro:", error);
    throw error;
  }
  
};

