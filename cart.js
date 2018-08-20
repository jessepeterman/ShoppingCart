const btnViewCart = document.getElementById('btn-view-cart');
const cartIconClickable = document.querySelector('.cart-icon');
const checkOutDropdown = document.querySelector('.checkout-dropdown');
const cartPreview = document.querySelector('.checkout-dropdown > ul');
const cartSubtotal = document.querySelector('#subtotal');

let isDown = true;

const cart = {
  classes: [],
  books: [],
  subTotal: 0
};

const getSubTotal = cart => {
  cart.subTotal = 0;
  cart.classes.forEach(cartItem => {
    cart.subTotal += cartItem.price;
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

// const store = {
//   cart: {
//     classes: [],
//     books: []
//   },
//   subTotal: 0
// };

// btnViewCart.addEventListener('click', e => showCart());
cartIconClickable.addEventListener('click', e => showCart());

const showCart = e => {
  // e.stopPropagation();
  checkOutDropdown.classList.toggle('hidden');
  return false;
};

// const store = new Store();
// cart.classes.push(classes[0]);
// cart.classes.push(classes[2]);

// cart.classes.push(classes[3]);

const removeFromCart = id => {
  let isOneRemoved = false;

  index = cart.classes.findIndex(x => x.id == id);
  currentClass = cart.classes[index];
  if (index > -1 && currentClass.quantity > 1) {
    currentClass.quantity--;
  } else if (index > -1) {
    cart.classes.splice(index, 1);
  }
  reloadCartPreview();

  index = cart.classes.forEach(x => {
    console.log(x);
  });
};

const resetAnimation = (e, animationName) => {
  setTimeout(() => {
    e.target.classList.remove(animationName);
  }, 1000);
};

const reloadCartPreview = () => {
  let cartPreviewOutput = '';
  let count = 0;

  document.querySelector('.cart-icon > span').innerHTML = `(${
    cart.classes.length
  } items)`;

  if (cart.classes.length > 0) {
    cart.classes.forEach((x, index) => {
      cartPreviewOutput += `<li>${++count}. ${x.name} - Qty: ${
        x.quantity
      } <div class="remove-button" data-id="${x.id}"
}">X</div></li>`;
    });
    cartSubtotal.innerHTML = `Subtotal: $${getSubTotal(cart)}.00`;
    cartPreview.innerHTML = cartPreviewOutput;
  } else {
    cartPreviewOutput = '<li>Add items to your cart!</li>';
    cartSubtotal.innerHTML = `Subtotal: $${getSubTotal(cart)}.00`;
    cartPreview.innerHTML = cartPreviewOutput;
  }

  document.querySelectorAll('.remove-button').forEach(x => {
    x.addEventListener('click', e => {
      removeFromCart(e.target.dataset.id);
    });
  });
  // document.querySelectorAll('.checkout-dropdown > button').forEach(x => {
};

showClassList();
reloadCartPreview();

// getSubTotal(cart);
