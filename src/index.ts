const entradaAltura = document.querySelector("#altura") as HTMLInputElement;
const entradaPeso = document.querySelector("#peso") as HTMLInputElement;
const valoresEntrada = document.querySelector("#valoresEntrada") as HTMLElement;
const resultadoTexto = document.querySelector("#resultadoTexto") as HTMLElement;
const aviso = document.querySelector("#aviso") as HTMLElement;
const saida = document.querySelector("#saida") as HTMLElement; 
const entrada = document.querySelector("#entrada") as HTMLElement;
const botaoCalcularNovamente = document.querySelector("#botaoCalcularNovamente") as HTMLButtonElement;

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

  valoresEntrada.innerHTML = `Com a<br>altura de ${altura.toFixed(
    2
  )}m e<br>o peso de ${peso}Kg `;

  if (imc < 16) {
    resultadoTexto.innerHTML = `o seu IMC é <br>${imc.toFixed(
      2
    )}<br>e você está com<br>Magreza Grave.`;
  } else if (imc >= 16 && imc <= 16.99) {
    resultadoTexto.innerHTML = `o seu IMC é <br>${imc.toFixed(
      2
    )}<br>e você está com<br>Magreza Moderada.`;
  } else if (imc >= 17 && imc <= 18.59) {
    resultadoTexto.innerHTML = `o seu IMC é <br>${imc.toFixed(
      2
    )}<br>e você está com<br>Magreza Leve.`;
  } else if (imc >= 18.6 && imc <= 24.99) {
    resultadoTexto.innerHTML = `o seu IMC é <br>${imc.toFixed(
      2
    )}<br>e você está com<br>Peso Ideal.`;
  } else if (imc >= 25 && imc <= 29.99) {
    resultadoTexto.innerHTML = `o seu IMC é <br>${imc.toFixed(
      2
    )}<br>e você está com<br>Sobrepeso.`;
  } else if (imc >= 30 && imc <= 34.99) {
    resultadoTexto.innerHTML = `o seu IMC é <br>${imc.toFixed(
      2
    )}<br>e você está com<br>Obesidade Grau I.`;
  } else if (imc >= 35 && imc <= 39.99) {
    resultadoTexto.innerHTML = `o seu IMC é <br>${imc.toFixed(
      2
    )}<br>e você está com<br>Obesidade Grau II ou Severa.`;
  } else if (imc >= 40) {
    resultadoTexto.innerHTML = `o seu IMC é <br>${imc.toFixed(
      2
    )}<br>e você está com<br>Obesidade de Grau III ou Mórbida.`;
  } else {
    resultadoTexto.textContent =
      "Verifique os valores inseridos e calcule novamente"; // Caso inesperado
  }

  aviso.textContent =
    "Independente do resultados obtidos o melhor sempre é consultar e ter um acompanhamento médico.";

  entradaAltura.value = "";
  entradaPeso.value = "";

  entrada.style.display = "none";
  saida.style.display = "block";

  botaoCalcular.style.display = "none";
  botaoCalcularNovamente.style.display = "block";
}

botaoCalcularNovamente.addEventListener('click', function() {
  location.reload();  // Recarrega a página
});

const botaoCalcular = document.querySelector("#botaoCalcular") as HTMLButtonElement;
botaoCalcular.addEventListener("click", calcularIMC);
