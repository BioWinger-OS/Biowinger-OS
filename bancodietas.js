/**
 * ZAGAPRO NUTRITION DATABASE - NUTRIÇÃO DE ALTA PERFORMANCE PARA DEFENSORES
 * Estrutura: Nível de Intensidade -> Macronutrientes, Refeições, Hidratação e Suplementação
 */

const bancoDietas = {
    "recuperacao": {
        titulo: "Plano de Recuperação Tecidual e Anti-inflamatório",
        foco: "Reduzir o estresse oxidativo e acelerar a regeneração muscular após jogos ou treinos intensos.",
        macros_alvo: { carbo: "Baixo/Médio", proteina: "Alto", gordura: "Média (Saudável)" },
        refeicoes: [
            {
                horario: "Café da Manhã",
                opcoes: ["Omelete com 3 ovos e espinafre", "Suco de uva integral (resveratrol)", "Torrada integral com abacate"],
                beneficio: "Proteína de absorção lenta e gorduras monoinsaturadas."
            },
            {
                horario: "Almoço",
                opcoes: ["Salmão grelhado ou Sardinha", "Arroz negro ou Quinoa", "Salada de folhas escuras com cúrcuma"],
                beneficio: "Ômega 3 para combater inflamações articulares."
            },
            {
                horario: "Lanche da Tarde",
                opcoes: ["Iogurte grego natural", "Mix de castanhas e nozes", "Frutas vermelhas (mirtilo/morango)"],
                beneficio: "Antioxidantes e probióticos para o sistema imune."
            },
            {
                horario: "Jantar",
                opcoes: ["Sopa de legumes com frango desfiado", "Chá de camomila ou melissa"],
                beneficio: "Refeição leve para favorecer a secreção de GH durante o sono."
            }
        ],
        hidratacao: {
            recomendacao: "35ml por kg de peso corporal",
            extra: "Adicionar 500ml de água de coco para reposição de potássio."
        },
        suplementacao_sugerida: [
            { item: "Magnésio Inositol", dose: "2g antes de dormir", motivo: "Melhora da qualidade do sono e relaxamento muscular." },
            { item: "Ômega 3", dose: "2g ao dia", motivo: "Ação anti-inflamatória sistêmica." }
        ]
    },

    "normal": {
        titulo: "Plano de Manutenção e Estabilidade Energética",
        foco: "Fornecer energia constante para treinos técnicos e táticos, mantendo o percentual de gordura baixo.",
        macros_alvo: { carbo: "Equilibrado", proteina: "Alto", gordura: "Baixa" },
        refeicoes: [
            {
                horario: "Café da Manhã",
                opcoes: ["Panqueca de aveia e banana", "Queijo branco", "Café preto (sem açúcar)"],
                beneficio: "Carboidratos de baixo índice glicêmico para energia duradoura."
            },
            {
                horario: "Almoço",
                opcoes: ["Peito de frango grelhado", "Feijão preto", "Arroz branco", "Legumes no vapor"],
                beneficio: "Combinação clássica para aporte de aminoácidos completos."
            },
            {
                horario: "Pré-Treino (1h antes)",
                opcoes: ["Sanduíche de atum", "Uma maçã ou pêra"],
                beneficio: "Energia de fácil digestão sem causar peso gástrico."
            },
            {
                horario: "Jantar",
                opcoes: ["Macarrão integral com molho de tomate natural", "Patinho moído", "Salada de rúcula"],
                beneficio: "Reposição de glicogênio moderada."
            }
        ],
        hidratacao: {
            recomendacao: "40ml por kg de peso corporal",
            extra: "Ingerir 500ml de água a cada 2 horas de forma fracionada."
        },
        suplementacao_sugerida: [
            { item: "Multivitamínico", dose: "1 cápsula no café", motivo: "Garantir micronutrientes para o metabolismo energético." },
            { item: "Whey Protein", dose: "30g pós-treino", motivo: "Síntese proteica imediata." }
        ]
    },

    "intensivo": {
        titulo: "Plano de Alta Performance e Explosão Glicolítica",
        foco: "Maximizar os estoques de glicogênio e fornecer substrato para força explosiva e sprints de alta intensidade.",
        macros_alvo: { carbo: "Alto", proteina: "Alto", gordura: "Mínima" },
        refeicoes: [
            {
                horario: "Café da Manhã",
                opcoes: ["Cuscuz com ovos", "Suco de laranja natural", "Banana com mel e canela"],
                beneficio: "Carga de carboidratos rápida para enfrentar a carga de treino."
            },
            {
                horario: "Almoço (Pré-Jogo/Intensivo)",
                opcoes: ["Macarrão espaguete (al dente)", "Filé de frango", "Purê de batata doce"],
                beneficio: "Estoque máximo de energia muscular (Glicogênio)."
            },
            {
                horario: "Intra-Treino",
                opcoes: ["Bebida isotônica", "Gel de carboidrato (se > 60min)"],
                beneficio: "Manutenção da glicose sanguínea e eletrólitos."
            },
            {
                horario: "Pós-Treino Imediato",
                opcoes: ["Shake de Dextrose com Whey", "1 Banana"],
                beneficio: "Pico de insulina controlado para transporte de nutrientes."
            },
            {
                horario: "Jantar",
                opcoes: ["Risoto de frango", "Salada de beterraba", "Suco de melancia"],
                beneficio: "Beterraba auxilia na produção de óxido nítrico (vasodilatação)."
            }
        ],
        hidratacao: {
            recomendacao: "50ml por kg de peso corporal",
            extra: "Monitorar cor da urina; deve estar clara. Ingerir sódio extra se houver muito suor."
        },
        suplementacao_sugerida: [
            { item: "Creatina Monohidratada", dose: "5g diários", motivo: "Aumento de força explosiva e hidratação celular." },
            { item: "Beta-Alanina", dose: "3g ao dia", motivo: "Efeito tamponante para retardar a fadiga muscular (acidose)." }
        ]
    }
};
