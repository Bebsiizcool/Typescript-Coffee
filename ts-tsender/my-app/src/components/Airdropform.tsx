"use client"
import InputField from "./ui/InputField"
import { useState } from "react";

export default function AirDropform(){
    const [tokenaddress, settokkenaddress] = useState("");
    return(
            <div className="p-6 space-y-4">
      <InputField
        label="Tokenaddress"
        placeholder="0x..."
        value={tokenaddress}
        onChange={(e) => settokkenaddress(e.target.value)}
      />

    </div>
  );
}
    
