export type Principle = {
  index: string;
  title: string;
  description: string;
};

export type MethodStage = {
  index: string;
  title: string;
  short: string;
  description: string;
  question: string;
};

export const firm = {
  intro:
    "No añadimos ruido al conflicto. Construimos la estructura que lo ordena.",
  statement:
    "Un bufete no debería limitarse a responder preguntas jurídicas. Debería ayudar a formularlas mejor.",
  manifesto: [
    "Trabajamos en el punto en que una decisión empresarial o patrimonial necesita convertirse en una posición jurídica sostenible. Ese punto exige algo más que conocimiento técnico: exige entender el contexto, ordenar los hechos y elegir qué batallas tienen sentido.",
    "Nuestro enfoque es deliberadamente sobrio. Preferimos una estrategia comprensible a una solución espectacular; un documento que se pueda usar a una cláusula que solo impresione. La precisión no está reñida con la claridad: la hace posible.",
  ],
  principles: [
    {
      index: "I",
      title: "Criterio antes que volumen",
      description:
        "No confundimos extensión con profundidad. Cada documento y cada actuación deben responder a una decisión identificable.",
    },
    {
      index: "II",
      title: "Claridad en la complejidad",
      description:
        "Explicamos las alternativas con sus consecuencias, también cuando la respuesta menos cómoda es la más honesta.",
    },
    {
      index: "III",
      title: "Discreción operativa",
      description:
        "El trabajo jurídico relevante ocurre antes de que sea visible. Protegemos la información y evitamos la exposición innecesaria.",
    },
    {
      index: "IV",
      title: "Continuidad",
      description:
        "Diseñamos soluciones que puedan sostenerse cuando cambien las personas, el mercado o las prioridades del cliente.",
    },
  ] satisfies Principle[],
  approach: {
    title: "La estrategia como forma de ordenar la incertidumbre",
    paragraphs: [
      "Cada asunto tiene una estructura: unos hechos que condicionan, unos intereses que compiten y un conjunto de decisiones que pueden tomarse en un orden u otro. Nuestro trabajo empieza por hacer visible esa estructura antes de proponer una actuación.",
      "No tratamos todas las materias igual. Un contrato, una operación societaria y un conflicto judicial tienen lógicas distintas. Pero comparten una exigencia: la solución debe poder explicarse, ejecutarse y revisarse sin depender de una sola persona.",
    ],
  },
  method: [
    {
      index: "01",
      title: "Diagnóstico",
      short: "Entender antes de actuar",
      description:
        "Escuchamos, ordenamos los hechos y delimitamos el problema real. Separamos lo que se sabe de lo que se supone.",
      question: "¿Qué está ocurriendo realmente y qué decisiones se avecinan?",
    },
    {
      index: "02",
      title: "Evaluación",
      short: "Medir el marco y el riesgo",
      description:
        "Analizamos el marco jurídico, la posición de las partes y las alternativas disponibles, con sus costes y límites.",
      question: "¿Qué opciones existen y qué consecuencias tiene cada una?",
    },
    {
      index: "03",
      title: "Estrategia",
      short: "Elegir una posición",
      description:
        "Definimos una posición, un orden de actuación y criterios para decidir cuando el escenario cambie.",
      question: "¿Cuál es la vía que mejor sostiene el objetivo?",
    },
    {
      index: "04",
      title: "Actuación",
      short: "Ejecutar con precisión",
      description:
        "Negociamos, documentamos o defendemos con un plan definido y una comunicación contenida.",
      question: "¿Qué se hace ahora, en qué orden y con qué prueba?",
    },
    {
      index: "05",
      title: "Seguimiento",
      short: "Revisar y ajustar",
      description:
        "Revisamos el resultado y el contexto. Si cambia el escenario, la estrategia se revisa antes de que el cambio la imponga.",
      question: "¿Sigue siendo válida la posición adoptada?",
    },
  ] satisfies MethodStage[],
  disclaimer:
    "La metodología describe un proceso de trabajo. No anticipa, promete ni garantiza resultados jurídicos o judiciales.",
} as const;

export const team = [
  {
    name: "Elena Varela",
    initials: "EV",
    role: "Dirección · Estrategia y gobierno corporativo",
    focus:
      "Decisiones de estructura, gobierno y operaciones en compañías en transición.",
    languages: "Español · Inglés",
    demo: true,
  },
  {
    name: "Tomás Iriarte",
    initials: "TI",
    role: "Contratos y operaciones comerciales",
    focus:
      "Arquitectura contractual, negociación y relaciones comerciales de largo plazo.",
    languages: "Español · Inglés · Francés",
    demo: true,
  },
  {
    name: "Clara Ferrer",
    initials: "CF",
    role: "Litigios y resolución de conflictos",
    focus:
      "Preparación del conflicto, negociación y dirección de procedimientos civiles y mercantiles.",
    languages: "Español · Inglés",
    demo: true,
  },
  {
    name: "Mateo Soria",
    initials: "MS",
    role: "Patrimonio y continuidad familiar",
    focus:
      "Titularidad, gobierno familiar y coordinación de estructuras de continuidad.",
    languages: "Español · Inglés · Alemán",
    demo: true,
  },
] as const;

export const teamDisclaimer =
  "Perfiles de demostración. Nombres, especialidades y funciones son ficticios; no representan credenciales profesionales verificadas.";
