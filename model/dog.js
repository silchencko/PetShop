import { Pet } from "/./model/pet.js";

export class Dog extends Pet {
    constructor(color, price, name) {
        super(color, price);
        this.name = name;
    }
}
