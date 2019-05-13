import { Cat } from "/./model/cat.js";
import { Dog } from "/./model/dog.js";
import { Hamster } from "/./model/hamster.js";
import PetShopView from "/./view/petShopView.js";

export default class PetShopController {
    constructor() {
        this.view = new PetShopView();
        this.pets = null;
        this.catsList = [];
        this.greatPriceList = [];
        this.fluffyWhiteList = [];
    }
    execute() {
        console.log("execute");
        this.getRequest();
        this.setPopupCallback();
        //Cart
        this.view.setPetsAmountInCart();
        this.view.setCallback(this.view.cartClearBtn, "click", this.view.clearCart);
    }
    getRequest() {
        fetch('https://silchencko.github.io/data.json')
        .then(response => response.json())
        .then(data => this.setPets(this.parseResponse(data)))
        .catch(error => console.error(error))
    }
    parseResponse(data) {
        return data.map(pet => {
            if (pet.type === "cat") {
                return new Cat(pet.color, pet.price, pet.name, pet.isFluffy);
            } else if (pet.type === "dog") {
                return new Dog(pet.color, pet.price, pet.name);
            } else if (pet.type === "hamster") {
                return new Hamster(pet.color, pet.price, pet.isFluffy);
            }
        })
    }
    // Fillup start lists of pets; gether in one collection and set onclick callback 
    setPets(petsList) {
        const catsList = this.getCats(petsList);
        const greatPriceList = this.getGreaterPricePets(petsList);
        const fluffyWhiteList = this.getfluffyAndWhitePets(petsList);
        this.addPetsToList(catsList, this.view.allCatsList);
        this.addPetsToList(greatPriceList, this.view.greaterPriceList);
        this.addPetsToList(fluffyWhiteList, this.view.fluffyWhiteList);
    }
    addPetsToList(pets, container) {
        pets.forEach(pet => {
            const node = this.view.setPetsList(pet, container);
            this.view.setPetCallback("click", node, pet);
        })
    }
    setPetClickCallback(pets) {
        Array.from(pets).forEach(pet => this.view.setPetCallback("click", pet));
    }
    getCats(petsList) {
        return petsList.filter(pet => pet instanceof Cat);
    }
    getGreaterPricePets(petsList) {
        const sumPrice = petsList.reduce((sum, pet) => sum + pet.price, 0);
        const averagePrice = sumPrice / petsList.length;
        return petsList.filter(pet => pet.price > averagePrice);
    }
    getfluffyAndWhitePets(petsList) {
        return petsList.filter(pet => {
            let a = pet.color === "white";
            let b = pet.isFluffy === true;
            return pet.color === "white" || pet.isFluffy;
        })
    }

    // Cart
    addPetToCart() {
        const key = localStorage.length;
        localStorage[key] = JSON.stringify(this);
        this.view.setPetsInCart(localStorage.length);
    }
    setPopupCallback() {
        this.view.setCallback(this.view.cart, "click", this.view.showCartPopup);
    }
}