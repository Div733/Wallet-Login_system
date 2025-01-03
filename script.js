document.addEventListener("DOMContentLoaded", () => {
    const walletLoginBtn = document.getElementById("walletLoginBtn");
    const walletOptions = document.getElementById("walletOptions");

    walletLoginBtn.addEventListener("click", () => {
        walletOptions.classList.toggle("hidden");
    });

    document.querySelectorAll(".walletOption").forEach((option) => {
        option.addEventListener("click", async (event) => {
            const wallet = event.target.getAttribute("data-wallet");
            try {
                if (wallet === "metamask") {
                    await connectMetamask();
                } else if (wallet === "trustwallet") {
                    openTrustWalletWebsite();
                } else if (wallet === "tokenpocket") {
                    openTokenPocketWebsite();
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        });
    });
});

// Connect to Metamask
async function connectMetamask() {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const account = accounts[0];
            await checkBSCNetwork(window.ethereum);
            alert(`Connected with Metamask: ${account}`);
            localStorage.setItem("walletAddress", account);  // Store wallet address
            navigateToDashboard();
        } catch (error) {
            throw new Error("Failed to connect to Metamask.");
        }
    } else {
        throw new Error("Metamask is not installed.");
    }
}

// Open Trust Wallet website for connection
function openTrustWalletWebsite() {
    const trustWalletUrl = "https://trustwallet.com";
    window.open(trustWalletUrl, "_blank");
    alert("Please connect using Trust Wallet's Web3 Browser.");
}

// Open Token Pocket website for connection
function openTokenPocketWebsite() {
    const tokenPocketUrl = "https://www.tokenpocket.pro";
    window.open(tokenPocketUrl, "_blank");
    alert("Please connect using Token Pocket's Web3 Browser.");
}

// Check if connected to Binance Smart Chain (BSC)
async function checkBSCNetwork(provider) {
    const BSC_CHAIN_ID = "0x38"; // 56 in decimal
    const currentChainId = await provider.request({ method: "eth_chainId" });

    if (currentChainId !== BSC_CHAIN_ID) {
        try {
            await provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: BSC_CHAIN_ID }],
            });
        } catch (error) {
            if (error.code === 4902) {
                await provider.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: BSC_CHAIN_ID,
                            chainName: "Binance Smart Chain Mainnet",
                            rpcUrls: ["https://bsc-dataseed.binance.org/"],
                            nativeCurrency: {
                                name: "Binance Coin",
                                symbol: "BNB",
                                decimals: 18,
                            },
                            blockExplorerUrls: ["https://bscscan.com"],
                        },
                    ],
                });
            } else {
                throw new Error("Failed to switch to Binance Smart Chain.");
            }
        }
    }
}

// Navigate to Dashboard
function navigateToDashboard() {
    window.location.href = "dashboard.html";
}
