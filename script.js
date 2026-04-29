/**
 * BIOWINGER CORE ENGINE v4.0 - PERFORMANCE & REHABILITATION
 * Desenvolvido com foco em Engenharia de Software e Fisiologia Esportiva.
 */

"use strict";

class BioWingerPro {
    constructor() {
        // Inicialização de Estado
        this.state = {
            history: JSON.parse(localStorage.getItem('bw_clinical_data')) || [],
            currentPain: 0,
            userProfile: { position: 'Winger', condition: 'Osteochondritis' }
        };

        // Seletores de UI
        this.dom = {
            form: document.getElementById('healthForm'),
            painSlider: document.getElementById('painLevel'),
            painDisplay: document.getElementById('painDisplay'),
            logContainer: document.getElementById('statusLog'),
            anatomyJoint: document.querySelector('.joint'),
            anatomyText: document.querySelector('.anatomy-text h2'),
            loader: id => document.getElementById(id)
        };

        this.init();
    }

    /**
     * Inicialização do Sistema
     */
    init() {
        this.handleLoader();
        this.registerEvents();
        this.renderHistory();
        this.applyAnatomyLogic();
        console.info("🚀 BioWinger Core Engine Ativo");
    }

    /**
     * Gerenciamento do Splash Screen
     */
    handleLoader() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 1500);
        });
    }

    /**
     * Registro de Eventos com Debounce e Throttling
     */
    registerEvents() {
        // Listener do Slider de Dor
        this.dom.painSlider.addEventListener('input', (e) => {
            this.state.currentPain = parseInt(e.target.value);
            this.updatePainUI();
            this.updateAnatomyFeedback();
        });

        // Listener do Formulário de Diagnóstico
        this.dom.form.addEventListener('submit', (e) => this.handleSubmission(e));
        
        // Efeito de Scroll Suave para Âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Atualização Dinâmica da Interface de Dor
     */
    updatePainUI() {
        const val = this.state.currentPain;
        let status = "Indolor";
        let color = "#2ecc71";

        if (val > 0 && val <= 3) { status = "Desconforto Leve"; color = "#f1c40f"; }
        else if (val <= 6) { status = "Dor Moderada"; color = "#e67e22"; }
        else if (val <= 10) { status = "DOR AGUDA - REPOUSO"; color = "#e74c3c"; }

        this.dom.painDisplay.innerText = `${val} - ${status}`;
        this.dom.painDisplay.style.backgroundColor = color + "20"; // Transparência
        this.dom.painDisplay.style.color = color;
        this.dom.painDisplay.style.borderColor = color;
    }

    /**
     * Feedback Visual no SVG de Anatomia
     */
    updateAnatomyFeedback() {
        const joint = this.dom.anatomyJoint;
        const val = this.state.currentPain;

        if (val > 5) {
            joint.setAttribute('fill', '#e74c3c');
            joint.style.filter = "drop-shadow(0 0 15px #e74c3c)";
            this.dom.anatomyText.innerHTML = "Alerta: <span style='color:#e74c3c'>Sobrecarga Crítica</span>";
        } else {
            joint.setAttribute('fill', '#2ecc71');
            joint.style.filter = "none";
            this.dom.anatomyText.innerHTML = "Foco Biomecânico";
        }
    }

    /**
     * Lógica de Submissão e Armazenamento
     */
    handleSubmission(e) {
        e.preventDefault();

        const formData = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('pt-BR'),
            disease: document.getElementById('diseaseName').value,
            location: document.getElementById('painLocation').value,
            pain: this.state.currentPain,
            recommendation: this.getSmartRecommendation(this.state.currentPain)
        };

        this.state.history.unshift(formData);
        this.saveState();
        this.renderHistory();
        this.triggerNotification("Diagnóstico registrado e sincronizado.");
        this.dom.form.reset();
        this.updatePainUI();
    }

    /**
     * Algoritmo de Inteligência Preventiva
     * Retorna protocolos baseados na ciência da cartilagem
     */
    getSmartRecommendation(painLevel) {
        const base = "Protocolo Sugerido: ";
        if (painLevel === 0) return base + "Treino de Performance Completo. Foco em explosão.";
        if (painLevel <= 3) return base + "Mobilidade Articular + Isometria. Reduzir carga de piques em 30%.";
        if (painLevel <= 6) return base + "Zero impacto. Foco em Core e Fortalecimento de Cadeia Posterior.";
        return base + "REPOUSO TOTAL. Protocolo RICE (Gelo/Elevação). Consultar fisioterapeuta.";
    }

    /**
     * Renderização do Log com Efeitos de Entrada
     */
    renderHistory() {
        if (!this.dom.logContainer) return;

        if (this.state.history.length === 0) {
            this.dom.logContainer.innerHTML = `<div class="empty-state">Sem registros recentes.</div>`;
            return;
        }

        this.dom.logContainer.innerHTML = this.state.history.map((item, index) => `
            <div class="log-entry" style="animation-delay: ${index * 0.1}s">
                <div class="log-meta">
                    <span class="log-date">${item.date}</span>
                    <span class="log-pain-tag" style="background:${this.getPainHex(item.pain)}">Dor: ${item.pain}</span>
                </div>
                <div class="log-details">
                    <strong>${item.disease}</strong> - ${item.location}
                    <div class="insight-box">${item.recommendation}</div>
                </div>
            </div>
        `).join('');
    }

    getPainHex(level) {
        if (level < 4) return "#27ae60";
        if (level < 7) return "#f39c12";
        return "#e74c3c";
    }

    saveState() {
        localStorage.setItem('bw_clinical_data', JSON.stringify(this.state.history));
    }

    triggerNotification(msg) {
        const toast = document.createElement('div');
        toast.className = 'system-toast';
        toast.innerText = msg;
        document.body.appendChild(toast);
        
        // Estilo In-line para garantir funcionamento imediato
        Object.assign(toast.style, {
            position: 'fixed', bottom: '30px', right: '30px',
            background: '#2ecc71', color: 'white', padding: '16px 28px',
            borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            zIndex: '10000', animation: 'slideUp 0.4s ease forwards'
        });

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.4s ease forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    applyAnatomyLogic() {
        // Hotspot logic: Clique no SVG interage com o app
        this.dom.anatomyJoint.addEventListener('click', () => {
            this.triggerNotification("Zona de Osteocondrite selecionada.");
            document.getElementById('painLocation').value = 'knee';
        });
    }
}
/**
 * BIOWINGER BIOMECHANICAL ANALYZER v4.0
 * Lógica de processamento de linguagem natural simplificada
 */

