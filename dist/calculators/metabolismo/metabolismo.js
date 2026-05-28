"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarMetabolismo = validarMetabolismo;
exports.calcularMetabolismoBasal = calcularMetabolismoBasal;
exports.classificarMetabolismo = classificarMetabolismo;
exports.calcularResultadoMetabolismo = calcularResultadoMetabolismo;
function validarMetabolismo(peso, altura, idade, genero) {
    if (Number.isNaN(peso) || Number.isNaN(altura) || Number.isNaN(idade)) {
        return "Preencha todos os campos com valores numéricos válidos.";
    }
    if (altura < 0.5 || altura > 2.5) {
        return "Informe uma altura entre 0,50 m e 2,50 m.";
    }
    if (peso < 10 || peso > 300) {
        return "Informe um peso entre 10 kg e 300 kg.";
    }
    if (idade < 10 || idade > 120) {
        return "Informe uma idade entre 10 e 120 anos.";
    }
    if (!["masculino", "feminino"].includes(genero)) {
        return "Selecione um gênero válido.";
    }
    return null;
}
function calcularMetabolismoBasal(peso, altura, idade, genero) {
    const alturaCm = altura * 100;
    if (genero === "masculino") {
        return 10 * peso + 6.25 * alturaCm - 5 * idade + 5;
    }
    else {
        return 10 * peso + 6.25 * alturaCm - 5 * idade - 161;
    }
}
function classificarMetabolismo(tmb) {
    if (tmb < 1200) {
        return "Metabolismo lento";
    }
    else if (tmb < 1600) {
        return "Metabolismo normal";
    }
    else if (tmb < 2000) {
        return "Metabolismo acelerado";
    }
    else {
        return "Metabolismo muito acelerado";
    }
}
function calcularResultadoMetabolismo(peso, altura, idade, genero) {
    const tmb = calcularMetabolismoBasal(peso, altura, idade, genero);
    return {
        tmb: Math.round(tmb),
        genero,
        classificacao: classificarMetabolismo(tmb),
    };
}
