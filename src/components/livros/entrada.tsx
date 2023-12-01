import React, { useState } from 'react';

interface EntradaProps {
  tipo?: 'text' | 'number' | 'date';
  texto: string;
  valor: string | number | undefined; 
  somenteLeitura?: boolean;
  onChange?: (valor: any) => void; 
}

export default function Entrada(props: EntradaProps) {
  const [valor, setValor] = useState<string | number>(props.valor || '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = props.tipo === 'number' ? parseFloat(event.target.value) : event.target.value;
    setValor(novoValor);
    props.onChange?.(novoValor);
  };

  return (
    <div className="flex flex-col mt-3">
      <label className="mb-2">{props.texto}</label>
      <input
        type={props.tipo || 'text'}
        value={valor}
        readOnly={props.somenteLeitura}
        onChange={handleInputChange}
        className={`
          border border-indigo-500 rounded-lg
          focus:outline-none bg-gray-100 px-4 py-2
          ${props.somenteLeitura ? '' : 'focus:bg-white'}
        `}
      />
    </div>
  );
}
