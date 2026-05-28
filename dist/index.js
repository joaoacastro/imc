"use strict";
(() => {
  // src/calculators/imc/imc.ts
  var categoriasIMC = [
    {
      limite: 16,
      descricao: "Magreza grave",
      className: "categoria-magreza-grave"
    },
    {
      limite: 17,
      descricao: "Magreza moderada",
      className: "categoria-magreza-moderada"
    },
    {
      limite: 18.6,
      descricao: "Magreza leve",
      className: "categoria-magreza-leve"
    },
    { limite: 25, descricao: "Peso ideal", className: "categoria-peso-ideal" },
    { limite: 30, descricao: "Sobrepeso", className: "categoria-sobrepeso" },
    {
      limite: 35,
      descricao: "Obesidade Grau I",
      className: "categoria-obesidade-i"
    },
    {
      limite: 40,
      descricao: "Obesidade Grau II ou Severa",
      className: "categoria-obesidade-ii"
    },
    {
      limite: Infinity,
      descricao: "Obesidade Grau III ou M\xF3rbida",
      className: "categoria-obesidade-iii"
    }
  ];
  function validarIMC(altura, peso) {
    if (Number.isNaN(altura) || Number.isNaN(peso)) {
      return "Preencha a altura e o peso com valores num\xE9ricos v\xE1lidos.";
    }
    if (altura < 0.5 || altura > 2.5) {
      return "Informe uma altura entre 0,50 m e 2,50 m.";
    }
    if (peso < 10 || peso > 300) {
      return "Informe um peso entre 10 kg e 300 kg.";
    }
    return null;
  }
  function calcularIMC(altura, peso) {
    return peso / (altura * altura);
  }
  function encontrarCategoriaIMC(imc) {
    return categoriasIMC.find((item) => imc < item.limite) ?? {
      limite: Infinity,
      descricao: "N\xE3o classificado",
      className: "categoria-nao-classificado"
    };
  }
  function obterClassesIMC() {
    return categoriasIMC.map((item) => item.className);
  }

  // src/calculators/metabolismo/metabolismo.ts
  function validarMetabolismo(peso, altura, idade, genero) {
    if (Number.isNaN(peso) || Number.isNaN(altura) || Number.isNaN(idade)) {
      return "Preencha todos os campos com valores num\xE9ricos v\xE1lidos.";
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
      return "Selecione um g\xEAnero v\xE1lido.";
    }
    return null;
  }
  function calcularMetabolismoBasal(peso, altura, idade, genero) {
    const alturaCm = altura * 100;
    if (genero === "masculino") {
      return 10 * peso + 6.25 * alturaCm - 5 * idade + 5;
    } else {
      return 10 * peso + 6.25 * alturaCm - 5 * idade - 161;
    }
  }
  function classificarMetabolismo(tmb) {
    if (tmb < 1200) {
      return "Metabolismo lento";
    } else if (tmb < 1600) {
      return "Metabolismo normal";
    } else if (tmb < 2e3) {
      return "Metabolismo acelerado";
    } else {
      return "Metabolismo muito acelerado";
    }
  }
  function calcularResultadoMetabolismo(peso, altura, idade, genero) {
    const tmb = calcularMetabolismoBasal(peso, altura, idade, genero);
    return {
      tmb: Math.round(tmb),
      genero,
      classificacao: classificarMetabolismo(tmb)
    };
  }

  // src/index.ts
  var form = document.querySelector("#imcForm");
  var entradaAltura = document.querySelector("#altura");
  var entradaPeso = document.querySelector("#peso");
  var valoresEntrada = document.querySelector("#valoresEntrada");
  var resultadoTexto = document.querySelector("#resultadoTexto");
  var aviso = document.querySelector("#aviso");
  var saida = document.querySelector("#saida");
  var metabolismoForm = document.querySelector("#metabolismoForm");
  var pesoMetabolismo = document.querySelector("#peso-metabolismo");
  var alturaMetabolismo = document.querySelector(
    "#altura-metabolismo"
  );
  var idadeMetabolismo = document.querySelector("#idade-metabolismo");
  var generoMetabolismo = document.querySelector(
    "#genero-metabolismo"
  );
  var valoresMetabolismo = document.querySelector(
    "#valoresMetabolismo"
  );
  var resultadoMetabolismo = document.querySelector(
    "#resultadoMetabolismo"
  );
  var avisoMetabolismo = document.querySelector("#avisoMetabolismo");
  var saidaMetabolismo = document.querySelector("#saida-metabolismo");
  var abaBtns = document.querySelectorAll(".aba-btn");
  var abaConteudos = document.querySelectorAll(".aba-conteudo");
  function obterValoresIMC() {
    return {
      altura: parseFloat(entradaAltura.value.replace(",", ".")),
      peso: parseFloat(entradaPeso.value.replace(",", "."))
    };
  }
  function mostrarResultadoIMC(altura, peso, imc) {
    const categoria = encontrarCategoriaIMC(imc);
    valoresEntrada.textContent = `Altura: ${altura.toFixed(2)} m \xB7 Peso: ${peso.toFixed(1)} kg`;
    resultadoTexto.textContent = `IMC ${imc.toFixed(2)} \u2014 ${categoria.descricao}`;
    resultadoTexto.classList.remove(...obterClassesIMC());
    resultadoTexto.classList.add(categoria.className);
    aviso.textContent = "Os resultados s\xE3o apenas uma refer\xEAncia. Consulte sempre um profissional de sa\xFAde.";
    saida.classList.remove("hidden");
  }
  function exibirErroIMC(mensagem) {
    valoresEntrada.textContent = mensagem;
    resultadoTexto.textContent = "";
    aviso.textContent = "";
    saida.classList.remove("hidden");
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const { altura, peso } = obterValoresIMC();
    const erro = validarIMC(altura, peso);
    if (erro) {
      exibirErroIMC(erro);
      return;
    }
    mostrarResultadoIMC(altura, peso, calcularIMC(altura, peso));
  });
  function obterValoresMetabolismo() {
    return {
      peso: parseFloat(pesoMetabolismo.value.replace(",", ".")),
      altura: parseFloat(alturaMetabolismo.value.replace(",", ".")),
      idade: parseFloat(idadeMetabolismo.value),
      genero: generoMetabolismo.value
    };
  }
  function mostrarResultadoMetabolismo(peso, altura, idade, genero, resultado) {
    valoresMetabolismo.textContent = `${peso} kg \xB7 ${altura.toFixed(2)} m \xB7 ${idade} anos \xB7 ${genero === "masculino" ? "\u2642" : "\u2640"}`;
    resultadoMetabolismo.textContent = `${resultado.tmb} kcal/dia \u2014 ${resultado.classificacao}`;
    avisoMetabolismo.textContent = "A Taxa Metab\xF3lica Basal (TMB) \xE9 a quantidade de calorias que seu corpo queima em repouso.";
    saidaMetabolismo.classList.remove("hidden");
  }
  function exibirErroMetabolismo(mensagem) {
    valoresMetabolismo.textContent = mensagem;
    resultadoMetabolismo.textContent = "";
    avisoMetabolismo.textContent = "";
    saidaMetabolismo.classList.remove("hidden");
  }
  metabolismoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { peso, altura, idade, genero } = obterValoresMetabolismo();
    const erro = validarMetabolismo(peso, altura, idade, genero);
    if (erro) {
      exibirErroMetabolismo(erro);
      return;
    }
    const resultado = calcularResultadoMetabolismo(
      peso,
      altura,
      idade,
      genero
    );
    mostrarResultadoMetabolismo(peso, altura, idade, genero, resultado);
  });
  function ativarAba(abaId) {
    abaBtns.forEach((btn) => {
      if (btn.dataset.aba === abaId) {
        btn.classList.add("aba-ativo");
      } else {
        btn.classList.remove("aba-ativo");
      }
    });
    abaConteudos.forEach((conteudo) => {
      if (conteudo.id === `aba-${abaId}`) {
        conteudo.classList.add("aba-ativo");
      } else {
        conteudo.classList.remove("aba-ativo");
      }
    });
  }
  abaBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const abaId = btn.dataset.aba;
      if (abaId) {
        ativarAba(abaId);
      }
    });
  });
})();
