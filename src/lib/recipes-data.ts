export interface Recipe {
  id: number;
  slug: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: "Fácil" | "Media" | "Avanzada";
  category: "tapas" | "principales" | "sopas" | "postres";
  categoryLabel: string;
  heroImage: string;
  ingredients: string[];
  instructions: string[];
  featured?: boolean;
}

export interface Comment {
  id: number;
  recipeSlug: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  content: string;
  status: "approved" | "pending";
  createdAt: string;
}

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 1,
    slug: "paella-valenciana",
    title: "Paella Valenciana Tradicional",
    description: "El secreto del auténtico socarrat y el equilibrio perfecto de pollo, conejo, garrofó y arroz bomba en el plato estrella de la cocina española.",
    prepTime: "25 min",
    cookTime: "40 min",
    servings: 6,
    difficulty: "Media",
    category: "principales",
    categoryLabel: "Platos Principales",
    heroImage: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    ingredients: [
      "400g de Arroz Bomba",
      "500g de pollo troceado",
      "400g de conejo troceado",
      "200g de judías verdes (bajoqueta)",
      "100g de garrofó (o alubia blanca grande)",
      "1 tomate maduro rallado",
      "Hebras de azafrán de calidad",
      "1 cucharadita de pimentón dulce de la Vera",
      "1.2L de agua o caldo suave",
      "Aceite de oliva virgen extra",
      "Sal al gusto y 1 ramita de romero fresco"
    ],
    instructions: [
      "En una paella grande, calienta abundante aceite de oliva virgen extra y sazona la carne con sal. Dora el pollo y el conejo a fuego medio hasta que queden bien dorados.",
      "Separa la carne hacia los bordes de la paella y sofríe las judías verdes y el garrofó en el centro durante unos minutos.",
      "Añade el tomate rallado y el pimentón dulce en el centro, removiendo con cuidado para evitar que el pimentón se queme.",
      "Vierte el agua, añade las hebras de azafrán e incorpora la ramita de romero. Deja hervir a fuego vivo durante 15-20 minutos para crear un caldo rico.",
      "Retira el romero, añade el arroz repartiéndolo en diagonal en forma de cruz, y distribúyelo uniformemente.",
      "Cocina a fuego fuerte durante 8-10 minutos, luego reduce el fuego a medio-bajo durante 8-10 minutos más.",
      "Para conseguir el codiciado 'socarrat', sube el fuego al máximo en el último minuto escuchando el crepitar. Deja reposar cubierta 5 minutos antes de servir."
    ]
  },
  {
    id: 2,
    slug: "tortilla-de-patatas",
    title: "Tortilla de Patatas Tradicional con Cebolla",
    description: "Jugosa por dentro, dorada por fuera. La receta definitiva con el punto exacto de cocción de la patata y la dulzura de la cebolla pochada a fuego lento.",
    prepTime: "20 min",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Fácil",
    category: "tapas",
    categoryLabel: "Tapas y Entrantes",
    heroImage: "https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    ingredients: [
      "1 kg de patatas monalisa o agria",
      "6 huevos camperos frescos",
      "1 cebolla grande dulce",
      "500 ml de aceite de oliva virgen extra para confitar",
      "Sal fina al gusto"
    ],
    instructions: [
      "Pela las patatas y córtalas en láminas finas y desiguales. Corta la cebolla en juliana fina.",
      "Calienta el aceite de oliva en una sartén grande y añade la patata y la cebolla juntas a fuego suave para pochar lentamente sin freír en exceso (unos 20-25 minutos).",
      "Escurre el aceite sobrante guardándolo para otras preparaciones.",
      "En un bol grande, bate los huevos enérgicamente y añade sal. Incorpora las patatas y la cebolla templadas, mezclando bien y dejando reposar 5 minutos para que la patata absorba el huevo.",
      "Cuaja en una sartén antiadherente con unas gotas de aceite durante 2-3 minutos por lado. Dale la vuelta con la ayuda de un plato llano y sirve templada."
    ]
  },
  {
    id: 3,
    slug: "gazpacho-andaluz",
    title: "Gazpacho Andaluz Fresco e Intenso",
    description: "Sopa fría reconfortante a base de tomates maduros de huerta, pimiento verde, pepino y aceite de oliva virgen extra.",
    prepTime: "15 min",
    cookTime: "0 min",
    servings: 4,
    difficulty: "Fácil",
    category: "sopas",
    categoryLabel: "Sopas y Cremas",
    heroImage: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    ingredients: [
      "1 kg de tomates maduros tipo pera",
      "1 pimiento verde italiano",
      "1 pepino medio pelado",
      "1/2 diente de ajo (sin germen)",
      "50g de pan candeal del día anterior",
      "100 ml de aceite de oliva virgen extra de variedad picual",
      "30 ml de vinagre de Jerez",
      "Sal fina y agua fría al gusto"
    ],
    instructions: [
      "Lava bien las hortalizas. Trocea los tomates, el pimiento verde, el pepino y el ajo.",
      "Coloca todos los ingredientes en una batidora o procesador de alimentos junto con el pan ablandado en un poco de agua, el vinagre y la sal.",
      "Tritura a máxima potencia hasta obtener una crema muy fina y homogénea.",
      "Añade el aceite de oliva poco a poco en hilo mientras sigues triturando para emulsionar.",
      "Pasa el gazpacho por un chino o colador fino si prefieres una textura extra sedosa.",
      "Enfría en la nevera durante al menos 2 horas antes de servir decorado con tropezones de pepino y pimiento."
    ]
  },
  {
    id: 4,
    slug: "gambas-al-ajillo",
    title: "Gambas al Ajillo en Cazuela de Barro",
    description: "El aperitivo más aromático de la cocina de tapas española: gambas jugosas salteadas en aceite de oliva, ajos laminados y guindilla.",
    prepTime: "10 min",
    cookTime: "5 min",
    servings: 2,
    difficulty: "Fácil",
    category: "tapas",
    categoryLabel: "Tapas y Entrantes",
    heroImage: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    ingredients: [
      "400g de gambas o langostinos pelados",
      "6 dientes de ajo pelados y laminados",
      "1 o 2 guindillas secas (cayena)",
      "150 ml de aceite de oliva virgen extra",
      "Un chorrito de vino blanco seco o manzanilla",
      "Perejil fresco picado",
      "Sal escamada"
    ],
    instructions: [
      "En una cazuela de barro, calienta el aceite de oliva a fuego medio.",
      "Añade los ajos laminados y la guindilla. Fríe suavemente hasta que los ajos comiencen a dorarse sin quemarse.",
      "Incorpora las gambas limpias y secas, subiendo el fuego.",
      "Saltea durante 1-2 minutos hasta que cambien de color a un rosado apetecible.",
      "Vierte el vino blanco y deja reducir 30 segundos. Espolvorea perejil fresco picado y sirve inmediatamente hirviendo con buen pan rústico."
    ]
  },
  {
    id: 5,
    slug: "croquetas-de-jamon",
    title: "Croquetas Cremosas de Jamón Ibérico",
    description: "La joya de la gastronomía de bar: una bechamel suave y fluida repleta de virutas de jamón ibérico con un rebozado crujiente impecable.",
    prepTime: "40 min",
    cookTime: "20 min",
    servings: 6,
    difficulty: "Avanzada",
    category: "tapas",
    categoryLabel: "Tapas y Entrantes",
    heroImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    ingredients: [
      "150g de jamón ibérico picado fino",
      "1 Litro de leche entera fresca",
      "90g de mantequilla",
      "90g de harina de trigo",
      "1/2 cebolleta picada finísima",
      "Nuez moscada recién rallada, pimienta y sal",
      "Para rebozar: 2 huevos, harina y pan rallado crujiente",
      "Aceite abundante para freír"
    ],
    instructions: [
      "En un cazo, pon a calentar la leche sin que llegue a hervir.",
      "En una sartén fondosa, funde la mantequilla y pocha la cebolleta. Añade el jamón ibérico y saltea 1 minuto.",
      "Añade la harina y cocina durante 2 minutos para tostar el roux.",
      "Incorpora la leche caliente poco a poco sin dejar de remover con varillas para evitar grumos. Cocina la bechamel 15 minutos hasta que espese y desprenda de las paredes.",
      "Vierte la masa en una fuente, cubre con film a piel y enfría en nevera 6 horas.",
      "Forma las croquetas, pásalas por harina, huevo batido y pan rallado. Fríelas en aceite bien caliente (180°C) hasta que estén doradas."
    ]
  },
  {
    id: 6,
    slug: "pulpo-a-la-gallega",
    title: "Pulpo a la Gallega (Polbo á Feira)",
    description: "Pulpo cocido en su punto de firmeza ideal, presentado sobre rodajas de patata cocida con pimentón de la Vera y aceite virgen extra.",
    prepTime: "15 min",
    cookTime: "45 min",
    servings: 4,
    difficulty: "Media",
    category: "principales",
    categoryLabel: "Platos Principales",
    heroImage: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    ingredients: [
      "1 pulpo de unos 2 kg (previamente congelado)",
      "4 patatas grandes (tipo gallega)",
      "Pimentón dulce y picante de la Vera",
      "Aceite de oliva virgen extra de calidad",
      "Sal gruesa o escamas de sal mar"
    ],
    instructions: [
      "Pon a hervir abundante agua en una olla grande sin sal.",
      "Cuando rompa a hervir, asusta el pulpo 3 veces metiéndolo y sacándolo del agua para arrugar la piel.",
      "Cocina el pulpo a fuego medio durante unos 35-40 minutos. Pincha con un palillo para comprobar la ternura.",
      "Apaga el fuego y deja reposar en la olla 15 minutos.",
      "En el mismo caldo, cuece las patatas cortadas en rodajas de 1 cm.",
      "Corta los tentáculos con tijeras en rodajas. Sirve en plato de madera tradicional sobre la base de patatas, aderezando generosamente con pimentón dulce y picante, sal gruesa y aceite virgen extra."
    ]
  },
  {
    id: 7,
    slug: "churros-con-chocolate",
    title: "Churros Crujientes con Chocolate A la Taza",
    description: "Desayuno o merienda por excelencia: churros dorados hechos al momento acompañados de un chocolate espeso y aromático.",
    prepTime: "15 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Fácil",
    category: "postres",
    categoryLabel: "Postres Tradicionales",
    heroImage: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    ingredients: [
      "250g de harina de trigo",
      "250 ml de agua",
      "1 cucharadita de sal",
      "1 cucharadita de levadura química (opcional)",
      "Aceite abundante de girasol u oliva suave para freír",
      "Azúcar blanco para espolvorear",
      "200g de chocolate negro de cobertura (70%)",
      "500 ml de leche entera"
    ],
    instructions: [
      "Pon el agua a hervir con la sal. En cuanto hierva, vierte de golpe la harina mezclada en un bol y remueve con cuchara de madera hasta lograr una masa homogénea.",
      "Introduce la masa en una churrera o manga pastelera firme con boquilla estrellada.",
      "Calienta abundante aceite a 190°C y ve formando churros cortando las tiras con tijeras.",
      "Fríe hasta que estén bien dorados y crujientes por todos lados. Escurre sobre papel absorbente y espolvorea con azúcar.",
      "Para el chocolate: calienta la leche e incorpora el chocolate troceado mezclando a fuego suave hasta que espese intensamente."
    ]
  },
  {
    id: 8,
    slug: "crema-catalana",
    title: "Crema Catalana con Azúcar Quemado",
    description: "Postre tradicional delicado perfumado con piel de limón y canela, rematado con una capa crujiente de azúcar caramelizado.",
    prepTime: "20 min",
    cookTime: "15 min",
    servings: 4,
    difficulty: "Media",
    category: "postres",
    categoryLabel: "Postres Tradicionales",
    heroImage: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    ingredients: [
      "500 ml de leche entera",
      "4 yemas de huevo fresco",
      "100g de azúcar + azúcar extra para caramelizar",
      "20g de almidón de maíz (Maizena)",
      "La piel de 1 limón sin parte blanca",
      "1 rama de canela en rama"
    ],
    instructions: [
      "Infusiona la leche con la piel de limón y la canela durante 10 minutos a fuego suave. Cuela y reserva.",
      "En un bol, bate las yemas con el azúcar y la Maizena hasta blanquear y disolver totalmente los grumos.",
      "Vierte la leche tibia poco a poco sobre las yemas mezclando con varillas.",
      "Vuelve a poner la mezcla a fuego medio sin dejar de remover suavemente hasta que espese en una crema fina.",
      "Reparte la crema en cazuelitas individuales de barro y deja enfriar a temperatura ambiente antes de guardar en nevera.",
      "Justo antes de servir, espolvorea azúcar sobre la superficie y quema con soplete de cocina o hierro al rojo vivo hasta crear una costra crujiente."
    ]
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    recipeSlug: "paella-valenciana",
    authorName: "Gonzalo R.",
    authorEmail: "gonzalo@example.com",
    rating: 5,
    content: "¡Increíble receta! Siguiendo los pasos del romero y el tiempo del socarrat me quedó clavada como en la Albufera. ¡Muchas gracias!",
    status: "approved",
    createdAt: "2026-07-28 14:30"
  },
  {
    id: 2,
    recipeSlug: "tortilla-de-patatas",
    authorName: "Elena M.",
    authorEmail: "elena@example.com",
    rating: 5,
    content: "El truco de pochar la patata junto a la cebolla a fuego muy lento hace toda la diferencia. ¡Espectacular!",
    status: "approved",
    createdAt: "2026-07-30 09:15"
  }
];
