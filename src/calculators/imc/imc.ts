type CategoriaIMC = {
  limite: number;
  descricao: string;
  className: string;
};

const categoriasIMC: CategoriaIMC[] = [
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

export function validarIMC(altura: number, peso: number): string | null {
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

export function calcularIMC(altura: number, peso: number): number {
  return peso / (altura * altura);
}

export function encontrarCategoriaIMC(imc: number): CategoriaIMC {
  return (
    categoriasIMC.find((item) => imc < item.limite) ?? {
      limite: Infinity,
      descricao: "Não classificado",
      className: "categoria-nao-classificado",
    }
  );
}

export function obterClassesIMC(): string[] {
  return categoriasIMC.map((item) => item.className);
}
