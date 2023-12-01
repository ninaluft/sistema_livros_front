'use client';
import Entrada from "./entrada";
import { useState } from "react";
import Botao from "./botao";
import Livro from "@/core/Livro";

interface FormularioLivroProps {
  livro: Livro;
  livroMudou?: (livro: Livro) => void;
  cancelado?: () => void;
}

export default function FormularioLivro(props: FormularioLivroProps) {
  const id = props.livro?.id;
  const [titulo, setTitulo] = useState(props.livro?.titulo);
  const [autor, setAutor] = useState(props.livro?.autor);
  const [anoPublicacao, setAnoPublicacao] = useState(props.livro?.anoPublicacao);
  const [isbn, setIsbn] = useState(props.livro?.isbn);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  const handleSalvar = () => {
    if (!titulo) {
      setMensagemErro("Por favor, forneça um título.");
      return;
    }

    setMensagemErro(null);

    const novoLivro = new Livro(id, titulo, autor, anoPublicacao, isbn, 0, []);
    props.livroMudou?.(novoLivro);
  };

  return (
    <div>
      {id ? (
        <Entrada texto="id" valor={id} somenteLeitura></Entrada>
      ) : (
        false
      )}
      {mensagemErro && (
        <div style={{ color: 'red' }} className="mensagem">
          {mensagemErro}
        </div>
      )}
      <Entrada texto="Título" valor={titulo} onChange={setTitulo}></Entrada>

      <Entrada texto="Autor" valor={autor} onChange={setAutor}></Entrada>
      <Entrada
        texto="Ano de Publicação"
        tipo="number"
        valor={anoPublicacao}
        onChange={setAnoPublicacao}
      ></Entrada>
      <Entrada texto="ISBN" valor={isbn} onChange={setIsbn}></Entrada>
      <div className="flex justify-end mt-5">
        <Botao
          className="mr-3"
          cor="bg-gradient-to-r from-blue-500 to-blue-700"
          onClick={handleSalvar}
        >
          {id ? "Alterar" : "Salvar"}
        </Botao>
        <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700" onClick={props.cancelado}>
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
