export class Cart {
    constructor(pets) {
        this.pets = pets;
    }
    getCounter() {
        return this.pets.length;
    }
    getPets() {
        return this.pets;
    }
    update(data) {
        console.log(data);
        this.pets = data;
    }
}