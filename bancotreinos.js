/**
 * ZAGAPRO DATABASE - VERSÃO ULTIMATE SOLO TRAINING
 * Foco: Autonomia, Biomecânica de Elite e Simulação Tática Individual.
 * Estrutura: 6 Categorias (Sub-8 a Sub-18) x 3 Níveis de Intensidade.
 */

const bancoTreinos = {
    "Sub-8": {
        recuperacao: [
            { nome: "Mobilidade do 'Caranguejo'", tempo: "15 min", foco: "Core e Ombros", desc: "Andar de costas apoiado em mãos e pés.", tecnico: "Mantenha o quadril elevado; isso fortalece a sustentação para disputas futuras.", biomecanica: "Fortalecimento de cinturas escapular e pélvica." },
            { nome: "Liberação com Bolinha de Gude/Tênis", tempo: "10 min", foco: "Fáscia Plantar", desc: "Rolar a sola do pé sobre a bola.", tecnico: "Faça movimentos circulares e longitudinais.", biomecanica: "Relaxamento dos tecidos moles do arco plantar." },
            { nome: "Equilíbrio da Garça", tempo: "10 min", foco: "Propriocepção", desc: "Ficar em um pé só enquanto move os braços como se estivesse correndo.", tecnico: "Mantenha o joelho levemente flexionado.", biomecanica: "Ativação de ligamentos estabilizadores do tornozelo." }
        ],
        normal: [
            { nome: "Fundamento: Passe na Parede (2 toques)", tempo: "20 min", foco: "Técnica de Base", desc: "Bater na parede, dominar e devolver.", tecnico: "Pé de apoio fixo, pé do passe em 90 graus.", biomecanica: "Coordenação óculo-podal e precisão motora." },
            { nome: "Circuito de Cones 'Oito'", tempo: "20 min", foco: "Condução Curta", desc: "Conduzir a bola em formato de 8 entre dois cones.", tecnico: "Use apenas a parte externa do pé.", biomecanica: "Controle de centro de gravidade em curvas." }
        ],
        intensivo: [
            { nome: "Físico: Piques de Reação Visual", tempo: "25 min", foco: "Explosão", desc: "Sprint de 5m ao ver uma cor ou objeto específico.", tecnico: "Incline o tronco para frente para ganhar tração.", biomecanica: "Treino de potência anaeróbica aláctica." },
            { nome: "Salto e Pouso de Amortecimento", tempo: "15 min", foco: "Pliometria", desc: "Saltar e cair agachando sem fazer barulho.", tecnico: "O joelho não pode 'entrar' (valgo).", biomecanica: "Ensino de absorção de carga e prevenção de lesão." }
        ]
    },

    "Sub-10": {
        recuperacao: [
            { nome: "Alongamento 'Gato e Vaca'", tempo: "15 min", foco: "Mobilidade Espinal", desc: "Arquear e curvar as costas em 4 apoios.", tecnico: "Sincronize com a respiração.", biomecanica: "Descompressão de discos vertebrais." },
            { nome: "Trote na Grama (Descalço)", tempo: "15 min", foco: "Sensorial", desc: "Corrida leve para sentir a textura do campo.", tecnico: "Mantenha a postura ereta.", biomecanica: "Fortalecimento da musculatura intrínseca do pé." }
        ],
        normal: [
            { nome: "Simulação Solo: Marcação Sombra", tempo: "25 min", foco: "Postura Defensiva", desc: "Seguir uma linha imaginária em zigue-zague de costas.", tecnico: "Braços abertos, base larga.", biomecanica: "Eficiência no deslocamento lateral (Shuffle)." },
            { nome: "Paredão: Domínio Orientado", tempo: "25 min", foco: "Fundamento", desc: "Receber da parede e girar 90 graus com a bola colada.", tecnico: "Use a sola ou parte interna.", biomecanica: "Controle de inércia da bola." }
        ],
        intensivo: [
            { nome: "Sprint 'T-Test' Individual", tempo: "30 min", foco: "Agilidade", desc: "Corrida em formato de T com trocas de direção.", tecnico: "Toque o chão nas viradas.", biomecanica: "Capacidade de desaceleração e mudança de sentido." },
            { nome: "Salto Unipodal em Obstáculo", tempo: "20 min", foco: "Potência", desc: "Saltar pequenos cones com apenas uma perna.", tecnico: "Foco na estabilidade do joelho no pouso.", biomecanica: "Aumento da força reativa." }
        ]
    },

    "Sub-12": {
        recuperacao: [
            { nome: "Mobilidade de Quadril '90/90'", tempo: "20 min", foco: "Articulação", desc: "Sentado com as pernas em 90 graus, rotacionar o quadril.", tecnico: "Mantenha o peito aberto.", biomecanica: "Aumento da rotação interna e externa do fêmur." },
            { nome: "Massagem com Bastão (Coxas)", tempo: "15 min", foco: "Miofascial", desc: "Auto-massagem usando um cabo de vassoura.", tecnico: "Pressão firme, mas controlada.", biomecanica: "Inibição de pontos de gatilho musculares." }
        ],
        normal: [
            { nome: "Fundamento Solo: Lançamento Vertical", tempo: "30 min", foco: "Domínio de Peito/Coxa", desc: "Lançar para o alto e dominar sem a bola cair.", tecnico: "Amorteça o impacto como se fosse uma mola.", biomecanica: "Ajuste de percepção espacial (profundidade)." },
            { nome: "Paredão: Chute de Primeira (Voleio)", tempo: "25 min", foco: "Técnica de Rechaço", desc: "Bater na bola antes de tocar o chão após rebote.", tecnico: "Mantenha o pé firme e corpo sobre a bola.", biomecanica: "Coordenação motora fina sob tempo de bola." }
        ],
        intensivo: [
            { nome: "Físico: Sprints de 10m com Frenagem", tempo: "35 min", foco: "Explosão e Freio", desc: "Sprint máximo e parada brusca em cima da linha.", tecnico: "Baixe o quadril para frear com eficiência.", biomecanica: "Controle de carga excêntrica no quadríceps." },
            { nome: "Simulação de Salto para Cabeceio", tempo: "30 min", foco: "Impulsão", desc: "Corrida curta e salto máximo para 'testar' bola imaginária.", tecnico: "Use os braços como alavancas.", biomecanica: "Maximização do ciclo alongamento-encurtamento." }
        ]
    },
    "Sub-14": {
        recuperacao: [
            {
                nome: "Liberação Miofascial e Reset Neuromuscular",
                tempo: "30 min",
                foco: "Recuperação Ativa",
                desc: "Uso de rolo de espuma e técnicas de respiração para soltar a musculatura.",
                detalhes: {
                    passo_a_passo: [
                        "Passe o rolo nos quadríceps por 2 minutos em cada perna.",
                        "Identifique pontos de dor e mantenha a pressão por 30 segundos.",
                        "Realize a 'Postura da Criança' (Yoga) por 5 minutos para soltar a lombar.",
                        "Finalize com 5 minutos de respiração diafragmática (4s inspira / 8s expira)."
                    ],
                    erros_comuns: "Rolar rápido demais. A liberação exige lentidão para que a fáscia relaxe.",
                    biomecanica: "Estimula o sistema parassimpático e reduz o tônus muscular excessivo pós-esforço.",
                    equipamento: "Rolo de espuma (ou garrafa pet com água congelada) e colchonete."
                }
            },
            {
                nome: "Mobilidade Articular de 'Três Planos'",
                tempo: "20 min",
                foco: "Flexibilidade Funcional",
                desc: "Sequência solo para destravar tornozelo, quadril e torácica.",
                detalhes: {
                    passo_a_passo: [
                        "Tornozelo: Em pé frente à parede, leve o joelho à frente sem tirar o calcanhar do chão (15 reps).",
                        "Quadril: Posição de 90/90 sentado, trocando o lado dos joelhos sem usar as mãos (20 trocas).",
                        "Torácica: Em quatro apoios, mão na nuca e tente encostar o cotovelo no braço oposto e depois abrir para o teto."
                    ],
                    erros_comuns: "Compensar a falta de mobilidade do quadril curvando a coluna lombar.",
                    biomecanica: "Aumenta o líquido sinovial nas articulações, reduzindo o risco de lesões por impacto.",
                    equipamento: "Espaço livre de 2x2 metros."
                }
            }
        ],
        normal: [
            {
                nome: "O Paredão Inteligente: Scan e Decisão",
                tempo: "40 min",
                foco: "Fundamentos e Percepção",
                desc: "Treino de passe e recepção com simulação de visão de jogo (Scanning).",
                detalhes: {
                    passo_a_passo: [
                        "Fique a 3 metros de uma parede.",
                        "Dê o passe firme de chapa.",
                        "Enquanto a bola viaja para a parede, vire o pescoço e olhe um objeto atrás de você.",
                        "Domine a bola já direcionando para o lado oposto do objeto que você viu.",
                        "Repita 50 vezes com cada pé."
                    ],
                    erros_comuns: "Olhar para trás tarde demais. O 'scan' deve ser feito enquanto a bola está em movimento.",
                    biomecanica: "Desenvolve a autonomia do sistema visual e a dissociação entre tronco e pescoço.",
                    equipamento: "Parede firme, bola e 2 cones (ou garrafas) atrás de você."
                }
            },
            {
                nome: "Geometria da Zaga: Sombra e Espaço",
                tempo: "40 min",
                foco: "Simulação Tática Solo",
                desc: "Movimentação em losango simulando a marcação de um atacante imprevisível.",
                detalhes: {
                    passo_a_passo: [
                        "Monte um losango de 5x5 metros com cones.",
                        "Simule: Sprint ao cone frontal (bote), recuo diagonal (cobertura) e deslocamento lateral (fechar linha).",
                        "Mantenha sempre a base baixa e os braços em posição de proteção.",
                        "Trabalhe 4 séries de 2 minutos com 1 minuto de descanso."
                    ],
                    erros_comuns: "Cruzar as pernas no deslocamento lateral. Isso causa perda de equilíbrio.",
                    biomecanica: "Treino de frenagem excêntrica e reatividade das fibras musculares tipo IIa.",
                    equipamento: "4 cones ou marcas no chão."
                }
            }
        ],
intensivo: [
    {
        nome: "Circuito RSA: A Muralha Incansável",
        tempo: "50 min",
        foco: "Capacidade de Sprint Repetido (RSA)",
        desc: "Simulação de transição defensiva com alta carga glicolítica e saltos de disputa aérea.",
        detalhes: {
            passo_a_passo: [
                "Inicie com um sprint explosivo de 15 metros (intensidade 100%).",
                "Ao atingir a marca, execute 2 saltos verticais máximos simulando proteção de área.",
                "Realize a recomposição imediata com corrida de costas (pedalada defensiva) até a origem.",
                "Mantenha um intervalo de recuperação passiva de exatamente 20 segundos.",
                "Complete 3 blocos de 6 repetições, com 2:30 min de descanso entre blocos.",
                "Foco em manter a postura técnica mesmo sob alta frequência cardíaca."
            ],
            erros_comuns: "Diminuir a altura do salto ou inclinar o tronco excessivamente à frente no retorno.",
            biomecanica: "Otimiza a ressíntese de fosfocreatina e a estabilidade do core em aterrissagens instáveis.",
            equipamento: "Campo ou quadra com 20 metros de área livre e cones de marcação."
        }
    },
    {
        nome: "Pliometria Solo: Reação de Antecipação",
        tempo: "40 min",
        foco: "Força Reativa e Stiffness",
        desc: "Treinamento de Ciclo Alongamento-Encurtamento (CAE) para reduzir tempo de resposta.",
        detalhes: {
            passo_a_passo: [
                "Posicione-se sobre uma caixa ou degrau firme de 30cm a 40cm.",
                "Deixe-se cair (Drop) sem saltar para cima, buscando um toque seco no solo.",
                "No milissegundo do contato, exploda em um sprint direcional (frente ou diagonal) de 5m.",
                "Minimize o tempo de contato com o chão; imagine o solo como uma superfície superaquecida.",
                "Execute 5 séries de 5 repetições focando na máxima qualidade neuromuscular.",
                "Intervalo de 90s a 120s entre repetições para garantir a integridade do SNC."
            ],
            erros_comuns: "Valgo dinâmico (joelhos para dentro) e amortecimento longo (calcanhar tocando o chão).",
            biomecanica: "Aumenta a rigidez tendínea e a eficiência das fibras do tipo IIb no arranque inicial.",
            equipamento: "Plataforma estável (caixa/degrau) e superfície com boa tração."
        }
    }
],
    "Sub-16": {
        recuperacao: [
            { nome: "Core: Protocolo McGill Big 3", tempo: "25 min", foco: "Estabilidade", desc: "Três exercícios chave (Crunch, Bird-Dog, Side Plank).", tecnico: "Foco na contração isométrica pura.", biomecanica: "Fortalecimento do 'cinto' muscular lombar." },
            { nome: "Técnica de Respiração Quadrada", tempo: "15 min", foco: "Mental", desc: "Inspirar 4s, segurar 4s, expirar 4s, pausar 4s.", tecnico: "Foque apenas no ar entrando e saindo.", biomecanica: "Regulação do sistema nervoso autônomo." }
        ],
        normal: [
            { nome: "Paredão: Domínio com Giro de Ombro", tempo: "45 min", foco: "Visão Periférica", desc: "Olhar para trás antes de receber da parede.", tecnico: "O 'Scan' é o segredo do zagueiro moderno.", biomecanica: "Integração sensório-motora e visão de jogo." },
            { nome: "Simulação: Antecipação Solo", tempo: "40 min", foco: "Timing", desc: "Arremessar a bola contra a parede e interceptar antes que ela role.", tecnico: "Ataque a bola agressivamente.", biomecanica: "Treino de velocidade de reação e leitura de trajetória." }
        ],
        intensivo: [
            { nome: "Físico: Circuito de Força Explosiva", tempo: "50 min", foco: "Potência Muscular", desc: "Afundos saltados, flexões explosivas e pranchas dinâmicas.", tecnico: "Mantenha a explosão máxima em cada repetição.", biomecanica: "Sobrecarga de fibras tipo II (rápida)." },
            { nome: "Sprint com Mudança de Direção (Z-Run)", tempo: "40 min", foco: "Agilidade Defensiva", desc: "Correr em Z o mais rápido possível contornando cones.", tecnico: "Passos curtos nas curvas, passadas largas nas retas.", biomecanica: "Gestão de torque lateral e estabilidade de joelho." }
        ]
    },

    "Sub-18": {
        recuperacao: [
            { nome: "Crioterapia Solo (Gelo)", tempo: "15 min", foco: "Recuperação", desc: "Banho de imersão em água gelada pós-treino.", tecnico: "Controle a respiração para suportar o frio.", biomecanica: "Vasoconstrição para redução de micro-inflamações." },
            { nome: "Yoga para Flexibilidade Posterior", tempo: "30 min", foco: "Flexibilidade", desc: "Posturas de 'Adho Mukha' e 'Pashimottanasana'.", tecnico: "Mantenha o alongamento sem balançar (estático).", biomecanica: "Alongamento das cadeias musculares posteriores." }
        ],
        normal: [
            { nome: "Simulação: Comando de Linha (Liderança Solo)", tempo: "50 min", foco: "Tática Aplicada", desc: "Movimentação tática narrando as ações (ex: 'Sobe!', 'Dá cobertura!').", tecnico: "Visualize o jogo real e responda taticamente.", biomecanica: "Cognição tática e automatização de comando." },
            { nome: "Saída de Bola: Passes de Ruptura (Solo)", tempo: "50 min", foco: "Precisão", desc: "Colocar cones simulando defensores e passar por entre eles.", tecnico: "Passe firme, bola 'rasante' e rápida.", biomecanica: "Refinamento de precisão e visão de canais de passe." }
        ],
        intensivo: [
            { nome: "Físico: HIIT de Zagueiro (Sprint/Desarme)", tempo: "60 min", foco: "Resistência Máxima", desc: "Sprints de 40m seguidos de simulação de cabeceio imediata.", tecnico: "Simule a exaustão de um final de partida.", biomecanica: "Capacidade aeróbica de alta intensidade." },
            { nome: "Treino de Potência de Salto (Carga)", tempo: "50 min", foco: "Salto Vertical", desc: "Saltos verticais repetidos com o máximo de altura possível.", tecnico: "Use a impulsão de braços e a mola do tornozelo.", biomecanica: "Recrutamento máximo de unidades motoras explosivas." }
        ]
    }
}
}
