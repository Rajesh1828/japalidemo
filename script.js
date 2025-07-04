    // Function to trigger the search bar visibility
    function triggerSearch() {
        // Show the search bar
        document.getElementById('search-bar').style.display = 'block';
        // Optionally, focus on the input field
        document.getElementById('search-input').focus();
    }

    // Function to handle search submission
    function submitSearch() {
        var searchQuery = document.getElementById('search-input').value;
        alert("Searching for: " + searchQuery);
        // Replace this with actual search functionality (e.g., send the query to the server)
    }

    // Profile function (as before)
    function viewProfile() {
        window.location.href = "/profile"; // Example URL
    }

    // Favorite function (as before)
    function toggleFavorite() {
        alert("Added to favorites!");
    }

    // Cart function (as before)
    function viewCart() {
        window.location.href = "/cart"; // Example URL
    }



    /////////////////////////////////////////

    function setActive(button) {
        // Remove active class from all buttons
        document.querySelectorAll('#myBtnContainer .btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');
    }
    
    function filterSelection(category) {
        // Implement filter functionality (to show/hide based on category)
        const items = document.querySelectorAll('.filterDiv');
        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }


    ///////////////////////////////////

  
    let cart = [];  // Array to store cart items

    // Function to handle opening the select options modal
    function openPopover(itemName, itemImage, itemPrice) {
        // Set the modal content based on the selected item
        document.getElementById('modalTitle').innerText = itemName;
        document.getElementById('modalImage').src = itemImage;
        document.getElementById('modalPrice').innerText = `Price: Rs. ${itemPrice}`;
        // Store the price and item details in the modal's data attributes
        document.getElementById('itemModal').dataset.price = itemPrice;
        document.getElementById('itemModal').dataset.name = itemName;
        // Show the modal
        var myModal = new bootstrap.Modal(document.getElementById('itemModal'));
        myModal.show();
    }
    
    // Function to add item to the cart
    function addToCart() {
        let itemName = document.getElementById('modalTitle').innerText;
        let itemPrice = parseFloat(document.getElementById('itemModal').dataset.price);
        let quantity = parseInt(document.getElementById('quantity').value);
    
        // Add item to the cart array
        cart.push({ name: itemName, price: itemPrice, quantity: quantity });
    
        // Store the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Update cart badge
        document.getElementById('cart-badge').innerText = cart.length;
        document.getElementById('cart-badge').style.display = 'block';
    
        // Show toast notification
        showToast(`${itemName} has been added to the cart.`);
    
        // Close the modal
        var myModal = bootstrap.Modal.getInstance(document.getElementById('itemModal'));
        myModal.hide();
    }
    
    // Function to show toast
    function showToast(message) {
        var toastEl = document.getElementById('toast');
        document.getElementById('toast-message').innerText = message;
        var toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
    
    // Function to view the cart in a more user-friendly format
    function viewCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = ''; // Clear the container before displaying new items
    
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }
    
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item', 'mb-3');
            itemElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Price: Rs. ${item.price} x ${item.quantity}</p>
                        <p class="card-text"><strong>Total: Rs. ${item.price * item.quantity}</strong></p>
                        <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });
    }
    
    // Function to remove an item from the cart
    function removeFromCart(index) {
        cart.splice(index, 1); // Remove item at the specified index
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        viewCart(); // Re-render the cart
        showToast('Item removed from cart.');
    }
    
    // // Function to load cart items from localStorage when the page loads
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            document.getElementById('cart-badge').innerText = cart.length;
            document.getElementById('cart-badge').style.display = cart.length > 0 ? 'block' : 'none';
        }
    }
    
    // Call loadCart on page load
    window.onload = loadCart;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //testmonials



    // function startCountdown() {
    //     const countdownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
    //     setInterval(function () {
    //         const now = new Date().getTime();
    //         const distance = countdownDate - now;
    //         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //         document.getElementById("days").innerHTML = days + " Days";
    //         document.getElementById("hours").innerHTML = hours + " Hr";
    //         document.getElementById("minutes").innerHTML = minutes + " Min";
    //         document.getElementById("seconds").innerHTML = seconds + " Sec";
    //     }, 1000);
    // }
    // startCountdown();

    window.onload = function() {
        document.getElementById("preloader").style.display = "none";
    };


    //contact form


    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the form from submitting the traditional way
    
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
        };
    
        // Send form data to the server
        fetch('http://localhost:5000/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully!');
        })
        .catch(error => {
            alert('Failed to send message.');
            console.error('Error:', error);
        });
    });
    