/**
 * ==============================================================================
 * MÓDULO: PERFIL DE JOGADOR
 * ==============================================================================
 * Gerencia o perfil completo de cada jogador (dados antropométricos, histórico, etc)
 */

class PlayerProfile {
    constructor(nome, posicao, idade, altura, peso, objetivos = []) {
        this.nome = nome;
        this.posicao = posicao; // CB, LB, RB, CM, CDM, CAM, LW, RW, ST
        this.idade = idade;
        this.altura = altura; // em cm
        this.peso = peso; // em kg
        this.imc = peso / ((altura / 100) ** 2);
        this.velocidade = this.calcularVelocidade();
        this.resistencia = this.calcularResistencia();
        this.forca = this.calcularForca();
        this.agilidade = this.calcularAgilidade();
        this.objetivos = objetivos; // ex: ["ganhar_massa", "melhorar_velocidade", "reduzir_gordura"]
        this.historico_treinos = [];
        this.historico_dietas = [];
        this.nivelFisico = this.avaliarNivelFisico();
    }

    calcularVelocidade() {
        // Jogadores mais leves e altos tendem a ser mais rápidos
        return Math.min(1.0, (80 / this.peso) * (this.altura / 180) * 0.7 + 0.3);
    }

    calcularResistencia() {
        // Resistência baseada em IMC ideal e posição
        const imcIdeal = 23;
        const desvio = Math.abs(this.imc - imcIdeal) / imcIdeal;
        return Math.max(0, 1 - (desvio * 0.3));
    }

    calcularForca() {
        // Força baseada em peso e idade
        const forcaIdealPorPeso = 0.6;
        const idadeOtima = 27;
        const desvioIdade = Math.abs(this.idade - idadeOtima) / 10;
        return Math.max(0, (this.peso / 80) * forcaIdealPorPeso * (1 - desvioIdade * 0.2));
    }

    calcularAgilidade() {
        // Agilidade = baixo peso + alta velocidade + juventude
        const pesoIdeal = 75;
        const desvio = Math.abs(this.peso - pesoIdeal) / pesoIdeal;
        const bonusIdade = Math.max(0, (25 - this.idade) / 10);
        return Math.max(0, 0.7 - (desvio * 0.3) + (bonusIdade * 0.2));
    }

    avaliarNivelFisico() {
        const media = (this.velocidade + this.resistencia + this.forca + this.agilidade) / 4;
        if (media >= 0.8) return "ELITE";
        if (media >= 0.6) return "PROFISSIONAL";
        if (media >= 0.4) return "AMADOR";
        return "INICIANTE";
    }

    getEstatisticas() {
        return {
            nome: this.nome,
            posicao: this.posicao,
            idade: this.idade,
            altura: this.altura,
            peso: this.peso,
            imc: this.imc.toFixed(2),
            velocidade: (this.velocidade * 100).toFixed(1) + "%",
            resistencia: (this.resistencia * 100).toFixed(1) + "%",
            forca: (this.forca * 100).toFixed(1) + "%",
            agilidade: (this.agilidade * 100).toFixed(1) + "%",
            nivel: this.nivelFisico
        };
    }

    addObjetivo(objetivo) {
        if (!this.objetivos.includes(objetivo)) {
            this.objetivos.push(objetivo);
        }
    }

    removeObjetivo(objetivo) {
        this.objetivos = this.objetivos.filter(o => o !== objetivo);
    }

    toJSON() {
        return {
            nome: this.nome,
            posicao: this.posicao,
            idade: this.idade,
            altura: this.altura,
            peso: this.peso,
            objetivos: this.objetivos,
            imc: this.imc,
            velocidade: this.velocidade,
            resistencia: this.resistencia,
            forca: this.forca,
            agilidade: this.agilidade,
            nivelFisico: this.nivelFisico
        };
    }

    static fromJSON(data) {
        const profile = new PlayerProfile(data.nome, data.posicao, data.idade, data.altura, data.peso, data.objetivos);
        return profile;
    }
}
