import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'
import Decimal from "decimal.js";

export default function Header() {

  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const [balanceDec, setBalanceDec] = useState<Decimal>(new Decimal(0));
  useEffect(() => {
    if (balance) {
      setBalanceDec(new Decimal(balance.formatted));
    }
  }, [balance]);
  return (
    <div className='bg-indigo-500 w-full px-4 py-4 text-2xl flex flex-row justify-between'>
        Header
        
        <p>Balance: {balanceDec.toFixed(2)}</p>

        <ConnectButton showBalance={{ smallScreen: false, largeScreen: true}} />
    </div>
    
  )
}
