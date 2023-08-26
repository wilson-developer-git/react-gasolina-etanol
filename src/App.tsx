import logoImg from './assets/logo.png';
import './App.css';
import { useState, FormEvent } from 'react';

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

export default function App() {


  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calcular(event: FormEvent){
    event.preventDefault();
    
    const calculo = (alcoolInput / gasolinaInput);
    console.log(calculo)
    if(calculo <= 0.7){
      setInfo({
        title: "Compensa usar álcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }else {
      setInfo({
        title: "Compensa usar gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }

  }

  function formatarMoeda(valor: number) {
    // eslint-disable-next-line prefer-const
    let valorFormatado = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado;
  }

  return (
      <div>
        <main className="container">
          
          <img 
            className="logo"
            src={logoImg}
            alt="Logo da Gasolina Calculadora"
          />
          
          <h1 className="title">Qual melhor opção?</h1>

          <form className="form" onSubmit={calcular}>
            <label>Álcool (preço por litro):</label>
            <input className="input"
              type="number"
              placeholder="0,00"
              min="1"
              step="0.01"
              required
              value={alcoolInput}
              onChange={(e) => setAlcoolInput(Number(e.target.value))}
            />

            <label>Gasolina (preço por litro):</label>
              <input className="input"
                type="number"
                placeholder="0,00"
                min="1"
                step="0.01"
                required
                value={gasolinaInput}
              onChange={(e) => setGasolinaInput(Number(e.target.value))}
              />

              <input className="button" type="submit" value="Calculadora" />
          </form>

          {info && Object.keys(info).length > 0 && (
              <section className="result">
                  <h2 className="result-title">{info.title}</h2>
      
                  <span>Álcool {info.alcool}</span>
                  <span>Gasolina {info.gasolina}</span>
              </section>
          )}
        </main>
      </div>
  )
}

