const btnViewCart = document.getElementById('btn-view-cart');
const cartIconClickable = document.querySelector('.cart-icon');
const checkOutDropdown = document.querySelector('.checkout-dropdown');
const cartPreview = document.querySelector('.checkout-dropdown > ul');
const cartSubtotal = document.querySelector('#subtotal');
const classesList = document.querySelector('#classes-list');

let isDown = true;

const cart = {
  classes: [],
  books: [],
  subTotal: 0
};

const getSubTotal = cart => {
  cart.subTotal = 0;
  cart.classes.forEach(cartItem => {
    cart.subTotal += cartItem.price * cartItem.quantity;
  });
  return cart.subTotal;
};

const classes = [
  {
    id: 0,
    name: 'History: Medieval',
    price: 15,
    quantity: 0
  },
  {
    id: 1,
    name: 'English Grammer',
    price: 20,
    quantity: 0
  },
  {
    id: 2,
    name: 'Advanced Spelling',
    price: 25,
    quantity: 0
  },
  {
    id: 3,
    name: 'Phonetics',
    price: 10,
    quantity: 0
  },
  {
    id: 4,
    name: 'World Religions',
    price: 15,
    quantity: 0
  },
  {
    id: 5,
    name: 'Spanish I',
    price: 20,
    quantity: 0
  },
  {
    id: 6,
    name: 'Chinese I',
    price: 10,
    quantity: 0
  },
  {
    id: 7,
    name: 'Algebra I',
    price: 15,
    quantity: 0
  }
];

const showClassList = () => {
  let classesOutput = '';

  classes.forEach((x, index) => {
    classesOutput += `<li class="animated" data-id="${x.id}">${index + 1}. ${
      x.name
    } - $${x.price}</li>`;
  });

  document.querySelector('#classes-list').innerHTML = classesOutput;

  document.querySelectorAll('#classes-list > li').forEach(x => {
    x.addEventListener('click', e => addToCart(e));
  });
};

const addToCart = e => {
  const id = Number(e.target.dataset.id);

  if (cart.classes.findIndex(x => x.id === id) < 0) {
    classes.forEach(x => {
      if (x.id === Number(id)) {
        x.quantity++;
        cart.classes.push(x);
        reloadCartPreview();
      }
    });
    e.target.classList.add('bounce2');
    resetAnimation(e, 'bounce2');
  } else if (cart.classes.findIndex(x => x.id === id) > -1) {
    classes.forEach(x => {
      if (x.id === Number(id)) {
        x.quantity++;
        // cart.classes.push(x);
        reloadCartPreview();
      }
    });
    e.target.classList.add('bounce2');
    resetAnimation(e, 'bounce2');
    // e.target.classList.add('shake');
    // resetAnimation(e, 'shake');
  }
  reloadCartPreview();
};

cartIconClickable.addEventListener('click', e => showCart());

const showCart = e => {
  // e.stopPropagation();
  checkOutDropdown.classList.toggle('hidden');
  return false;
};

const removeFromCart = id => {
  index = cart.classes.findIndex(x => x.id == id);
  currentClass = cart.classes[index];
  if (index > -1 && currentClass.quantity > 1) {
    currentClass.quantity--;
  } else if (index > -1) {
    cart.classes.splice(index, 1);
  }
  reloadCartPreview();
};

const resetAnimation = (e, animationName) => {
  setTimeout(() => {
    e.target.classList.remove(animationName);
  }, 1000);
};

const getNumberOfItemsInCart = () => {
  let runningTotal = 0;
  cart.classes.forEach(item => {
    runningTotal += item.quantity;
  });
  return runningTotal;
};

const reloadCartPreview = () => {
  let count = 0;
  cartPreview.innerHTML = '';

  document.querySelector(
    '.cart-icon > span'
  ).textContent = `(${getNumberOfItemsInCart()} items)`;

  if (cart.classes.length > 0) {
    cart.classes.forEach((x, index) => {
      let cartPreviewOutput = document.createElement('li');
      cartPreviewOutput.innerText = `${++count}. ${x.name} - Qty: ${
        x.quantity
      }`;
      let removeBtn = document.createElement('div');
      removeBtn.classList.add('remove-button');
      removeBtn.dataset.id = x.id;
      removeBtn.textContent = 'X';
      // `<div class="remove-button" data-id="${x.id}"
      // }">X</div>`;
      cartPreviewOutput.appendChild(removeBtn);
      cartPreview.appendChild(cartPreviewOutput);
    });
    cartSubtotal.textContent = '';
    let cartSub = document.createElement('li');
    cartSub.innerHTML = `Subtotal: $${getSubTotal(cart)}.00`;
    cartSubtotal.appendChild(cartSub);
  } else {
    let cartPreviewOutput = document.createElement('li');
    cartPreviewOutput.textContent = 'Add items to your cart!';
    cartPreview.appendChild(cartPreviewOutput);
    cartSubtotal.innerHTML = '';
    let cartSub = document.createElement('li');
    cartSub.innerHTML = `Subtotal: $${getSubTotal(cart)}.00`;
    cartSubtotal.appendChild(cartSub);
    // cartPreview.innerHTML = cartPreviewOutput;
  }

  document.querySelectorAll('.remove-button').forEach(x => {
    x.addEventListener('click', e => {
      removeFromCart(e.target.dataset.id);
    });
  });
  // document.querySelectorAll('.checkout-dropdown > button').forEach(x => {
};

const addClassDiv = () => {
  li = document.createElement('li');
  li.innerHTML = 'Add items to your cart!';
  classesList.appendChild(li);
};

addClassDiv();
addClassDiv();

showClassList();
reloadCartPreview();

// getSubTotal(cart);
