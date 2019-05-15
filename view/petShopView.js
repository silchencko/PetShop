export class PetShopView {
    constructor() {
        this.container = document.querySelector(".PetShop");
        this.cart = document.querySelector(".cart-content");
        this.cartClearBtn = document.querySelector('.clearCart');
        this.petTmplt = document.getElementById('pet-template');
        this.allCatsList = document.querySelector('.allCats');
        this.greaterPriceList = document.querySelector('.greaterPricePets');
        this.fluffyWhiteList =  document.querySelector('.fluffyWhitePets');
    }
    render() {
        console.log(this.container);
    }
    setCallback(elem, event, callback) {
        elem.addEventListener(event, callback.bind(this));
    }
    setCallback1(elem, event, callback) {
        elem.addEventListener(event, callback);
    }

    // Create node into container and set eventListener

    setPetsList(pet, container, callback) {
        const petNode = this.addPetToList(pet, container);
        const btn = petNode.querySelector(".addToCartBtn");
        btn.addEventListener("click", callback);
    }
    addPetToList(pet, container) {
        const instance = document.importNode(this.petTmplt.content, true);
        instance.querySelector(".petAttributes").innerHTML = `Price: ${pet.price} Color: ${pet.color}`;
        container.appendChild(instance);
        return container.lastElementChild;
    }
    
    // Cart

    setPetsAmountInCart(num) {
        document.querySelector(".petsInCart").innerHTML = num;
    }
    showCartPopup(cartModel, deleteCallback) {
        const popupTmplt = document.getElementById("cartPopup-template");
        const instanceCart = document.importNode(popupTmplt.content, true);
        document.body.appendChild(instanceCart);

        const popup = document.body.querySelector(".cartPopup");
        this.setBackgroundBlur("2px");
        this.setClosePopupCallback(popup);
    }
    setBackgroundBlur(blurAmount) {
        const content = document.querySelector(".content");
        content.style.filter = `blur(${blurAmount})`;
    }
    setClosePopupCallback(popup) {
        const btn = popup.querySelector(".popupCloseBtn");
        btn.addEventListener("click", () => {
            popup.remove();
            this.setBackgroundBlur("0");
        });
    }

    // Show all pets added into Cart

    fillupCartPets(pet, deleteCallback) {
        const cartPetTmplt = document.getElementById('cartPet-template');
        const instance = document.importNode(cartPetTmplt.content, true);
        instance.querySelector(".petAttributes").innerHTML = 
            `Price: ${pet.price || ""} Color: ${pet.color || ""} id: ${pet.id}`;

        // Set delete event
        const btn = instance.querySelector(".deleteFromCartBtn");
        btn.addEventListener("click", deleteCallback);

        document.querySelector(".cartPets").appendChild(instance);
    }

}
