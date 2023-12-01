'use client';
import Botao from "@/components/livros/botao";
import FormularioLivro from "@/components/livros/formulario";
import Layout from "@/components/livros/layout";
import TabelaLivros from "@/components/livros/tabela";
import Livro from "@/core/Livro";
import { atualizarLivro, cadastrarLivro, excluirLivro, fetchLivros } from "../../service/livroService";
import { useEffect, useState } from "react";
import "./page.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Livros() {

  const [livro, setLivro] = useState<Livro>(Livro.vazio())
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [livros, setLivros] = useState<Livro[]>([]);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  

  useEffect(() => {
    if (visivel === 'tabela' && !modalAberto) {
      const loadLivros = async () => {
        try {
          const dados = await fetchLivros();
          setLivros(dados);
        } catch (error) {
          console.error("Erro ao buscar livros:", error);
        }
      }
  
      loadLivros();
    }
  }, [visivel, modalAberto]);


  function livroSelecionado(livro: Livro) {
    setLivro(livro)
    setVisivel('form')
  }

  function novoLivro() {
    setLivro(Livro.vazio())
    setVisivel("form")
  }

  async function livroExcluido(livro: Livro) {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir este livro?");
    if (confirmacao) {
      try {
        if (livro.id !== null) {
          await excluirLivro(livro.id);
          toast.success('Livro deletado com sucesso!');
        } else {
          console.error("livroId é null!");
        }
        setLivros(prevLivros => prevLivros.filter(lv => lv.id !== livro.id));
      } catch (error) {
        console.error("Erro ao excluir livro:", error);
        toast.error('Erro ao excluir livro!');
      }
    }
  }

  function salvarOuAlterarLivro(livro: Livro) {
    if (livro.id) {
      alterarLivro(livro)
    } else {
      salvarLivro(livro)
    }
  }

  async function alterarLivro(livro: Livro) {
    try {
      const livroAtualizado = await atualizarLivro(livro);
      setVisivel("tabela");
  
      toast.success('Livro atualizado com sucesso!');
    console.log("livro alterado")

    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      toast.error('Erro ao atualizar livro!');
    }
  }
  
  async function salvarLivro(livro: Livro) {
    try {
      const novoLivro = await cadastrarLivro(livro);
      setVisivel("tabela");
      toast.success('Livro salvo com sucesso!');

    } catch (error) {
      console.error("Erro ao salvar livro:", error);
      toast.error('Erro ao salvar livro, informe o título!');
    }
  }


  return (
    <div className={`flex-container`}>
      <Layout titulo="Livros">
        
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              
              <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                onClick={() => novoLivro()}>
                Novo livro
              </Botao>
            </div>
            <div className="table-container">
            <TabelaLivros livros={livros}
              livroSelecionado={livroSelecionado}
              livroExcluido={livroExcluido}></TabelaLivros>
              </div>
          </>
        ) : (
          <FormularioLivro livro={livro}
            livroMudou={salvarOuAlterarLivro}
            cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}
