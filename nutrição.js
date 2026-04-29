/**
 * BIOWINGER NUTRITION ENGINE v4.0
 * Sistema Avançado de Bioquímica e Metabolismo para Atletas de Elite
 */

"use strict";

class BioWingerNutri {
    constructor() {
        this.state = {
            weight: 0,
            activityLevel: 1.55, // Fator para atletas de futebol
            hydrationGoal: 0,
            macros: { carb: 0, prot: 0, fat: 0 }
        };

        this.init();
    }

    init() {
        console.info("⚡ NutriEngine Inicializada...");
        this.registerEvents();
        this.loadSavedData();
        this.injectDynamicStyles();
    }

    registerEvents() {
        // Listener para calculadora de hidratação (SVS)
        const calcBtn = document.querySelector('.calc-box button');
        if (calcBtn) {
            calcBtn.addEventListener('click', () => this.calculateSweatLoss());
        }

        // Listener para os inputs de peso
        document.querySelectorAll('.calc-input').forEach(input => {
            input.addEventListener('change', () => this.updateInternalState());
        });
    }

    /**
     * Algoritmo de Perda Hídrica (Sweat Rate)
     * Baseado nos protocolos da FIFA e do ACSM
     */
    calculateSweatLoss() {
        const pre = parseFloat(document.getElementById('pesoPre').value);
        const pos = parseFloat(document.getElementById('pesoPos').value);
        const display = document.getElementById('resHidro');

        if (!pre || !pos || pre <= pos) {
            this.showFeedback("Insira pesos válidos para o cálculo de desidratação.", "error");
            return;
        }

        const loss = pre - pos; // Kg perdidos
        const replacement = loss * 1.5; // Protocolo 150% de reposição
        
        this.state.weight = pre;
        this.calculateDailyMacros(pre);

        // Renderização Dinâmica do Resultado
        display.style.opacity = '0';
        setTimeout(() => {
            display.innerHTML = `
                <div class="result-card animated-in">
                    <p>Perda de Massa: <strong>${loss.toFixed(2)} kg</strong></p>
                    <p>Reposição Necessária: <span style="color: var(--nutri-mint)">${replacement.toFixed(2)} Litros</span></p>
                    <small>Foco: Isotônicos com Sódio > 450mg/L</small>
                </div>
            `;
            display.style.opacity = '1';
            this.showFeedback("Cálculo SVS Concluído", "success");
        }, 300);
    }

    /**
     * Cálculo de Macronutrientes para Alas e Pontas
     * Foco: Glicogênio e Reparação Tecidual (Osteocondrite)
     */
    calculateDailyMacros(weight) {
        // Carboidratos: 6-8g/kg para alta intensidade
        // Proteína: 1.6-2.2g/kg para reparação estrutural
        // Gordura: 1g/kg para suporte hormonal
        
        this.state.macros.carb = weight * 7;
        this.state.macros.prot = weight * 2;
        this.state.macros.fat = weight * 1;

        this.renderMacroDashboard();
    }

    renderMacroDashboard() {
        const container = document.querySelector('.dashboard-grid');
        let dashboard = document.getElementById('macroDashboard');

        if (!dashboard) {
            dashboard = document.createElement('div');
            dashboard.id = 'macroDashboard';
            dashboard.className = 'glass-panel';
            dashboard.style.gridColumn = '1 / -1';
            dashboard.style.marginTop = '30px';
            container.appendChild(dashboard);
        }

        dashboard.innerHTML = `
            <h3 style="margin-bottom: 20px;">Metas Diárias Personalizadas (${this.state.weight}kg)</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center;">
                <div class="macro-box">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">CARBOIDRATOS</span>
                    <div style="font-size: 1.5rem; font-weight: 800; color: #3498db;">${this.state.macros.carb.toFixed(0)}g</div>
                    <small>Energia Explosiva</small>
                </div>
                <div class="macro-box">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">PROTEÍNAS</span>
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">${this.state.macros.prot.toFixed(0)}g</div>
                    <small>Reparação de Cartilagem</small>
                </div>
                <div class="macro-box">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">GORDURAS</span>
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--gold);">${this.state.macros.fat.toFixed(0)}g</div>
                    <small>Saúde Hormonal</small>
                </div>
            </div>
        `;
    }

    /**
     * Sistema de Notificações Internas (Toasts)
     */
    showFeedback(msg, type) {
        const toast = document.createElement('div');
        toast.innerText = msg;
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            background: ${type === 'success' ? 'var(--nutri-mint)' : '#e74c3c'};
            color: white; padding: 15px 40px; border-radius: 50px; font-weight: bold;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 10000;
            animation: slideUpFade 0.4s forwards;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.4s forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    /**
     * Injeção de CSS Dinâmico para Animações do JS
     */
    injectDynamicStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes slideUpFade {
                from { opacity: 0; transform: translate(-50%, 20px); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }
            .macro-box { background: #fff; padding: 20px; border-radius: 15px; border: 1px solid #eee; }
            .result-card { background: rgba(46, 204, 113, 0.1); padding: 15px; border-radius: 12px; border: 1px solid var(--nutri-mint); margin-top: 10px; text-align: left; }
        `;
        document.head.appendChild(style);
    }

    loadSavedData() {
        const savedWeight = localStorage.getItem('bw_last_weight');
        if (savedWeight) {
            document.getElementById('pesoPre').value = savedWeight;
            this.calculateDailyMacros(parseFloat(savedWeight));
        }
    }

    updateInternalState() {
        const preWeight = document.getElementById('pesoPre').value;
        if(preWeight) localStorage.setItem('bw_last_weight', preWeight);
    }
}

// Inicialização Master
const NutriApp = new BioWingerNutri();
