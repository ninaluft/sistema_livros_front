// TabelaLivros.tsx
import React, { useState } from 'react';
import Livro from '@/core/Livro';
import Avaliacao from '@/core/Avaliacao';
import { IconeEdicao, IconeLixo, IconeLupa } from '../icones/tabela';
import ModalAvaliacoes from '../avaliacoes/modalAvaliacoes';
import "./tabela.css";

interface TabelaLivrosProps {
  livros: Livro[];
  livroSelecionado?: (livro: Livro) => void;
  livroExcluido?: (livro: Livro) => void;
}

export default function TabelaLivros(props: TabelaLivrosProps) {
  const exibirAcoes = props.livroSelecionado || props.livroExcluido;

  const [modalAberto, setModalAberto] = useState(false);
  const [avaliacoesModal, setAvaliacoesModal] = useState<Avaliacao[]>([]);
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

  const [termoPesquisa, setTermoPesquisa] = useState("");


  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-3">id</th>
        <th className="text-left p-3">Título</th>
        <th className="text-left p-3">Autor</th>
        <th className="text-left p-3">Ano de Publicação</th>
        <th className="text-left p-3">ISBN</th>
        <th className="text-left p-3">Avaliações</th>
        {exibirAcoes && <th className="p-3">Ações</th>}
      </tr>
    );
  }

  function abrirModalAvaliacoes(livro: Livro) {
    setAvaliacoesModal(livro.avaliacoes);
    setLivroSelecionado(livro);
    setModalAberto(true);
  }

  function renderDados() {
    const livrosFiltrados = props.livros.filter((livro) =>
      livro.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      livro.autor.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      livro.isbn.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      livro.anoPublicacao.toString().includes(termoPesquisa)
    );

    return livrosFiltrados.map((livro, i) => (


      <tr key={livro.id} className={`${i % 2 === 0 ? 'bg-slate-100' : 'bg-slate-300'}`}>
        <td className="text-left p-3">{livro.id}</td>
        <td className="text-left p-3">
          <button
            onClick={() => abrirModalAvaliacoes(livro)}
            className=" text-gray-900 p-2 rounded-md hover:bg-white"
          >
            {livro.titulo}
          </button>
        </td>
        <td className="text-left p-3">{livro.autor}</td>
        <td className="text-left p-3">{livro.anoPublicacao}</td>
        <td className="text-left p-3">{livro.isbn}</td>
        <td className="text-left p-3">{livro.mediaAvaliacoes.toFixed(2)}</td>
        {renderizarAcoes(livro)}
      </tr>
    ));
  }

  function renderizarAcoes(livro: Livro) {
    return (
      <td className="flex justify-center">
        {props.livroSelecionado && (
          <button
            onClick={() => props.livroSelecionado?.(livro)}
            className={`flex justify-center items text-green-600 rounded-full p-2 m-1 hover:bg-gray-100`}
          >
            {IconeEdicao}
          </button>
        )}
        {props.livroExcluido && (
          <button
            onClick={() => props.livroExcluido?.(livro)}
            className={`flex justify-center items text-red-600 rounded-full p-2 m-1 hover:bg-gray-100`}
          >
            {IconeLixo}
          </button>
        )}
      </td>
    );
  }

  return (
    <div>
      <div className="pesquisa-container">
        <label className="icone-lupa-label text-gray-500">{IconeLupa}</label>
        <input
          type="text"
          placeholder="Pesquisar por Título/Autor/Ano/ISBN..."
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="pesquisa-input text-gray-600 "
        />
      </div>

      <table className="w-full rounded-xl overflow-hidden ">
        <thead className={`text-gray-100 bg-gradient-to-r from-gray-700 to-gray-900`}>
          {renderHeader()}
        </thead>
        <tbody>{renderDados()}</tbody>
      </table>

      {modalAberto && (
        <ModalAvaliacoes
          livro={livroSelecionado}
          avaliacoes={avaliacoesModal}
          fecharModal={() => {
            setModalAberto(false);

          }}
        />
      )}
    </div>
  );
}


