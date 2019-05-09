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
    render(content) {
        console.log(this.container);
    }
    setPetsAmountInCart() {
        document.querySelector(".petsInCart").innerHTML = localStorage.length;
    }
    setCallback(elem, event, callback) {
        elem.addEventListener(event, callback);
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
    setBackgroundBlur(container, blurAmount) {
        container.style.filter = blurAmount;
    }
    setClosePopupCallback(popup) {
        const btn = instance.querySelector(".popupCloseBtn");
        btn.addEventListener("click", () => popup.remove());
        this.setBackgroundBlur(document.body, "0");
    }
    showCartPopup() {
        const popup = document.getElementById("cartPopup-template");
        const instance = document.importNode(popup.content, true);

        const btn = instance.querySelector(".popupCloseBtn");
        btn.addEventListener("click", () => popup.remove());

        // const pets = Array.from(localStorage);
        // console.log(pets);
        // const cartPetTmplt = document.getElementById('cartPet-template');
        // pets.forEach(pet => {
        //     const instance = document.importNode(cartPetTmplt.content, true);
        //     console.log(pet);
        //     instance.querySelector(".petAttributes").innerHTML = `Price: ${pet.value.price || ""} Color: ${pet.value.color || ""}`;
        //     cartPets.appendChild(instance);
        // });

        document.body.appendChild(instance);
        // document.body.style.filter = "2px";
    } 
    clearCart() {
        localStorage.clear();
        document.querySelector(".petsInCart").innerHTML = localStorage.length;
    }
}
