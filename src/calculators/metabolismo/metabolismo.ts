import type {
  Genero,
  NivelAtividade,
  ResultadoMetabolismo,
} from "./metabolismo.types";

export function validarMetabolismo(
  peso: number,
  altura: number,
  idade: number,
  genero: Genero,
  atividade: NivelAtividade,
): string | null {
  if (Number.isNaN(peso) || Number.isNaN(altura) || Number.isNaN(idade)) {
    return "Preencha todos os campos com valores válidos.";
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

  if (
    ![
      "sedentario",
      "levemente-ativo",
      "moderadamente-ativo",
      "muito-ativo",
      "extremamente-ativo",
    ].includes(atividade)
  ) {
    return "Selecione um nível de atividade válido.";
  }

  return null;
}

export function calcularMetabolismoBasal(
  peso: number,
  altura: number,
  idade: number,
  genero: Genero,
): number {
  const alturaCm = altura * 100;

  if (genero === "masculino") {
    return 10 * peso + 6.25 * alturaCm - 5 * idade + 5;
  } else {
    return 10 * peso + 6.25 * alturaCm - 5 * idade - 161;
  }
}

export function obterMultiplicadorAtividade(atividade: NivelAtividade): {
  multiplicador: number;
  descricao: string;
} {
  switch (atividade) {
    case "sedentario":
      return { multiplicador: 1.2, descricao: "Sedentário" };
    case "levemente-ativo":
      return { multiplicador: 1.375, descricao: "Levemente ativo" };
    case "moderadamente-ativo":
      return { multiplicador: 1.55, descricao: "Moderadamente ativo" };
    case "muito-ativo":
      return { multiplicador: 1.725, descricao: "Muito ativo" };
    case "extremamente-ativo":
      return { multiplicador: 1.9, descricao: "Extremamente ativo" };
    default:
      return { multiplicador: 1.2, descricao: "Sedentário" };
  }
}

export function classificarMetabolismo(tmb: number): string {
  if (tmb < 1200) {
    return "Metabolismo lento";
  } else if (tmb < 1600) {
    return "Metabolismo normal";
  } else if (tmb < 2000) {
    return "Metabolismo acelerado";
  } else {
    return "Metabolismo muito acelerado";
  }
}

export function calcularResultadoMetabolismo(
  peso: number,
  altura: number,
  idade: number,
  genero: Genero,
  atividade: NivelAtividade,
): ResultadoMetabolismo {
  const tmb = calcularMetabolismoBasal(peso, altura, idade, genero);
  const atividadeInfo = obterMultiplicadorAtividade(atividade);
  const tdee = tmb * atividadeInfo.multiplicador;

  return {
    tmb: Math.round(tmb),
    genero,
    classificacao: classificarMetabolismo(tmb),
    atividade: atividadeInfo.descricao,
    multiplicador: atividadeInfo.multiplicador,
    tdee: Math.round(tdee),
  };
}
