import { 
  createWalletClient, 
  custom, 
  createPublicClient, 
  parseEther, 
  defineChain, 
  formatEther,
  WalletClient,
  PublicClient,
  Chain
} from "viem";
import { contractAddress, abi } from "./constants-ts";
// import "view/window"

// Get DOM elements with proper type assertions
const connectbtn = document.getElementById("connectbtn") as HTMLButtonElement;
const fundbtn = document.getElementById("fundbtn") as HTMLButtonElement;
const ethamountinput = document.getElementById("ethamount") as HTMLInputElement;
const balancebtn = document.getElementById("balancebtn") as HTMLButtonElement;
const withdrawbtn = document.getElementById("withdrawbtn") as HTMLButtonElement;

console.log("teri pen nu lun")

let walletclient: WalletClient | undefined;
let publicClient: PublicClient | undefined;

async function connect(): Promise<void> {
    if (typeof window.ethereum !== "undefined") {
        walletclient = createWalletClient({ transport: custom(window.ethereum) });
        await walletclient.requestAddresses();
        connectbtn.innerHTML = "connected";
    } else {
        connectbtn.innerHTML = "please install metamask";
    }
}

async function fund(): Promise<void> {
    const ethamount = ethamountinput.value;
    console.log(`funding with ${ethamount}..`);

    if (typeof window.ethereum !== "undefined") {
        walletclient = createWalletClient({ transport: custom(window.ethereum) });
        const [connectedAccount] = await walletclient.requestAddresses();
        const currentChain = await getCurrentChain(walletclient);
        
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });
        
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: abi,
            functionName: "fund",
            account: connectedAccount,
            chain: currentChain,
            value: parseEther(ethamount)
        });

        const hash = await walletclient.writeContract(request);
        console.log(hash);
    } else {
        connectbtn.innerHTML = "please install metamask";
    }
}

async function withdraw(): Promise<void> {
    console.log(`withdrawing funds..`);

    if (typeof window.ethereum !== "undefined") {
        walletclient = createWalletClient({ transport: custom(window.ethereum) });
        const [connectedAccount] = await walletclient.requestAddresses();
        const currentChain = await getCurrentChain(walletclient);
        
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });
        
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: abi,
            functionName: "withdraw",
            account: connectedAccount,
            chain: currentChain,
        });

        const hash = await walletclient.writeContract(request);
        console.log(hash);
    } else {
        connectbtn.innerHTML = "please install metamask";
    }
}

async function getbalance(): Promise<void> {
    if (typeof window.ethereum !== "undefined") {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });
        
        const balance = await publicClient.getBalance({
            address: contractAddress
        });
        console.log(formatEther(balance));
    }
}

async function getCurrentChain(client: WalletClient): Promise<Chain> {
    const chainId = await client.getChainId();
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    });
    return currentChain;
}

// Add type assertion for window.ethereum
declare global {
    interface Window {
        ethereum?: any;
    }
}

// Set up event listeners
connectbtn.onclick = connect;
fundbtn.onclick = fund;
balancebtn.onclick = getbalance;
withdrawbtn.onclick = withdraw;