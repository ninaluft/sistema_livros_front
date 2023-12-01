import React, { useState } from 'react';
import Avaliacao from '@/core/Avaliacao';
import FormularioAvaliacao from './formularioAvaliacao';
import Livro from '@/core/Livro';
import './ModalAvaliacoes.css';
import Botao from '../livros/botao';
import { excluirAvaliacao } from '@/service/avaliacaoService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from './starRating';

interface ModalAvaliacoesProps {
  livro: Livro | null;
  avaliacoes: Avaliacao[];
  fecharModal: () => void;
}

const ModalAvaliacoes: React.FC<ModalAvaliacoesProps> = ({ livro, avaliacoes, fecharModal }) => {


  const [formularioAberto, setFormularioAberto] = useState(false);
  const [avaliacaoEditada, setAvaliacaoEditada] = useState<Avaliacao | null>(null);
  const [avaliacoesLocais, setAvaliacoesLocais] = useState(avaliacoes);
  const [listaVisivel, setListaVisivel] = useState(true);

  const abrirFormulario = (avaliacao?: Avaliacao) => {
    setAvaliacaoEditada(avaliacao || null);
    setFormularioAberto(true);
    setListaVisivel(false);
  };

  const fecharFormulario = async (avaliacoesAtualizadas: Avaliacao[]) => {
    setAvaliacoesLocais(avaliacoesAtualizadas);
    setAvaliacaoEditada(null);
    setFormularioAberto(false);
    setListaVisivel(true);
  };


  const deletarAvaliacao = async (id: number) => {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir esta avaliação?");
    if (confirmacao) {
      try {
        await excluirAvaliacao(id);
        const avaliacoesAtualizadas = avaliacoesLocais.filter(avaliacao => avaliacao.id !== id);
        setAvaliacoesLocais(avaliacoesAtualizadas);
        toast.success("Avaliação removida com sucesso!");

      } catch (error) {
        console.error("Erro ao excluir avaliação:", error);
        toast.error('Erro ao remover avaliação!');
      }
    }
  };


  return (
    <div className="modal-overlay overlay">
      <div className="modal modal-avaliacoes">
        <div className='flex justify-between'>
          <Botao className="mt-4" cor="bg-gradient-to-r from-green-500 to-green-700" onClick={() => abrirFormulario()}>
            Criar Avaliação
          </Botao>
          <button className='align-top' onClick={fecharModal}> X </button>

        </div>
        <div className="flex justify-between mt-5">
          <h2 className="tituloAvaliacoes mb-5">Avaliações de: "{livro?.titulo}"</h2>
          <p>({avaliacoesLocais.length} avaliações)</p>
        </div>

        {formularioAberto && (
          <FormularioAvaliacao
            avaliacao={avaliacaoEditada}
            fecharFormulario={fecharFormulario}
            livroAssociado={livro}
            avaliacoesLocais={avaliacoesLocais}
          />
        )}

        {listaVisivel && (
          <ul className="lista-avaliacoes">
            {avaliacoesLocais.map((avaliacao) => {
              console.log("ID da Avaliação:", avaliacao.id);
              return (
                <li key={avaliacao.id} className="item-avaliacao">
                  <div>
                    <strong>Nota:</strong> {avaliacao.nota}

                  </div>
                  <div>
                    <StarRating count={5} value={avaliacao.nota} starStyle={{ fontSize: '20px', marginRight: 0 }} />
                  </div>

                  <div>
                    <strong>Comentário:</strong> {avaliacao.comentario}
                  </div>
                  <div className="acoes-avaliacao">
                    <Botao
                      className="mr-3"
                      cor="bg-gradient-to-r from-blue-500 to-blue-700"
                      onClick={() => abrirFormulario(avaliacao)}>
                      Editar
                    </Botao>
                    <Botao
                      className="mr-3"
                      cor="bg-gradient-to-r from-red-500 to-red-700"
                      onClick={() => avaliacao.id !== null && deletarAvaliacao(avaliacao.id)}>
                      Deletar
                    </Botao>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalAvaliacoes;
