import Avaliacao from "./Avaliacao";

export default class Livro {
    id: number | null;
    titulo: string;
    autor: string;
    anoPublicacao: number;
    isbn: string;
    mediaAvaliacoes: number;
    avaliacoes: Avaliacao[];
  
    constructor(
      id: number | null,
      titulo: string,
      autor: string,
      anoPublicacao: number,
      isbn: string,
      mediaAvaliacoes: number,
      avaliacoes: Avaliacao[]
    ) {
      this.id = id;
      this.titulo = titulo;
      this.autor = autor;
      this.anoPublicacao = anoPublicacao;
      this.isbn = isbn;
      this.mediaAvaliacoes = mediaAvaliacoes;
      this.avaliacoes = avaliacoes;
    }

    obterAvaliacoes(): Avaliacao[] {
      return this.avaliacoes || [];
    }

    static vazio() {
      return new Livro(null, '', '', 0, '', 0, []); // ou qualquer valor padrão desejado
    }
  }

  
  
  
