import './App.css'
import React, { useState } from 'react'
import fundo from "./img/fu

function App() {
  const [quantidade, setQuantidade] = useState(1);
  return (
    <>
      <video autoPlay muted loop className="bg-video">
        <source src={fundo} type="video/mp4" />
      </video>
            
      <div id='introdução'>
        <h1>FLUXO</h1>
        <h3>ache seu numero verificador, com apenas um click</h3>
        <div className='procura'>
          <input type="text" name='nome' className='nomeem' placeholder='Digite o nome da empresa' />
          <input
            type="number"
            name="quantidade"
            className="abc"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)} />
          <button>Enviar</button>
        </div>
        <div className="procura">
          <ul>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
