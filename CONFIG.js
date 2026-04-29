/**
 * ==============================================================================
 * CONFIG.JS - CONFIGURAÇÕES CENTRALIZADAS DO SOCCER IA
 * ==============================================================================
 * Constantes, configurações e parâmetros do sistema
 */

const CONFIG = {
    // ========================================================================
    // 1. SISTEMA
    // ========================================================================
    SYSTEM: {
        NAME: "Soccer IA",
        VERSION: "1.0.0",
        DESCRIPTION: "Sistema Inteligente de Análise e Otimização de Futebol",
        AUTHOR: "GeladoGod12",
        STORAGE_KEY: "SOCCER_IA_DATA",
        MAX_STORAGE_MB: 5,
        DEBUG: true
    },

    // ========================================================================
    // 2. POSIÇÕES E CARACTERÍSTICAS
    // ========================================================================
    POSICOES: {
        CB: { nome: "Zagueiro Central", foco: ["Força", "Antecipação"] },
        LB: { nome: "Lateral Esquerdo", foco: ["Velocidade", "Agilidade"] },
        RB: { nome: "Lateral Direito", foco: ["Velocidade", "Agilidade"] },
        CDM: { nome: "Meio-campista Defensivo", foco: ["Resistência", "Força"] },
        CM: { nome: "Meio-campista", foco: ["Resistência", "Técnica"] },
        CAM: { nome: "Meio-campista Ofensivo", foco: ["Técnica", "Criatividade"] },
        LW: { nome: "Ala Esquerdo", foco: ["Velocidade", "Drible"] },
        RW: { nome: "Ala Direito", foco: ["Velocidade", "Drible"] },
        ST: { nome: "Atacante", foco: ["Força", "Velocidade"] }
    },

    // ========================================================================
    // 3. OBJETIVOS NUTRICIONAIS
    // ========================================================================
    OBJETIVOS_NUTRICIONAIS: {
        ganhar_massa: {
            label: "Ganhar Massa Muscular",
            descricao: "Aumentar massa muscular com superávit calórico",
            proteina_por_kg: 2.2,
            carbs_por_kg: 6,
            gordura_por_kg: 1.5,
            foco_treino: ["força", "agilidade"]
        },
        perder_peso: {
            label: "Perder Peso",
            descricao: "Reduzir gordura com déficit calórico",
            proteina_por_kg: 2.0,
            carbs_por_kg: 3,
            gordura_por_kg: 0.8,
            foco_treino: ["resistencia", "velocidade"]
        },
        manutenção: {
            label: "Manutenção",
            descricao: "Manter forma e desempenho",
            proteina_por_kg: 1.8,
            carbs_por_kg: 5,
            gordura_por_kg: 1.2,
            foco_treino: ["equilibrado"]
        },
        melhorar_performance: {
            label: "Melhorar Performance",
            descricao: "Otimizar rendimento em partidas",
            proteina_por_kg: 2.0,
            carbs_por_kg: 7,
            gordura_por_kg: 1.0,
            foco_treino: ["velocidade", "agilidade", "resistencia"]
        }
    },

    // ========================================================================
    // 4. NÍVEIS FÍSICOS
    // ========================================================================
    NIVEIS_FISICOS: {
        ELITE: { 
            label: "ELITE",
            descricao: "Atleta de nível profissional/elite",
            min_score: 0.8,
            fator_atividade: 1.9,
            sessoes_treino_semana: 6,
            cor: "#FFD700" // Ouro
        },
        PROFISSIONAL: { 
            label: "PROFISSIONAL",
            descricao: "Atleta profissional",
            min_score: 0.6,
            fator_atividade: 1.8,
            sessoes_treino_semana: 5,
            cor: "#00AAFF" // Azul
        },
        AMADOR: { 
            label: "AMADOR",
            descricao: "Atleta amador/semi-profissional",
            min_score: 0.4,
            fator_atividade: 1.6,
            sessoes_treino_semana: 4,
            cor: "#FF6B00" // Laranja
        },
        INICIANTE: { 
            label: "INICIANTE",
            descricao: "Iniciante/recreativo",
            min_score: 0,
            fator_atividade: 1.5,
            sessoes_treino_semana: 3,
            cor: "#00CC00" // Verde
        }
    },

    // ========================================================================
    // 5. PARÂMETROS FISIOLÓGICOS
    // ========================================================================
    FISIOLOGIA: {
        // IMC
        IMC_MINIMO: 18.5,
        IMC_MAXIMO: 29.9,
        IMC_IDEAL_ATLETA: 23,

        // Idade
        IDADE_IDEAL_PICO: 27,
        IDADE_MINIMA: 16,
        IDADE_MAXIMA: 45,

        // Peso
        PESO_MINIMO: 50,
        PESO_MAXIMO: 150,
        PESO_IDEAL_CM: 0.42, // kg por cm de altura

        // Altura
        ALTURA_MINIMA: 150,
        ALTURA_MAXIMA: 220,
        ALTURA_IDEAL_CM: 180,

        // Fórmulas
        HARRIS_BENEDICT_HOMEM: {
            const: 88.362,
            peso_coef: 13.397,
            altura_coef: 4.799,
            idade_coef: 5.677
        },
        HARRIS_BENEDICT_MULHER: {
            const: 447.593,
            peso_coef: 9.247,
            altura_coef: 3.098,
            idade_coef: 4.330
        }
    },

    // ========================================================================
    // 6. CICLOS E FREQUÊNCIAS
    // ========================================================================
    CICLOS: {
        TIPOS_DIA_ELITE: ["aquecimento", "força", "velocidade", "técnica", "resistência", "agilidade", "recuperação"],
        TIPOS_DIA_PROFISSIONAL: ["aquecimento", "força", "resistência", "técnica", "recuperação"],
        TIPOS_DIA_AMADOR: ["aquecimento", "força", "resistência", "recuperação"],
        TIPOS_DIA_INICIANTE: ["aquecimento", "força", "recuperação"],

        FREQUENCIA_TREINDO_POR_SEMANA: {
            ELITE: 6,
            PROFISSIONAL: 5,
            AMADOR: 4,
            INICIANTE: 3
        }
    },

    // ========================================================================
    // 7. RECOMENDAÇÕES
    // ========================================================================
    RECOMENDACOES: {
        AGUA_ML_POR_KG: 35,
        REFEICOES_POR_DIA: 5,
        INTERVALO_REFEICOES_HORAS: 3,
        PROTEINA_MINIMA_POR_KG: 1.6,
        CARBS_MINIMA_POR_KG: 3,
        GORDURA_MINIMA_POR_KG: 0.8
    },

    // ========================================================================
    // 8. SUPLEMENTOS E NUTRIENTES
    // ========================================================================
    SUPLEMENTOS_PADRAO: [
        {
            nome: "Vitamina D3",
            dose: "2000-4000 IU",
            frequencia: "diária",
            para_todos: true
        },
        {
            nome: "Whey Protein",
            dose: "25-30g",
            frequencia: "pós-treino",
            para_todos: true
        }
    ],

    SUPLEMENTOS_POR_OBJETIVO: {
        ganhar_massa: [
            { nome: "Creatina Monoidrato", dose: "5g", frequencia: "diária" },
            { nome: "Maltodextrina + Dextrose", dose: "40-60g", frequencia: "pós-treino" }
        ],
        melhorar_velocidade: [
            { nome: "Beta-alanina", dose: "3-5g", frequencia: "diária" },
            { nome: "Cafeína", dose: "3-6mg/kg", frequencia: "pré-treino" }
        ],
        reduzir_gordura: [
            { nome: "Ômega-3", dose: "1000-2000mg EPA/DHA", frequencia: "diária" },
            { nome: "Green Tea Extract", dose: "500-1000mg", frequencia: "2x dia" }
        ]
    },

    // ========================================================================
    // 9. MENSAGENS E OUTPUTS
    // ========================================================================
    MENSAGENS: {
        SUCESSO: {
            jogador_criado: "✅ Jogador {nome} criado com sucesso!",
            treino_gerado: "✅ Plano de treino gerado com sucesso!",
            dieta_gerada: "✅ Plano nutricional gerado com sucesso!",
            dados_salvos: "✅ Dados salvos no LocalStorage",
            dados_carregados: "✅ Dados carregados com sucesso!"
        },
        ERRO: {
            jogador_nao_encontrado: "❌ Jogador {nome} não encontrado.",
            campos_incompletos: "❌ Preencha todos os campos obrigatórios",
            valores_invalidos: "❌ Um ou mais valores são inválidos",
            armazenamento_cheio: "❌ Armazenamento cheio (máximo 5MB)"
        },
        INFO: {
            nenhum_jogador: "📌 Nenhum jogador cadastrado ainda. Crie um para começar!",
            carregando: "⏳ Processando...",
            analise_completa: "🤖 Análise inteligente em andamento..."
        }
    },

    // ========================================================================
    // 10. LIMITES E RESTRIÇÕES
    // ========================================================================
    LIMITES: {
        MAX_JOGADORES: 1000,
        MAX_HISTORICO_TREINOS: 52, // 52 semanas = 1 ano
        MAX_HISTORICO_DIETAS: 52,
        MIN_IDADE: 16,
        MAX_IDADE: 45,
        MAX_PLANOSGERADOS_DIARIOS: 100,
        TEMPO_CACHE_SEGUNDOS: 300
    },

    // ========================================================================
    // 11. CORES E TEMAS
    // ========================================================================
    CORES: {
        PRIMARIA: "#ff6b00",
        SECUNDARIA: "#0066cc",
        SUCESSO: "#00ff00",
        ERRO: "#ff4444",
        AVISO: "#ffaa00",
        FUNDO_ESCURO: "#1a1a2e",
        FUNDO_CLARO: "#16213e",
        TEXTO_PRINCIPAL: "#e0e0e0",
        TEXTO_SECUNDARIO: "#888888"
    },

    // ========================================================================
    // 12. GETTERS
    // ========================================================================
    obter_fator_atividade: function(nivelFisico) {
        return this.NIVEIS_FISICOS[nivelFisico]?.fator_atividade || 1.75;
    },

    obter_macro_objetivo: function(objetivo) {
        return this.OBJETIVOS_NUTRICIONAIS[objetivo] || this.OBJETIVOS_NUTRICIONAIS.manutenção;
    },

    obter_dias_posicao: function(posicao, nivelFisico) {
        return this.CICLOS[`TIPOS_DIA_${nivelFisico}`] || this.CICLOS.TIPOS_DIA_PROFISSIONAL;
    }
};

// Exportar se for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