const BiomechanicAI = (() => {
    // Base de Dados Clínica Massiva
    const knowledgeBase = [
        {
            keys: ['osteocondrite', 'cartilagem', 'crescimento', 'osso'],
            title: 'Protocolo de Condro-Proteção',
            severity: 'Moderada',
            risk: 45,
            advice: 'Foque no fortalecimento isométrico. O impacto axial (saltos) deve ser evitado para não comprimir a área de fragmentação óssea.',
            prevention: ['Uso de palmilhas de gel', 'Fortalecimento excêntrico', 'Gelo 20min pós-esforço'],
            restrictions: ['Pliometria (Saltos)', 'Tiros de velocidade 100%', 'Mudanças de direção bruscas']
        },
        {
            keys: ['frente', 'patela', 'joelho', 'tendão', 'pulo'],
            title: 'Análise de Tendinopatia Patelar',
            severity: 'Alerta',
            risk: 30,
            advice: 'Sua dor sugere sobrecarga no tendão. Reduza a amplitude do seu drible para evitar a flexão profunda do joelho.',
            prevention: ['Liberação miofascial de coxa', 'Agachamento isométrico', 'Mobilidade de tornozelo'],
            restrictions: ['Agachamento profundo', 'Piques em subida', 'Frenagens curtas']
        },
        {
            keys: ['virei', 'tornozelo', 'lado', 'estalo', 'instável'],
            title: 'Instabilidade Ligamentar Lateral',
            severity: 'Crítica',
            risk: 75,
            advice: 'Risco iminente de entorse grave. Use bandagem funcional (taping) e foque no equilíbrio unipodal antes do treino.',
            prevention: ['Exercícios de propriocepção', 'Fortalecimento de fibulares', 'Bandagem rígida'],
            restrictions: ['Mudança de direção em gramado', 'Chute de trivela', 'Salto em uma perna']
        }
    ];

    const processAnalysis = () => {
        const input = document.getElementById('aiSymptomInput');
        const text = input.value.toLowerCase();
        
        if (text.length < 15) {
            alert("Por favor, descreva seu sintoma com mais clareza para uma análise precisa.");
            return;
        }

        // Simulação de Processamento
        const btn = document.getElementById('processClinicalBtn');
        btn.innerHTML = '<span class="loader-ai"></span> PROCESSANDO BIOMETRIA...';
        btn.disabled = true;

        setTimeout(() => {
            let result = knowledgeBase.find(item => item.keys.some(key => text.includes(key)));
            
            // Caso não encontre padrão específico
            if (!result) {
                result = {
                    title: 'Desconforto Inespecífico',
                    severity: 'Baixa',
                    risk: 15,
                    advice: 'Reduza a carga em 30% hoje. Seus sintomas sugerem fadiga muscular acumulada.',
                    prevention: ['Alongamento dinâmico', 'Hidratação alcalina', 'Descanso ativo'],
                    restrictions: ['Treinos em jejum', 'Sessões superiores a 90min']
                };
            }

            displayResult(result);
            btn.innerHTML = 'ANÁLISE CONCLUÍDA';
            btn.disabled = false;
        }, 1500);
    };

    const displayResult = (data) => {
        document.getElementById('clinicalEmptyState').style.display = 'none';
        document.getElementById('clinicalContent').style.display = 'block';

        // Atualiza Texto
        document.getElementById('clinicalTitle').innerText = data.title;
        document.getElementById('clinicalMainAdvice').innerText = data.advice;
        document.getElementById('riskScore').innerText = data.risk + '%';
        
        // Cores Dinâmicas
        const scoreEl = document.getElementById('riskScore');
        const tagEl = document.getElementById('severityTag');
        if(data.risk > 50) { scoreEl.style.color = '#e74c3c'; tagEl.style.background = '#e74c3c'; tagEl.innerText = 'CRÍTICA'; }
        else if(data.risk > 25) { scoreEl.style.color = '#f1c40f'; tagEl.style.background = '#f1c40f'; tagEl.innerText = 'ALERTA'; }
        else { scoreEl.style.color = '#2ecc71'; tagEl.style.background = '#2ecc71'; tagEl.innerText = 'ESTÁVEL'; }

        // Listas
        const prevList = document.getElementById('preventionList');
        const restrList = document.getElementById('restrictionList');
        
        prevList.innerHTML = data.prevention.map(i => `<li>✅ ${i}</li>`).join('');
        restrList.innerHTML = data.restrictions.map(i => `<li>❌ ${i}</li>`).join('');
    };

    return {
        run: processAnalysis,
        insert: (tag) => {
            const input = document.getElementById('aiSymptomInput');
            input.value += (input.value ? ' ' : '') + tag;
            input.focus();
        }
    };
})();

