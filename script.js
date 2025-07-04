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



    /////////////////////////////////////////-------------------------------------------------------------->

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

///-------------------------------------------------------------------------------cart items 

let currentItem = null;

function openPopover(title, image, price) {
    currentItem = { title, image, price, quantity: 1 };
    $('#modalTitle').text(title);
    $('#modalImage').attr('src', image);
    $('#modalPrice').text(`Rs. ${price}`);
    $('#modalQuantity').val(1);
    $('#itemModal').modal('show');
}

function addToCart() {
    const quantity = parseInt($('#modalQuantity').val());
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(item => item.title === currentItem.title);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...currentItem, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    $('#itemModal').modal('hide');
    
    showToast("Added to Cart", currentItem.image);
}

function addToWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (!wishlist.find(item => item.title === currentItem.title)) {
        wishlist.push({ ...currentItem });
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    $('#itemModal').modal('hide');
    
    showToast("Added to Wishlist", currentItem.image);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    $('#cartCount').text(cart.reduce((total, item) => total + item.quantity, 0));
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    $('#wishlistCount').text(wishlist.length);
}

function openSidebar(type) {
    if (type === 'cart') {
        $('#wishlistSidebar').removeClass('active');
        $('#cartSidebar').toggleClass('active');
        updateCartTable();
    } else if (type === 'wishlist') {
        $('#cartSidebar').removeClass('active');
        $('#wishlistSidebar').toggleClass('active');
        updateWishlistTable();
    }
}

// Close sidebars when clicking outside
$(document).click(function(event) {
    if (!$(event.target).closest("#cartSidebar, #wishlistSidebar, .btn-light").length) {
        closeSidebar();
    }
});

// Close sidebars manually
function closeSidebar() {
    $('#cartSidebar').removeClass('active');
    $('#wishlistSidebar').removeClass('active');
}

function updateCartTable() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = $('#cartTable tbody');
    tbody.empty();
    let totalPrice = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        tbody.append(`
            <tr>
                <td><img src="${item.image}" width="50"> ${item.title}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="changeCartQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-secondary" onclick="changeCartQuantity(${index}, 1)">+</button>
                </td>
                <td>Rs. ${itemTotal}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `);
    });

    $('#cartTotal').text(`Total: Rs. ${totalPrice}`);
}

function updateWishlistTable() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const tbody = $('#wishlistTable tbody');
    tbody.empty();

    wishlist.forEach((item, index) => {
        tbody.append(`
            <tr>
                <td><img src="${item.image}" width="50"> ${item.title}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromWishlist(${index})">Remove</button></td>
            </tr>
        `);
    });
}

function changeCartQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTable();
    updateCartCount();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTable();
    updateCartCount();
}

function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistTable();
    updateWishlistCount();
}

function proceedToCheckout() {
    window.location.href = 'payment.html';
}

// Function to show toast notification
function showToast(message, image) {
    let toast = $(`
        <div class="toast-item">
            <img src="${image}" width="40" height="40">
            <span>${message}</span>
        </div>
    `);

    $("#toastContainer").append(toast);
    setTimeout(() => {
        toast.fadeOut(500, function() { $(this).remove(); });
    }, 3000);
}

$(document).ready(function() {
    updateCartCount();
    updateWishlistCount();
});



////-------------------------menu------------------------------------->

