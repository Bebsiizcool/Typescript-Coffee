"use client"
import InputField from "./ui/InputField"
import { useState } from "react";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import {useChainId, useConfig, useAccount} from 'wagmi'
import {readContract} from '@wagmi/core'


export default function AirDropform() {
  const [tokenaddress, settokkenaddress] = useState("");
  const [Recipients, setrecipients] = useState("")
  const [Amount, setamount] = useState("")
  const chainId = useChainId()
  const config = useConfig()
  const account = useAccount()

  async function getapproved(tsenderAddress: string) : Promise<number>{
    if(!tsenderAddress){
      alert("No address found, please use a supported chain")
      return 0
    }

    const response = await readContract(config,{
      abi: erc20Abi,
      address: tokenaddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tsenderAddress as `0x${string}`],

    })
    return response as number
  }

  async function handlesubmit(){
    const tsenderAddress = chainsToTSender[chainId] ["tsender"]
    const approvedamount = await getapproved(tsenderAddress)
    console.log(approvedamount)
  }

  return (
    <div className="p-6 space-y-4">

      <InputField
        label="Tokenaddress"
        placeholder="0x..."
        value={tokenaddress}
        onChange={(e) => settokkenaddress(e.target.value)}
      />

      <InputField
        label="Recipients"
        placeholder="0x1234,0x1246..."
        value={Recipients}
        onChange={(e) => setrecipients(e.target.value)}
        large = {true}
      />

      <InputField
        label="Amount"
        placeholder="100, 200, 300...."
        value={Amount}
        onChange={(e) => setamount(e.target.value)}
        large = {true}
      />

      <button onClick={handlesubmit}  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        send tokens
      </button>
    </div>
  );
}

