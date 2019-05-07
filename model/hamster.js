import { Pet } from "/./model/pet.js";

export class Hamster extends Pet {
    constructor(color, price, isFluffy) {
        super(color, price);
        this.isFluffy = isFluffy;
    }

}