const data = {
    sweets: [
      { name: "చెక్కర్ పాంగరీ", pricePerKg: 500 },
      { name: "కాజుకాట్లీ", pricePerKg: 600 },
      { name: "రసగుల్లా", pricePerKg: 400 }
    ],
    halwa: [
      { name: "బందరు మిఠాయిలు", pricePerKg: 700 },
      { name: "కలకండ మిఠాయి", pricePerKg: 800 },
      { name: "అరవింద బర్ఫీ", pricePerKg: 900 }
    ],
    curries: [
      { name: "మట్టన్ కర్రీ", pricePerKg: 1200 },
      { name: "చికెన్ కర్రీ", pricePerKg: 1000 },
      { name: "పనీర్ కర్రీ", pricePerKg: 900 },
      { name: "టమోటో కర్రీ", pricePerKg: 750 },
      { name: "ఆలూ కర్రీ", pricePerKg: 700 },
      { name: "బానానా గ్రీన్ కర్రీ", pricePerKg: 800 }
    ],
    rice: [
      { name: "పొలావ్ రైస్", pricePerKg: 150 },
      { name: "టమోటో రైస్", pricePerKg: 200 },
      { name: "బిర్యానీ రైస్", pricePerKg: 250 },
      { name: "గోంగూర రైస్", pricePerKg: 180 },
      { name: "నిమ్మకాయ రైస్", pricePerKg: 170 }
    ],
    gravy_curries: [
      { name: "మటన్ గ్రేవీ", pricePerKg: 1300 },
      { name: "చికెన్ గ్రేవీ", pricePerKg: 1100 },
      { name: "పనీర్ బటర్ మసాలా", pricePerKg: 950 },
      { name: "వెజ్ కుర్మా", pricePerKg: 850 },
      { name: "కాడై పన్నీర్", pricePerKg: 1000 }
    ]
  };
  
  function renderMenu() {
    const menu = document.getElementById('menu');
    for (const category in data) {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('col-md-4', 'mb-4');
      categoryDiv.innerHTML = `<div class="category">
        <h4 class="text-center">${category.replace('_', ' ').toUpperCase()}</h4>
        ${data[category].map(item => `
          <div class="mb-3">
            <input class="form-check-input me-2" type="checkbox" data-price-per-kg="${item.pricePerKg}" value="${item.name}" onchange="updateTotal()">
            <label class="form-check-label">${item.name} - ₹${item.pricePerKg}/kg</label>
            <select class="form-select ms-2 mt-2" style="width: 100px;" onchange="updateTotal()" disabled>
              <option value="0.1">100g</option>
              <option value="0.25">250g</option>
              <option value="0.5">500g</option>
              <option value="1" selected>1kg</option>
            </select>
          </div>
        `).join('')}
      </div>`;
      menu.appendChild(categoryDiv);
    }
  }
  
  function updateTotal() {
    let total = 0;
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      const weightSelect = checkbox.parentElement.querySelector('select');
      if (checkbox.checked) {
        weightSelect.disabled = false;
        const pricePerKg = parseFloat(checkbox.dataset.pricePerKg);
        const weight = parseFloat(weightSelect.value);
        total += pricePerKg * weight;
      } else {
        weightSelect.disabled = true;
        weightSelect.value = "1"; // Reset to 1kg
      }
    });
  
    const numberOfMembers = parseInt(document.getElementById('numberOfMembers').value) || 1;
    const totalForMembers = total * numberOfMembers;
  
    document.getElementById('totalPrice').textContent = `Total Price for 1 Member: ₹${total.toFixed(2)}`;
    document.getElementById('totalForMembers').textContent = `Total Price for ${numberOfMembers} Members: ₹${totalForMembers.toFixed(2)}`;
  }
  
  document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const selectedItems = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      const weight = checkbox.parentElement.querySelector('select').value;
      selectedItems.push(`${checkbox.value} (${parseFloat(weight) * 1000}g)`);
    });
  
    if (selectedItems.length === 0) {
      Swal.fire('Order Not Placed', 'Please select items to place an order.', 'error');
      return;
    }
  
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const numberOfMembers = document.getElementById('numberOfMembers').value;
  
    const totalPrice = document.getElementById('totalForMembers').textContent.replace(/[^0-9.]/g, '');
    const message = `Hello, I would like to place an order:\n\nItems: ${selectedItems.join(', ')}\nTotal Price: ₹${totalPrice}\n\nCustomer Details:\nName: ${customerName}\nPhone: ${customerPhone}\nAddress: ${customerAddress}\nNumber of Members: ${numberOfMembers}`;
    
    const whatsappLink = `https://wa.me/8179575173?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  
    Swal.fire('Order Placed!', 'Your order has been placed successfully.', 'success').then(() => {
      location.reload();
    });
  });
  
  renderMenu();
  


  //login page


  async function handleLogin() {
    const email = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    alert(data.message || 'Login successful');
  }
  
  async function handleRegister() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
  
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await response.json();
    alert(data.message || 'Registration successful');
  }
  