/** Ejemplo visual dentro de una recomendación */
export interface RecommendationExample {
  title: string;
  imageUrl: string;
  tutorialTips: string;
}

/** Recomendación de estilo generada por IA */
export interface Recommendation {
  id: number;
  style: string;
  description: string;
  styleImg: string;
  examples: RecommendationExample[];
}
