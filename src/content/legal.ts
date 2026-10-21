export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  note?: string;
};

export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/**
 * Textos base de demostración. No han sido revisados por un profesional del
 * derecho y deben adaptarse a la jurisdicción, al responsable real y a los
 * tratamientos efectivamente implantados antes de publicarse.
 */
export const legalPages: LegalPage[] = [
  {
    slug: "privacidad",
    title: "Política de privacidad",
    description:
      "Información de demostración sobre el tratamiento de datos personales en VÉRTICE. Documento provisional sin validez jurídica.",
    eyebrow: "Privacidad",
    updated: "2026-10-01",
    intro:
      "Esta política describe, con carácter demostrativo, cómo se tratarían los datos personales enviados a través de este sitio. VÉRTICE es un proyecto conceptual: no existe una firma constituida, no se ha habilitado un canal de recepción y el formulario no transmite información mientras no se configure un webhook.",
    sections: [
      {
        id: "responsable",
        title: "1. Responsable del tratamiento",
        paragraphs: [
          "El responsable del tratamiento sería la entidad que explote el sitio web una vez sustituida la identidad de demostración. Los datos de identificación, domicilio y registro que figuran en este proyecto son ficticios y no permiten contactar con ninguna firma real.",
          "Antes de publicar, el responsable deberá completar su denominación social, NIF, domicilio, correo electrónico y, en su caso, datos registrales. También deberá designar un delegado de protección de datos si concurre alguno de los supuestos legalmente previstos.",
        ],
        note: "Los datos de contacto que aparecen en el sitio (consulta@vertice.example y +34 000 000 000) son de demostración y no pertenecen a ninguna persona ni entidad.",
      },
      {
        id: "datos",
        title: "2. Datos que se recogerían",
        paragraphs: [
          "A través del formulario de contacto se solicitarían únicamente los datos necesarios para atender la consulta: nombre y apellidos, correo electrónico, teléfono opcional, área de interés y el contenido del mensaje. El formulario desaconseja expresamente incluir documentación confidencial, datos de terceros o categorías especiales de datos.",
          "El sitio no utiliza cookies de analítica, publicidad ni seguimiento. La secuencia de introducción guarda un indicador técnico en el almacenamiento de sesión del navegador para no repetirse; no identifica al usuario y se elimina al cerrar la pestaña.",
        ],
        list: [
          "Datos identificativos y de contacto facilitados voluntariamente.",
          "Contenido del mensaje, que no debería incluir información confidencial.",
          "Datos técnicos mínimos necesarios para la seguridad del servicio y la limitación de abuso.",
        ],
      },
      {
        id: "finalidad",
        title: "3. Finalidad y base jurídica",
        paragraphs: [
          "La finalidad sería responder a la consulta, valorar si existe un encargo profesional y, en su caso, mantener la relación precontractual o contractual. La base jurídica sería el consentimiento del interesado al enviar el formulario y, cuando exista encargo, la ejecución de la relación profesional.",
          "El envío de comunicaciones comerciales no solicitadas no forma parte de la finalidad de este formulario. Cualquier comunicación de ese tipo requeriría una base jurídica adicional y un mecanismo de oposición sencillo.",
        ],
      },
      {
        id: "conservacion",
        title: "4. Conservación",
        paragraphs: [
          "Los mensajes se conservarían durante el tiempo necesario para atender la consulta y, si se formalizara un encargo, durante los plazos de prescripción legal y de responsabilidad profesional aplicables. Los datos que no den lugar a una relación profesional se eliminarían en un plazo razonable.",
          "En este entorno de demostración no se almacena ningún mensaje: el formulario devuelve un aviso de que la recepción no está configurada.",
        ],
      },
      {
        id: "destinatarios",
        title: "5. Destinatarios y transferencias",
        paragraphs: [
          "No se prevén cesiones a terceros salvo obligación legal o necesidad de prestadores que actúen como encargados del tratamiento (alojamiento, correo o gestión documental). En tal caso, se formalizarían los contratos exigidos y se limitaría el acceso a lo necesario.",
          "El proyecto no contrata actualmente servicios de analítica ni de publicidad. Si en el futuro se incorporan herramientas que impliquen transferencias internacionales, deberán documentarse las garantías aplicables y actualizarse esta política.",
        ],
      },
      {
        id: "derechos",
        title: "6. Derechos de las personas",
        paragraphs: [
          "El interesado podría ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad, así como retirar su consentimiento, escribiendo al responsable por un canal habilitado a tal efecto. También podría presentar una reclamación ante la Agencia Española de Protección de Datos.",
          "Mientras se mantenga la identidad de demostración no existe un canal real para ejercer estos derechos. La publicación definitiva debería incluir una dirección verificada y un procedimiento interno de atención.",
        ],
      },
      {
        id: "seguridad",
        title: "7. Seguridad",
        paragraphs: [
          "El diseño del formulario aplica validación en cliente y servidor, límite de tamaño, comprobación de origen, campo trampa contra automatizaciones y limitación de intentos. Estas medidas reducen el abuso, pero no sustituyen una política de seguridad completa ni un análisis de riesgos.",
          "La integración prevista envía los datos a un webhook configurado mediante variables de entorno. Mientras esa variable no exista, la API responde que el servicio no está configurado y no transmite ningún dato.",
        ],
      },
      {
        id: "cambios",
        title: "8. Cambios en esta política",
        paragraphs: [
          "Esta versión es un borrador de demostración fechado el 1 de octubre de 2026. Cualquier publicación real debería revisar el contenido, adaptarlo a la normativa aplicable y registrar la fecha de la última actualización.",
        ],
        note: "Este documento no constituye asesoramiento jurídico ni acredita el cumplimiento de ninguna obligación legal.",
      },
    ],
  },
  {
    slug: "tratamiento-de-datos",
    title: "Información sobre el tratamiento de datos",
    description:
      "Información básica de demostración sobre finalidades, base jurídica y derechos en el formulario de VÉRTICE.",
    eyebrow: "Datos personales",
    updated: "2026-10-01",
    intro:
      "Este resumen de demostración acompaña al formulario de contacto. Su finalidad es explicar, de forma breve, qué ocurriría con los datos si el canal de recepción estuviera habilitado. En el estado actual del proyecto, el formulario no envía ni almacena información.",
    sections: [
      {
        id: "informacion-basica",
        title: "Información básica",
        paragraphs: [
          "Responsable: la entidad titular del sitio una vez completada la identidad real. Finalidad: atender la consulta y valorar un posible encargo profesional. Base jurídica: consentimiento y, en su caso, medidas precontractuales. Conservación: durante la tramitación y los plazos legales aplicables. Destinatarios: prestadores necesarios y obligaciones legales.",
        ],
        list: [
          "No se solicitan datos especialmente protegidos.",
          "No se utiliza el mensaje para enviar publicidad no solicitada.",
          "No se cede la información a terceros ajenos al servicio sin base jurídica.",
        ],
      },
      {
        id: "contenido",
        title: "Qué conviene no enviar",
        paragraphs: [
          "El primer mensaje debe servir para describir el contexto general, no para remitir documentación sensible. Evite incluir nombres de terceros, datos de salud, información financiera detallada, credenciales, documentos de identidad o cualquier material sujeto a secreto.",
          "Si la conversación avanza, el equipo indicaría un canal adecuado y las medidas necesarias para el intercambio de documentación. Mientras ese canal no exista, no debe enviarse material confidencial por ningún medio.",
        ],
      },
      {
        id: "derechos",
        title: "Cómo ejercer los derechos",
        paragraphs: [
          "Podría solicitarse el acceso, la rectificación, la supresión, la limitación, la oposición y la portabilidad de los datos, así como la retirada del consentimiento. La solicitud debería dirigirse al responsable por escrito, acreditando la identidad de forma proporcionada.",
          "También existe la posibilidad de reclamar ante la autoridad de control competente, en España la Agencia Española de Protección de Datos. Este proyecto no dispone de un canal real habilitado para ejercer estos derechos.",
        ],
      },
      {
        id: "estado",
        title: "Estado actual del formulario",
        paragraphs: [
          "El formulario incluye validación accesible, límite de intentos y un modo de demostración visible. Si la variable CONTACT_WEBHOOK_URL no está definida, la API responde con un error 503 y el navegador muestra que el mensaje no se ha enviado.",
          "Cuando se configure un receptor real, deberán revisarse el cifrado, la retención, los accesos, la ubicación del proveedor y la información facilitada a las personas usuarias antes de abrir el canal al público.",
        ],
        note: "Texto de demostración. No sustituye la información por capas ni la política de privacidad definitiva.",
      },
    ],
  },
  {
    slug: "aviso-legal",
    title: "Aviso legal",
    description:
      "Aviso legal de demostración del proyecto conceptual VÉRTICE. Identidad ficticia y contenido editorial provisional.",
    eyebrow: "Aviso legal",
    updated: "2026-10-01",
    intro:
      "VÉRTICE es una identidad y una experiencia digital de carácter conceptual. No corresponde a un bufete constituido, no presta servicios jurídicos y no mantiene una relación profesional con las personas que visitan este sitio.",
    sections: [
      {
        id: "identidad",
        title: "1. Identificación",
        paragraphs: [
          "La denominación VÉRTICE, los nombres del equipo, las direcciones y los datos de contacto utilizados en este proyecto son ficticios. No identifican a ninguna sociedad, profesional colegiado ni establecimiento real.",
          "Antes de un uso comercial, el titular debería sustituir esta información por sus datos verificados, incluyendo denominación, NIF, domicilio, correo, teléfono y los datos de colegiación que resulten exigibles.",
        ],
      },
      {
        id: "objeto",
        title: "2. Objeto del sitio",
        paragraphs: [
          "El sitio presenta una propuesta editorial y visual sobre estrategia jurídica. Sus textos describen una forma de trabajar, no servicios contratados ni resultados obtenidos. Las áreas de práctica y los perfiles profesionales son contenido provisional de demostración.",
          "Nada de lo publicado constituye asesoramiento jurídico, diagnóstico de una situación concreta, promesa de resultado ni recomendación de actuación. Cualquier decisión jurídica requiere el análisis de un profesional con la información completa del caso.",
        ],
      },
      {
        id: "propiedad",
        title: "3. Propiedad intelectual",
        paragraphs: [
          "La composición editorial, los textos originales, la identidad visual y el código de este proyecto se presentan como material conceptual. Las fotografías utilizadas son obras de terceros bajo licencia Creative Commons CC BY 2.0 y se atribuyen en la página de créditos.",
          "Las imágenes de arquitectura son material de demostración y no representan oficinas, instalaciones ni clientes de la firma. Las fuentes tipográficas se utilizan bajo licencia SIL Open Font License 1.1.",
        ],
      },
      {
        id: "responsabilidad",
        title: "4. Responsabilidad y enlaces",
        paragraphs: [
          "El titular del proyecto no garantiza la disponibilidad permanente del sitio ni la exactitud de los contenidos provisionales. Los enlaces externos se ofrecen únicamente como referencia y no implican control sobre su contenido.",
          "El formulario no acredita la recepción de una consulta mientras no exista un canal configurado. La interfaz informa expresamente de esta circunstancia y no simula un envío correcto.",
        ],
      },
      {
        id: "legislacion",
        title: "5. Legislación y jurisdicción",
        paragraphs: [
          "Este aviso es un texto de demostración. La versión publicable debería identificar la legislación aplicable y los tribunales competentes, respetando en todo caso los derechos que la normativa de consumo reconozca a las personas usuarias.",
        ],
        note: "Documento provisional. Requiere revisión profesional antes de cualquier publicación.",
      },
    ],
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((page) => page.slug === slug);
}
