class PetShopView {
    constructor() {
        this.container = document.querySelector(".PetShop");
        this.cart = document.querySelector(".cart");
        this.petTmplt = document.getElementById('pet-template');
        this.allCatsList = document.querySelector('.allCats');
        this.greaterPriceList = document.querySelector('.greaterPricePets');
        this.fluffyWhiteList =  document.querySelector('.fluffyWhitePets');
    }
    render(content) {
        console.log(this.container);
        // this.container.innerHTML = content;
    }
    // setCartCallback(elem, event, callback) {
    //     elem.addEventListener(event, callback);
    // }

    setPetsList(petList, container) {
        petList.forEach(pet => {
            const instance = document.importNode(this.petTmplt.content, true);
            instance.querySelector(".petAttributes").innerHTML = `Price: ${pet.price} Color: ${pet.color}`;
            container.appendChild(instance);
        });
    }
}
