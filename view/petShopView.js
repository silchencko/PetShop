export default class PetShopView {
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
    setPetCallback(event, elem, pet) {
        const btn = elem.querySelector(".addToCartBtn");
        
        btn.addEventListener(event, () => {
            try {
                const key = localStorage.length;
                localStorage[key] = JSON.stringify(pet);
                this.setPetsAmountInCart();
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    console.log('Превышен лимит');
                }
            }
        });
    }
    setPetsList(pet, container) {
        const instance = document.importNode(this.petTmplt.content, true);
        instance.querySelector(".petAttributes").innerHTML = `Price: ${pet.price} Color: ${pet.color}`;
        container.appendChild(instance);
        return container.lastElementChild;
    }
    setBackgroundBlur(blurAmount) {
        const content = document.querySelector(".content");
        content.style.filter = `blur(${blurAmount})`;
    }
    
    // Cart
    setPetsAmountInCart() {
        document.querySelector(".petsInCart").innerHTML = localStorage.length;
    }
    showCartPopup() {
        const popupTmplt = document.getElementById("cartPopup-template");
        const instanceCart = document.importNode(popupTmplt.content, true);

        this.fillupCartPets(Array.from(localStorage), instanceCart);
        document.body.appendChild(instanceCart);
        const popup = document.body.querySelector(".cartPopup");

        this.setBackgroundBlur("2px");
        this.setClosePopupCallback(popup);
    } 
    setClosePopupCallback(popup) {
        const btn = popup.querySelector(".popupCloseBtn");
        debugger;
        btn.addEventListener("click", () => {
            popup.remove();
            this.setBackgroundBlur("0");
        });
    }
    fillupCartPets(pets, parentInstance) {
        const cartPetTmplt = document.getElementById('cartPet-template');
        pets.forEach(pet => {
            pet = JSON.parse(pet);
            const instance = document.importNode(cartPetTmplt.content, true);
            instance.querySelector(".petAttributes").innerHTML = `Price: ${pet.price || ""} Color: ${pet.color || ""}`;
            parentInstance.querySelector(".cartPets").appendChild(instance);
        });
    }
    clearCart() {
        localStorage.clear();
        this.setPetsAmountInCart();
    }
}
