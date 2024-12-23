const entradaAltura = document.querySelector("#altura") as HTMLInputElement;
const entradaPeso = document.querySelector("#peso") as HTMLInputElement;
const valoresEntrada = document.querySelector("#valoresEntrada") as HTMLElement;
const resultadoTexto = document.querySelector("#resultadoTexto") as HTMLElement;
const aviso = document.querySelector("#aviso") as HTMLElement;
const saida = document.querySelector("#saida") as HTMLElement; 

function calcularIMC(): void {
  let altura = parseFloat(entradaAltura.value);
  const peso = parseFloat(entradaPeso.value);

  if (isNaN(altura) || isNaN(peso) || altura <= 0) {
    valoresEntrada.textContent = "Por favor, insira valores válidos!";
    resultadoTexto.textContent = "";
    aviso.textContent = "";
    saida.style.display = "block";
    return;
  }

  const imc = peso / (altura * altura);

  valoresEntrada.innerHTML = `Com a altura de ${altura.toFixed(
    2
  )}m e<br>o peso de ${peso}Kg `;

  if (imc < 16) {
    resultadoTexto.textContent = `o seu IMC é ${imc.toFixed(
      2
    )} e você está com magreza grave.`;
  } else if (imc >= 16 && imc <= 16.99) {
    resultadoTexto.textContent = `o seu IMC é ${imc.toFixed(
      2
    )} e você está com magreza moderada.`;
  } else if (imc >= 17 && imc <= 18.59) {
    resultadoTexto.textContent = `o seu IMC é ${imc.toFixed(
      2
    )} e você está com magreza leve.`;
  } else if (imc >= 18.6 && imc <= 24.99) {
    resultadoTexto.textContent = `o seu IMC é ${imc.toFixed(
      2
    )} e você está com peso ideal.`;
  } else if (imc >= 25 && imc <= 29.99) {
    resultadoTexto.textContent = `o seu IMC é ${imc.toFixed(
      2
    )} e você está com sobrepeso.`;
  } else if (imc >= 30 && imc <= 34.99) {
    resultadoTexto.textContent = `o seu IMC é ${imc.toFixed(
      2
    )} e você está com obesidade grau I.`;
  } else if (imc >= 35 && imc <= 39.99) {
    resultadoTexto.textContent = `o seu IMC é ${imc.toFixed(
      2
    )} e você está com obesidade grau II ou severa.`;
  } else if (imc >= 40) {
    resultadoTexto.textContent = `o seu IMC é ${imc.toFixed(
      2
    )} e você está com Obesidade de grau III ou mórbida.`;
  } else {
    resultadoTexto.textContent =
      "Verifique os valores inseridos e calcule novamente"; // Caso inesperado
  }

  aviso.textContent =
    "Mas independente do resultados obtidos o melhor sempre é consultar e ter um acompanhamento médico.";

  entradaAltura.value = "";
  entradaPeso.value = "";

  saida.style.display = "block";
}

const botaoCalcular = document.querySelector("#Calcular") as HTMLButtonElement;
botaoCalcular.addEventListener("click", calcularIMC);
