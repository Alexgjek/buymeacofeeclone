'use client';

import { createDonation } from "@/actions/donationActions";
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function DonationForm({email}: {email:string}) {
  const [numberInputValue, setNumberInputValue] = useState('');
  const [amount, setAmount] = useState(1);
  const [selectedCrypto, setSelectedCrytpo] = useState('BTC');

  useEffect(() => {
    if (numberInputValue) {
      const intValue = parseInt(numberInputValue);
      if (intValue > 5 && intValue <= 1000){
        setAmount(intValue)
      } else if (intValue === 1 || intValue === 3 || intValue === 5) {
        setAmount(intValue)
      }
      else {
        setAmount(1);
      }
    }

    if (selectedCrypto){
      setSelectedCrytpo(selectedCrypto);
      console.log(selectedCrypto)
    }
  }, [numberInputValue])

  async function handleFormSubmit(formData: FormData){
    formData.set('amount', amount.toString());
    formData.set('crypto', selectedCrypto);
    formData.set('email', email)
    const url = await createDonation(formData);
    if (!url) {
      return;
    }
    if (url && window && window.location){
      window.location.href = url;
    }
  }

  return (
    <form action={handleFormSubmit}>
      <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex gap-2 items-center">
        <FontAwesomeIcon icon={faCoffee}/>
        <span>x</span>
        <button 
          type="button"
          onClick={() => {setAmount(1); setNumberInputValue("1");}}
          className={"amount " + (amount === 1 ? 'active' :'' )}>
            1
        </button>
        <button
          onClick={() => {setAmount(3); setNumberInputValue('3');}}
          type="button"
          className={"amount " + (amount === 3 ? 'active' : '')}>
            3
        </button>
        <button 
          onClick={() => {setAmount(5); setNumberInputValue("5");}}
          type="button"
          className={"amount " + (amount === 5 ? 'active' : '')}>
            5
        </button>
        <input 
          className="w-12 border border-yellow-300 h-12 rounded-xl text-center"
          type="number" 
          value={numberInputValue}
          onChange={ev => setNumberInputValue(ev.target.value)}
          placeholder="10"
          />
      </div>
      <div className="mt-2">
        <input name='name' type="text" placeholder="Your name"/>
      </div>
      <div className="mt-2">
        <textarea name="message" placeholder="Say something nice"></textarea>
      </div>
      <div className="mt-3">
        <h3 className="text-xs mb-1 text-gray-500">
          Pay with selected crypto or cc
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            className={"crypto" + (selectedCrypto === 'BTC' ? ' active' : '')}
            onClick={() => setSelectedCrytpo('BTC')}>
            <span>BTC</span>
            <p>Bitcoin</p>
          </button>
          <button className={"crypto" + (selectedCrypto === 'ETH' ? ' active' : '')}
            type="button"
            onClick={() => setSelectedCrytpo('ETH')}>
            <span>ETH</span>
            <p>Ethereium</p>
          </button>
          <button className={"crypto" + (selectedCrypto === 'LTC' ? ' active' : '')}
            type="button"
            onClick={() => setSelectedCrytpo('LTC')}>
            <span>LTC</span>
            <p>Litecoin</p>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <button className="bg-yellow-300 w-full rounded-xl py-2 font-semibold">
          Support ${amount * 5}
        </button>
      </div>
    </form>
  )
}