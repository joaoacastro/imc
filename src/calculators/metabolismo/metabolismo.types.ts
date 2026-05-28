export type Genero = "masculino" | "feminino";

export type ResultadoMetabolismo = {
  tmb: number;
  genero: Genero;
  classificacao: string;
};
