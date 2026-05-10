/* js/main.js UPDATED - Motor Conectado ao Visual */
import { farm } from './modules/farm.js';
import { store } from './modules/store.js';
import { inventory } from './modules/inventory.js';
import { ui } from './modules/ui.js';

// Estado global do jogo
const gameState = { farm, store, inventory };
let currentAction = null; 

document.addEventListener('DOMContentLoaded', () => {
    ui.init(gameState);

    // Sistema de seleção de ação (Plantar, Regar, Colher)
    const actionButtons = document.querySelectorAll('.action-btn[data-action]');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentAction = e.target.dataset.action;
            
            // Update visual feedback (New method in ui.js)
            ui.updateActiveActionButton(currentAction);
        });
    });

    // Interação com a Fazenda
    document.getElementById('farm-grid').addEventListener('click', (e) => {
        let plotDiv = e.target.closest('.plot');
        if (!plotDiv) return;
        
        let index = plotDiv.dataset.index;

        if (currentAction === 'plant') {
            let seedToPlant = inventory.getAvailableSeed();
            if (seedToPlant) {
                if (farm.plant(index, seedToPlant)) {
                    inventory.useSeed(seedToPlant);
                }
            } else {
                alert('Você não tem sementes na mochila!');
            }
        } else if (currentAction === 'water') {
            farm.water(index);
        } else if (currentAction === 'harvest') {
            let earnings = farm.harvest(index);
            if (earnings > 0) store.money += earnings;
        }
        
        ui.render(); // Atualiza a tela após a ação
    });

    // Loja de Sementes - Bugfix para cliques nos itens
    document.getElementById('store-items').addEventListener('click', (e) => {
        // Encontra o botão que foi clicado, mesmo se clicou no texto dentro dele
        let storeBtn = e.target.closest('.store-btn');
        if (storeBtn) {
            let item = storeBtn.dataset.item;
            if (!store.buySeed(item)) {
                alert('Dinheiro insuficiente!');
            }
            ui.render();
        }
    });

    // Passar o dia
    document.getElementById('btn-next-day').addEventListener('click', () => {
        farm.nextDay();
        ui.render();
    });
});
