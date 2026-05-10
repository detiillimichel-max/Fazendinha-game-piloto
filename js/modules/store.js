import { inventory } from './inventory.js';

export const store = {
    money: 60,
    prices: { milho: 10, trigo: 15, soja: 20 },
    
    buySeed(type) {
        if (this.money >= this.prices[type]) {
            this.money -= this.prices[type];
            inventory.addSeed(type);
            return true;
        }
        return false;
    }
};

