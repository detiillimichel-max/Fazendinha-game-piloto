export const ui = {
    init(state) {
        this.state = state;
        this.dayDisplay = document.getElementById('day-display');
        this.moneyDisplay = document.getElementById('money-display');
        this.farmGrid = document.getElementById('farm-grid');
        this.storeItems = document.getElementById('store-items');
        this.inventoryDisplay = document.getElementById('inventory-display');
        this.render();
    },

    render() {
        this.dayDisplay.textContent = `Dia ${this.state.farm.day}`;
        this.moneyDisplay.textContent = `Dinheiro: $${this.state.store.money}`;
        this.renderFarm();
        this.renderStore();
        this.renderInventory();
    },

    renderFarm() {
        this.farmGrid.innerHTML = '';
        this.state.farm.plots.forEach((plot, index) => {
            let div = document.createElement('div');
            div.className = 'plot';
            div.dataset.index = index;
            
            if (plot.state === 'empty') div.textContent = '';
            if (plot.state === 'planted') div.textContent = plot.watered ? '💦' : '🌱';
            if (plot.state === 'ready') div.textContent = '🌾';
            
            this.farmGrid.appendChild(div);
        });
    },

    renderStore() {
        this.storeItems.innerHTML = '';
        Object.entries(this.state.store.prices).forEach(([item, price]) => {
            let btn = document.createElement('button');
            btn.className = 'store-btn action-btn';
            btn.textContent = `Comprar ${item} ($${price})`;
            btn.dataset.item = item;
            this.storeItems.appendChild(btn);
        });
    },

    renderInventory() {
        let txt = Object.entries(this.state.inventory.seeds)
            .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`)
            .join(' | ');
        this.inventoryDisplay.textContent = txt || 'Mochila Vazia';
    }
};
