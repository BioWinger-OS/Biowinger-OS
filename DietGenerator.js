/**
 * ==============================================================================
 * MÓDULO: GERADOR DE DIETAS PERSONALIZADAS
 * ==============================================================================
 * Cria planos nutricionais adaptados aos objetivos e características do jogador
 */

class DietGenerator {
    constructor() {
        // Macronutrientes por objetivo
        this.macrosObjetivos = {
            ganhar_massa: { proteina: 2.2, carboidrato: 6, gordura: 1.5 },
            perder_peso: { proteina: 2.0, carboidrato: 3, gordura: 0.8 },
            manutenção: { proteina: 1.8, carboidrato: 5, gordura: 1.2 },
            melhorar_performance: { proteina: 2.0, carboidrato: 7, gordura: 1.0 }
        };

        // Banco de alimentos por categoria
        this.alimentos = {
            proteinas: [
                { nome: "Peito de frango", calorias: 165, proteina: 31, carboidrato: 0, gordura: 3.6, porcao: "100g" },
                { nome: "Ovos inteiros", calorias: 155, proteina: 13, carboidrato: 1.1, gordura: 11, porcao: "1 ovo" },
                { nome: "Salmão", calorias: 208, proteina: 20, carboidrato: 0, gordura: 13, porcao: "100g" },
                { nome: "Carne magra", calorias: 200, proteina: 26, carboidrato: 0, gordura: 10, porcao: "100g" },
                { nome: "Iogurte grego", calorias: 100, proteina: 17, carboidrato: 7, gordura: 0.7, porcao: "150g" },
                { nome: "Whey protein", calorias: 110, proteina: 25, carboidrato: 1, gordura: 1, porcao: "1 scoop" },
                { nome: "Tofu", calorias: 76, proteina: 8, carboidrato: 2, gordura: 5, porcao: "100g" },
                { nome: "Atum em lata", calorias: 99, proteina: 21, carboidrato: 0, gordura: 0.8, porcao: "100g" }
            ],
            carboidratos: [
                { nome: "Arroz integral", calorias: 111, proteina: 3, carboidrato: 23, gordura: 1, porcao: "100g" },
                { nome: "Aveia", calorias: 389, proteina: 17, carboidrato: 66, gordura: 7, porcao: "100g" },
                { nome: "Batata doce", calorias: 86, proteina: 1.6, carboidrato: 20, gordura: 0.1, porcao: "100g" },
                { nome: "Macarrão integral", calorias: 124, proteina: 5, carboidrato: 25, gordura: 1, porcao: "100g" },
                { nome: "Pão integral", calorias: 265, proteina: 9, carboidrato: 48, gordura: 3, porcao: "1 fatia" },
                { nome: "Banana", calorias: 89, proteina: 1.1, carboidrato: 23, gordura: 0.3, porcao: "1 unidade" },
                { nome: "Granola", calorias: 472, proteina: 12, carboidrato: 64, gordura: 20, porcao: "100g" },
                { nome: "Mel", calorias: 304, proteina: 0.3, carboidrato: 82, gordura: 0, porcao: "1 col" }
            ],
            frutas_legumes: [
                { nome: "Brócolis", calorias: 34, proteina: 3.7, carboidrato: 7, gordura: 0.4, porcao: "100g" },
                { nome: "Maçã", calorias: 52, proteina: 0.3, carboidrato: 14, gordura: 0.2, porcao: "1 unidade" },
                { nome: "Laranja", calorias: 47, proteina: 0.9, carboidrato: 12, gordura: 0.1, porcao: "1 unidade" },
                { nome: "Abóbora", calorias: 26, proteina: 1, carboidrato: 6, gordura: 0.1, porcao: "100g" },
                { nome: "Cenoura", calorias: 41, proteina: 0.9, carboidrato: 10, gordura: 0.2, porcao: "100g" },
                { nome: "Espinafre", calorias: 23, proteina: 2.9, carboidrato: 3.6, gordura: 0.4, porcao: "100g" },
                { nome: "Melancia", calorias: 30, proteina: 0.6, carboidrato: 8, gordura: 0.2, porcao: "100g" },
                { nome: "Abacaxi", calorias: 50, proteina: 0.5, carboidrato: 13, gordura: 0.1, porcao: "100g" }
            ],
            gorduras: [
                { nome: "Azeite extravirgem", calorias: 884, proteina: 0, carboidrato: 0, gordura: 100, porcao: "1 col" },
                { nome: "Oleaginosas (nozes)", calorias: 654, proteina: 9.2, carboidrato: 14, gordura: 65, porcao: "100g" },
                { nome: "Abacate", calorias: 160, proteina: 2, carboidrato: 9, gordura: 15, porcao: "100g" },
                { nome: "Iogurte integral", calorias: 59, proteina: 10, carboidrato: 3.5, gordura: 0.4, porcao: "100g" },
                { nome: "Manteiga de amendoim", calorias: 588, proteina: 25, carboidrato: 20, gordura: 50, porcao: "100g" },
                { nome: "Coco ralado", calorias: 354, proteina: 3.3, carboidrato: 15, gordura: 33, porcao: "100g" }
            ]
        };
    }

