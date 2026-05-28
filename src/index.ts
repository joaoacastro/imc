import * as IMC from "./calculators/imc/imc";
import * as Metabolismo from "./calculators/metabolismo/metabolismo";
import type {
  Genero,
  NivelAtividade,
} from "./calculators/metabolismo/metabolismo.types";

// ============ DOM Elements IMC ============
const form = document.querySelector<HTMLFormElement>("#imcForm")!;
const entradaAltura = document.querySelector<HTMLInputElement>("#altura")!;
const entradaPeso = document.querySelector<HTMLInputElement>("#peso")!;
const valoresEntrada = document.querySelector<HTMLElement>("#valoresEntrada")!;
const resultadoTexto = document.querySelector<HTMLElement>("#resultadoTexto")!;
const aviso = document.querySelector<HTMLElement>("#aviso")!;
const saida = document.querySelector<HTMLElement>("#saida")!;

// ============ DOM Elements Metabolismo ============
const metabolismoForm =
  document.querySelector<HTMLFormElement>("#metabolismoForm")!;
const pesoMetabolismo =
  document.querySelector<HTMLInputElement>("#peso-metabolismo")!;
const alturaMetabolismo = document.querySelector<HTMLInputElement>(
  "#altura-metabolismo",
)!;
const idadeMetabolismo =
  document.querySelector<HTMLInputElement>("#idade-metabolismo")!;
const generoMetabolismo = document.querySelector<HTMLSelectElement>(
  "#genero-metabolismo",
)!;
const atividadeMetabolismo = document.querySelector<HTMLSelectElement>(
  "#atividade-metabolismo",
)!;
const valoresMetabolismo = document.querySelector<HTMLElement>(
  "#valoresMetabolismo",
)!;
const resultadoMetabolismo = document.querySelector<HTMLElement>(
  "#resultadoMetabolismo",
)!;
const resultadoTotalMetabolismo = document.querySelector<HTMLElement>(
  "#resultadoTotalMetabolismo",
)!;
const avisoMetabolismo =
  document.querySelector<HTMLElement>("#avisoMetabolismo")!;
const saidaMetabolismo =
  document.querySelector<HTMLElement>("#saida-metabolismo")!;

// ============ DOM Elements Abas ============
const abaBtns = document.querySelectorAll<HTMLButtonElement>(".aba-btn");
const abaConteudos = document.querySelectorAll<HTMLElement>(".aba-conteudo");

// ============ FUNCIONALIDADE IMC ============
function obterValoresIMC(): { altura: number; peso: number } {
  return {
    altura: parseFloat(entradaAltura.value.replace(",", ".")),
    peso: parseFloat(entradaPeso.value.replace(",", ".")),
  };
}

function mostrarResultadoIMC(altura: number, peso: number, imc: number): void {
  const categoria = IMC.encontrarCategoriaIMC(imc);
  valoresEntrada.textContent = `Altura: ${altura.toFixed(2)} m · Peso: ${peso.toFixed(1)} kg`;
  resultadoTexto.textContent = `IMC ${imc.toFixed(2)} — ${categoria.descricao}`;
  resultadoTexto.classList.remove(...IMC.obterClassesIMC());
  resultadoTexto.classList.add(categoria.className);
  aviso.textContent =
    "Os resultados são apenas uma referência. Consulte sempre um profissional de saúde.";
  saida.classList.remove("hidden");
}

function exibirErroIMC(mensagem: string): void {
  valoresEntrada.textContent = mensagem;
  resultadoTexto.textContent = "";
  aviso.textContent = "";
  saida.classList.remove("hidden");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { altura, peso } = obterValoresIMC();
  const erro = IMC.validarIMC(altura, peso);

  if (erro) {
    exibirErroIMC(erro);
    return;
  }

  mostrarResultadoIMC(altura, peso, IMC.calcularIMC(altura, peso));
});

// ============ FUNCIONALIDADE METABOLISMO ============
function obterValoresMetabolismo(): {
  peso: number;
  altura: number;
  idade: number;
  genero: Genero;
  atividade: NivelAtividade;
} {
  return {
    peso: parseFloat(pesoMetabolismo.value.replace(",", ".")),
    altura: parseFloat(alturaMetabolismo.value.replace(",", ".")),
    idade: parseFloat(idadeMetabolismo.value),
    genero: generoMetabolismo.value as Genero,
    atividade: atividadeMetabolismo.value as NivelAtividade,
  };
}

function mostrarResultadoMetabolismo(
  peso: number,
  altura: number,
  idade: number,
  genero: Genero,
  resultado: ReturnType<typeof Metabolismo.calcularResultadoMetabolismo>,
): void {
  valoresMetabolismo.textContent = `${peso} kg · ${altura.toFixed(2)} m · ${idade} anos · ${genero === "masculino" ? "♂" : "♀"}`;
  resultadoMetabolismo.textContent = `TMB ${resultado.tmb} kcal/dia — ${resultado.classificacao}`;
  resultadoTotalMetabolismo.textContent = `TDEE ${resultado.tdee} kcal/dia (${resultado.atividade}, x${resultado.multiplicador})`;
  avisoMetabolismo.textContent =
    "A Taxa Metabólica Basal (TMB) é o gasto de calorias em repouso e o TDEE considera seu nível de atividade.";
  saidaMetabolismo.classList.remove("hidden");
}

function exibirErroMetabolismo(mensagem: string): void {
  valoresMetabolismo.textContent = mensagem;
  resultadoMetabolismo.textContent = "";
  avisoMetabolismo.textContent = "";
  saidaMetabolismo.classList.remove("hidden");
}

metabolismoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const { peso, altura, idade, genero, atividade } = obterValoresMetabolismo();
  const erro = Metabolismo.validarMetabolismo(
    peso,
    altura,
    idade,
    genero,
    atividade,
  );

  if (erro) {
    exibirErroMetabolismo(erro);
    return;
  }

  const resultado = Metabolismo.calcularResultadoMetabolismo(
    peso,
    altura,
    idade,
    genero,
    atividade,
  );
  mostrarResultadoMetabolismo(peso, altura, idade, genero, resultado);
});

// ============ SISTEMA DE ABAS ============
function ativarAba(abaId: string): void {
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
