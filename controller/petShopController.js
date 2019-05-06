class PetShopController {
    constructor() {
        this.view = new PetShopView();
        this.pets = null;
    }
    execute() {
        console.log("execute");
        this.getRequest();
        // this.view.setViewCallback(elem, 'click', this.addAnimalToCart);
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
    setPets(petsList) {
        this.view.setPetsList(this.getCats(petsList), this.view.allCatsList);
        this.view.setPetsList(this.getGreaterPricePets(petsList), this.view.greaterPriceList);
        this.view.setPetsList(this.getfluffyAndWhitePets(petsList), this.view.fluffyWhiteList);
        // this.view.render(cats);
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
    addAnimalToCart() {

    }
}