/**
 * ZAGAPRO AI CORE - ENGINE DE PERFORMANCE DE ELITE
 * Versão: 6.0 "The Sentinel"
 * Lógica: Algoritmos de Biofeedback e Planejamento Tático-Fisiológico
 */

const ZagaAI = {
    // Constantes de Referência Baseadas em Protocolos FIFA/UEFA
    CONSTANTES: {
        METS_TREINO: { recuperacao: 3.5, normal: 7.0, intensivo: 10.5 },
        PROTEINA_ALVO: 2.0, // gramas por kg
        GORDURA_ALVO: 0.8,   // gramas por kg
        HIDRATACAO_BASE: 40, // ml por kg
        PONTOS_FADIGA_LIMITE: 8.5
    },

    /**
     * Função Mestra de Processamento
     */
    analisarAtleta: function(sub, nivelDesejado, fadiga, bioData) {
        console.log("%c[ZagaPro AI] Iniciando Diagnóstico de Alta Performance...", "color: #98FF98; font-weight: bold;");

        // 1. ANÁLISE BIOMÉTRICA AVANÇADA
        const imc = bioData.peso / (bioData.altura * bioData.altura);
        const tmb = this.calcularTaxaMetabolica(bioData, sub);
        
        // 2. LÓGICA DE SEGURANÇA E SOBREESCRITA (SAFETY OVERRIDE)
        // Se a fadiga for alta, a IA veta o treino intensivo para evitar lesão de LCA/Posterior
        let nivelReal = nivelDesejado;
        let alertaSeguranca = false;

        if (fadiga >= this.CONSTANTES.PONTOS_FADIGA_LIMITE) {
            nivelReal = "recuperacao";
            alertaSeguranca = true;
        } else if (fadiga > 6 && nivelDesejado === "intensivo") {
            nivelReal = "normal";
            alertaSeguranca = true;
        }

        // 3. SELEÇÃO E FILTRAGEM NOS BANCOS DE DADOS
        const treinosFiltrados = this.obterTreinos(sub, nivelReal);
        const dietaFiltrada = this.obterDieta(nivelReal, bioData.peso);

        // 4. CÁLCULO DE SCORE DE PRONTIDÃO (READY SCORE)
        const readyScore = this.calcularScoreProntidao(fadiga, imc, sub);

        // 5. GERAÇÃO DE INSIGHTS TÁTICOS DINÂMICOS
        const insight = this.gerarInsightEstrategico(sub, nivelReal, fadiga);

        return {
            status: "Success",
            metadados: {
                imc: imc.toFixed(1),
                classificacao_imc: this.classificarIMC(imc),
                tmb_estimada: Math.round(tmb),
                agua_diaria: (bioData.peso * this.CONSTANTES.HIDRATACAO_BASE) / 1000,
                nivel_aplicado: nivelReal,
                risco_lesao: alertaSeguranca
            },
            performance: {
                score: readyScore,
                intensidade_metabolica: this.CONSTANTES.METS_TREINO[nivelReal]
            },
            plano: {
                treino: treinosFiltrados,
                dieta: dietaFiltrada,
                dica_ia: insight
            }
        };
    },

    /**
     * Harris-Benedict reajustada para Atletas de Base
     */
    calcularTaxaMetabolica: function(bio, sub) {
        let tmbBase = (10 * bio.peso) + (6.25 * (bio.altura * 100)) - 5;
        // Ajuste por categoria (Sub-18 gasta mais que Sub-8)
        const multiplicadores = { "Sub-8": 1.3, "Sub-10": 1.4, "Sub-12": 1.5, "Sub-14": 1.6, "Sub-16": 1.7, "Sub-18": 1.8 };
        return tmbBase * (multiplicadores[sub] || 1.5);
    },

    classificarIMC: function(imc) {
        if (imc < 18.5) return "Ectomorfo - Foco em Superávit Calórico";
        if (imc < 25) return "Atlético - Foco em Potência";
        return "Endomorfo - Foco em Densidade Nutricional";
    },

    calcularScoreProntidao: function(fadiga, imc, sub) {
        let score = 100;
        score -= (fadiga * 8); // Fadiga é o maior detrator
        if (imc > 26 || imc < 18) score -= 10; // IMC fora do range atlético
        return Math.max(score, 15); // Nunca menor que 15%
    },

    obterTreinos: function(sub, nivel) {
        // Busca no banco de dados global (bancotreinos.js)
        if (typeof bancoTreinos !== 'undefined' && bancoTreinos[sub]) {
            return bancoTreinos[sub][nivel];
        }
        return [{ nome: "Erro no Banco", desc: "Verifique se bancotreinos.js foi carregado." }];
    },

    obterDieta: function(nivel, peso) {
        if (typeof bancoDietas !== 'undefined' && bancoDietas[nivel]) {
            const d = bancoDietas[nivel];
            // Personalização em tempo real por peso
            return {
                ...d,
                macros_calculados: {
                    proteina: Math.round(peso * this.CONSTANTES.PROTEINA_ALVO) + "g",
                    gordura: Math.round(peso * this.CONSTANTES.GORDURA_ALVO) + "g"
                }
            };
        }
        return null;
    },

    gerarInsightEstrategico: function(sub, nivel, fadiga) {
        const biblioteca = {
            geral: [
                "O zagueiro de elite não corre mais, corre melhor. Antecipe a jogada.",
                "Mantenha a distância de um braço. Se o atacante sentir seu hálito, ele te dribla.",
                "Em bolas aéreas, o braço serve para equilíbrio, não para empurrar."
            ],
            fadiga_alta: [
                "IA detectou estresse neuromuscular. Foque na técnica mental e durma 9 horas.",
                "Hoje o treino é invisível: hidratação e magnésio são suas prioridades."
            ],
            sub18_especifico: [
                "Liderança: Se você não orientar seu lateral, o erro dele será seu também.",
                "Zonal Marking: A bola se move, sua zona de responsabilidade flutua com ela."
            ]
        };

        if (fadiga > 7) return biblioteca.fadiga_alta[Math.floor(Math.random() * biblioteca.fadiga_alta.length)];
        if (sub === "Sub-18") return biblioteca.sub18_especifico[Math.floor(Math.random() * biblioteca.sub18_especifico.length)];
        return biblioteca.geral[Math.floor(Math.random() * biblioteca.geral.length)];
    }
};

/**
 * Função de Interface para o Front-end
 */
function processarIA(sub, nivel, fadiga, bioData) {
    const analiseFull = ZagaAI.analisarAtleta(sub, nivel, fadiga, bioData);
    
    // Mapeamento de retorno para o HTML
    return {
        score: analiseFull.performance.score,
        metadados: {
            imc: analiseFull.metadados.imc,
            caloriasEstimadas: analiseFull.metadados.tmb_estimada,
            alertaLesao: analiseFull.metadados.risco_lesao,
            nivelAplicado: analiseFull.metadados.nivel_aplicado
        },
        planoTreino: analiseFull.plano.treino,
        planoDieta: analiseFull.plano.dieta,
        dicaMestre: analiseFull.plano.dica_ia
    };
}
