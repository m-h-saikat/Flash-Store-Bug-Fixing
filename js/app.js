const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;   // here fix images to image because in API its name is image
 
    const div = document.createElement("div");
    div.classList.add("product");
 
    div.innerHTML = `<div class="single-product ">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="text-danger">${product.title}</h3>
      <p><b> <span class="text-primary">Category: </span></b> ${product.category}</p>
     
      <p><b><span class="text-primary">Rating: </span>
      </b> ${product.rating.rate}</p>
      <p><b> <span class="text-primary">Rating Count: </span></b> ${product.rating.count}</p>
      <h2 class="text-success">Price: $ ${product.price.toFixed(2)}</h2> 
       
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success me-5">add to cart</button>
      <button id="details-btn" onclick="details()" class="btn btn-primary">Details</button></div>
      `;
            // add above h2 tag .toFixed(2) to show 2 decimal point in price 

    document.getElementById("all-products").appendChild(div);
    
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
 

  updateTaxAndCharge();
  updateTotal() ;   // Here call updateTotal to update the price
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
  // add .toFixed(2) to show 2 decimal point 
};
