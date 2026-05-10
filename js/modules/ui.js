/* js/modules/ui.js UPDATED - Lógica Visual Jogo */
export const ui = {
    init(state) {
        this.state = state;
        this.dayDisplay = document.getElementById('day-display');
        this.moneyDisplay = document.getElementById('money-display');
        this.farmGrid = document.getElementById('farm-grid');
        this.storeItems = document.getElementById('store-items');
        this.inventoryDisplay = document.getElementById('inventory-display');
        this.actionButtons = document.querySelectorAll('.action-btn[data-action]');
        this.render();
    },

    render() {
        this.dayDisplay.textContent = `Dia ${this.state.farm.day}`;
        this.moneyDisplay.textContent = `$${this.state.store.money}`; // Simbolo curto
        this.renderFarm();
        this.renderStore();
        this.renderInventory();
    },

    // Novo: Atualiza o feedback visual do botão orbital selecionado
    updateActiveActionButton(activeAction) {
        this.actionButtons.forEach(btn => {
            if (btn.dataset.action === activeAction) {
                // Destaca o botão selecionado
                btn.style.background = 'var(--accent-color)';
                btn.style.color = 'white';
            } else {
                // Reseta os outros
                btn.style.background = 'white';
                btn.style.color = 'var(--accent-color)';
            }
        });
    },

    renderFarm() {
        this.farmGrid.innerHTML = '';
        this.state.farm.plots.forEach((plot, index) => {
            let div = document.createElement('div');
            div.className = 'plot';
            div.dataset.index = index;
            
            // Aplica a classe de TERRA MOLHADA do CSS
            if (plot.watered) {
                div.classList.add('watered');
            }

            // Define o ícone da planta com base no estado
            if (plot.state === 'empty') {
                 // Canteiro vazio (apenas terra)
            }
            if (plot.state === 'planted') {
                div.textContent = '🌱'; // Brotinho
            }
            if (plot.state === 'ready') {
                // Melhor: Usa ícone diferente para cada colheita
                if (plot.crop === 'milho') div.textContent = '🌽';
                if (plot.crop === 'trigo') div.textContent = '🌾';
                if (plot.crop === 'soja')  div.textContent = '🌿';
            }
            
            this.farmGrid.appendChild(div);
        });
    },

    renderStore() {
        this.storeItems.innerHTML = '';
        Object.entries(this.state.store.prices).forEach(([item, price]) => {
            let btn = document.createElement('button');
            btn.className = 'store-btn';
            
            // Capitaliza a primeira letra
            let itemName = item.charAt(0).toUpperCase() + item.slice(1);
            
            btn.textContent = `Comprar ${itemName} ($${price})`;
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
