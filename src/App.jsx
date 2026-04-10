import { useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { InputBox } from './components/index.js'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('sek')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)


  const convert = () => {
    setConvertedAmount(Number(amount * currencyInfo[to]).toFixed(2))
  }

  const swap = () =>{
    setFrom(to)
    setTo(from)
    setAmount(Number(convertedAmount))
    setConvertedAmount(amount)
  }

  return (
   <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage: `url(https://images.pexels.com/photos/12955791/pexels-photo-12955791.jpeg)`}}>
    <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
      <form onSubmit={(e) => {
        e.preventDefault()
        convert()
      }}>
        <div className='w-full mb-1'>
          <InputBox
          label="from"
          amount={amount}
          currencyOptions={options}
          onCurrencyChange={(currency) => setFrom(currency)}
          onAmountChange={(amount) => setAmount(amount)}
          selectedCurrency={from}
          />
        </div>
        <div className='relative w-full h-0.5'>
          <button
          type="button"
          className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
          onClick={swap}
          >Swap</button>
        </div>
        <div className='w-full mb-1'>
          <InputBox
          label="to"
          amount={convertedAmount}
          amountDisabled
          currencyOptions={options}
          onCurrencyChange={(currency) => setTo(currency)}
          selectedCurrency={to}
          />
        </div>
        <button 
        type='submit'
        className='w-full bg-sky-600 text-white px-4 py-3 rounded-lg'
        >Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
      </form>
    </div>
   </div>
  )
}

export default App
