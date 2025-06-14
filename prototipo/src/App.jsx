import './App.css'
import React, { useState } from 'react'
import fundo from "./img/fundo.mp4"

function App() {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const [quantidade, setQuantidade] = useState(1);

  const handleBuscar = async () => {
    if (!busca.trim()) return;
    setCarregando(true);
    try {
      const resposta = await fetch('http://localhost:5004/buscar?q=banco')
      if (!resposta.ok) throw new Error('Resultado não encontrado!');
      const dados = await resposta.json();
      console.log(dados);
      setResultados(dados);
    } catch (error) {
      console.error('Erro:', error);
      setResultados([]);
    } finally {
      setCarregando(false);
    }

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleBuscar();
  } 

  return (
    <>
      <video autoPlay muted loop className="bg-video">
        <source src={fundo} type="video/mp4" />
      </video>
            
      <div id='introdução'>
        <h1>FLUXO</h1>
        <h3>ache seu numero verificador, com apenas um click</h3>
        <div className='procura'>
          <input 
            type="text" 
            value={busca} 
            onChange={(e) => setBusca(e.target.value)}
            onKeyPress={handleKeyPress}
            name='nome'
            className='nomeem' 
            placeholder='Digite o nome da empresa' 
          />
          <input
            type="number"
            name="quantidade"
            className="abc"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)} 
          />
          <button onClick={handleBuscar} disabled={carregando}>
            {carregando ? 'Buscando...' : 'Enviar'}
          </button>
        </div>
        <div className="procura">
          {resultados.length > 0 ? (
            <ul>
              {resultados.map((item, index) => (
                <li key={index}>
                  <h3>{item['Nome da empresa']}</h3>
                  <p>CNPJ Completo: {item['CNPJ, CNPJ Completo']}</p>
                </li>
              ))}
            </ul>
          ) : (
            !carregando && <p className='sem-resultados'>Nenhum resultado encontrado</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
