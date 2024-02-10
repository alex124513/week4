import React, { useEffect, useState } from 'react'
import DemoNFT from '../image/demo.png'
import Image from 'next/image'
import { usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi'
import {CONFIG} from '../../config'
import nftABI from '../abis/nftABI.json'
export default function MintCard() {
  const { config } = usePrepareContractWrite({
    address: CONFIG.NFT_CONTRACT_ADDRESS,
    abi: nftABI,
    functionName: 'mintNFT',
    args: [(1)],
  })
  const { write } = useContractWrite(config)

  const [Minted, setMinted] = useState<string>("Loading");
  const { data:_Minted, isError, isLoading } = useContractRead({
    address: CONFIG.NFT_CONTRACT_ADDRESS,
    abi: nftABI,
    functionName: 'Minted',
  })
  useEffect(()=>{
    if(_Minted){ setMinted(_Minted.toString()) }
  },[_Minted]
  )

  const [maxSupply, setmaxSupply] = useState<string>("Loading");
  const { data:_maxSupply} = useContractRead({
    address: CONFIG.NFT_CONTRACT_ADDRESS,
    abi: nftABI,
    functionName: 'maxSupply',
  })
  useEffect(()=>{
    if(_maxSupply){ setmaxSupply(_maxSupply.toString()) }
  },[_maxSupply]
  )
  console.log("=================");
  console.log("_Minted :",_Minted);
  console.log("_maxSupply :",_maxSupply);
  console.log("Minted :",Minted);
  console.log("maxSupply :",maxSupply);
  return (

    <div className='flex flex-col w-full justify-center items-center py-2'>

      <Image src={DemoNFT.src} width={500} height={500} alt={'demoNFT'}></Image>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        disabled={!write}
        onClick={() => write?.()}
      >
        Mint
      </button>
      <h4>Minted : {Minted}</h4>
      <h4>MaxSupply : {maxSupply}</h4>
    </div>

  )
}
