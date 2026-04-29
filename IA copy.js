/**
 * ==============================================================================
 * PROJETO: APOLLO-PLAYER-ENGINE (VANILLA JS ARTIFICIAL INTELLIGENCE)
 * ==============================================================================
 * O mais completo Framework de Rede Neural Profunda escrito em JS Puro.
 * Focado em análise preditiva de jogadores famosos e persistência persistente.
 * ==============================================================================
 */

/**
 * MÓDULO 1: NÚCLEO DE ÁLGEBRA LINEAR AVANÇADA
 * Responsável por todas as operações tensoriais da rede.
 */
class Tensor {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => new Float64Array(cols).fill(0));
    }

    static fromArray(arr) {
        let t = new Tensor(arr.length, 1);
        for (let i = 0; i < arr.length; i++) t.data[i][0] = arr[i];
        return t;
    }

    static toArray(tensor) {
        let arr = [];
        for (let i = 0; i < tensor.rows; i++) {
            for (let j = 0; j < tensor.cols; j++) arr.push(tensor.data[i][j]);
        }
        return arr;
    }

    fillRandom() {
        return this.map(() => (Math.random() * 2 - 1) * Math.sqrt(2 / this.rows)); // He Initialization
    }

    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = func(this.data[i][j], i, j);
            }
        }
        return this;
    }

    static map(t, func) {
        return new Tensor(t.rows, t.cols).map((_, i, j) => func(t.data[i][j], i, j));
    }

    static transpose(t) {
        let result = new Tensor(t.cols, t.rows);
        for (let i = 0; i < t.rows; i++) {
            for (let j = 0; j < t.cols; j++) result.data[j][i] = t.data[i][j];
        }
        return result;
    }

    static dot(a, b) {
        if (a.cols !== b.rows) throw new Error(`Dimensões incompatíveis: A.cols(${a.cols}) != B.rows(${b.rows})`);
        let result = new Tensor(a.rows, b.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < b.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) sum += a.data[i][k] * b.data[k][j];
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    add(t) {
        if (t instanceof Tensor) return this.map((v, i, j) => v + t.data[i][j]);
        return this.map(v => v + t);
    }

    sub(t) {
        if (t instanceof Tensor) return this.map((v, i, j) => v - t.data[i][j]);
        return this.map(v => v - t);
    }

    mul(t) {
        if (t instanceof Tensor) return this.map((v, i, j) => v * t.data[i][j]);
        return this.map(v => v * t);
    }

    copy() {
        let c = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) c.data[i].set(this.data[i]);
        return c;
    }
}

/**
 * MÓDULO 2: BIBLIOTECA DE ATIVAÇÃO E CÁLCULO DIFERENCIAL
 */
const Activation = {
    sigmoid: {
        f: x => 1 / (1 + Math.exp(-x)),
        df: y => y * (1 - y)
    },
    relu: {
        f: x => Math.max(0, x),
        df: x => (x > 0 ? 1 : 0)
    },
    tanh: {
        f: x => Math.tanh(x),
        df: y => 1 - y * y
    }
};

/**
 * MÓDULO 3: O MOTOR PRINCIPAL (DEEP PLAYER ENGINE)
 */
class ApolloNeuralNetwork {
    constructor(layerSchema) {
        this.layers = layerSchema; // Ex: [4, 16, 8, 2]
        this.weights = [];
        this.biases = [];
        this.optimizerData = { mW: [], vW: [], mB: [], vB: [], t: 0 };
        
        this.lr = 0.001; // Taxa para Adam
        this.beta1 = 0.9;
        this.beta2 = 0.999;
        this.eps = 1e-8;

        this.initParameters();
    }

    initParameters() {
        for (let i = 0; i < this.layers.length - 1; i++) {
            this.weights.push(new Tensor(this.layers[i + 1], this.layers[i]).fillRandom());
            this.biases.push(new Tensor(this.layers[i + 1], 1).fillRandom());
            
            // Estados do Adam
            this.optimizerData.mW.push(new Tensor(this.layers[i + 1], this.layers[i]));
            this.optimizerData.vW.push(new Tensor(this.layers[i + 1], this.layers[i]));
            this.optimizerData.mB.push(new Tensor(this.layers[i + 1], 1));
            this.optimizerData.vB.push(new Tensor(this.layers[i + 1], 1));
        }
    }

    forward(inputArr) {
        let current = Tensor.fromArray(inputArr);
        let activations = [current];

        for (let i = 0; i < this.weights.length; i++) {
            let net = Tensor.dot(this.weights[i], current);
            net.add(this.biases[i]);
            // Usa ReLU nas escondidas e Sigmoid na última
            let func = (i === this.weights.length - 1) ? Activation.sigmoid : Activation.relu;
            current = Tensor.map(net, func.f);
            activations.push(current);
        }
        return activations;
    }

