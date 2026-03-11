import { createWalletClient, custom, createPublicClient } from "https://esm.sh/viem";
const connectbtn = document.getElementById("connectbtn")
const fundbtn = document.getElementById("fundbtn")
const ethamountinput = document.getElementById("ethamount")
let walletclient
let publicClient

async function connect() {
    if (typeof window.ethereum !== "undefined") {

        walletclient = createWalletClient({
            transport: custom(window.ethereum)
        })
        await walletclient.requestAddresses()
        connectbtn.innerHTML = "connected"

    } else {
        connectbtn.innerHTML = "please install metamask"
    }
}

async function fund() {
    const ethamount = ethamountinput.value
    console.log(`funding with ${ethamount}..`)

    if (typeof window.ethereum !== "undefined") {

        walletclient = createWalletClient({
            transport: custom(window.ethereum)
        })
        await walletclient.requestAddresses()
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })

        await publicClient.simulateContract({
            
        })
    }
    else {
        connectbtn.innerHTML = "please install metamask"
    }

}
connectbtn.onclick = connect
fundbtn.onclick = fund