export type Genero = "masculino" | "feminino";
export type NivelAtividade =
  | "sedentario"
  | "levemente-ativo"
  | "moderadamente-ativo"
  | "muito-ativo"
  | "extremamente-ativo";

export type ResultadoMetabolismo = {
  tmb: number;
  genero: Genero;
  classificacao: string;
  atividade: string;
  multiplicador: number;
  tdee: number;
};
