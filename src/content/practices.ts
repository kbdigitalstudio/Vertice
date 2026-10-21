export type PracticeService = {
  title: string;
  description: string;
};

export type PracticeStep = {
  title: string;
  description: string;
};

export type Practice = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  seoDescription: string;
  focus: string;
  intro: string[];
  services: PracticeService[];
  method: {
    lead: string;
    steps: PracticeStep[];
  };
  complementary: string[];
  visual: {
    src: string;
    alt: string;
    position: string;
    caption: string;
  };
};

/**
 * Contenido provisional. Estas áreas no son servicios confirmados: son una
 * propuesta editorial que el cliente debe validar antes de publicar.
 */
export const practices: Practice[] = [
  {
    slug: "derecho-corporativo",
    index: "01",
    title: "Derecho corporativo y comercial",
    shortTitle: "Corporativo",
    eyebrow: "Estructura · Gobierno · Operaciones",
    summary:
      "Estructuras societarias, gobierno y operaciones que necesitan sostenerse en el tiempo.",
    seoDescription:
      "Derecho corporativo y comercial: gobierno, operaciones societarias y acuerdos entre socios. Contenido provisional de VÉRTICE.",
    focus: "La estructura correcta no limita la operación. La hace posible.",
    intro: [
      "Las compañías no se gobiernan solo con buenas intenciones. Se gobiernan con reglas claras, órganos que funcionan y decisiones documentadas. Nuestro trabajo consiste en dar forma jurídica a esa arquitectura antes de que el crecimiento, la entrada de socios o una operación la pongan a prueba.",
      "Intervenimos en el diseño y la revisión de estructuras societarias, en operaciones de transmisión y en los acuerdos que ordenan la relación entre quienes dirigen la compañía. El objetivo no es acumular documentación: es que cada decisión relevante tenga un lugar, un procedimiento y un responsable.",
    ],
    services: [
      {
        title: "Gobierno corporativo",
        description:
          "Diseño de órganos, competencias, flujos de decisión y actas para que la compañía sepa cómo decide.",
      },
      {
        title: "Operaciones societarias",
        description:
          "Acompañamiento jurídico en transmisiones, entradas de capital, reorganizaciones y operaciones entre sociedades.",
      },
      {
        title: "Acuerdos entre socios",
        description:
          "Pactos que ordenan entrada, salida, gobierno, bloqueos y resolución de desacuerdos antes de que aparezcan.",
      },
      {
        title: "Secretaría societaria",
        description:
          "Rutinas, calendarios y documentación societaria para mantener el registro y la toma de decisiones al día.",
      },
    ],
    method: {
      lead: "La estructura se diseña alrededor de la compañía real, no de un modelo importado.",
      steps: [
        {
          title: "Contexto",
          description:
            "Entendemos la titularidad, los órganos existentes y las decisiones que la compañía tiene previstas.",
        },
        {
          title: "Diseño",
          description:
            "Proponemos una arquitectura comprensible, con alternativas y un reparto explícito de riesgos.",
        },
        {
          title: "Implantación",
          description:
            "Redactamos los documentos, coordinamos su formalización y dejamos un mapa de gobierno utilizable.",
        },
      ],
    },
    complementary: ["derecho-contractual", "consultoria-estrategica", "proteccion-patrimonial"],
    visual: {
      src: "/images/facade-pattern.jpg",
      alt: "Detalle de ladrillo perforado en la fachada del Museo Kolumba, de Peter Zumthor.",
      position: "center 38%",
      caption: "Estructura y repetición. Kolumba, Colonia.",
    },
  },
  {
    slug: "litigios",
    index: "02",
    title: "Litigios y resolución de conflictos",
    shortTitle: "Litigios",
    eyebrow: "Preparación · Hipótesis · Defensa",
    summary:
      "Cuando el conflicto es inevitable, la diferencia está en la preparación y el orden.",
    seoDescription:
      "Litigios y resolución de conflictos: análisis del conflicto, negociación, arbitraje y defensa. Contenido provisional de VÉRTICE.",
    focus: "La mejor defensa es una estrategia que ya previó el conflicto.",
    intro: [
      "Litigar no empieza en el juzgado. Empieza en la calidad de los hechos, en la solidez de la prueba y en la decisión de qué se discute y qué no. Afrontamos conflictos con una hipótesis construida desde el primer día, no con una reacción.",
      "Exploramos acuerdos cuando son la vía más eficiente y preparamos el procedimiento cuando no lo son. En ambos casos, el criterio es el mismo: preservar la posición del cliente y reducir el coste de la incertidumbre. Ningún resultado judicial puede garantizarse de antemano.",
    ],
    services: [
      {
        title: "Preparación del conflicto",
        description:
          "Ordenamos hechos, prueba y documentos antes de elegir el foro y la vía de actuación.",
      },
      {
        title: "Negociación y acuerdo",
        description:
          "Evaluamos una transacción posible, sus condiciones y su capacidad de cerrar el conflicto de forma estable.",
      },
      {
        title: "Defensa judicial",
        description:
          "Dirección de procedimientos civiles y mercantiles, con una hipótesis clara y una ejecución documentada.",
      },
      {
        title: "Arbitraje y mediación",
        description:
          "Representación y coordinación en mecanismos alternativos cuando el contrato o el contexto lo permiten.",
      },
    ],
    method: {
      lead: "No aceptamos el relato inicial como terreno definitivo. Reconstruimos el conflicto antes de defender una posición.",
      steps: [
        {
          title: "Hechos",
          description:
            "Construimos una cronología verificable, separando lo que se puede probar de lo que solo se sostiene.",
        },
        {
          title: "Hipótesis",
          description:
            "Diseñamos la tesis jurídica, sus riesgos y las vías de resolución posibles, incluyendo el acuerdo.",
        },
        {
          title: "Ejecución",
          description:
            "Actuamos con un plan de prueba, tiempos y comunicación adaptado a cada escenario procesal.",
        },
      ],
    },
    complementary: [
      "derecho-contractual",
      "derecho-corporativo",
      "consultoria-estrategica",
    ],
    visual: {
      src: "/images/chamber-light.jpg",
      alt: "Muro de piedra y luz diagonal en el interior del Museo Kolumba, de Peter Zumthor.",
      position: "center 55%",
      caption: "Precisión y silencio. Kolumba, Colonia.",
    },
  },
  {
    slug: "derecho-inmobiliario",
    index: "03",
    title: "Derecho inmobiliario",
    shortTitle: "Inmobiliario",
    eyebrow: "Título · Activo · Operación",
    summary:
      "Operaciones inmobiliarias donde el detalle documental cambia el valor del activo.",
    seoDescription:
      "Derecho inmobiliario: due diligence, compraventas, arrendamientos y estructuras de tenencia. Contenido provisional de VÉRTICE.",
    focus: "En un activo inmobiliario, lo que no está documentado no puede protegerse.",
    intro: [
      "Un inmueble es, antes que nada, un conjunto de derechos. Su valor depende de cómo estén documentados, de quién pueda ejercerlos y de las cargas que los acompañen. Abordamos cada operación desde esa base: entender el activo y el título antes de negociar el precio.",
      "Desde la adquisición hasta la explotación, revisamos la cadena de titularidad, los contratos y los riesgos urbanísticos que pueden condicionar la operación. Coordinamos el trabajo con equipos técnicos y financieros sin perder de vista la decisión jurídica que sostiene el negocio.",
    ],
    services: [
      {
        title: "Due diligence legal",
        description:
          "Revisión de titularidad, cargas, licencias y contratos para convertir hallazgos dispersos en un mapa de riesgo.",
      },
      {
        title: "Compraventas y arrendamientos",
        description:
          "Negociación y documentación de adquisiciones, transmisiones y contratos de uso o explotación.",
      },
      {
        title: "Desarrollo y urbanismo",
        description:
          "Coordinación de los aspectos jurídicos de un desarrollo, desde el suelo hasta la puesta en uso.",
      },
      {
        title: "Estructuras de tenencia",
        description:
          "Diseño de vehículos y acuerdos de propiedad para alinear inversión, control y continuidad.",
      },
    ],
    method: {
      lead: "Antes de valorar el precio, delimitamos qué se está comprando y bajo qué condiciones puede usarse.",
      steps: [
        {
          title: "Título",
          description:
            "Reconstruimos la cadena de propiedad, derechos y cargas que acompañan al activo.",
        },
        {
          title: "Riesgo",
          description:
            "Clasificamos hallazgos por impacto y definimos qué debe resolverse antes, durante o después del cierre.",
        },
        {
          title: "Cierre",
          description:
            "Coordinamos documentos, condiciones y garantías para que la operación llegue a término en orden.",
        },
      ],
    },
    complementary: [
      "derecho-contractual",
      "proteccion-patrimonial",
      "derecho-corporativo",
    ],
    visual: {
      src: "/images/pavilion-light.jpg",
      alt: "Interior blanco y curvo del pabellón Quadracci, con luz natural y estructura de acero.",
      position: "center 45%",
      caption: "Espacio y límite. Pabellón Quadracci, Milwaukee.",
    },
  },
  {
    slug: "derecho-contractual",
    index: "04",
    title: "Derecho contractual",
    shortTitle: "Contractual",
    eyebrow: "Riesgo · Redacción · Negociación",
    summary:
      "Contratos que asignan riesgos con precisión y siguen siendo legibles cuando cambia la realidad.",
    seoDescription:
      "Derecho contractual: redacción y negociación de contratos, revisión de riesgos y acuerdos comerciales. Contenido provisional de VÉRTICE.",
    focus: "Cada cláusula debe responder a una decisión, no a una costumbre.",
    intro: [
      "Un contrato no es una colección de cláusulas. Es un mecanismo para decidir qué ocurre cuando las cosas no salen como se esperaba. Nuestro enfoque consiste en identificar los escenarios críticos y asignar consecuencias antes de que se produzcan.",
      "Redactamos y negociamos contratos comerciales, de servicios, de distribución y de colaboración. También revisamos relaciones existentes cuando el equilibrio original ya no representa a las partes o cuando el paso del tiempo ha hecho aparecer riesgos que el texto no contempla.",
    ],
    services: [
      {
        title: "Redacción y negociación",
        description:
          "Contratos construidos desde el funcionamiento real de la relación y no desde una plantilla cerrada.",
      },
      {
        title: "Revisión y remediación",
        description:
          "Lectura crítica de contratos vigentes, detección de huecos y propuestas de modificación priorizadas.",
      },
      {
        title: "Servicios y distribución",
        description:
          "Acuerdos de prestación, suministro, agencia, distribución y colaboración con niveles de servicio claros.",
      },
      {
        title: "Incidencias contractuales",
        description:
          "Gestión de incumplimientos, cambios de alcance, penalizaciones y salidas ordenadas de la relación.",
      },
    ],
    method: {
      lead: "Un buen contrato no anticipa todas las respuestas. Define quién decide cuando falta una.",
      steps: [
        {
          title: "Mapa de riesgos",
          description:
            "Identificamos los escenarios que pueden alterar la relación y su impacto económico u operativo.",
        },
        {
          title: "Redacción",
          description:
            "Traducimos esos escenarios en obligaciones, remedios, plazos y mecanismos de decisión legibles.",
        },
        {
          title: "Negociación",
          description:
            "Defendemos las posiciones esenciales y documentamos con claridad las concesiones alcanzadas.",
        },
      ],
    },
    complementary: ["derecho-corporativo", "litigios", "consultoria-estrategica"],
    visual: {
      src: "/images/facade-pattern.jpg",
      alt: "Trama de huecos sobre ladrillo claro en la fachada del Museo Kolumba.",
      position: "center 62%",
      caption: "Trama y excepción. Kolumba, Colonia.",
    },
  },
  {
    slug: "proteccion-patrimonial",
    index: "05",
    title: "Protección patrimonial",
    shortTitle: "Patrimonio",
    eyebrow: "Titularidad · Continuidad · Familia",
    summary:
      "Ordenar el patrimonio para que la intención familiar sobreviva a la siguiente decisión.",
    seoDescription:
      "Protección patrimonial: estructuras de tenencia, gobierno familiar, sucesión y continuidad. Contenido provisional de VÉRTICE.",
    focus: "La continuidad no se hereda. Se diseña.",
    intro: [
      "Proteger el patrimonio no consiste en esconderlo. Consiste en ordenar la titularidad, el gobierno y la sucesión de forma coherente con lo que la familia quiere conservar y con lo que quiere permitir. Es un ejercicio de arquitectura, no de acumulación de estructuras.",
      "Trabajamos con empresas familiares, patrimonios personales y grupos de inversión en el diseño de tenencias, protocolos y mecanismos de continuidad, siempre con una mirada fiscal y sucesoria coordinada con los profesionales que corresponda.",
    ],
    services: [
      {
        title: "Estructuras de tenencia",
        description:
          "Diseño de la titularidad de activos y participaciones según control, uso y continuidad previstos.",
      },
      {
        title: "Gobierno familiar",
        description:
          "Protocolos, órganos y reglas de decisión que ordenan la relación entre familia, propiedad y empresa.",
      },
      {
        title: "Sucesión y donaciones",
        description:
          "Planificación de la transmisión, con coordinación de las consecuencias civiles y fiscales.",
      },
      {
        title: "Continuidad del patrimonio",
        description:
          "Mecanismos de protección y salida que reducen la dependencia de una sola persona o decisión.",
      },
    ],
    method: {
      lead: "La estructura patrimonial empieza por una conversación sobre intención, no por un instrumento.",
      steps: [
        {
          title: "Intención",
          description:
            "Delimitamos qué se quiere conservar, quién debe decidir y qué escenarios deben quedar cubiertos.",
        },
        {
          title: "Estructura",
          description:
            "Diseñamos una titularidad y un gobierno comprensibles, con sus costes y límites explícitos.",
        },
        {
          title: "Continuidad",
          description:
            "Probamos la estructura frente a cambios previsibles y coordinamos su implementación.",
        },
      ],
    },
    complementary: [
      "derecho-inmobiliario",
      "derecho-corporativo",
      "consultoria-estrategica",
    ],
    visual: {
      src: "/images/chamber-light.jpg",
      alt: "Luz sobre el suelo de piedra junto a un muro oscuro en el Museo Kolumba.",
      position: "center 65%",
      caption: "Continuidad y paso del tiempo. Kolumba, Colonia.",
    },
  },
  {
    slug: "consultoria-estrategica",
    index: "06",
    title: "Consultoría jurídica estratégica",
    shortTitle: "Consultoría",
    eyebrow: "Problema · Alternativas · Decisión",
    summary:
      "Un criterio externo para decisiones que todavía no tienen una forma jurídica definida.",
    seoDescription:
      "Consultoría jurídica estratégica: diagnóstico, alternativas y segunda opinión antes de decidir. Contenido provisional de VÉRTICE.",
    focus: "Primero se define el problema. Después, la solución.",
    intro: [
      "No todas las decisiones llegan con una pregunta jurídica bien formulada. A veces hay una oportunidad, un desacuerdo o una encrucijada que aún no tiene nombre. La consultoría estratégica sirve para ordenar ese momento antes de contratar, firmar o litigar.",
      "Analizamos el contexto, identificamos las alternativas y explicamos sus consecuencias jurídicas y prácticas. No sustituimos la decisión del cliente: damos estructura para que pueda tomarla con mayor claridad y con menos ruido.",
    ],
    services: [
      {
        title: "Diagnóstico jurídico",
        description:
          "Lectura ordenada del contexto, los documentos y los riesgos antes de definir una actuación.",
      },
      {
        title: "Diseño de estrategia",
        description:
          "Alternativas de actuación con sus implicaciones, tiempos y condiciones de éxito razonables.",
      },
      {
        title: "Segunda opinión",
        description:
          "Revisión independiente de una posición jurídica o de una decisión ya encaminada.",
      },
      {
        title: "Coordinación de asesores",
        description:
          "Alineación de equipos jurídicos, técnicos y financieros alrededor de una misma decisión.",
      },
    ],
    method: {
      lead: "La claridad no consiste en simplificar el problema. Consiste en saber qué parte del problema importa.",
      steps: [
        {
          title: "Escuchar",
          description:
            "Recogemos el contexto, los objetivos y las restricciones antes de proponer una vía jurídica.",
        },
        {
          title: "Delimitar",
          description:
            "Formulamos la pregunta correcta y separamos lo que es una decisión de lo que es una consecuencia.",
        },
        {
          title: "Decidir",
          description:
            "Presentamos alternativas comparables y acompañamos la implantación de la elegida.",
        },
      ],
    },
    complementary: [
      "derecho-corporativo",
      "litigios",
      "proteccion-patrimonial",
    ],
    visual: {
      src: "/images/pavilion-light.jpg",
      alt: "Perspectiva de la estructura blanca del pabellón Quadracci bajo una claraboya.",
      position: "center 60%",
      caption: "Perspectiva y decisión. Pabellón Quadracci, Milwaukee.",
    },
  },
];

export const practiceBySlug = new Map(practices.map((practice) => [practice.slug, practice]));

export function getPractice(slug: string): Practice | undefined {
  return practiceBySlug.get(slug);
}

export function getComplementaryPractice(slug: string): Practice | undefined {
  return practiceBySlug.get(slug);
}
