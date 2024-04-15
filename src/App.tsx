import './App.css'
import axios from 'axios';
import { useState } from 'react';
import FormatNum from "./utils/formatNum"

export interface USD {
  USDBRL: MoneyControl
}

export interface BRL {
  BRLUSD: MoneyControl
}

export interface MoneyControl {
  code: string,
  codein: string,
  name: string,
  high: string,
  low: string,
  varBid: string,
  pctChange: string,
  bid: string,
  ask: string,
  timestamp: string,
  create_date: string,
}

function App(): JSX.Element {
  const [brlMoney, setBrlMoney] = useState<BRL>();
  const [usdMoney, setUsdMoney] = useState<USD>();

  const [brl, setBrl] = useState<number>(0);
  const [usd, setUsd] = useState<number>(0);

  function handleUSD(e: string): void {
    if (isNaN(parseFloat(e))) {
      setUsd(0);
      setBrl(0);
      return;
    }
    setUsd(parseFloat(e ?? 0));
    console.log(e)
    getExchange("USD-BRL");
    setBrl((parseFloat(usdMoney?.USDBRL.bid ?? "") * parseFloat(e ?? 0) ?? 0) ?? 0)
  }

  function handleBRL(e: string): void {
    if (isNaN(parseFloat(e))) {
      setBrl(0);
      setUsd(0);
      return;
    }
    setBrl(parseFloat(e));
    getExchange("BRL-USD");
    setUsd((parseFloat(brlMoney?.BRLUSD.bid ?? "") * parseFloat(e) ?? 0) ?? 0)
  }

  async function getExchange(type: string): Promise<void> {
    if (type == "USD-BRL") {
      const response = await axios.get<USD>(`https://economia.awesomeapi.com.br/last/USD-BRL`);
      setUsdMoney(response.data);
    }else {
      const response = await axios.get<BRL>(`https://economia.awesomeapi.com.br/last/BRL-USD`);
      setBrlMoney(response.data);
    }
  }
  
  return (
    <div className='to-center'>
      <div>
        <div className="image">
          <img src="https://cdn.discordapp.com/attachments/1226295262469689487/1229237973346816050/image.png?ex=662ef412&is=661c7f12&hm=ea5d4a4898ae90da0aba2a7cc84e1cbb1e74d9b628d1ab4fb41a3e3d64873a08&" alt="" />
        </div>

        <div className="inputcoin">
          <label htmlFor="BRL">BRL - R$</label>
          <input type="text" id='BRL' onChange={(e) => handleBRL(e.target.value)} value={parseFloat(FormatNum(brl))} min="0"/>
          <label htmlFor="USD">USD - $</label>
          <input type="text" id='USD' onChange={(e) => handleUSD(e.target.value)} value={parseFloat(FormatNum(usd))} min="0"/>
        </div>
      </div>
    </div>
  )
}

export default App
