/**
 * ==============================================================================
 * MÓDULO: INTEGRAÇÃO PRINCIPAL E API DO SISTEMA
 * ==============================================================================
 * Orquestra todos os módulos: Perfil, IA Neural, Treinos e Dietas
 */

class SoccerIA {
    constructor() {
        this.jogadores = [];
        this.trainingGen = new TrainingGenerator();
        this.dietGen = new DietGenerator();
        this.analises = [];
        this.planos = [];
    }

    /**
     * Criar um novo perfil de jogador
     */
    criarJogador(nome, posicao, idade, altura, peso, objetivos = []) {
        const jogador = new PlayerProfile(nome, posicao, idade, altura, peso, objetivos);
        this.jogadores.push(jogador);
        console.log(`✅ Jogador ${nome} criado com sucesso!`);
        return jogador;
    }

    /**
     * Buscar jogador por nome
     */
    buscarJogador(nome) {
        return this.jogadores.find(j => j.nome.toLowerCase() === nome.toLowerCase());
    }

    /**
     * Listar todos os jogadores
     */
    listarJogadores() {
        return this.jogadores.length > 0 
            ? this.jogadores.map(j => j.getEstatisticas())
            : "Nenhum jogador cadastrado ainda.";
    }

    /**
     * Gerar plano de treino personalizado
     */
    gerarTreino(nomeJogador, dias = 7) {
        const jogador = this.buscarJogador(nomeJogador);
        if (!jogador) {
            return `❌ Jogador ${nomeJogador} não encontrado.`;
        }

        const plano = this.trainingGen.gerar(jogador, dias);
        this.planos.push({
            tipo: "treino",
            jogador: nomeJogador,
            data: new Date(),
            plano: plano
        });

        return this.formatarTreino(plano);
    }

    /**
     * Gerar plano de dieta personalizado
     */
    gerarDieta(nomeJogador, dias = 7) {
        const jogador = this.buscarJogador(nomeJogador);
        if (!jogador) {
            return `❌ Jogador ${nomeJogador} não encontrado.`;
        }

        const plano = this.dietGen.gerar(jogador, dias);
        this.planos.push({
            tipo: "dieta",
            jogador: nomeJogador,
            data: new Date(),
            plano: plano
        });

        return this.formatarDieta(plano);
    }

    /**
     * Análise completa do jogador (Treino + Dieta)
     */
    analiseCompleta(nomeJogador) {
        const jogador = this.buscarJogador(nomeJogador);
        if (!jogador) {
            return `❌ Jogador ${nomeJogador} não encontrado.`;
        }

        const analise = {
            jogador: jogador.nome,
            data: new Date().toISOString(),
            perfil: jogador.getEstatisticas(),
            treino: this.trainingGen.gerar(jogador, 7),
            dieta: this.dietGen.gerar(jogador, 7),
            recomendacoes: this.gerarRecomendacoes(jogador)
        };

        this.analises.push(analise);
        return this.formatarAnaliseCompleta(analise);
    }

