// to tell browswer we using this on client side

"use client"  
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {anvil, zksync, mainnet, sepolia} from "wagmi/chains"

export default getDefaultConfig({
    appName: "my-app",
    // projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    projectId: "da080012497d6db7f2624e1091de2409",
    chains: [anvil, zksync, mainnet, sepolia],
    ssr: false
})