import Livro from './Livro';


export default class Avaliacao {
  id: number | null;
  livro: Livro;
  comentario: string;
  nota: number;

  constructor(id: number | null, livro: Livro, comentario: string, nota: number) {
    this.id = id;
    this.livro = livro;
    this.comentario = comentario;
    this.nota = nota;

  }
  
}