    calcularCaloriasBasais(peso, altura, idade, sexo) {
        // Fórmula de Harris-Benedict
        let calories;
        if (sexo.toLowerCase() === "m") {
            calories = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
        } else {
            calories = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
        }
        return calories;
    }

    calcularTMB(playerProfile) {
        // TMB (Taxa Metabólica Basal) com ajuste para atividade de atleta
        const sexo = "m"; // Ajustar conforme necessário
        const caloriasBasais = this.calcularCaloriasBasais(playerProfile.peso, playerProfile.altura, playerProfile.idade, sexo);
        
        // Multiplicador de atividade
        const fatoresAtividade = {
            "ELITE": 1.9,
            "PROFISSIONAL": 1.8,
            "AMADOR": 1.6,
            "INICIANTE": 1.5
        };

        const fator = fatoresAtividade[playerProfile.nivelFisico] || 1.75;
        return caloriasBasais * fator;
    }

    gerar(playerProfile, dias = 7) {
        const plano = {
            jogador: playerProfile.nome,
            posicao: playerProfile.posicao,
            duracao: dias + " dias",
            data_inicio: new Date().toISOString().split('T')[0],
            info_nutricional: {},
            dias: [],
            suplementos: this.recomendarSuplementos(playerProfile),
            dicas: []
        };

        // Definir objetivo nutricional
        let objetivo = "manutenção";
        if (playerProfile.objetivos.includes("ganhar_massa")) objetivo = "ganhar_massa";
        else if (playerProfile.objetivos.includes("reduzir_gordura")) objetivo = "perder_peso";

        // Calcular calorias e macros
        const calorias_totais = this.calcularTMB(playerProfile);
        const macros = this.macrosObjetivos[objetivo];

        plano.info_nutricional = {
            objetivo: objetivo,
            calorias_diarias: Math.round(calorias_totais),
            calorias_por_refeicao: Math.round(calorias_totais / 5),
            macronutrientes: {
                proteina_g: Math.round(playerProfile.peso * macros.proteina),
                carboidrato_g: Math.round(playerProfile.peso * macros.carboidrato),
                gordura_g: Math.round(playerProfile.peso * macros.gordura)
            },
            // Cálculo de calorias por macro
            calorias_macro: {
                proteina: Math.round(playerProfile.peso * macros.proteina * 4),
                carboidrato: Math.round(playerProfile.peso * macros.carboidrato * 4),
                gordura: Math.round(playerProfile.peso * macros.gordura * 9)
            }
        };

        // Gerar refeições para cada dia
        for (let dia = 0; dia < dias; dia++) {
            const diaRefeicoes = this.gerarRefeicoesDoDia(
                plano.info_nutricional.calorias_diarias,
                playerProfile,
                dia + 1
            );
            plano.dias.push(diaRefeicoes);
        }

        // Adicionar dicas
        plano.dicas = this.gerarDicas(playerProfile, objetivo, plano.info_nutricional);

        return plano;
    }

    gerarRefeicoesDoDia(caloriasTotal, playerProfile, numDia) {
        const refeicoes = [];
        const calorasporRefeicao = caloriasTotal / 5;
        
        const tiposRefeicoes = [
            { nome: "Café da Manhã", hora: "07:00", tipo: "principal" },
            { nome: "Lanche Matinal", hora: "10:00", tipo: "lanche" },
            { nome: "Almoço", hora: "12:00", tipo: "principal" },
            { nome: "Lanche Tarde", hora: "15:00", tipo: "lanche" },
            { nome: "Jantar", hora: "19:00", tipo: "principal" }
        ];

        tiposRefeicoes.forEach((refeicao, idx) => {
            const calorasRefeicao = refeicao.tipo === "lanche" ? calorasporRefeicao * 0.8 : calorasporRefeicao;
            const itens = this.selecionarAlimentos(calorasRefeicao, refeicao.tipo);
            
            refeicoes.push({
                nome: refeicao.nome,
                hora: refeicao.hora,
                itens: itens,
                calorias_total: itens.reduce((sum, item) => sum + item.calorias, 0),
                macros: {
                    proteina: parseFloat(itens.reduce((sum, item) => sum + item.proteina, 0).toFixed(1)),
                    carboidrato: parseFloat(itens.reduce((sum, item) => sum + item.carboidrato, 0).toFixed(1)),
                    gordura: parseFloat(itens.reduce((sum, item) => sum + item.gordura, 0).toFixed(1))
                }
            });
        });

        // Calcular totais do dia
        const totalCalorias = refeicoes.reduce((sum, r) => sum + r.calorias_total, 0);
        const totalProtein = refeicoes.reduce((sum, r) => sum + r.macros.proteina, 0);
        const totalCarb = refeicoes.reduce((sum, r) => sum + r.macros.carboidrato, 0);
        const totalFat = refeicoes.reduce((sum, r) => sum + r.macros.gordura, 0);

        return {
            dia: numDia,
            refeicoes: refeicoes,
            resumo_diario: {
                calorias: Math.round(totalCalorias),
                proteina: parseFloat(totalProtein.toFixed(1)),
                carboidrato: parseFloat(totalCarb.toFixed(1)),
                gordura: parseFloat(totalFat.toFixed(1))
            }
        };
    }

