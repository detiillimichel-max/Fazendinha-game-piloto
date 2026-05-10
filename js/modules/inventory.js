export const inventory = {
    seeds: { milho: 2, trigo: 0, soja: 0 }, // Sementes iniciais
    
    addSeed(type) {
        this.seeds[type]++;
    },
    
    useSeed(type) {
        if (this.seeds[type] > 0) {
            this.seeds[type]--;
            return true;
        }
        return false;
    },
    
    getAvailableSeed() {
        // Retorna a primeira semente que o jogador tem no inventário
        return Object.keys(this.seeds).find(key => this.seeds[key] > 0);
    }
};
