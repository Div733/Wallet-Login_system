document.addEventListener("DOMContentLoaded", () => {
    const walletAddressElement = document.getElementById("walletAddress");
    const disconnectBtn = document.getElementById("disconnectBtn");

    // Retrieve the wallet address from localStorage
    const walletAddress = localStorage.getItem("walletAddress");

    if (walletAddress) {
        walletAddressElement.textContent = walletAddress;  // Display the wallet address
    } else {
        walletAddressElement.textContent = "No wallet connected.";
    }

    // Disconnect the wallet
    disconnectBtn.addEventListener("click", () => {
        localStorage.removeItem("walletAddress");
        alert("Wallet disconnected.");
        window.location.href = "index.html";  // Redirect to login page
    });
});
