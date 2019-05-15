import { PetShopView } from "/./view/petShopView.js";
import { PetShopModel } from "/./model/petShopModel.js";
import { Cart } from "/./model/cart.js";

export default class PetShopController {
    constructor() {
        this.view = new PetShopView();
        this.petShopModel = {};
        this.cart = {};
        this.pets = null;
        this.catsList = [];
        this.greatPriceList = [];
        this.fluffyWhiteList = [];
    }
    execute() {
        console.log("execute");
        this.getPetsRequest();
        this.getCartRequest();
        this.setPopupCallback();

        //Clear Cart
        this.view.setCallback(this.view.cartClearBtn, "click", this.deleteAllPetsFromCart.bind(this));
    }

    // Requests

    getPetsRequest() {
        fetch('http://localhost:3000/pets')
        .then(response => response.json())
        .then(data => {
            this.petShopModel = new PetShopModel(data);
            this.petShopModel.init();
            this.setPets();
        })
        .catch(error => console.error(error))
    }
    getCartRequest() {
        fetch('http://localhost:3000/cart')
        .then(response => response.json())
        .then(data => {
            this.cart = new Cart(data);
            this.view.setPetsAmountInCart(this.cart.getCounter());
        })
        .catch(error => console.error(error))
    }
    postPetToCart(pet) {
        fetch('http://localhost:3000/cart', {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(pet)
        })
        .then(response => response.json())
        .then(data => {
            this.cart.update(data);
            this.view.setPetsAmountInCart(this.cart.getCounter());
            })
        .catch(error => console.error(error))
    }
    deletePetFromCart(id) {
        fetch(`http://localhost:3000/cart/${id}`, {method: "DELETE"})
        .then(response => response.json())
        .then(data => {
            this.cart.update(data);
            this.view.setPetsAmountInCart(this.cart.getCounter());
            })
        .catch(error => console.error(error))
    }
    deleteAllPetsFromCart() {
        fetch(`http://localhost:3000/cart`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify([])
        })
        .then(response => response.json())
        .then(data => {
            this.cart.update(Array.from(data));
            this.view.setPetsAmountInCart(this.cart.getCounter());
            })
        .catch(error => console.error(error))
    }
    
    // Fillup start lists of pets; gather into one collection and set onclick callback 
    
    setPets() {
        const catsList = this.petShopModel.getCats();
        const greatPriceList = this.petShopModel.getGreaterPricePets();
        const fluffyWhiteList = this.petShopModel.getfluffyAndWhitePets();
        this.addPetsToList(catsList, this.view.allCatsList);
        this.addPetsToList(greatPriceList, this.view.greaterPriceList);
        this.addPetsToList(fluffyWhiteList, this.view.fluffyWhiteList);
    }
    addPetsToList(pets, container) {
        pets.forEach(pet => {
            this.view.setPetsList(pet, container, () => this.postPetToCart(pet));
        });
    }

    // Show Cart with added pets
    setPopupCallback() {
        this.view.setCallback(this.view.cart, "click", () => {
            this.view.showCartPopup(this.cart);
            this.cart.getPets().forEach(pet => this.view.fillupCartPets(pet, () => this.deletePetFromCart(pet.id)));
        });
    }
}