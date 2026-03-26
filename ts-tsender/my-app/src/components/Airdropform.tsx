"use client"
import InputField from "./ui/InputField"
import { useState } from "react";

export default function AirDropform() {
  const [tokenaddress, settokkenaddress] = useState("");
  const [Recipients, setrecipients] = useState("")
  const [Amount, setamount] = useState("")

  async function handlesubmit(){
    console.log(tokenaddress)
    console.log(Recipients)
    console.log(Amount)
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

      <button onClick={handlesubmit}>
        send tokens
      </button>
    </div>
  );
}

