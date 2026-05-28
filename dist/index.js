"use strict";
const form = document.querySelector("#imcForm");
const entradaAltura = document.querySelector("#altura");
const entradaPeso = document.querySelector("#peso");
const valoresEntrada = document.querySelector("#valoresEntrada");
const resultadoTexto = document.querySelector("#resultadoTexto");
const aviso = document.querySelector("#aviso");
const saida = document.querySelector("#saida");
const categorias = [
    {
        limite: 16,
        descricao: "Magreza grave",
        className: "categoria-magreza-grave",
    },
    {
        limite: 17,
        descricao: "Magreza moderada",
        className: "categoria-magreza-moderada",
    },
    {
        limite: 18.6,
        descricao: "Magreza leve",
        className: "categoria-magreza-leve",
    },
    { limite: 25, descricao: "Peso ideal", className: "categoria-peso-ideal" },
    { limite: 30, descricao: "Sobrepeso", className: "categoria-sobrepeso" },
    {
        limite: 35,
        descricao: "Obesidade Grau I",
        className: "categoria-obesidade-i",
    },
    {
        limite: 40,
        descricao: "Obesidade Grau II ou Severa",
        className: "categoria-obesidade-ii",
    },
    {
        limite: Infinity,
        descricao: "Obesidade Grau III ou Mórbida",
        className: "categoria-obesidade-iii",
    },
];
if (!form || !entradaAltura || !entradaPeso || !valoresEntrada || !resultadoTexto || !aviso || !saida) {
    throw new Error("Elementos do DOM não foram encontrados.");
}
function obterValores() {
    return {
        altura: parseFloat(entradaAltura.value.replace(",", ".")),
        peso: parseFloat(entradaPeso.value.replace(",", ".")),
    };
}
function validarValores(altura, peso) {
    if (Number.isNaN(altura) || Number.isNaN(peso)) {
        return "Preencha a altura e o peso com valores numéricos válidos.";
    }
    if (altura < 0.5 || altura > 2.5) {
        return "Informe uma altura entre 0,50 m e 2,50 m.";
    }
    if (peso < 10 || peso > 300) {
        return "Informe um peso entre 10 kg e 300 kg.";
    }
    return null;
}
function calcularImc(altura, peso) {
    return peso / (altura * altura);
}
function encontrarCategoria(imc) {
    var _a;
    return ((_a = categorias.find((item) => imc < item.limite)) !== null && _a !== void 0 ? _a : {
        limite: Infinity,
        descricao: "Não classificado",
        className: "categoria-nao-classificado",
    });
}
function mostrarResultado(altura, peso, imc) {
    const categoria = encontrarCategoria(imc);
    valoresEntrada.textContent = `Altura: ${altura.toFixed(2)} m · Peso: ${peso.toFixed(1)} kg`;
    resultadoTexto.textContent = `IMC ${imc.toFixed(2)} — ${categoria.descricao}`;
    resultadoTexto.classList.remove(...categorias.map((item) => item.className));
    resultadoTexto.classList.add(categoria.className);
    aviso.textContent =
        "Os resultados são apenas uma referência. Consulte sempre um profissional de saúde.";
    saida.classList.remove("hidden");
}
function exibirErro(mensagem) {
    valoresEntrada.textContent = mensagem;
    resultadoTexto.textContent = "";
    aviso.textContent = "";
    saida.classList.remove("hidden");
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { altura, peso } = obterValores();
    const erro = validarValores(altura, peso);
    if (erro) {
        exibirErro(erro);
        return;
    }
    mostrarResultado(altura, peso, calcularImc(altura, peso));
});
