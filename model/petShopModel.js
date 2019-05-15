import { Cat } from "/./model/cat.js";
import { Dog } from "/./model/dog.js";
import { Hamster } from "/./model/hamster.js";
import { Cart } from "/./model/cart.js";

export class PetShopModel {
    constructor(data) {
        this.data = data;
        this.pets = [];
        this.cart = new Cart();
    }
    init() {
        this.pets = this.data.map(pet => {
            if (pet.type === "cat") {
                return new Cat(pet.color, pet.price, pet.name, pet.isFluffy);
            } else if (pet.type === "dog") {
                return new Dog(pet.color, pet.price, pet.name);
            } else if (pet.type === "hamster") {
                return new Hamster(pet.color, pet.price, pet.isFluffy);
            }
        })
    }
    getCats() {
        return this.pets.filter(pet => pet instanceof Cat);
    }
    getGreaterPricePets() {
        const sumPrice = this.pets.reduce((sum, pet) => sum + pet.price, 0);
        const averagePrice = sumPrice / this.pets.length;
        return this.pets.filter(pet => pet.price > averagePrice);
    }
    getfluffyAndWhitePets() {
        return this.pets.filter(pet => {
            let a = pet.color === "white";
            let b = pet.isFluffy === true;
            return pet.color === "white" || pet.isFluffy;
        })
    }
}
