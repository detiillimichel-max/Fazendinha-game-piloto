export const farm = {
    day: 1,
    // Cria 4 lotes de terra vazios
    plots: Array(4).fill(null).map(() => ({ state: 'empty', crop: null, growth: 0, watered: false })),
    
    plant(index, seedType) {
        if (this.plots[index].state === 'empty') {
            this.plots[index] = { state: 'planted', crop: seedType, growth: 0, watered: false };
            return true;
        }
        return false;
    },
    
    water(index) {
        if (this.plots[index].state === 'planted' && !this.plots[index].watered) {
            this.plots[index].watered = true;
            return true;
        }
        return false;
    },
    
    harvest(index) {
        let plot = this.plots[index];
        if (plot.state === 'ready') {
            const profit = { milho: 25, trigo: 40, soja: 60 }; // Lucro ao colher
            let earnings = profit[plot.crop];
            // Reseta o lote de terra
            this.plots[index] = { state: 'empty', crop: null, growth: 0, watered: false };
            return earnings;
        }
        return 0;
    },
    
    nextDay() {
        this.day++;
        this.plots.forEach(plot => {
            if (plot.state === 'planted') {
                if (plot.watered) {
                    plot.growth++;
                    plot.watered = false; // A terra seca no dia seguinte
                    if (plot.growth >= 2) {
                        plot.state = 'ready'; // Pronta para colher após 2 dias regados
                    }
                }
            }
        });
    }
};