    /**
     * Comparar dois jogadores
     */
    compararJogadores(nome1, nome2) {
        const j1 = this.buscarJogador(nome1);
        const j2 = this.buscarJogador(nome2);

        if (!j1 || !j2) {
            return "❌ Um ou ambos os jogadores não encontrados.";
        }

        return `
╔═══════════════════════════════════════════════════════════════╗
║                     COMPARAÇÃO DE JOGADORES                  ║
╚═══════════════════════════════════════════════════════════════╝

📊 ${j1.nome.toUpperCase()} vs ${j2.nome.toUpperCase()}

┌─ DADOS FÍSICOS ─────────────────────────────────────────────┐
│ Critério          │   ${j1.nome.padEnd(20)} │   ${j2.nome.padEnd(20)} │
├───────────────────┼──────────────────────┼──────────────────────┤
│ Idade             │ ${String(j1.idade).padEnd(20)} │ ${String(j2.idade).padEnd(20)} │
│ Altura (cm)       │ ${String(j1.altura).padEnd(20)} │ ${String(j2.altura).padEnd(20)} │
│ Peso (kg)         │ ${String(j1.peso).padEnd(20)} │ ${String(j2.peso).padEnd(20)} │
│ IMC               │ ${j1.imc.toFixed(2).padEnd(20)} │ ${j2.imc.toFixed(2).padEnd(20)} │
└───────────────────┴──────────────────────┴──────────────────────┘

┌─ CAPACIDADES FÍSICAS ───────────────────────────────────────┐
│ Velocidade    │ ${(j1.velocidade * 100).toFixed(1).padEnd(18)}% │ ${(j2.velocidade * 100).toFixed(1)}% │
│ Resistência   │ ${(j1.resistencia * 100).toFixed(1).padEnd(18)}% │ ${(j2.resistencia * 100).toFixed(1)}% │
│ Força         │ ${(j1.forca * 100).toFixed(1).padEnd(18)}% │ ${(j2.forca * 100).toFixed(1)}% │
│ Agilidade     │ ${(j1.agilidade * 100).toFixed(1).padEnd(18)}% │ ${(j2.agilidade * 100).toFixed(1)}% │
│ Nível Físico  │ ${j1.nivelFisico.padEnd(18)} │ ${j2.nivelFisico} │
└─────────────────────────────────────────────────────────────┘

🎯 VANTAGENS DE ${j1.nome.toUpperCase()}:
${this.gerarVantagens(j1, j2).map(v => `   • ${v}`).join("\n")}

🎯 VANTAGENS DE ${j2.nome.toUpperCase()}:
${this.gerarVantagens(j2, j1).map(v => `   • ${v}`).join("\n")}
        `;
    }

    /**
     * Atualizar objetivo do jogador
     */
    atualizarObjetivo(nomeJogador, objetivo) {
        const jogador = this.buscarJogador(nomeJogador);
        if (!jogador) {
            return `❌ Jogador ${nomeJogador} não encontrado.`;
        }

        jogador.addObjetivo(objetivo);
        return `✅ Objetivo "${objetivo}" adicionado para ${nomeJogador}.`;
    }

    /**
     * Remover objetivo do jogador
     */
    removerObjetivo(nomeJogador, objetivo) {
        const jogador = this.buscarJogador(nomeJogador);
        if (!jogador) {
            return `❌ Jogador ${nomeJogador} não encontrado.`;
        }

        jogador.removeObjetivo(objetivo);
        return `✅ Objetivo "${objetivo}" removido de ${nomeJogador}.`;
    }

    /**
     * IA: Recomendação inteligente baseada no perfil
     */
    gerarRecomendacoes(jogador) {
        const recomendacoes = [];

        // Análise de fraquezas
        const metrics = {
            velocidade: jogador.velocidade,
            resistencia: jogador.resistencia,
            forca: jogador.forca,
            agilidade: jogador.agilidade
        };

        const fraco = Object.entries(metrics)
            .sort((a, b) => a[1] - b[1])
            .slice(0, 2)
            .map(([key]) => key);

        const forte = Object.entries(metrics)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 1)
            .map(([key]) => key);

        // Recomendações por fraqueza
        if (fraco.includes("velocidade")) {
            recomendacoes.push("⚡ Trabalhe sprints e aceleração 2x por semana");
        }
        if (fraco.includes("resistencia")) {
            recomendacoes.push("💨 Aumente trabalho aeróbico: 2-3 sessões de longa duração");
        }
        if (fraco.includes("forca")) {
            recomendacoes.push("💪 Treino de força 3x por semana com progressão de carga");
        }
        if (fraco.includes("agilidade")) {
            recomendacoes.push("🔄 Trabalhos explosivos e mudanças de direção: 2x por semana");
        }

        // Recomendações por IMC
        if (jogador.imc < 20) {
            recomendacoes.push("🍗 Aumente ingestão calórica: objetivo ganhar massa magra");
        } else if (jogador.imc > 26) {
            recomendacoes.push("🔥 Reduza peso: crédeficit calórico de 300-500cal");
        } else {
            recomendacoes.push("✅ IMC dentro da faixa ideal: mantenha o padrão");
        }

        // Recomendações por idade
        if (jogador.idade < 23) {
            recomendacoes.push("📈 Período de desenvolvimento: foque em técnica e força");
        } else if (jogador.idade > 32) {
            recomendacoes.push("🏥 Aumente mobilidade e recuperação: 3-4 sessões por semana");
        }

