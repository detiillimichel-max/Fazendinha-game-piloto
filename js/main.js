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
            
            // Feedback visual de qual botão está ativo
            actionButtons.forEach(b => {
                b.style.background = 'rgba(255, 255, 255, 0.9)';
                b.style.color = 'var(--text-main)';
            });
            e.target.style.background = 'var(--accent-color)';
            e.target.style.color = 'white';
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

    // Loja de Sementes
    document.getElementById('store-items').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            let item = e.target.dataset.item;
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
