import useCurrencyInfo from "./hooks/useCurrencyInfo"
import { useState } from "react";
import { InputBox } from "./components/index"
import { MdOutlineSwapCalls} from "react-icons/md";
import { SiConvertio } from "react-icons/si";
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmt, setConvertedAmt] = useState(0);
  
  const currencyInfo = useCurrencyInfo(fromCurrency); // custom hook for fetching & returning currency data from the API
  const currencyOptions = Object.keys(currencyInfo);
  
  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(Number(convertedAmt));
    setConvertedAmt(amount);
  }

  const convert = (newAmount) => {
    let parsedAmount = Number(newAmount || amount);
    setConvertedAmt( Number((parsedAmount * currencyInfo[toCurrency]).toFixed(2)) );
  }

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
    convert(newAmount);
  }

  const BackgroundImage = "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg";

  return(
    <div className="w-full h-screen px-4 flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')`}}>

        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}>
            
            <div className="w-full mb-1">
              <InputBox label="From" amount={amount} selectCurrency={fromCurrency} currencyOptions={currencyOptions} onAmountChange={handleAmountChange} onCurrencyChange={(currency) => setFromCurrency(currency)}/>
            </div>

            <div className="relative w-full h-0.5">
              <button type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 cursor-pointer flex items-center gap-0.5" onClick={swapCurrency}>
                <MdOutlineSwapCalls size={"1.3em"}/> SWAP
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox label="To" amount={convertedAmt} selectCurrency={toCurrency} currencyOptions={currencyOptions} amountDisable={true} onCurrencyChange={(currency) => setToCurrency(currency)}/>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg flex justify-center items-center gap-1 cursor-pointer">
              <SiConvertio size={"1.3em"}/> Convert from {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>

          </form>
        </div>

    </div>
  );
}

export default App
