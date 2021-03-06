import React, { useState } from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import gifCarregando from '../src/images/loading.gif'
import {MdAddAPhoto, MdClear} from "react-icons/md"

//JSX - Java Script eXtension
//Hook
function App(){
  const[pessoas, setPessoas] = useState([])
  const[carregando, setCarregando] = useState(false)
  const[idade, setIdade] = useState('')
  const[etnia, setEtnia] = useState('')
  const estiloIcone = background: 'cadetblue', fontSize: '1.1em'}

  function ListaPessoas(){
    const listagemPessoas= pessoas.map((pessoa)=>
    <img key={pessoa.id} src={pessoa.urls[4][512]} title="Gerada por IA"
         alt="Gerada por IA" />
    )
    return (
      <> {listagemPessoas}</>
    )
  }

  async function obterFoto(){
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY

    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtraIdade = etnia.length > 0 ? `&age=${idade}` : ''
    /* Versão extensa do comando acima
    if(etnia.legnth > 0 ){
      filtraEtnia = `&ethnicity =${etnia}`
    else {
      filtraEtnia = ''
      }
    */
    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtnia}${filtraIdade}&order_by=random`
    await fetch(url)
    .then(response => response.json())
    .then (data => {
      setPessoas(data.faces)
      console.log('Dados carregados com sucesso!')
    })
    .catch(function (error) {
      console.error('Houve um problema na requisição: '+error.message)
    })
    setCarregando(false)
  }

  return(
    <div className="App">
      <h1>Gerador de Fotos via IA</h1>
      <Robot />
      {carregando &&
        <img src= {gifCarregando} title="Aguarde..." alt="Aguarde, dados sendo carregados" />
      }
      <div className= "linha">
            <ListaPessoas />
            </div>
      
      <div className="linha">
          <label>Idade:</label>
          <select onChange={event => setIdade(event.target.value)}>
            <option value="">Todas</option>
            <option value="infant">Infantil</option>
            <option value="child">Criança</option>
            <option value="young-adult">Jovem</option>
            <option value="adult">Adulo</option>
            <option value="elderly">Idoso</option>
          </select>
          <label>Etinia:</label>
          <select onChange={e => setEtnia(e.target.value)}>
            <option value="">Todas</option>
            <option value="latino">Latina</option>
            <option value="asian">Asiática</option>
            <option value="white">Branca</option>
            <option value="black">Negra</option>
          </select>
      </div>

            <div className="linha">
            <button type='button' onClick={obterFoto}>
              <MdAddAPhoto style={estiloIcone}/> Obter Imagens
            </button>
            {/* Exemplo de chamada de uma arrow function */}
            {pessoas.length > 0 &&
            <button type='button' onClick={() => setPessoas([])}>
              <MdClear style={estiloIcone}  /> Limpar Imagens
            </button>
            }
      </div>
    </div>
  )
}

export default App