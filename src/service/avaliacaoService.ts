import axios from 'axios';
import Avaliacao from '@/core/Avaliacao';

interface ApiResponse {
  content: Avaliacao[];
}

const BASE_URL = 'http://localhost:8080';

export const fetchAvaliacoes = async (): Promise<Avaliacao[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/avaliacoes`);
    return response.data.content;
  } catch (error) {
    console.error('Erro na solicitação:', error);
    throw new Error('Erro ao buscar avaliações');
  }
};

export const cadastrarAvaliacao = async (avaliacao: Avaliacao): Promise<Avaliacao> => {
  try {
    const response = await axios.post<Avaliacao>(`${BASE_URL}/avaliacoes`, avaliacao);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar avaliação:", error);
    throw error;
  }
};

export const atualizarAvaliacao = async (avaliacao: Avaliacao): Promise<Avaliacao> => {
  try {
    const response = await axios.put<Avaliacao>(
      `${BASE_URL}/avaliacoes/${avaliacao.id}`, avaliacao);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar avaliação:", error);
    throw error;
  }
};

export const excluirAvaliacao = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/avaliacoes/${id}`);
  } catch (error) {
    console.error("Erro ao excluir avaliação:", error);
    throw error;
  }
};

export const fetchAvaliacoesPorLivro = async (livroId: string): Promise<Avaliacao[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/avaliacoes/livro/${livroId}`);
    return response.data.content;
  } catch (error) {
    console.error('Erro na solicitação:', error);
    throw new Error('Erro ao buscar avaliações por livro');
  }
};