    train(inputArr, targetArr) {
        let acts = this.forward(inputArr);
        let targets = Tensor.fromArray(targetArr);
        this.optimizerData.t++;

        let error = targets.sub(acts[acts.length - 1]);
        
        for (let i = this.weights.length - 1; i >= 0; i--) {
            let func = (i === this.weights.length - 1) ? Activation.sigmoid : Activation.relu;
            let gradients = Tensor.map(acts[i + 1], func.df);
            gradients.mul(error);

            let deltaW = Tensor.dot(gradients, Tensor.transpose(acts[i]));
            this.applyAdam(i, deltaW, gradients);

            error = Tensor.dot(Tensor.transpose(this.weights[i]), error);
        }
    }

    applyAdam(idx, dW, dB) {
        const o = this.optimizerData;
        const update = (param, grad, m, v) => {
            m.map((val, r, c) => this.beta1 * val + (1 - this.beta1) * grad.data[r][c]);
            v.map((val, r, c) => this.beta2 * val + (1 - this.beta2) * Math.pow(grad.data[r][c], 2));
            
            let mHat = m.copy().mul(1 / (1 - Math.pow(this.beta1, o.t)));
            let vHat = v.copy().mul(1 / (1 - Math.pow(this.beta2, o.t)));

            param.add(mHat.map((val, r, c) => (this.lr * val) / (Math.sqrt(vHat.data[r][c]) + this.eps)));
        };

        update(this.weights[idx], dW, o.mW[idx], o.vW[idx]);
        update(this.biases[idx], dB, o.mB[idx], o.vB[idx]);
    }

    save() {
        const dump = {
            w: this.weights.map(t => t.data),
            b: this.biases.map(t => t.data),
            config: this.layers
        };
        localStorage.setItem("APOLLO_CORE", JSON.stringify(dump));
        console.log("%c [SISTEMA] Conhecimento arquivado no LocalStorage.", "color: gold; font-weight: bold");
    }

    load() {
        const data = localStorage.getItem("APOLLO_CORE");
        if (!data) return false;
        const parsed = JSON.parse(data);
        parsed.w.forEach((d, i) => this.weights[i].data = d.map(row => new Float64Array(row)));
        parsed.b.forEach((d, i) => this.biases[i].data = d.map(row => new Float64Array(row)));
        return true;
    }
}

/**
 * MÓDULO 4: DATASET E PIPELINE DE JOGADORES
 */
const JogadoresData = [
    { nome: "Cristiano Ronaldo", stats: [0.88, 0.95, 0.82, 0.30], cargo: [1, 0] }, // Atacante
    { nome: "Virgil van Dijk", stats: [0.72, 0.40, 0.78, 0.96], cargo: [0, 1] }, // Defensor
    { nome: "Lionel Messi", stats: [0.85, 0.92, 0.98, 0.25], cargo: [1, 0] },
    { nome: "Marquinhos", stats: [0.75, 0.45, 0.80, 0.92], cargo: [0, 1] },
    { nome: "Neymar Jr", stats: [0.89, 0.86, 0.94, 0.32], cargo: [1, 0] },
    { nome: "Thiago Silva", stats: [0.60, 0.40, 0.85, 0.94], cargo: [0, 1] }
];

// --- INICIALIZAÇÃO DO ENGINE ---

const Engine = new ApolloNeuralNetwork([4, 24, 12, 2]); // Arquitetura robusta
if (!Engine.load()) console.log("Engine: Nova rede criada.");

function treinarSistema(iteracoes = 50000) {
    console.time("Tempo de Treino");
    for (let i = 0; i < iteracoes; i++) {
        let p = JogadoresData[Math.floor(Math.random() * JogadoresData.length)];
        Engine.train(p.stats, p.cargo);
        if (i % 10000 === 0) console.log(`Época ${i}...`);
    }
    Engine.save();
    console.timeEnd("Tempo de Treino");
}

function analisar(nome, stats) {
    let output = Tensor.toArray(Engine.forward(stats).pop());
    let desc = output[0] > output[1] ? "ATACANTE" : "DEFENSOR";
    console.log(`%c IA Análise - Jogador: ${nome}`, "color: #00acee");
    console.log(`Resultado: ${desc} | Certeza: ${(Math.max(...output) * 100).toFixed(2)}%`);
}

// Iniciar Processo
treinarSistema(30000);
analisar("Mbappé (Simulado)", [0.97, 0.91, 0.80, 0.28]);
analisar("Éder Militão (Simulado)", [0.78, 0.35, 0.70, 0.93]);
