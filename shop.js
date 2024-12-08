let cart = []; // Cart array to store products

// Function to update login/logout UI
function updateLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const welcomeMessage = document.getElementById("welcome-message");

    if (isLoggedIn) {
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        welcomeMessage.style.display = "block";
        welcomeMessage.textContent = `Welcome, ${localStorage.getItem("username") || "User"}!`;
    } else {
        loginBtn.style.display = "inline-block";
        registerBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
        welcomeMessage.style.display = "none";
        cart = []; // Clear cart on logout
        updateCart();
    }
}

// Function to handle login
function handleLogin() {
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");

    // Basic simulation of user authentication (replace with server-side validation)
    if (username && password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        alert(`Welcome, ${username}! You are now logged in.`);
        updateLoginStatus();
    } else {
        alert("Login failed. Please enter valid credentials.");
    }
}

// Function to handle logout
function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    alert("You have logged out successfully.");
    updateLoginStatus();
}

// Function to add products to the cart
function addToCart(productName, productPrice) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
        alert("Please log in to add items to your cart.");
        return;
    }

    const product = { name: productName, price: productPrice };
    cart.push(product);
    alert(`${productName} has been added to your cart.`);
    updateCart();
}

// Function to update the cart UI
function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartCount.textContent = cart.length;
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₱${item.price}`;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = `Total: ₱${total}`;
}

// Function to handle checkout
function handleCheckout() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
        alert("Please log in to proceed to checkout.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty. Add items to proceed.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const paymentMethod = document.getElementById("payment").value;
    const totalPurchase = cart.reduce((total, item) => total + item.price, 0);

    if (!name || !address || !paymentMethod) {
        alert("Please fill in all the checkout details.");
        return;
    }

    alert(
        `Order Summary:\n\nName: ${name}\nAddress: ${address}\nPayment Method: ${paymentMethod}\nTotal Purchase: ₱${totalPurchase}\n\nThank you for your purchase!`
    );

    cart = []; // Clear the cart after checkout
    updateCart();
    document.getElementById("checkout-form").reset(); // Reset the checkout form
    document.getElementById("checkout-modal").classList.add("hidden"); // Hide the modal
}

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const productCard = e.target.closest(".product-card");
        const productName = productCard.querySelector("h3").textContent;
        const productPrice = parseInt(productCard.querySelector("p").textContent.replace("₱", ""), 10);
        addToCart(productName, productPrice);
    });
});

// Show or hide cart section
document.getElementById("view-cart-btn").addEventListener("click", () => {
    const cartSection = document.getElementById("cart");
    if (cartSection.style.display === "none" || !cartSection.style.display) {
        cartSection.style.display = "block";
        window.scrollTo(0, cartSection.offsetTop); // Scroll to the cart section
    } else {
        cartSection.style.display = "none";
    }
});

// Show checkout modal
document.getElementById("checkout-btn").addEventListener("click", () => {
    const checkoutModal = document.getElementById("checkout-modal");
    checkoutModal.classList.remove("hidden");
});

// Close checkout modal
document.getElementById("close-modal").addEventListener("click", () => {
    const checkoutModal = document.getElementById("checkout-modal");
    checkoutModal.classList.add("hidden");
});

// Submit checkout form
document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission
    handleCheckout();
});

// Initialize the app on page load
document.addEventListener("DOMContentLoaded", () => {
    updateLoginStatus();
    updateCart();
});

// Event listeners for login/logout
document.getElementById("login-btn").addEventListener("click", handleLogin);
document.getElementById("logout-btn").addEventListener("click", handleLogout);