        // Recomendações por posição
        const dicas_posicao = {
            "CB": "Priorize força defensiva e antecipação",
            "LB": "Trabalhe velocidade e lateralidade",
            "RB": "Desenvolva explosão e reação",
            "CM": "Melhore resistência aeróbica",
            "CDM": "Fortaleça núcleo (core) e estabilidade",
            "CAM": "Aperfeiçoe técnica de passe",
            "LW": "Incremente velocidade e drible",
            "RW": "Trabalhe cruzamentos e finalização",
            "ST": "Maximize força e repositionamento"
        };

        if (dicas_posicao[jogador.posicao]) {
            recomendacoes.push(`⚽ Posição ${jogador.posicao}: ${dicas_posicao[jogador.posicao]}`);
        }

        return recomendacoes;
    }

    /**
     * Métodos auxiliares de formatação
     */
    formatarTreino(plano) {
        let texto = `
╔═══════════════════════════════════════════════════════════════╗
║          PLANO DE TREINO PERSONALIZADO - ${plano.duracao.toUpperCase()}        ║
╚═══════════════════════════════════════════════════════════════╝

👤 Jogador: ${plano.jogador}
📍 Posição: ${plano.posicao}
📅 Início: ${plano.data_inicio}

${plano.semana.map((dia, idx) => `
📌 DIA ${dia.dia} - ${dia.tipo.toUpperCase()}
   Duração: ${dia.duracao_estimada}
   
   🔥 Trabalho Principal:
${dia.trabalho_principal.slice(0, 3).map(ex => 
    `   • ${ex.nome}${ex.series ? ` - ${ex.series}x${ex.reps}` : ''}${ex.tempo ? ` - ${ex.tempo}` : ''}`
).join('\n')}
`).join('\n')}

${plano.observacoes.length > 0 ? '📋 OBSERVAÇÕES:\n' + plano.observacoes.map(o => `   ${o}`).join('\n') : ''}
        `;
        return texto;
    }

    formatarDieta(plano) {
        let texto = `
╔═══════════════════════════════════════════════════════════════╗
║          PLANO NUTRICIONAL PERSONALIZADO - ${plano.duracao.toUpperCase()}        ║
╚═══════════════════════════════════════════════════════════════╝

👤 Jogador: ${plano.jogador}
📍 Posição: ${plano.posicao}
📅 Início: ${plano.data_inicio}

🎯 METAS NUTRICIONAIS:
   Objetivo: ${plano.info_nutricional.objetivo.replace(/_/g, ' ').toUpperCase()}
   Calorias Diárias: ${plano.info_nutricional.calorias_diarias} kcal
   
   Proteína: ${plano.info_nutricional.macronutrientes.proteina_g}g/dia (${plano.info_nutricional.calorias_macro.proteina} kcal)
   Carboidrato: ${plano.info_nutricional.macronutrientes.carboidrato_g}g/dia (${plano.info_nutricional.calorias_macro.carboidrato} kcal)
   Gordura: ${plano.info_nutricional.macronutrientes.gordura_g}g/dia (${plano.info_nutricional.calorias_macro.gordura} kcal)

📌 EXEMPLO DO DIA 1:
${plano.dias[0].refeicoes.map(ref => `
   ${ref.nome} (${ref.hora})
   ${ref.itens.map(item => `   • ${item.nome} - ${item.calorias} kcal`).join('\n   ')}
   Subtotal: ${ref.calorias_total} kcal
`).join('\n')}

💊 SUPLEMENTOS RECOMENDADOS:
${plano.suplementos.map(sup => `   • ${sup.nome}: ${sup.dose} ${sup.frequencia} - ${sup.motivo}`).join('\n')}

💡 DICAS IMPORTANTES:
${plano.dicas.map(dica => `   ${dica}`).join('\n')}
        `;
        return texto;
    }

    formatarAnaliseCompleta(analise) {
        return `
╔═════════════════════════════════════════════════════════════════╗
║              ANÁLISE COMPLETA DO JOGADOR ${analise.jogador.toUpperCase()}             ║
╚═════════════════════════════════════════════════════════════════╝

📊 PERFIL FÍSICO:
${Object.entries(analise.perfil).map(([key, value]) => `   ${key.toUpperCase()}: ${value}`).join('\n')}

💪 RECOMENDAÇÕES IA:
${analise.recomendacoes.map(rec => `   ${rec}`).join('\n')}

🏃 TREINO (RESUMO):
   Dias de treino: 7
   Foco principal: Desenvolvimento equilibrado baseado em pontos fracos
   Progressão: Semanal conforme evolução

🍎 NUTRIÇÃO (RESUMO):
   Calorias diárias: ${analise.dieta.info_nutricional.calorias_diarias} kcal
   Objetivo: ${analise.dieta.info_nutricional.objetivo.replace(/_/g, ' ').toUpperCase()}
   Refeições: 5 refeições balanceadas

📅 PRÓXIMOS PASSOS:
   1. ✅ Seguir plano de treino durante 4 semanas
   2. ✅ Acompanhar nutrição conforme dieta
   3. ✅ Avaliar progresso após 2 semanas
   4. ✅ Ajustar conforme necessidade

⚠️ IMPORTANTE: Consulte um profissional de saúde ou treinador antes de iniciar qualquer programa.
        `;
    }

    gerarVantagens(j1, j2) {
        const vantagens = [];
        const metricNames = {
            velocidade: "Velocidade",
            resistencia: "Resistência",
            forca: "Força",
            agilidade: "Agilidade"
        };

        Object.entries({
            velocidade: j1.velocidade,
            resistencia: j1.resistencia,
            forca: j1.forca,
            agilidade: j1.agilidade
        }).forEach(([key, value]) => {
            const valor2 = j2[key];
            if (value > valor2 * 1.1) {
                vantagens.push(`${metricNames[key]} (+${((value - valor2) * 100).toFixed(1)}%)`);
            }
        });

        return vantagens.length > 0 ? vantagens : ["Desempenho equilibrado"];
    }

    /**
     * Exportar dados em JSON
     */
    exportarJSON(nomeJogador) {
        const jogador = this.buscarJogador(nomeJogador);
        if (!jogador) return "❌ Jogador não encontrado.";
        
        return JSON.stringify(jogador.toJSON(), null, 2);
    }

    /**
     * Salvar dados no LocalStorage
     */
    salvarNoLocalStorage() {
        const dados = {
            jogadores: this.jogadores.map(j => j.toJSON()),
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("SOCCER_IA_DATA", JSON.stringify(dados));
        console.log("✅ Dados salvos no LocalStorage");
    }

    /**
     * Carregar dados do LocalStorage
     */
    carregarDoLocalStorage() {
        const dados = localStorage.getItem("SOCCER_IA_DATA");
        if (!dados) return false;

        const parsed = JSON.parse(dados);
        this.jogadores = parsed.jogadores.map(j => PlayerProfile.fromJSON(j));
        console.log(`✅ ${this.jogadores.length} jogadores carregados do LocalStorage`);
        return true;
    }

    /**
     * Estatísticas do sistema
     */
    obterEstatisticas() {
        return {
            total_jogadores: this.jogadores.length,
            total_analises: this.analises.length,
            total_planos: this.planos.length,
            media_idade: this.jogadores.length > 0 
                ? (this.jogadores.reduce((sum, j) => sum + j.idade, 0) / this.jogadores.length).toFixed(1)
                : 0,
            posicoes: [...new Set(this.jogadores.map(j => j.posicao))].join(", "),
            nivel_medio: this.calcularNivelMedio()
        };
    }

    calcularNivelMedio() {
        if (this.jogadores.length === 0) return "N/A";
        const niveis = {
            "ELITE": 4,
            "PROFISSIONAL": 3,
            "AMADOR": 2,
            "INICIANTE": 1
        };
        const media = this.jogadores.reduce((sum, j) => sum + (niveis[j.nivelFisico] || 0), 0) / this.jogadores.length;
        
        if (media >= 3.5) return "ELITE";
        if (media >= 2.5) return "PROFISSIONAL";
        if (media >= 1.5) return "AMADOR";
        return "INICIANTE";
    }
}

// 🚀 Inicializar o sistema
console.log("%c🎯 SOCCER IA - Sistema de Análise e Otimização de Futebol ⚽", "color: #ff6b00; font-size: 16px; font-weight: bold");
console.log("%cFramework de IA baseado em Deep Learning para análise de jogadores e personalização de treinos/dietas", "color: #0066cc; font-style: italic");
const IA = new SoccerIA();