    selecionarAlimentos(calorasAlvo, tipo) {
        const alimentos = [];
        let caloriaAtual = 0;
        const buffer = calorasAlvo * 0.15; // 15% de tolerância

        // Lógica para selecionar alimentos balanceados
        if (tipo === "principal") {
            // Proteína: 30-35%
            const alimentoProteina = this.alimentos.proteinas[Math.floor(Math.random() * this.alimentos.proteinas.length)];
            alimentos.push(alimentoProteina);
            caloriaAtual += alimentoProteina.calorias;

            // Carboidrato: 50-55%
            const alimentoCarb = this.alimentos.carboidratos[Math.floor(Math.random() * this.alimentos.carboidratos.length)];
            alimentos.push(alimentoCarb);
            caloriaAtual += alimentoCarb.calorias;

            // Vegetais/Frutas: 10-15%
            const alimentoVeg = this.alimentos.frutas_legumes[Math.floor(Math.random() * this.alimentos.frutas_legumes.length)];
            alimentos.push(alimentoVeg);
            caloriaAtual += alimentoVeg.calorias;

            // Gordura: 5-10%
            if (caloriaAtual < calorasAlvo - buffer) {
                const alimentoGord = this.alimentos.gorduras[Math.floor(Math.random() * this.alimentos.gorduras.length)];
                alimentos.push(alimentoGord);
            }
        } else if (tipo === "lanche") {
            // Lanches balanceados
            const opcoes = [
                () => [
                    this.alimentos.frutas_legumes[Math.floor(Math.random() * this.alimentos.frutas_legumes.length)],
                    this.alimentos.proteinas[Math.floor(Math.random() * 2)]
                ],
                () => [this.alimentos.carboidratos[2], this.alimentos.proteinas[5]],
                () => [this.alimentos.frutas_legumes[1], this.alimentos.gorduras[1]]
            ];

            const lanche = opcoes[Math.floor(Math.random() * opcoes.length)]();
            alimentos.push(...lanche);
        }

        return alimentos;
    }

    recomendarSuplementos(playerProfile) {
        const suplementos = [];

        // Suplementos base para todos
        suplementos.push({
            nome: "Vitamina D3",
            dose: "2000-4000 IU",
            frequencia: "diária",
            motivo: "Saúde óssea e sistema imunológico"
        });

        suplementos.push({
            nome: "Whey Protein",
            dose: "25-30g",
            frequencia: "pós-treino",
            motivo: "Recuperação muscular"
        });

        // Conforme objetivo
        if (playerProfile.objetivos.includes("ganhar_massa")) {
            suplementos.push({
                nome: "Creatina Monoidrato",
                dose: "5g",
                frequencia: "diária",
                motivo: "Ganho de força e massa"
            });
            suplementos.push({
                nome: "Maltodextrina + Dextrose",
                dose: "40-60g",
                frequencia: "pós-treino",
                motivo: "Recuperação de glicogênio"
            });
        }

        if (playerProfile.objetivos.includes("melhorar_velocidade")) {
            suplementos.push({
                nome: "Beta-alanina",
                dose: "3-5g",
                frequencia: "diária",
                motivo: "Desempenho anaeróbico"
            });
        }

        if (playerProfile.objetivos.includes("reduzir_gordura")) {
            suplementos.push({
                nome: "Ômega-3",
                dose: "1000-2000mg EPA/DHA",
                frequencia: "diária",
                motivo: "Saúde cardivasular"
            });
        }

        // Conforme posição
        if (["CB", "CDM"].includes(playerProfile.posicao)) {
            suplementos.push({
                nome: "Glucosamina + Condroitina",
                dose: "conforme orientação",
                frequencia: "diária",
                motivo: "Proteção articular"
            });
        }

        return suplementos;
    }

    gerarDicas(playerProfile, objetivo, infoNutricional) {
        const dicas = [];

        dicas.push(`💧 Beba pelo menos ${Math.round(playerProfile.peso * 35)} ml de água por dia`);
        
        if (objetivo === "ganhar_massa") {
            dicas.push(`📈 Aumente o consumo proteico para ${infoNutricional.macronutrientes.proteina_g}g/dia`);
            dicas.push("🍗 Distribua proteína em todas as refeições para maior síntese protéica");
        } else if (objetivo === "perder_peso") {
            dicas.push(`📉 Mantenha déficit calórico de 300-500 cal: ${infoNutricional.calorias_diarias}`);
            dicas.push("🥗 Aumente consumo de fibras (legumes, frutas, grãos integrais)");
        }

        if (playerProfile.nivelFisico === "ELITE") {
            dicas.push("⚡ Como atleta de elite, considere sessões de consultoria nutricional personalizada");
        }

        dicas.push("⏰ Coma a cada 3-4 horas para manter metabolismo acelerado");
        dicas.push("🍽️ Não pule refeições - afeta desempenho e recuperação");

        return dicas;
    }
}
