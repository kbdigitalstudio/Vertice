export type PerspectiveCategory = {
  slug: string;
  label: string;
  description: string;
};

export type PerspectiveBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

export type Perspective = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  body: PerspectiveBlock[];
  featured: boolean;
  seoDescription: string;
};

/**
 * Piezas editoriales de demostración. No son noticias, no describen
 * legislación vigente y no constituyen asesoramiento jurídico.
 */
export const categories: PerspectiveCategory[] = [
  {
    slug: "estrategia",
    label: "Estrategia",
    description:
      "Cómo se ordena una decisión antes de que exista un documento, una negociación o un procedimiento.",
  },
  {
    slug: "contratos",
    label: "Contratos",
    description:
      "Arquitectura contractual, asignación de riesgos y relaciones que deben seguir funcionando.",
  },
  {
    slug: "litigios",
    label: "Litigios",
    description:
      "Preparación del conflicto, construcción de la prueba y decisiones que preceden al procedimiento.",
  },
  {
    slug: "patrimonio",
    label: "Patrimonio",
    description:
      "Titularidad, gobierno familiar y continuidad de lo que se quiere conservar.",
  },
  {
    slug: "gobierno",
    label: "Gobierno",
    description:
      "Órganos, competencias y rutinas de decisión en compañías que han dejado de ser pequeñas.",
  },
  {
    slug: "observatorio",
    label: "Observatorio",
    description:
      "Notas breves sobre cambios normativos y cuestiones que conviene seguir. Categoría en preparación.",
  },
];

