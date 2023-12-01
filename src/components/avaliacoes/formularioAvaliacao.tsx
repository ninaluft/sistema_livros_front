import React, { useEffect, useState } from 'react';
import Avaliacao from '@/core/Avaliacao';
import Entrada from '../livros/entrada';
import Botao from '../livros/botao';
import Livro from '@/core/Livro';
import { atualizarAvaliacao, cadastrarAvaliacao } from '@/service/avaliacaoService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from './starRating';

interface FormularioAvaliacaoProps {
  avaliacao?: Avaliacao | null;
  fecharFormulario: (avaliacoesAtualizadas: Avaliacao[]) => void;
  avaliacaoMudou?: (avaliacao: Avaliacao) => void;
  livroAssociado?: Livro | null;
  avaliacoesLocais: Avaliacao[];
}

export default function FormularioAvaliacao(props: FormularioAvaliacaoProps) {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(props.avaliacao?.id ?? null);
  const [nota, setNota] = useState<number | undefined>(props.avaliacao?.nota);
  const [comentario, setComentario] = useState(props.avaliacao?.comentario);

  useEffect(() => {
    setId(props.avaliacao?.id ?? null);
    setNota(props.avaliacao?.nota);
    setComentario(props.avaliacao?.comentario);
  }, [props.avaliacao]);

  const handleSalvar = async () => {
    if (nota !== undefined && props.livroAssociado) {
      if (!comentario) {
        setMensagem("Por favor, forneça um comentário.");
        return;
      }

      try {
        const avaliacaoEditada = new Avaliacao(id, props.livroAssociado, comentario, nota);

        if (id) {
          await atualizarAvaliacao(avaliacaoEditada);
          const avaliacoesAtualizadas = props.avaliacoesLocais.map((avaliacao) =>
            avaliacao.id === id ? avaliacaoEditada : avaliacao
          );

          props.fecharFormulario(avaliacoesAtualizadas);
          props.avaliacaoMudou?.(avaliacaoEditada);
          toast.success("Alterado com sucesso!");
        } else {
          const avaliacaoCriada = await cadastrarAvaliacao(avaliacaoEditada);
          const avaliacoesAtualizadas = [...props.avaliacoesLocais, avaliacaoCriada];

          props.fecharFormulario(avaliacoesAtualizadas);
          props.avaliacaoMudou?.(avaliacaoCriada);
          toast.success("Salvo com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao salvar/atualizar avaliação:", error);
        toast.error("Erro ao salvar/atualizar avaliação.");
      }
    } else {
      setMensagem("Por favor, forneça a nota.");
    }
  };

  return (
    <div>
      {mensagem && <div className="mensagem text-red-500">{mensagem}</div>}

      <label>Nota:</label>  
      <StarRating count={5} value={nota} onChange={(value) => setNota(value)} starStyle={{ fontSize: '35px', marginRight:2}} />

      <Entrada texto="Comentário:" valor={comentario} onChange={setComentario}></Entrada>
      <div className="flex justify-end mt-5">
        <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700" onClick={() => handleSalvar()}>
          {id ? 'Alterar' : 'Salvar'}
        </Botao>
        <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700" onClick={() => props.fecharFormulario(props.avaliacoesLocais)}>
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