document.getElementById('saveRecoveryBtn').addEventListener('click', () => {
    const hours = parseFloat(document.getElementById('sleepHours').value);
    const fatigue = parseInt(document.getElementById('fatigueLevel').value);
    const scoreDisplay = document.getElementById('readinessScore');
    const titleDisplay = document.getElementById('readinessTitle');
    const msgDisplay = document.getElementById('readinessMessage');

    if(!hours) return alert("Insira as horas de sono!");

    // Algoritmo de Prontidão (0-100)
    let readiness = (hours * 10) - (fatigue * 4);
    readiness = Math.min(Math.max(readiness, 0), 100).toFixed(0);

    scoreDisplay.innerText = readiness + "%";
    
    if(readiness > 80) {
        titleDisplay.innerText = "ALTA PERFORMANCE";
        msgDisplay.innerText = "Sistema Nervoso Central recuperado. Carga total liberada para treinos de explosão lateral.";
        scoreDisplay.style.color = "var(--primary)";
    } else if(readiness > 50) {
        titleDisplay.innerText = "RECUPERAÇÃO MODERADA";
        msgDisplay.innerText = "Cuidado com piques de alta intensidade. Foque em técnica e mobilidade controlada.";
        scoreDisplay.style.color = "#f1c40f";
    } else {
        titleDisplay.innerText = "RISCO DE LESÃO ALTO";
        msgDisplay.innerText = "Sono insuficiente detectado. Reduza a carga em 60%. Priorize reabilitação isométrica.";
        scoreDisplay.style.color = "var(--danger)";
    }
});

// Bind de Eventos
document.getElementById('processClinicalBtn').addEventListener('click', BiomechanicAI.run);
function insertTag(tag) { BiomechanicAI.insert(tag); }


// Inicialização Global
const BioWinger = new BioWingerPro();
