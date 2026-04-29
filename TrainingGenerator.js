/**
 * ==============================================================================
 * MÓDULO: GERADOR DE TREINOS PERSONALIZADOS
 * ==============================================================================
 * Cria planos de treino adaptados ao perfil, posição e objetivos do jogador
 */

class TrainingGenerator {
    constructor() {
        // Templates de treino por tipo
        this.exercicios = {
            velocidade: [
                { nome: "Sprints 50m", series: 5, reps: 5, descanso: "2min", intensidade: 0.9 },
                { nome: "Mudanças de direção", series: 4, reps: 10, descanso: "90s", intensidade: 0.8 },
                { nome: "Corrida com bola", series: 4, reps: 8, descanso: "2min", intensidade: 0.85 },
                { nome: "Aceleração 30m", series: 6, reps: 3, descanso: "2min", intensidade: 0.95 }
            ],
            forca: [
                { nome: "Agachamento", series: 4, reps: 8, carga: "80-85% 1RM", descanso: "3min", intensidade: 0.9 },
                { nome: "Levantamento terra", series: 3, reps: 5, carga: "85% 1RM", descanso: "3min", intensidade: 0.95 },
                { nome: "Supino", series: 4, reps: 6, carga: "80% 1RM", descanso: "2min", intensidade: 0.85 },
                { nome: "Rosca de pernas", series: 3, reps: 10, carga: "70% 1RM", descanso: "90s", intensidade: 0.7 }
            ],
            resistencia: [
                { nome: "Corrida contínua", tempo: "45-60min", intensidade: 0.5, tipo: "aeróbica" },
                { nome: "Treinamento interval", tempo: "30min", intensidade: 0.75, tipo: "anaeróbica" },
                { nome: "Corrida em terreno variado", tempo: "40min", intensidade: 0.6, tipo: "mista" },
                { nome: "Fartlek", tempo: "30-40min", intensidade: 0.65, tipo: "mista" }
            ],
            agilidade: [
                { nome: "Cone drills (5 direções)", series: 4, reps: 5, descanso: "90s", intensidade: 0.8 },
                { nome: "Ladder training", series: 5, reps: 3, descanso: "60s", intensidade: 0.7 },
                { nome: "Mudanças laterais", series: 4, reps: 8, descanso: "90s", intensidade: 0.75 },
                { nome: "T-drill", series: 5, reps: 3, descanso: "90s", intensidade: 0.8 }
            ],
            tecnica: [
                { nome: "Controle de bola", tempo: "20min", intensidade: 0.5, repeticoes: "1000 toques" },
                { nome: "Passe e movimento", tempo: "25min", intensidade: 0.6, repeticoes: "150 passes" },
                { nome: "Chutes a gol", tempo: "20min", intensidade: 0.65, repeticoes: "30 chutes" },
                { nome: "Cruzamentos", tempo: "20min", intensidade: 0.6, repeticoes: "40 cruzamentos" }
            ],
            recuperacao: [
                { nome: "Alongamento dinâmico", tempo: "15min", intensidade: 0.3 },
                { nome: "Ioga", tempo: "30min", intensidade: 0.2 },
                { nome: "Mobilização articular", tempo: "20min", intensidade: 0.3 },
                { nome: "Foam rolling", tempo: "15min", intensidade: 0.2 }
            ]
        };

        // Templates por posição
        this.posicoes = {
            "CB": { forca: 0.3, velocidade: 0.1, resistencia: 0.2, agilidade: 0.15, tecnica: 0.15, recuperacao: 0.1 },
            "LB": { forca: 0.15, velocidade: 0.25, resistencia: 0.2, agilidade: 0.2, tecnica: 0.15, recuperacao: 0.05 },
            "RB": { forca: 0.15, velocidade: 0.25, resistencia: 0.2, agilidade: 0.2, tecnica: 0.15, recuperacao: 0.05 },
            "CM": { forca: 0.15, velocidade: 0.15, resistencia: 0.3, agilidade: 0.15, tecnica: 0.2, recuperacao: 0.05 },
            "CDM": { forca: 0.2, velocidade: 0.1, resistencia: 0.3, agilidade: 0.1, tecnica: 0.2, recuperacao: 0.1 },
            "CAM": { forca: 0.1, velocidade: 0.2, resistencia: 0.2, agilidade: 0.2, tecnica: 0.3, recuperacao: 0.0 },
            "LW": { forca: 0.1, velocidade: 0.3, resistencia: 0.15, agilidade: 0.25, tecnica: 0.2, recuperacao: 0.0 },
            "RW": { forca: 0.1, velocidade: 0.3, resistencia: 0.15, agilidade: 0.25, tecnica: 0.2, recuperacao: 0.0 },
            "ST": { forca: 0.2, velocidade: 0.25, resistencia: 0.15, agilidade: 0.15, tecnica: 0.25, recuperacao: 0.0 }
        };
    }

    gerar(playerProfile, dias = 7) {
        const plano = {
            jogador: playerProfile.nome,
            posicao: playerProfile.posicao,
            duracao: dias + " dias",
            data_inicio: new Date().toISOString().split('T')[0],
            semana: [],
            observacoes: []
        };

        const pesos = this.posicoes[playerProfile.posicao] || this.posicoes["CM"];
        
        for (let dia = 0; dia < dias; dia++) {
            const tipoDia = this.definirTipoDia(dia, playerProfile.nivelFisico);
            const sessao = this.criarSessao(tipoDia, pesos, playerProfile, dia + 1);
            plano.semana.push(sessao);
        }

        // Ajustar conforme objetivos
        if (playerProfile.objetivos.includes("ganhar_massa")) {
            plano.observacoes.push("⚠️ FOCO: Aumentar ingestão proteica (1.8-2.2g/kg)");
            this.aumentarFocusForca(plano);
        }
        if (playerProfile.objetivos.includes("melhorar_velocidade")) {
            plano.observacoes.push("⚡ FOCO: Trabalhar potência e aceleração");
            this.aumentarFocusVelocidade(plano);
        }
        if (playerProfile.objetivos.includes("reduzir_gordura")) {
            plano.observacoes.push("🔥 FOCO: Déficit calórico + cardio");
            this.aumentarFocusResistencia(plano);
        }

        return plano;
    }