export const perspectives: Perspective[] = [
  {
    slug: "la-decision-antes-de-la-decision",
    title: "La decisión antes de la decisión",
    dek: "Antes de elegir un instrumento jurídico conviene definir qué problema se está resolviendo. La calidad de esa primera delimitación condiciona todo lo que viene después.",
    category: "estrategia",
    date: "2026-09-18",
    author: "Consejo editorial",
    authorRole: "Equipo editorial de demostración",
    featured: true,
    seoDescription:
      "Ensayo editorial sobre la delimitación del problema antes de elegir un instrumento jurídico. Texto de demostración de VÉRTICE.",
    body: [
      {
        type: "paragraph",
        text: "Una decisión jurídica no empieza cuando se firma un contrato ni cuando se presenta una demanda. Empieza mucho antes, en el momento en que alguien decide qué está dispuesto a discutir, qué coste considera aceptable y qué parte de la realidad va a dejar fuera del análisis. Esa decisión previa rara vez aparece en un documento. Sin embargo, suele explicar por qué una solución técnicamente correcta termina siendo insuficiente.",
      },
      {
        type: "paragraph",
        text: "Cuando una compañía pide asesoramiento, normalmente llega con una pregunta ya formulada: cómo redactar un acuerdo, cómo responder a una reclamación, cómo estructurar una operación. La pregunta es legítima, pero no necesariamente es la pregunta que resuelve el problema. El primer trabajo consiste en comprobar si esa formulación contiene el objetivo real o solo la primera versión disponible.",
      },
      { type: "heading", text: "El problema antes del instrumento" },
      {
        type: "paragraph",
        text: "Un contrato, una sociedad o una demanda son instrumentos. Cada uno impone una forma de pensar: el contrato ordena obligaciones, la sociedad distribuye poder y la demanda convierte un conflicto en una controversia sometida a un tercero. Elegir el instrumento antes de definir el problema equivale a escoger una herramienta por su prestigio y no por su función.",
      },
      {
        type: "paragraph",
        text: "En la práctica, la delimitación del problema exige separar tres capas. La primera es la situación de hecho: qué ha ocurrido, qué puede probarse y qué depende todavía de la versión de otra persona. La segunda es el objetivo: qué quiere conseguir el cliente y qué está dispuesto a ceder para lograrlo. La tercera es el horizonte temporal: si la decisión debe producir un resultado inmediato o sostenerse durante años.",
      },
      {
        type: "quote",
        text: "La pregunta correcta no es qué puedo hacer, sino qué estoy dispuesto a sostener cuando las consecuencias lleguen.",
      },
      {
        type: "paragraph",
        text: "Las tres capas rara vez encajan a la primera. Un cliente puede querer recuperar una relación comercial y, al mismo tiempo, exigir una compensación que la haga inviable. Puede querer cerrar un conflicto y, al mismo tiempo, necesitar un pronunciamiento que ordene su posición futura. Hacer explícito ese conflicto es parte del asesoramiento, no un obstáculo para empezar.",
      },
      { type: "heading", text: "Tres preguntas de arquitectura" },
      {
        type: "list",
        items: [
          "¿Cuál es el hecho que no admite discusión y cuál es la interpretación que todavía debe construirse?",
          "¿Qué decisión se está tomando ahora y cuáles son sus consecuencias si el escenario cambia?",
          "¿Qué parte del problema no es jurídica y, sin embargo, determina el resultado?",
        ],
      },
      {
        type: "paragraph",
        text: "Estas preguntas no producen una respuesta automática. Producen un mapa. Y un mapa útil no es el que muestra todos los caminos posibles, sino el que permite distinguir cuál conduce a una posición sostenible. Esa distinción es la diferencia entre reaccionar con argumentos y actuar con estrategia.",
      },
      {
        type: "paragraph",
        text: "La consecuencia práctica es sencilla: antes de redactar, negociar o litigar, conviene reservar tiempo para formular el problema con precisión. Es un trabajo menos visible que la ejecución, pero es el que evita que la ejecución resuelva el problema equivocado.",
      },
      {
        type: "note",
        text: "Este artículo es una pieza editorial de demostración. No describe legislación vigente ni constituye asesoramiento jurídico.",
      },
    ],
  },
  {
    slug: "el-contrato-como-arquitectura",
    title: "El contrato como arquitectura",
    dek: "Un contrato no prevé el futuro: decide quién cargará con las consecuencias cuando el futuro no coincida con lo previsto.",
    category: "contratos",
    date: "2026-08-07",
    author: "Consejo editorial",
    authorRole: "Equipo editorial de demostración",
    featured: true,
    seoDescription:
      "Ensayo editorial sobre el contrato como sistema de asignación de riesgos y decisiones. Texto de demostración de VÉRTICE.",
    body: [
      {
        type: "paragraph",
        text: "Hay contratos que parecen completos porque tienen muchas páginas. Cada escenario imaginable tiene una cláusula, cada obligación tiene un plazo y cada incumplimiento tiene una consecuencia. Sin embargo, cuando la relación cambia, el documento no ayuda a decidir. Ha previsto demasiado y ha ordenado muy poco.",
      },
      {
        type: "paragraph",
        text: "La función principal de un contrato no es demostrar que las partes se entendieron en el momento de firmar. Es establecer cómo van a seguir entendiéndose cuando el contexto ya no sea el mismo. Esa diferencia convierte la redacción en un ejercicio de arquitectura: hay que decidir qué soporta la estructura, dónde se permiten movimientos y qué ocurre cuando una pieza falla.",
      },
      { type: "heading", text: "Asignar riesgos, no esconderlos" },
      {
        type: "paragraph",
        text: "Toda relación comercial distribuye riesgos, aunque no se diga. El riesgo de que el precio no cubra el coste, de que el servicio no llegue a tiempo, de que una autorización no se obtenga o de que una de las partes pierda interés. Un contrato útil no elimina esos riesgos: decide quién los asume, con qué límite y a cambio de qué.",
      },
      {
        type: "paragraph",
        text: "El problema aparece cuando la asignación se hace por inercia. Se copia una cláusula de otro acuerdo, se mantiene una garantía porque siempre estuvo allí o se acepta una penalización sin calcular su efecto real. La cláusula sobrevive, pero ya no responde a la operación que debe ordenar. La arquitectura se convirtió en decoración.",
      },
      {
        type: "quote",
        text: "Una cláusula que nadie sabe explicar no protege a nadie. Solo añade una discusión futura.",
      },
      { type: "heading", text: "La legibilidad como condición de funcionamiento" },
      {
        type: "paragraph",
        text: "Un contrato debe poder ser utilizado por las personas que gestionan la relación, no solo por quien lo redactó. Si el equipo operativo no sabe qué aprobación necesita, si el responsable financiero no puede identificar cuándo nace una obligación o si nadie sabe cómo activar una salida, el documento falla en su función más básica.",
      },
      {
        type: "list",
        items: [
          "Cada obligación relevante debería tener un responsable identificable.",
          "Cada decisión crítica debería tener un procedimiento y un plazo.",
          "Cada escenario de salida debería explicar qué se conserva y qué se pierde.",
        ],
      },
      {
        type: "paragraph",
        text: "La claridad no implica simplificar en exceso. Implica que la complejidad esté organizada. Un contrato bien construido permite que dos equipos distintos lleguen a la misma conclusión sobre quién debe hacer qué. Esa previsibilidad tiene más valor que una cláusula adicional.",
      },
      {
        type: "note",
        text: "Este artículo es una pieza editorial de demostración. No describe legislación vigente ni constituye asesoramiento jurídico.",
      },
    ],
  },
  {
    slug: "litigar-no-es-una-estrategia",
    title: "Litigar no es una estrategia. Es una hipótesis.",
    dek: "El procedimiento es una de las formas posibles de resolver un conflicto. Antes de activarlo conviene saber qué se quiere demostrar, a qué coste y con qué probabilidad razonable.",
    category: "litigios",
    date: "2026-06-19",
    author: "Consejo editorial",
    authorRole: "Equipo editorial de demostración",
    featured: true,
    seoDescription:
      "Ensayo editorial sobre la preparación del conflicto y el litigio como hipótesis estratégica. Texto de demostración de VÉRTICE.",
    body: [
      {
        type: "paragraph",
        text: "Cuando un conflicto se vuelve intolerable, litigar parece una forma de recuperar la iniciativa. Se presenta una demanda, se fija una posición y el asunto entra en un cauce con reglas. Es una sensación comprensible. También es una decisión que suele tomarse antes de haber respondido a una pregunta básica: qué se necesita demostrar para ganar y si esos hechos pueden demostrarse.",
      },
      {
        type: "paragraph",
        text: "El litigio no es una estrategia en sí mismo. Es una hipótesis: si los hechos se acreditan, si el tribunal acepta la interpretación y si el coste del procedimiento es proporcional al resultado, entonces puede ser la vía adecuada. La palabra importante es «si». Un buen asesoramiento no elimina la incertidumbre; la hace visible antes de que el cliente comprometa tiempo, dinero y reputación.",
      },
      { type: "heading", text: "El relato no es la prueba" },
      {
        type: "paragraph",
        text: "Todo conflicto llega con un relato. El relato ordena la experiencia y permite explicar lo ocurrido, pero no sustituye a la prueba. Una de las primeras tareas consiste en separar lo que el cliente sabe, lo que puede acreditar y lo que solo recuerda o interpreta. Esa separación puede ser incómoda. También es la base de cualquier posición sólida.",
      },
      {
        type: "paragraph",
        text: "En ocasiones, el hecho decisivo no está en el centro del relato. Está en un correo secundario, en una versión anterior de un documento o en una decisión que se tomó sin dejar rastro. Buscar ahí forma parte del trabajo. La estrategia procesal empieza en la investigación de los hechos, no en la vista oral.",
      },
      {
        type: "quote",
        text: "Ganar no siempre significa obtener una sentencia favorable. A veces significa cerrar el conflicto en condiciones que permiten seguir operando.",
      },
      { type: "heading", text: "Definir el resultado antes de iniciar el camino" },
      {
        type: "paragraph",
        text: "El objetivo de un procedimiento no debería ser «ganar» sin más. Puede ser recuperar una cantidad, proteger un activo, obtener una declaración que evite conflictos futuros o simplemente dejar constancia de una posición. Definir el resultado deseado permite comparar alternativas y entender cuándo un acuerdo es mejor que una sentencia.",
      },
      {
        type: "paragraph",
        text: "Esa comparación debe incluir el coste completo: honorarios, tiempo de gestión, exposición pública, impacto en la relación comercial y esfuerzo interno. Un resultado favorable en el plano jurídico puede ser costoso en el plano operativo. La estrategia consiste en poner ambos planos sobre la mesa antes de elegir.",
      },
      {
        type: "paragraph",
        text: "Ningún abogado serio puede garantizar un resultado judicial. Lo que sí puede ofrecer es una hipótesis bien construida, una prueba preparada y una decisión informada sobre cuándo insistir y cuándo cerrar. Es menos espectacular que una promesa. También es más útil.",
      },
      {
        type: "note",
        text: "Este artículo es una pieza editorial de demostración. No describe legislación vigente ni constituye asesoramiento jurídico.",
      },
    ],
  },
  {
    slug: "la-continuidad-no-se-hereda",
    title: "La continuidad no se hereda",
    dek: "Un patrimonio puede pasar de una generación a otra sin que lo haga su criterio. La diferencia está en el gobierno, no en el número de estructuras.",
    category: "patrimonio",
    date: "2026-04-24",
    author: "Consejo editorial",
    authorRole: "Equipo editorial de demostración",
    featured: false,
    seoDescription:
      "Ensayo editorial sobre titularidad, gobierno familiar y continuidad patrimonial. Texto de demostración de VÉRTICE.",
    body: [
      {
        type: "paragraph",
        text: "Las familias suelen hablar de patrimonio en términos de activos: una empresa, inmuebles, inversiones, una casa. La conversación se complica cuando aparece la siguiente generación. Entonces se descubre que lo que se transmite no es solo la titularidad, sino también una forma de decidir. Y esa forma no siempre está escrita.",
      },
      {
        type: "paragraph",
        text: "La continuidad no depende de que los herederos tengan los mismos intereses que quien construyó el patrimonio. Depende de que exista un sistema capaz de procesar intereses distintos sin romper la estructura. Ese sistema es el gobierno: quién decide, con qué información, en qué foro y con qué límites.",
      },
      { type: "heading", text: "Titularidad no es lo mismo que control" },
      {
        type: "paragraph",
        text: "Una estructura patrimonial puede atribuir la propiedad de un activo a varias personas y, al mismo tiempo, concentrar su administración en un órgano distinto. Esa separación es legítima y puede ser útil, pero solo funciona si las reglas son comprensibles para todos los implicados. Si la familia no entiende quién decide qué, cada decisión relevante se convierte en una negociación desde cero.",
      },
      {
        type: "paragraph",
        text: "La complejidad tiene un coste. Cada sociedad, cada acuerdo y cada órgano adicional exigen mantenimiento, información y coordinación. Añadir capas sin una función clara no protege mejor: hace más difícil saber qué está pasando y quién responde. La arquitectura patrimonial debe poder explicarse en una página antes de desarrollarse en cien.",
      },
      {
        type: "quote",
        text: "Proteger no es ocultar. Es ordenar de tal forma que la intención siga siendo reconocible cuando cambien las personas.",
      },
      { type: "heading", text: "La conversación incómoda" },
      {
        type: "paragraph",
        text: "Todo diseño de continuidad obliga a hablar de escenarios que la familia preferiría evitar: enfermedad, divorcio, desacuerdo, salida de un socio o muerte. Son conversaciones difíciles, pero son precisamente las que permiten decidir con serenidad. Si no se abordan, la estructura se diseñará para el escenario cómodo y fallará en el que importa.",
      },
      {
        type: "paragraph",
        text: "El papel del asesor no es imponer un modelo ni sustituir la voluntad familiar. Es ayudar a convertir esa voluntad en reglas utilizables y señalar sus consecuencias. La coordinación con otros profesionales —fiscales, contables, gestores— es parte del trabajo, no un añadido.",
      },
      {
        type: "paragraph",
        text: "Una estructura patrimonial bien construida no garantiza armonía. Reduce la probabilidad de que la falta de reglas convierta una diferencia legítima en un conflicto irreversible. Esa es una forma más realista de entender la protección.",
      },
      {
        type: "note",
        text: "Este artículo es una pieza editorial de demostración. No describe legislación vigente ni constituye asesoramiento jurídico.",
      },
    ],
  },
  {
    slug: "la-claridad-tambien-es-un-documento",
    title: "La claridad también es un documento",
    dek: "Una compañía que crece necesita algo más que buenos acuerdos: necesita saber dónde se toman las decisiones y cómo se dejan por escrito.",
    category: "gobierno",
    date: "2026-02-12",
    author: "Consejo editorial",
    authorRole: "Equipo editorial de demostración",
    featured: false,
    seoDescription:
      "Ensayo editorial sobre gobierno corporativo, órganos de decisión y documentación societaria. Texto de demostración de VÉRTICE.",
    body: [
      {
        type: "paragraph",
        text: "En las primeras etapas de una compañía, las decisiones se toman en conversaciones. Los fundadores se conocen, confían y recuerdan lo que acordaron. Esa informalidad permite avanzar rápido. El problema aparece cuando la compañía incorpora socios, contratos o equipos que no participaron en aquellas conversaciones y necesitan saber por qué las cosas funcionan como funcionan.",
      },
      {
        type: "paragraph",
        text: "El gobierno corporativo no es un ceremonial para empresas grandes. Es el conjunto de reglas que permite que una decisión sea reconocible, ejecutable y revisable. Sin esas reglas, cada cuestión relevante vuelve a depender de la memoria o de la disponibilidad de una persona. La compañía no tiene una estructura: tiene costumbres.",
      },
      { type: "heading", text: "Órganos que deciden, no solo que existen" },
      {
        type: "paragraph",
        text: "Crear un órgano no resuelve un problema de gobierno. Hay que definir qué decide, con qué información, quién lo convoca y cómo se documenta lo acordado. Un consejo que se reúne pero no recibe información útil no gobierna. Una junta que existe en el papel pero nunca se convoca no ordena nada.",
      },
      {
        type: "paragraph",
        text: "La documentación es la parte menos visible y la más importante. Un acta no es un trámite: es la prueba de que una decisión se tomó, de quién la tomó y de qué información tenía. Cuando años después aparece una discrepancia, esa trazabilidad vale más que cualquier declaración de intenciones.",
      },
      {
        type: "quote",
        text: "Una decisión que no puede reconstruirse no puede defenderse. La memoria de la compañía también se diseña.",
      },
      { type: "heading", text: "Proporcionalidad antes que sofisticación" },
      {
        type: "paragraph",
        text: "El buen gobierno no consiste en copiar el modelo de una sociedad cotizada. Consiste en construir un sistema proporcional al tamaño, al riesgo y a la composición de la compañía. Una estructura demasiado compleja para su etapa genera costes y decisiones vacías. Una estructura demasiado simple para su crecimiento deja huecos que se llenan con conflictos.",
      },
      {
        type: "list",
        items: [
          "Identificar las decisiones que no pueden delegarse.",
          "Definir qué información debe recibir cada órgano antes de decidir.",
          "Fijar un calendario mínimo y un archivo accesible de acuerdos.",
        ],
      },
      {
        type: "paragraph",
        text: "La claridad documental no elimina el desacuerdo. Permite discutir sobre el fondo y no sobre qué se dijo, cuándo se dijo o quién tenía competencia para decirlo. En una organización que quiere durar, esa diferencia es una ventaja.",
      },
      {
        type: "note",
        text: "Este artículo es una pieza editorial de demostración. No describe legislación vigente ni constituye asesoramiento jurídico.",
      },
    ],
  },
];

export function getPerspective(slug: string): Perspective | undefined {
  return perspectives.find((perspective) => perspective.slug === slug);
}

export function getCategory(slug: string): PerspectiveCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function perspectivesByCategory(slug: string): Perspective[] {
  return perspectives.filter((perspective) => perspective.category === slug);
}

export function categoryLabel(slug: string): string {
  return getCategory(slug)?.label ?? "Perspectivas";
}
