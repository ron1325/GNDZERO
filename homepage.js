document.addEventListener("DOMContentLoaded", () => {
    
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            if (link.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    
    // const cart = [];
    // const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // addToCartButtons.forEach(button => {
    //     button.addEventListener("click", event => {
    //         event.preventDefault();
    //         const productCard = button.closest(".product-card");
    //         const productName = productCard.querySelector("h3").textContent;
    //         const productPrice = productCard.querySelector("p").textContent;

    //         cart.push({ name: productName, price: productPrice });
    //         alert(`${productName} has been added to your cart.`);
    //         console.log(cart);
    //     });
    // });

    
    const footer = document.querySelector("footer p");
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} GrndZer0 Apparel. All Rights Reserved.`;
});


// contact js 
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission to the server

        // Collect input values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Display success message (you can customize this or use modal/popups)
        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        
        // Optionally, clear the form
        form.reset();
    });

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Background image 

document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.querySelector(".hero");

    // Array of background images
    const backgrounds = [
        "url('logo1.png')",
        "url('logo.2.png')",
        "url('1pic.jpg.jpg')",
        "url('logo3.png')",
    ];

    let currentIndex = 0;

    function changeBackground() {
        // Update the background image
        heroSection.style.backgroundImage = backgrounds[currentIndex];

        // Move to the next index, loop back to start if needed
        currentIndex = (currentIndex + 1) % backgrounds.length;
    }

    // Change background every 5 seconds
    setInterval(changeBackground, 3000);

    // Initialize the first background
    changeBackground();
});

//Product image
document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
        const images = JSON.parse(card.getAttribute("data-images")); // Get the image list
        const imgElement = card.querySelector("img");
        let currentIndex = 0;

        // Function to change the product image
       function changeProductImage() {
    imgElement.classList.add("fade-out"); // Add fade-out class
    setTimeout(() => {
        imgElement.src = images[currentIndex];
        imgElement.classList.remove("fade-out"); // Remove fade-out after updating
        currentIndex = (currentIndex + 1) % images.length;
    }, 500); // Match the CSS transition duration
}


        // Set an interval to swap images every 3 seconds
        setInterval(changeProductImage, 3000);

        // Initialize the first image
        changeProductImage();
    });
});