    definirTipoDia(dia, nivelFisico) {
        const ciclo = ["aquecimento", "força", "velocidade", "técnica", "resistência", "agilidade", "recuperação"];
        
        if (nivelFisico === "ELITE") {
            return ciclo[dia % ciclo.length];
        } else if (nivelFisico === "PROFISSIONAL") {
            const cicloReduzido = ["aquecimento", "força", "resistência", "técnica", "recuperação"];
            return cicloReduzido[dia % cicloReduzido.length];
        } else {
            const cicloBasico = ["aquecimento", "força", "resistência", "recuperação"];
            return cicloBasico[dia % cicloBasico.length];
        }
    }

    criarSessao(tipo, pesos, playerProfile, dia) {
        const sessao = {
            dia: dia,
            tipo: tipo,
            duracao_estimada: "90 minutos",
            aquecimento: this.gerarAquecimento(),
            trabalho_principal: [],
            resfriamento: this.gerarResfriamento()
        };

        if (tipo === "aquecimento") {
            sessao.trabalho_principal = this.gerarTreino("velocidade", 2, playerProfile);
        } else if (tipo === "força") {
            sessao.trabalho_principal = this.gerarTreino("forca", 4, playerProfile);
            sessao.duracao_estimada = "120 minutos";
        } else if (tipo === "velocidade") {
            sessao.trabalho_principal = this.gerarTreino("velocidade", 3, playerProfile);
        } else if (tipo === "técnica") {
            sessao.trabalho_principal = this.gerarTreino("tecnica", 3, playerProfile);
        } else if (tipo === "resistência") {
            sessao.trabalho_principal = this.gerarTreino("resistencia", 2, playerProfile);
            sessao.duracao_estimada = "75 minutos";
        } else if (tipo === "agilidade") {
            sessao.trabalho_principal = this.gerarTreino("agilidade", 3, playerProfile);
        } else if (tipo === "recuperação") {
            sessao.trabalho_principal = this.gerarTreino("recuperacao", 2, playerProfile);
            sessao.duracao_estimada = "60 minutos";
        }

        sessao.trabalho_principal = this.adaptarPorNivel(sessao.trabalho_principal, playerProfile.nivelFisico);

        return sessao;
    }

    gerarTreino(tipo, quantidade, playerProfile) {
        const exercicios = this.exercicios[tipo];
        const selecionados = [];
        
        for (let i = 0; i < quantidade && i < exercicios.length; i++) {
            const idx = Math.floor(Math.random() * exercicios.length);
            selecionados.push({ ...exercicios[idx] });
        }

        return selecionados;
    }

    adaptarPorNivel(exercicios, nivel) {
        return exercicios.map(ex => {
            const copia = { ...ex };
            
            if (nivel === "ELITE") {
                copia.intensidade = (copia.intensidade || 0.8) + 0.15;
            } else if (nivel === "PROFISSIONAL") {
                copia.intensidade = (copia.intensidade || 0.8) - 0.05;
            } else if (nivel === "AMADOR") {
                copia.intensidade = (copia.intensidade || 0.8) - 0.15;
                if (copia.series) copia.series = Math.max(2, copia.series - 1);
            } else {
                copia.intensidade = (copia.intensidade || 0.8) - 0.25;
                if (copia.series) copia.series = Math.max(1, copia.series - 2);
            }

            return copia;
        });
    }

    gerarAquecimento() {
        return [
            { nome: "Corrida leve 5-10 minutos", intensidade: 0.4 },
            { nome: "Alongamento dinâmico", tempo: "10 minutos", intensidade: 0.3 },
            { nome: "Preparação específica", tempo: "5 minutos", intensidade: 0.5 }
        ];
    }

    gerarResfriamento() {
        return [
            { nome: "Caminhada leve", tempo: "5 minutos", intensidade: 0.2 },
            { nome: "Alongamento estático", tempo: "10-15 minutos", intensidade: 0.1 }
        ];
    }

    aumentarFocusForca(plano) {
        const diasForça = plano.semana.filter(dia => dia.tipo === "força" || dia.tipo === "aquecimento");
        diasForça.forEach(dia => {
            dia.trabalho_principal = dia.trabalho_principal.slice(0, 5);
            if (dia.trabalho_principal.length < 5) {
                dia.trabalho_principal.push(...this.exercicios.forca.slice(0, 5 - dia.trabalho_principal.length));
            }
        });
    }

    aumentarFocusVelocidade(plano) {
        const diasVelocidade = plano.semana.filter(dia => dia.tipo === "velocidade" || dia.tipo === "agilidade");
        diasVelocidade.forEach(dia => {
            dia.trabalho_principal = dia.trabalho_principal.map(ex => ({
                ...ex,
                intensidade: Math.min(1.0, (ex.intensidade || 0.8) + 0.1)
            }));
        });
    }

    aumentarFocusResistencia(plano) {
        const diasResistencia = plano.semana.filter(dia => dia.tipo === "resistência");
        diasResistencia.forEach(dia => {
            dia.trabalho_principal = dia.trabalho_principal.map(ex => ({
                ...ex,
                tempo: ex.tempo ? ex.tempo.replace(/(\d+)/, (match) => String(parseInt(match) + 10)) : ex.tempo
            }));
        });
    }
}
