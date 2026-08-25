import { ActionModule, FormItem, MedicalProvider, Pharmacy } from '../types';

export const INSTITUTIONAL_INFO = {
  title: "GUÍA INTERACTIVA PARA AFILIADOS DSS",
  subtitle: "Información útil para utilizar tu cobertura médica",
  institution: "Consejo Profesional de Ciencias Económicas de Santa Fe – Cámara I",
  department: "Departamento de Servicios Sociales (DSS)",
  cards: [
    {
      id: "que-es",
      title: "¿QUÉ ES EL DSS?",
      icon: "ShieldUtils",
      content: "El Departamento de Servicios Sociales (DSS) brinda cobertura de salud a los profesionales matriculados en el Consejo Profesional de Ciencias Económicas de Santa Fe – Cámara I.\n\nEs un sistema solidario, sostenido por sus afiliados, al que se accede automáticamente al momento de la matriculación, hasta los 50 años.",
      note: "Acceso automático al matricularte (hasta los 50 años)."
    },
    {
      id: "soy-afiliado",
      title: "SOY AFILIADO",
      icon: "UserCheck",
      content: "Tu número de matrícula es tu identificación dentro del DSS.\n\nNo necesitás contar con una credencial física.\n\nTambién podés acceder a tu credencial digital desde la app institucional del Consejo.",
      note: "Alternativas: Mi número de afiliado / ¿Cuál es mi número de afiliado?"
    },
    {
      id: "grupo-familiar",
      title: "MI GRUPO FAMILIAR",
      icon: "Users",
      content: "Cada integrante del grupo familiar tiene una extensión vinculada a la matrícula del titular:\n\n• Cónyuge: matrícula + 01\n• Hijos: matrícula + 11, 12, 13, etc., según el orden de incorporación.",
      note: "Hijos cubiertos hasta 21 años (o 25 con certificado regular universitario)."
    }
  ]
};

export const ACTION_MODULES: ActionModule[] = [
  {
    id: 'afiliacion',
    buttonNumber: 1,
    title: 'Afiliación',
    verbTitle: '¿Cómo afiliarme?',
    shortDesc: 'Información sobre la incorporación al sistema solidario de cobertura médica.',
    iconName: 'UserCheck',
    colorClass: {
      bg: 'bg-white',
      border: 'border-blue-100',
      text: 'text-blue-900',
      hover: 'hover:border-blue-400 hover:shadow-xl',
      iconBg: 'bg-blue-600 text-white'
    },
    details: {
      summary: 'El Departamento de Servicios Sociales (DSS) es un sistema solidario de cobertura de salud creado y sostenido por los profesionales matriculados en el Consejo Profesional de Ciencias Económicas de Santa Fe – Cámara I.\n\nAl matricularse en el Consejo Profesional de Ciencias Económicas, el profesional debe contar de forma obligatoria con la obra social, excepto si realiza la declaración jurada de no ejercicio profesional. La afiliación es automática al momento de la matriculación, para profesionales de hasta 50 años.',
      highlights: [
        'Sistema Solidario: Creado y sostenido por los profesionales matriculados en el CPCE Santa Fe - Cámara I.',
        'Afiliación Automática: Se genera sin trámites adicionales al matricularte (para profesionales de hasta 50 años).',
        'Sin Credenciales Físicas: Tu número de Matrícula Titular te identifica ante médicos, sanatorios y farmacias.',
        'Extensión Familiar: Posibilidad de agregar cónyuge e hijos con códigos vinculados a tu matrícula.'
      ],
      steps: [
        { step: 1, title: 'Matriculación en CPCE', desc: 'Al matricularte en la Cámara I del CPCE Santa Fe, el alta en el DSS es automática si tenés hasta 50 años.' },
        { step: 2, title: 'Atención Inmediata', desc: 'Con tu N° de Matrícula podés atenderte en cartilla o comprar medicamentos con descuento.' },
        { step: 3, title: 'Incorporar Familiares', desc: 'Podés dar de alta a tu grupo familiar descargando y presentando el Formulario de Alta.' }
      ],
      faqs: [
        { q: '¿Qué sucede si tengo más de 50 años al momento de matricularme?', a: 'En ese caso, podés consultar en la secretaría del DSS para evaluar la incorporación conforme a las reglamentaciones vigentes.' },
        { q: '¿Debo realizar algún trámite presencial para mi afiliación titular?', a: 'No, la afiliación del titular es 100% automática al concretar el trámite de matriculación profesional.' }
      ],
      relatedFormIds: ['FORM-01', 'FORM-02'],
      quickActionLabel: 'Ver Formulario de Afiliación Directa',
      quickActionTarget: 'formularios'
    }
  },
  {
    id: 'grupofamiliar',
    buttonNumber: 2,
    title: 'Grupo Familiar',
    verbTitle: 'Adhesión y cobertura del grupo familiar',
    shortDesc: 'Inclusión de cónyuge e hijos. Cobertura inmediata para titular y carencias para grupo familiar.',
    iconName: 'Users',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-sky-600 text-white'
    },
    details: {
      summary: 'El profesional matriculado puede adherir a la obra social a su grupo familiar, es decir, cónyuge e hijos.\n\nEl titular como tal no posee período de carencia ni restricciones por preexistencias y la cobertura es inmediata desde el alta. Sin embargo, los integrantes del grupo familiar pueden tener período de carencia de entre 3 y 12 meses.',
      highlights: [
        'Titular sin carencias: Cobertura inmediata sin restricciones por preexistencias.',
        'Períodos de Carencia (Grupo Familiar): Aplicables entre 3 y 12 meses según la prestación.',
        'Códigos de Extensión: Cónyuge (+01), Hijos (+11, +12, +13, etc.).',
        'Edad límite de Hijos: Cubiertos hasta los 21 años (o 25 con certificado regular universitario).'
      ],
      carenciasTable: [
        { prestacion: "Consultas", carencia: "3 meses" },
        { prestacion: "Diagnóstico y Tratamiento de Baja Complejidad", carencia: "3 meses" },
        { prestacion: "Diagnóstico y Tratamiento de Alta Complejidad", carencia: "6 meses" },
        { prestacion: "Alergia", carencia: "3 meses" },
        { prestacion: "Psiquiatría", carencia: "3 meses" },
        { prestacion: "Psicología y Psicopedagogía", carencia: "3 meses" },
        { prestacion: "Foniatría", carencia: "3 meses" },
        { prestacion: "Medicamentos", carencia: "3 meses" },
        { prestacion: "Asistencia Sanatorial", carencia: "3 meses" },
        { prestacion: "Intervenciones Quirúrgicas", carencia: "6/12 meses" },
        { prestacion: "Nutrición", carencia: "3 meses" },
        { prestacion: "Prótesis y Ortesis", carencia: "" },
        { prestacion: "Audífonos", carencia: "6 meses" },
        { prestacion: "Ambulancia", carencia: "" },
        { prestacion: "Odontología", carencia: "6 meses" },
        { prestacion: "Óptica", carencia: "3 meses" },
        { prestacion: "Tratamiento Oncológico", carencia: "12 meses" },
        { prestacion: "Subsidios", carencia: "12 meses" },
        { prestacion: "Guarderías", carencia: "10 meses" },
        { prestacion: "Servicio de Sepelio", carencia: "" },
        { prestacion: "Seguro de Vida", carencia: "" },
        { prestacion: "Coseguro Otra Obra Social", carencia: "" }
      ],
      steps: [
        { step: 1, title: 'Completá el Formulario de Alta', desc: 'Descargá el Formulario de Incorporación de Grupo Familiar (FORM-02).' },
        { step: 2, title: 'Adjuntá la documentación', desc: 'Certificado de matrimonio/convivencia o partida de nacimiento del hijo/a.' },
        { step: 3, title: 'Presentá en el DSS', desc: 'Enviar vía e-mail a dss@cpcesfe1.org.ar o en la sede de San Lorenzo 1849 – Santa Fe – Cámara I.' }
      ],
      faqs: [
        { q: '¿Cómo mantengo la cobertura de mi hijo estudiante mayor de 21 años?', a: 'Debés presentar anualmente en el mes de Abril el Certificado de Alumno Regular emitido por la institución universitaria o terciaria reconocida.' }
      ],
      relatedFormIds: ['FORM-02', 'FORM-07'],
      quickActionLabel: 'Descargar Formulario Alta Familiar',
      quickActionTarget: 'formularios'
    }
  },
  {
    id: 'identificacion',
    buttonNumber: 3,
    title: 'Identificación del Afiliado',
    verbTitle: '¿Cómo identificarme en las consultas?',
    shortDesc: 'No es obligatorio contar con credencial física. Accedé a la credencial digital desde la App institucional.',
    iconName: 'UserCheck',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-blue-900 text-white'
    },
    details: {
      summary: '',
      highlights: [
        'Identificación en consulta: No necesitás credencial física. Presentate únicamente indicando tu número de matrícula titular (o extensión de grupo familiar) y tu DNI.',
        'Credencial digital: Llevá tu credencial y la de tu familia en el celular descargando la App oficial del Consejo.'
      ],
      appLinks: {
        android: 'https://play.google.com/store/apps/details?id=com.cpcesantafe.app&hl=es_AR',
        ios: 'https://apps.apple.com/ne/app/cpce-santa-fe-cra-i/id1661334681'
      },
      faqs: [
        { q: '¿Qué hago si el prestador me pide credencial física?', a: 'Podés informar que el DSS opera sin credencial física obligatoria mediante N° de Matrícula, o mostrar tu Credencial Digital desde la App institucional.' }
      ]
    }
  },
  {
    id: 'medicos',
    buttonNumber: 4,
    title: 'Consultas médicas',
    verbTitle: '¿Cómo solicitar atención con un profesional?',
    shortDesc: 'Pasos para buscar prestadores en cartilla, emitir la orden de consulta y asistir al turno.',
    iconName: 'Stethoscope',
    colorClass: {
      bg: 'bg-white',
      border: 'border-blue-100',
      text: 'text-blue-900',
      hover: 'hover:border-blue-400 hover:shadow-xl',
      iconBg: 'bg-blue-600 text-white'
    },
    details: {
      summary: '',
      highlights: [],
      steps: [
        { 
          step: 1, 
          title: 'Buscar un prestador', 
          desc: 'Consultá la [Cartilla de Prestadores Online](https://cpcesfe1.org.ar/cartilla-de-prestadores/)\n\nTambién podés solicitar información por [WhatsApp: 3425 10-5675](https://wa.me/5493425105675).' 
        },
        { 
          step: 2, 
          title: 'Emitir la orden de consulta', 
          desc: 'Ingresá al [Software de Gestión](http://www.contadores.org.ar/php/login.php) y generá la orden de consulta (el monto de la misma se generará en la factura del próximo mes).' 
        },
        { 
          step: 3, 
          title: 'Asistir al turno', 
          desc: 'Presentate con:\n• DNI\n• Orden de consulta emitida' 
        }
      ],
      faqs: [
        { q: '¿Cuándo se factura el valor de la orden de consulta?', a: 'El importe correspondiente a la orden de consulta emitida se liquidará en tu factura del mes siguiente.' },
        { q: '¿Qué documentación debo presentar en el consultorio?', a: 'Debés concurrir con tu DNI y la Orden de consulta emitida previamente desde el software.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Ver Cartilla Médica',
      quickActionTarget: 'cartilla'
    }
  },
  {
    id: 'medicamentos',
    buttonNumber: 5,
    title: 'Farmacia y medicamentos',
    verbTitle: 'Cobertura en farmacias y medicamentos',
    shortDesc: 'Cobertura del 60%, doble cobertura complementaria, cantidades reconocidas y tratamientos prolongados.',
    iconName: 'Pill',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-sky-600 text-white'
    },
    details: {
      summary: 'Se debe adquirir los medicamentos mediante la presentación del carnet y la prescripción médica sólo en las Farmacias adheridas en el Colegio de Farmacéuticos de la Provincia de Santa Fe – 1ª Circunscripción (ver cartilla), donde se obtendrá la cobertura del 60% del valor.\n\nSi posee cobertura por otra obra social:\nPodrá comprar los medicamentos beneficiándose de ambos descuentos sin la necesidad de hacer ningún trámite adicional. Sólo deberá confeccionar la orden con los datos de su otro sistema de salud (según requerimientos de la misma) y presentar en la farmacia ambas credenciales, de esta manera el DSS actuará como complementaria. Recuerde que las Farmacias deben operar con las dos obras sociales.\n\nCantidades reconocidas:\n• Hasta 2 productos distintos por receta\n• Hasta 2 envases chicos o 1 grande\n• Hasta 6 antibióticos inyectables monodosis (2 o más considerar tamaño grande)\n• Hasta 1 antibiótico inyectable multidosis (se considera tamaño grande)\n\nNo se realizan reintegros por compras de medicamentos dentro de la 1ra. Circunscripción de la Provincia.\n\nTratamientos Prolongados:\nEl Departamento realiza en forma conjunta con el Colegio de Farmacéuticos la auditoría de medicamentos verificando el consumo de drogas y/o productos de uso prolongado, la discontinuidad de tratamientos asociados a patologías crónicas y el cambio recurrente de prescriptores. Cuando el afiliado se encuentre en esta situación, deberá presentar una Historia Clínica del médico tratante al DSS (con validez por 180 días) para análisis de Auditoría Médica y posterior autorización.',
      highlights: [
        'Cobertura del 60%: Adquisición en farmacias adheridas al Colegio de Farmacéuticos de Santa Fe (1ª Circunscripción) con carnet y prescripción médica.',
        'Doble Cobertura Complementaria: Beneficio de ambos descuentos presentando ambas credenciales en la farmacia sin trámites adicionales.',
        'Cantidades Reconocidas: Hasta 2 productos distintos por receta, hasta 2 envases chicos o 1 grande, antibióticos monodosis (hasta 6) y multidosis (hasta 1).',
        'Sin Reintegros: No se realizan reintegros por compras de medicamentos dentro de la 1.ª Circunscripción de la Provincia.',
        'Tratamientos Prolongados: Presentación de Historia Clínica del médico tratante en el DSS (validez por 180 días) para autorización.'
      ],
      steps: [
        { 
          step: 1, 
          title: 'Prescripción Médica', 
          desc: 'Pedí a tu médico la receta (física o electrónica en sistema).' 
        },
        { 
          step: 2, 
          title: 'Farmacia Adherida (1.ª Circunscripción)', 
          desc: 'Presentá tu credencial y prescripción en una farmacia adherida para obtener el 60% de descuento directo.' 
        },
        { 
          step: 3, 
          title: 'Doble Cobertura (Obra Social Complementaria)', 
          desc: 'Si contás con otra obra social, presentá ambas credenciales para sumar ambos descuentos en el acto.' 
        }
      ],
      faqs: [
        { q: '¿Cómo opera la doble cobertura con otra obra social?', a: 'Podés comprar beneficiándote de ambos descuentos. Confeccionás la orden según requerimientos de tu otra obra social y presentás ambas credenciales en la farmacia para que el DSS actúe como complementaria.' },
        { q: '¿Qué cantidades de medicamentos se reconocen por receta?', a: 'Hasta 2 productos distintos por receta, hasta 2 envases chicos o 1 grande, hasta 6 antibióticos inyectables monodosis o 1 multidosis.' },
        { q: '¿Cómo es la gestión de Tratamientos Prolongados?', a: 'Requiere presentar en la administración del DSS una Historia Clínica del médico tratante para evaluación de Auditoría Médica. La validez es de 180 días.' },
        { q: '¿Hay reintegros por medicamentos?', a: 'No, no se realizan reintegros por compras de medicamentos dentro de la 1.ª Circunscripción de la Provincia.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Buscador de Farmacias y Cobertura',
      quickActionTarget: 'vademecum'
    }
  },
  {
    id: 'anticonceptivas',
    buttonNumber: 6,
    title: 'Pastillas anticonceptivas',
    verbTitle: 'Cobertura de pastillas anticonceptivas',
    shortDesc: 'Cobertura total (100%) para anticonceptivos orales del vademécum con ficha de vigencia anual, sin necesidad de receta.',
    iconName: 'HeartPulse',
    colorClass: {
      bg: 'bg-white',
      border: 'border-rose-100',
      text: 'text-rose-900',
      hover: 'hover:border-rose-400 hover:shadow-xl',
      iconBg: 'bg-rose-600 text-white'
    },
    details: {
      summary: 'Cobertura total de anticonceptivos orales incluidos en el vademécum, tanto para el Plan Básico como para el Ampliado, sin necesidad de presentar receta médica.\n\nEl único requisito es completar la ficha de tratamiento prolongado, que tiene vigencia anual. Una vez cargada en el sistema del Colegio de Farmacéuticos, la afiliada puede retirar la medicación directamente en la farmacia.\n\nEste beneficio aplica exclusivamente a los productos listados en el vademécum; otras presentaciones o casos sin ficha registrada no acceden a esta cobertura.',
      highlights: [
        'Cobertura Total (100%): Cobertura total de anticonceptivos orales incluidos en el vademécum para Plan Básico y Ampliado.',
        'Sin Receta Médica: No requiere receta médica para retirar en la farmacia adherida.',
        'Ficha de Tratamiento Prolongado: Único requisito con vigencia anual cargada en el sistema del Colegio de Farmacéuticos.',
        'Exclusivo Vademécum: Aplica exclusivamente a los productos listados en el vademécum institucional.'
      ],
      steps: [
        { 
          step: 1, 
          title: 'Completá la Ficha de Tratamiento', 
          desc: 'Solicitá y completá la ficha de tratamiento prolongado (vigencia anual).' 
        },
        { 
          step: 2, 
          title: 'Carga en Sistema', 
          desc: 'Una vez cargada en el sistema del Colegio de Farmacéuticos, se habilita la cobertura total.' 
        },
        { 
          step: 3, 
          title: 'Retiro Directo', 
          desc: 'Retirá las pastillas anticonceptivas del vademécum directamente en la farmacia con tu credencial, sin necesidad de receta médica.' 
        }
      ],
      faqs: [
        { q: '¿Es necesario presentar receta médica en la farmacia?', a: 'No, no se necesita receta médica. Solo se requiere completar la ficha de tratamiento prolongado con vigencia anual.' },
        { q: '¿Cuál es el porcentaje de cobertura?', a: 'Cobertura total (100%) tanto para el Plan Básico como para el Ampliado en anticonceptivos orales listados en el vademécum.' }
      ],
      quickActionLabel: 'Ver Vademécum y Farmacias Adheridas',
      quickActionTarget: 'vademecum'
    }
  },
  {
    id: 'autorizaciones',
    buttonNumber: 7,
    title: 'Autorizaciones',
    verbTitle: 'Autorizaciones de Prácticas y Estudios',
    shortDesc: 'Necesitan autorización previa: estudios, prácticas, imágenes, odontología, análisis, etc.',
    iconName: 'ClipboardCheck',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-blue-900 text-white'
    },
    details: {
      summary: '',
      highlights: [
        'Necesitan autorización previa: Estudios, Prácticas, Imágenes, Odontología, Análisis, etc.',
        '¿Cómo se autoriza?\nEnviando la indicación médica por WhatsApp al [3425 10-5675](https://wa.me/5493425105675).',
        'Atención: Lunes a viernes | 7 a 15 hs'
      ],
      steps: [
        {
          step: 1,
          title: 'Indicación Médica',
          desc: 'Obtené la orden o receta prescrita por el profesional médico.'
        },
        {
          step: 2,
          title: 'Envío por WhatsApp',
          desc: 'Enviá la foto legible de la orden al [WhatsApp 3425 10-5675](https://wa.me/5493425105675).'
        },
        {
          step: 3,
          title: 'Procesamiento',
          desc: 'El equipo de Auditoría Médica procesará la solicitud en horario de atención (Lunes a viernes de 7 a 15 hs).'
        }
      ],
      faqs: [
        { q: '¿Cuál es el canal oficial para enviar la indicación médica?', a: 'El único canal habilitado es el WhatsApp 3425 10-5675 en el horario de Lunes a viernes de 7 a 15 hs.' }
      ],
      coberturaTable: [
        { prestacion: 'CONSULTAS', isHeader: true },
        { prestacion: 'Consultorio', descripcion: 'Coseguro', general: 'V. Modulado', basico: 'V. Modulado' },
        { prestacion: 'DIAGNÓSTICO Y TRATAMIENTO DE BAJA COMPLEJIDAD', isHeader: true },
        { prestacion: 'Laboratorio', descripcion: 'Autorización previa / Coseguro', general: '70%', basico: '60%' },
        { prestacion: 'Radiología', descripcion: '', general: '', basico: '' },
        { prestacion: 'Electrocardiograma', descripcion: '', general: '', basico: '' },
        { prestacion: 'Ergometría', descripcion: '', general: '', basico: '' },
        { prestacion: 'Colposcopia / PAP / Mamografía', descripcion: 'Autorización. 100% cobertura 1.ª del año', general: '', basico: '' },
        { prestacion: 'Ecografías', descripcion: 'Autorización previa / Coseguro', general: '', basico: '' },
        { prestacion: 'Kinesiología / Fisiatría', descripcion: 'Tope: 20 sesiones anuales', general: '', basico: '' },
        { prestacion: 'Electroencefalograma', descripcion: 'Autorización previa / Coseguro', general: '', basico: '' },
        { prestacion: 'Electromiografía', descripcion: 'Autorización previa / Coseguro', general: '', basico: '' },
        { prestacion: 'DIAGNÓSTICO Y TRATAMIENTO DE ALTA COMPLEJIDAD', isHeader: true },
        { prestacion: 'Tomografía Axial Computada', descripcion: 'Autorización previa / Coseguro', general: '70%', basico: '60%' },
        { prestacion: 'Resonancia Magnética Nuclear', descripcion: '', general: '', basico: '' },
        { prestacion: 'Cámara Gamma', descripcion: '', general: '', basico: '' },
        { prestacion: 'Densitometría Ósea', descripcion: '', general: '', basico: '' },
        { prestacion: 'Ecocardiograma', descripcion: '', general: '', basico: '' },
        { prestacion: 'Eco-Doppler', descripcion: '', general: '', basico: '' },
        { prestacion: 'Holter', descripcion: '', general: '', basico: '' },
        { prestacion: 'Presurometría', descripcion: '', general: '', basico: '' },
        { prestacion: 'ALERGIA', isHeader: true },
        { prestacion: 'Testificación', descripcion: 'Reintegro / Determinado por reglamento', general: '70%', basico: '–' },
        { prestacion: 'Tratamiento hasta 1 año', descripcion: '', general: '60%', basico: '–' },
        { prestacion: 'Los años siguientes', descripcion: '', general: '30%', basico: '–' },
        { prestacion: 'PSIQUIATRÍA', isHeader: true },
        { prestacion: 'Consulta', descripcion: 'Reintegro valor consulta', general: 'Tope 20 anuales + 10 HC', basico: 'Tope 20 anuales' },
        { prestacion: 'PSICOLOGÍA Y PSICOPEDAGOGÍA', isHeader: true },
        { prestacion: 'Sesiones', descripcion: 'Autorización / Tope: 20 anuales', general: '50%', basico: '40%' },
        { prestacion: 'FONIATRÍA', isHeader: true },
        { prestacion: 'Sesiones de reeducación', descripcion: '', general: '', basico: '' },
        { prestacion: 'MEDICAMENTOS', isHeader: true },
        { prestacion: 'Ambulatorios', descripcion: 'Farmacéuticos', general: '60%', basico: '60% s/ vademécum' },
        { prestacion: 'Internación', descripcion: '', general: '100%', basico: '80%' },
        { prestacion: 'Material de contraste', descripcion: 'Autorización / Coseguro', general: '50%', basico: '30%' },
        { prestacion: 'Material radioactivo', descripcion: '', general: '', basico: '' },
        { prestacion: 'Vacunas', descripcion: 'Reintegro. Límite según reglamento', general: '–', basico: '' },
        { prestacion: 'ASISTENCIA SANATORIAL', isHeader: true },
        { prestacion: 'Honorarios, pensión y gastos', descripcion: 'Autorización previa / Coseguro', general: '100%', basico: '80%' },
        { prestacion: 'INTERVENCIONES QUIRÚRGICAS', isHeader: true },
        { prestacion: 'Nomencladas', descripcion: 'Ambulatorio / Internación', general: '70% y 100%', basico: '60% y 80%' },
        { prestacion: 'No nomencladas', descripcion: 'Ambulatorio / Internación – Reintegro', general: 'V. Modulado', basico: '' },
        { prestacion: 'NUTRICIÓN', isHeader: true },
        { prestacion: 'Consulta', descripcion: 'Reintegro', general: '6 x año', basico: '' },
        { prestacion: 'PRÓTESIS Y ÓRTESIS', isHeader: true },
        { prestacion: 'Marcapasos', descripcion: 'Autorización / Menor de 3 presupuestos', general: '60%', basico: '40%' },
        { prestacion: 'Válvulas cardíacas', descripcion: '', general: '', basico: '' },
        { prestacion: 'Catéteres', descripcion: '', general: '', basico: '' },
        { prestacion: 'Prótesis', descripcion: '', general: '', basico: '' },
        { prestacion: 'Alquiler', descripcion: 'Reintegro', general: '', basico: '' },
        { prestacion: 'AUDÍFONOS', isHeader: true },
        { prestacion: 'Audífonos', descripcion: 'Reintegros. Menor de tres presupuestos', general: '40%', basico: '–' },
        { prestacion: 'AMBULANCIA', isHeader: true },
        { prestacion: 'Urgencias', descripcion: 'Reintegro – Dentro de la ciudad', general: '100%', basico: '100%' },
        { prestacion: 'Traslados', descripcion: 'Reintegros', general: '30%', basico: '–' },
        { prestacion: 'ODONTOLOGÍA', isHeader: true },
        { prestacion: 'Dentistería', descripcion: 'Reintegros – Padrón por autorización / Coseguro', general: '70%', basico: '' },
        { prestacion: 'Prótesis', descripcion: 'Reintegros', general: '50%', basico: '–' },
        { prestacion: 'Ortodoncia', descripcion: 'Reintegros – Según reglamento', general: '70%', basico: '–' },
        { prestacion: 'ÓPTICA', isHeader: true },
        { prestacion: 'Cristales blancos comunes, bifocales + armazón', descripcion: 'Cada 2 años por reintegro', general: '100%', basico: '60%' },
        { prestacion: 'Excímer Láser', descripcion: 'Por reintegro', general: 'Por reintegro, valor de referencia: 2,5 a 4 dioptrías: 50%; 4 a 6 dioptrías: 60%; más de 6 dioptrías: 100%', basico: 'Sin cobertura' },
        { prestacion: 'TRATAMIENTO ONCOLÓGICO', isHeader: true },
        { prestacion: 'Pensión, honorarios y gastos', descripcion: 'Módulo fijo por auditoría', general: '100%', basico: '' },
        { prestacion: 'Terapia radiante', descripcion: 'Autorización previa / Coseguro', general: '', basico: '' },
        { prestacion: 'SUBSIDIOS', isHeader: true },
        { prestacion: 'Asignación por Matrimonio / Nacimiento / Adopción', descripcion: '', general: '100%', basico: '–' },
        { prestacion: 'Guarderías', descripcion: '', general: '–', basico: '' },
        { prestacion: 'SERVICIO DE SEPELIO', isHeader: true },
        { prestacion: 'Servicio de sepelio', descripcion: 'Cobertura directa', general: '100%', basico: '' },
        { prestacion: 'SEGURO DE VIDA', isHeader: true },
        { prestacion: 'Obligatorio', descripcion: 'Según módulo', general: '', basico: '' },
        { prestacion: 'COSEGURO OTRA OBRA SOCIAL', isHeader: true },
        { prestacion: 'Prácticas reconocidas por DSS', descripcion: '', general: '', basico: '' }
      ],
      quickActionLabel: 'Enviar indicación médica por WhatsApp',
      quickActionTarget: 'https://wa.me/5493425105675'
    }
  },
  {
    id: 'coseguros',
    buttonNumber: 8,
    title: 'Coseguros',
    verbTitle: '¿Cómo funciona el coseguro?',
    shortDesc: 'Información sobre la incorporación automática a cuenta corriente y liquidación en cuota mensual.',
    iconName: 'DollarSign',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-sky-600 text-white'
    },
    details: {
      summary: '¿Cómo funciona el coseguro?\nCuando una práctica es autorizada, el DSS cubre el porcentaje correspondiente según el plan y el saldo restante se incorpora automáticamente a la cuenta corriente del afiliado.\n\nImportante: no es necesario abonar importes en clínicas, sanatorios o centros médicos al momento de realizar la prestación. El coseguro se liquida junto con la cuota mensual siguiente.\n\nEjemplo: una ecografía\n• Plan General - cobertura del 70%\n• Plan Básico - cobertura del 60%\nLa diferencia restante se registra como coseguro.',
      highlights: [
        'Funcionamiento del coseguro: Al autorizar una práctica, el DSS cubre el porcentaje correspondiente según el plan y el saldo restante se incorpora automáticamente a la cuenta corriente del afiliado.',
        'Sin cobro en el acto: Importante: no es necesario abonar importes en clínicas, sanatorios o centros médicos al momento de realizar la prestación.',
        'Liquidación en cuota mensual: El coseguro se liquida junto con la cuota mensual siguiente.',
        'Ejemplo (ecografía): Plan General cobertura del 70% / Plan Básico cobertura del 60%. La diferencia restante se registra como coseguro.'
      ],
      steps: [
        { step: 1, title: 'Práctica Autorizada', desc: 'El DSS cubre el porcentaje correspondiente según tu plan (Ejemplo: 70% Plan General / 60% Plan Básico).' },
        { step: 2, title: 'Atención Sin Abono Directo', desc: 'No es necesario abonar importes en clínicas, sanatorios o centros médicos al momento de realizar la prestación.' },
        { step: 3, title: 'Liquidación Mensual', desc: 'El saldo restante se incorpora automáticamente a la cuenta corriente y se liquida en tu cuota mensual siguiente.' }
      ],
      faqs: [
        { q: '¿Debo abonar algo en la clínica o centro médico al momento de la prestación?', a: 'No. Importante: no es necesario abonar importes en clínicas, sanatorios o centros médicos al momento de realizar la prestación. El coseguro se liquida junto con la cuota mensual siguiente.' },
        { q: '¿Cómo se registra el coseguro de una ecografía?', a: 'El DSS cubre el 70% en Plan General o 60% en Plan Básico. La diferencia restante se incorpora automáticamente a la cuenta corriente del afiliado como coseguro.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Ver Tabla de Coseguros',
      quickActionTarget: 'coseguro-tabla'
    }
  },
  {
    id: 'cobertura',
    buttonNumber: 9,
    title: 'Prácticas y medicamentos',
    verbTitle: 'Consultas sobre mi cobertura',
    shortDesc: 'Planes General (70% prácticas / 100% internación) y Básico (60% prácticas / 80% internación), Vademécum 60%.',
    iconName: 'ShieldCheck',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-blue-900 text-white'
    },
    details: {
      summary: 'El DSS ofrece dos planes de cobertura: un Plan General y un Plan Básico.\n\n• Prácticas médicas: El Plan General cubre hasta un 70% y el Plan Básico el 60% del valor de las prácticas.\n\n• Internación: El Plan Básico cubre el 80% y el Plan General el 100% en caso de internación.\n\n• Medicamentos: En medicamentos, ambos cubren el 60% si se encuentra en el vademécum.',
      highlights: [
        'Plan General: Cobertura de hasta un 70% en prácticas y 100% en internación.',
        'Plan Básico: Cobertura del 60% en prácticas y 80% en internación.',
        'Medicamentos: Cobertura del 60% en ambos planes para medicamentos del vademécum.'
      ],
      steps: [
        { 
          step: 1, 
          title: 'Consultá tu Plan', 
          desc: 'Verificá si estás adherido al Plan General o al Plan Básico.' 
        },
        { 
          step: 2, 
          title: 'Cobertura en Prácticas', 
          desc: 'Obtené hasta el 70% de cobertura en Plan General o 60% en Plan Básico.' 
        },
        { 
          step: 3, 
          title: 'Internación y Medicamentos', 
          desc: '100% internación en Plan General (80% Básico) y 60% en medicamentos del vademécum para ambos planes.' 
        }
      ],
      faqs: [
        { q: '¿Qué porcentaje de cobertura ofrecen los planes en prácticas médicas?', a: 'El Plan General cubre hasta un 70% y el Plan Básico el 60% del valor de las prácticas.' },
        { q: '¿Cuál es la cobertura en caso de internación?', a: 'El Plan General cubre el 100% en internación y el Plan Básico cubre el 80%.' },
        { q: '¿Cuánto cubren en medicamentos?', a: 'En medicamentos, ambos planes cubren el 60% siempre que el producto se encuentre en el vademécum.' }
      ],
      relatedFormIds: ['FORM-01', 'FORM-04'],
      quickActionLabel: 'Preguntar al Asistente Virtual',
      quickActionTarget: 'asistente'
    }
  },
  {
    id: 'pagos',
    buttonNumber: 10,
    title: 'Medios de pago',
    verbTitle: 'Quiero saber cómo pagar mi cuota',
    shortDesc: 'Información sobre cuotas, débito automático, homebanking, botón de pago y deducción impositiva.',
    iconName: 'CreditCard',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-blue-900 text-white'
    },
    details: {
      summary: 'Conocé las distintas alternativas de pago de tu cuota de afiliación DSS y liquidaciones de coseguros.',
      highlights: [
        'Débito Automático en CBU (Banco Macro, Santa Fe, Nación, otros) o Tarjeta de Crédito (Visa, Mastercard).',
        'Pago Mis Cuentas / Red Link buscando "CPCE Santa Fe - Cámara I".',
        'Botón de Pago Web desde la Autogestión del Consejo.',
        'Transferencia bancaria a cuenta institucional del CPCE Santa Fe Camera I.'
      ],
      steps: [
        { step: 1, title: 'Elegí el medio de pago', desc: 'Recomendamos adherir al Débito Automático para evitar vencimientos.' },
        { step: 2, title: 'Adherí online', desc: 'Completá el formulario FORM-06 con tu CBU o datos de tarjeta.' },
        { step: 3, title: 'Descargá tu comprobante', desc: 'Obtené el comprobante apto para deducción en Impuesto a las Ganancias.' }
      ],
      faqs: [
        { q: '¿Puedo deducir las aportaciones del DSS en Impuesto a las Ganancias?', a: 'Sí, la cuota del DSS es computable como gasto médico deducción cuota obra social/prepaga conforme a la normativa de AFIP/ARCA.' }
      ],
      relatedFormIds: ['FORM-06'],
      quickActionLabel: 'Formulario Adhesión a Débito',
      quickActionTarget: 'formularios'
    }
  },
  {
    id: 'contacto',
    buttonNumber: 11,
    title: 'Guía de autogestión para afiliados del DSS CPCE Santa Fe • Cámara I',
    verbTitle: 'Contacto y ayuda',
    shortDesc: 'Si aún no pudiste resolver tu duda o requerís una gestión asistida, nuestro equipo está a tu disposición por múltiples vías.',
    iconName: 'Headphones',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-sky-600 text-white'
    },
    details: {
      summary: 'Guía de autogestión para afiliados del DSS CPCE Santa Fe • Cámara I\n\nSi aún no pudiste resolver tu duda o requerís una gestión asistida, nuestro equipo está a tu disposición por múltiples vías.\n\nAspectos Clave de la Cobertura:\n• Sede Central: San Lorenzo 1849 – Santa Fe – Cámara I\n• Horario de Atención: Lunes a viernes | 7 a 15 hs\n• Contacto WhatsApp: WA 3425 10-5675 (https://wa.me/5493425105675)\n• Web: cpcesfe1.org.ar\n• Correo Electrónico: dss@cpcesfe1.org.ar',
      highlights: [
        'Sede Central: San Lorenzo 1849 – Santa Fe – Cámara I',
        'Horario de Atención: Lunes a viernes | 7 a 15 hs',
        'Contacto WhatsApp: WA 3425 10-5675 (https://wa.me/5493425105675)',
        'Web: cpcesfe1.org.ar',
        'Correo Electrónico: dss@cpcesfe1.org.ar'
      ],
      faqs: [
        { q: '¿Adónde llamo en caso de una urgencia médica fuera del horario administrativo?', a: 'Comunicate directamente con la guardia del sanatorio contratado indicando tu número de matrícula DSS, o al servicio de emergencias médicas contratado.' }
      ],
      quickActionLabel: 'Enviar WhatsApp de Contacto',
      quickActionTarget: 'https://wa.me/5493425105675'
    }
  }
];

export const FORMS_DATA: FormItem[] = [
  {
    id: 'FORM-01',
    code: 'DSS-FORM-01',
    title: 'Solicitud de Afiliación Directa y Declaración Jurada de Salud',
    category: 'Afiliación',
    description: 'Formulario obligatorio para el alta inicial del profesional matriculado en el Departamento de Servicios Sociales.',
    requiredDocs: ['Fotocopia DNI frente y dorso', 'Constancia de Matriculación emitida por el CPCE Cámara I'],
    estimatedDays: '24 a 48 hs hábiles',
    isFillable: true,
    fields: [
      { id: 'matricula', label: 'Número de Matrícula Titular', type: 'text', required: true, placeholder: 'Ej. 14520' },
      { id: 'nombreCompleto', label: 'Nombre y Apellido del Profesional', type: 'text', required: true, placeholder: 'Ej. CPTA. María Laura Gómez' },
      { id: 'dni', label: 'Número de DNI', type: 'text', required: true, placeholder: 'Ej. 32456789' },
      { id: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date', required: true },
      { id: 'domicilio', label: 'Domicilio Particular (Ciudad, Calle y N°)', type: 'text', required: true, placeholder: 'San Jerónimo 2500, Santa Fe' },
      { id: 'telefono', label: 'Teléfono de Contacto / WhatsApp', type: 'text', required: true, placeholder: '342-154123456' },
      { id: 'email', label: 'Correo Electrónico', type: 'text', required: true, placeholder: 'profesional@ejemplo.com' },
      { id: 'poseeOtraCobertura', label: '¿Posee otra obra social o prepaga?', type: 'select', options: ['No, solo DSS', 'Sí, mantengo otra cobertura'], required: true },
      { id: 'antecedentes', label: 'Declaración de Antecedentes Médicos Relevantes', type: 'textarea', placeholder: 'Detallar afecciones preexistentes o indicar "Ninguna"' }
    ]
  },
  {
    id: 'FORM-02',
    code: 'DSS-FORM-02',
    title: 'Alta o Modificación de Grupo Familiar',
    category: 'Grupo Familiar',
    description: 'Solicitud de incorporación de Cónyuge/Conviviente e Hijos al sistema de cobertura solidaria.',
    requiredDocs: ['Acta o libreta de matrimonio o certificado de convivencia', 'Partida de nacimiento de cada hijo/a', 'DNI de los familiares a incorporar'],
    estimatedDays: '48 hs hábiles',
    isFillable: true,
    fields: [
      { id: 'matricula', label: 'Matrícula del Titular', type: 'text', required: true },
      { id: 'titularNombre', label: 'Nombre del Titular', type: 'text', required: true },
      { id: 'familiarRelacion', label: 'Vínculo Familiar a Incorporar', type: 'select', options: ['Cónyuge / Conviviente (+01)', 'Hijo/a 1 (+11)', 'Hijo/a 2 (+12)', 'Hijo/a 3 (+13)'], required: true },
      { id: 'familiarNombre', label: 'Nombre Completo del Familiar', type: 'text', required: true },
      { id: 'familiarDni', label: 'DNI del Familiar', type: 'text', required: true },
      { id: 'familiarFechaNac', label: 'Fecha de Nacimiento del Familiar', type: 'date', required: true },
      { id: 'familiarEstudia', label: 'Si tiene entre 21 y 25 años, ¿cursa estudios universitarios?', type: 'select', options: ['No aplica (Menor de 21 años)', 'Sí (Adjuntar Certificado de Alumno Regular)', 'No (No corresponde prórroga)'], required: true }
    ]
  },
  {
    id: 'FORM-03',
    code: 'DSS-FORM-03',
    title: 'Solicitud de Cobertura Especial en Medicamentos (70% / 100%)',
    category: 'Medicamentos',
    description: 'Empadronamiento para tratamiento de patologías crónicas o de alto costo en el Vademécum especial.',
    requiredDocs: ['Resumen de Historia Clínica elaborado por el médico especialista', 'Receta con prescripción por principio activo (nombre genérico)'],
    estimatedDays: '3 a 5 días hábiles (Auditoría Médica)',
    isFillable: true,
    fields: [
      { id: 'matricula', label: 'N° de Matrícula y Extensión', type: 'text', required: true, placeholder: 'Ej. 14520 / 01' },
      { id: 'pacienteNombre', label: 'Nombre del Paciente', type: 'text', required: true },
      { id: 'patologia', label: 'Patología o Diagnóstico Crónico', type: 'text', required: true, placeholder: 'Ej. Diabetes Tipo II, Hipertensión Arterial, Asma' },
      { id: 'medicamentoPrescripto', label: 'Medicamento(s) Prescriptos (Principio Activo y Dosis)', type: 'textarea', required: true, placeholder: 'Ej. Enalapril 10mg x 60 comp / Metformina 850mg' },
      { id: 'medicoTratante', label: 'Nombre del Médico Especialista y M.P.', type: 'text', required: true, placeholder: 'Dr. Juan Perez M.P. 5432' }
    ]
  },
  {
    id: 'FORM-04',
    code: 'DSS-FORM-04',
    title: 'Solicitud de Autorización Médica y Prácticas Complejas',
    category: 'Autorizaciones',
    description: 'Requerimiento de autorización previa para estudios por imágenes, cirugías, odontología compleja o kinesiología prolongada.',
    requiredDocs: ['Orden médica legible con diagnóstico y fundamentación', 'Estudios previos complementarios (si corresponde)'],
    estimatedDays: '24 a 48 hs hábiles',
    isFillable: true,
    fields: [
      { id: 'matricula', label: 'N° de Matrícula Titular', type: 'text', required: true },
      { id: 'pacienteNombre', label: 'Nombre del Paciente', type: 'text', required: true },
      { id: 'practicaSolicitada', label: 'Denominación de la Práctica Solicitada', type: 'text', required: true, placeholder: 'Ej. Resonancia Magnética de Rodilla Derecha con Contraste' },
      { id: 'centroAtencion', label: 'Sanatorio o Centro Médico Prestador', type: 'text', required: true, placeholder: 'Ej. Sanatorio Garay / Centro de Diagnóstico Santa Fe' },
      { id: 'fechaEstimada', label: 'Fecha Estimada de la Práctica', type: 'date', required: true },
      { id: 'observaciones', label: 'Observaciones / Urgencia Sanitaria', type: 'textarea', placeholder: 'Aclarar si es una solicitud urgente' }
    ]
  },
  {
    id: 'FORM-05',
    code: 'DSS-FORM-05',
    title: 'Solicitud de Reembolso / Coseguro Especial',
    category: 'Reembolsos y Pagos',
    description: 'Trámite de reintegro por atenciones de urgencia fuera de zona o prestaciones con subsidio específico.',
    requiredDocs: ['Factura/Comprobante oficial a nombre del afiliado/CPCE', 'Orden médica o informe de atención de urgencia'],
    estimatedDays: '7 a 10 días hábiles',
    isFillable: true,
    fields: [
      { id: 'matricula', label: 'N° de Matrícula Titular', type: 'text', required: true },
      { id: 'titularNombre', label: 'Nombre del Titular', type: 'text', required: true },
      { id: 'cbuReintegro', label: 'CBU / Alias para acreditación del reintegro', type: 'text', required: true, placeholder: 'Ej. 0110480030048012345678 / ALIAS.EJEMPLO' },
      { id: 'montoReclamado', label: 'Monto Total Facturado ($)', type: 'text', required: true, placeholder: 'Ej. 15000' },
      { id: 'motivoReembolso', label: 'Motivo de la atención fuera de cartilla', type: 'textarea', required: true, placeholder: 'Detallar atención de urgencia o falta de prestador en la localidad' }
    ]
  },
  {
    id: 'FORM-06',
    code: 'DSS-FORM-06',
    title: 'Formulario de Adhesión a Débito Automático de Cuota DSS',
    category: 'Reembolsos y Pagos',
    description: 'Adhesión al débito directo en cuenta bancaria (CBU) o tarjeta de crédito para el pago mensual.',
    requiredDocs: ['Constancia de CBU emitida por homebanking o fotocopia de tarjeta'],
    estimatedDays: 'Inmediata para el próximo ciclo',
    isFillable: true,
    fields: [
      { id: 'matricula', label: 'N° de Matrícula Titular', type: 'text', required: true },
      { id: 'titularNombre', label: 'Nombre Completo del Titular', type: 'text', required: true },
      { id: 'medioElegido', label: 'Medio de Débito', type: 'select', options: ['CBU Cuenta Bancaria', 'Tarjeta de Crédito VISA', 'Tarjeta de Crédito Mastercard'], required: true },
      { id: 'cbuOTarjeta', label: 'Número de CBU (22 dígitos) o N° de Tarjeta', type: 'text', required: true, placeholder: '0110480030048012345678' },
      { id: 'banco', label: 'Banco Emisor', type: 'text', required: true, placeholder: 'Ej. Banco Macro / Banco Santa Fe' }
    ]
  },
  {
    id: 'FORM-07',
    code: 'DSS-FORM-07',
    title: 'Prórroga por Estudios para Hijos (21 a 25 años)',
    category: 'Grupo Familiar',
    description: 'Renovación anual obligatoria para mantener la cobertura del hijo/a estudiante universitario o terciario.',
    requiredDocs: ['Certificado de Alumno Regular emitido en el año lectivo en curso'],
    estimatedDays: '24 hs hábiles',
    isFillable: true,
    fields: [
      { id: 'matricula', label: 'N° de Matrícula Titular', type: 'text', required: true },
      { id: 'hijoNombre', label: 'Nombre del Hijo/a Estudiante', type: 'text', required: true },
      { id: 'hijoExtension', label: 'Código de Extensión Familiar', type: 'select', options: ['+11 (Primer Hijo)', '+12 (Segundo Hijo)', '+13 (Tercer Hijo)', '+14 (Cuarto Hijo)'], required: true },
      { id: 'institucionEducativa', label: 'Nombre de la Universidad / Instituto Terciario', type: 'text', required: true, placeholder: 'Ej. UNL - Facultad de Ciencias Económicas' },
      { id: 'carrera', label: 'Carrera que Cursa', type: 'text', required: true, placeholder: 'Ej. Contador Público' }
    ]
  },
  {
    id: 'FORM-08',
    code: 'DSS-FORM-08',
    title: 'Solicitud de Subsidio por Maternidad, Adopción o Casamiento',
    category: 'Subsidios',
    description: 'Otorgamiento de beneficio económico directo a profesionales matriculados al día con el DSS.',
    requiredDocs: ['Partida de Nacimiento / Adopción o Certificado de Matrimonio'],
    estimatedDays: '5 días hábiles',
    isFillable: true,
    fields: [
      { id: 'matricula', label: 'N° de Matrícula Titular', type: 'text', required: true },
      { id: 'titularNombre', label: 'Nombre Completo del Profesional', type: 'text', required: true },
      { id: 'tiposubsidio', label: 'Tipo de Subsidio Solicitado', type: 'select', options: ['Subsidio por Nacimiento', 'Subsidio por Adopción', 'Subsidio por Matrimonio'], required: true },
      { id: 'fechaAcontecimiento', label: 'Fecha del Evento (Nacimiento/Casamiento)', type: 'date', required: true },
      { id: 'cbuAcreditacion', label: 'CBU para Transferencia Directa', type: 'text', required: true }
    ]
  }
];

export const MEDICAL_PROVIDERS: MedicalProvider[] = [];

export const PHARMACIES_DATA: Pharmacy[] = [
  { id: 'ph1', name: 'Farmacia del Consejo (Sede)', city: 'Santa Fe', address: 'San Lorenzo 1849', phone: 'WA 3425 10-5675', discount: '40% Directo / 70% Crónicos', hasRecetaDigital: true },
  { id: 'ph2', name: 'Farmacia Central', city: 'Santa Fe', address: 'San Martín 2100', phone: '0342-453-1111', discount: '40% Directo', hasRecetaDigital: true },
  { id: 'ph3', name: 'Farmacia Bulevar', city: 'Santa Fe', address: 'Bv. Pellegrini 2800', phone: '0342-455-2222', discount: '40% Directo', hasRecetaDigital: true },
  { id: 'ph4', name: 'Farmacia Santo Tomé Norte', city: 'Santo Tomé', address: 'Av. 7 de Marzo 2200', phone: '0342-474-3333', discount: '40% Directo', hasRecetaDigital: true },
  { id: 'ph5', name: 'Farmacia Social Rafaela', city: 'Rafaela', address: 'Bv. Santa Fe 450', phone: '03492-42-4444', discount: '40% Directo', hasRecetaDigital: true },
  { id: 'ph6', name: 'Farmacia del Norte', city: 'Reconquista', address: 'Habegger 980', phone: '03482-42-5555', discount: '40% Directo', hasRecetaDigital: true }
];

export const COSEGUROS_TABLE = [
  { practica: 'Consulta Médica en Consultorio', coseguro: '$2.500', cobro: 'Liquidación Mensual en Resumen CPCE', nota: 'Sin pago en efectivo al médico' },
  { practica: 'Consulta Médica en Guardia Urgencia', coseguro: '$3.200', cobro: 'Liquidación Mensual en Resumen CPCE', nota: 'Guardia sanatorial 24hs' },
  { practica: 'Análisis de Laboratorio (por código)', coseguro: '$800 a $1.800', cobro: 'Liquidación Mensual', nota: 'Según complejidad' },
  { practica: 'Ecografía General / Mamografía', coseguro: '$3.500', cobro: 'Liquidación Mensual con orden', nota: 'Requiere orden prescripta' },
  { practica: 'Radiología Convencional (por placa)', coseguro: '$1.900', cobro: 'Liquidación Mensual', nota: 'Atención con matrícula' },
  { practica: 'Resonancia Magnética (RMN)', coseguro: '$8.500', cobro: 'Liquidación Mensual previa autorización', nota: 'Autorización digital previa' },
  { practica: 'Tomografía Computada (TAC)', coseguro: '$6.800', cobro: 'Liquidación Mensual previa autorización', nota: 'Autorización digital previa' },
  { practica: 'Atención Odontológica Básica (Arreglo/Consulta)', coseguro: '$2.000', cobro: 'Liquidación Mensual', nota: 'Prestadores Colegio Odontólogos' },
  { practica: 'Sesión de Kinesiología / Fisioterapia', coseguro: '$1.500', cobro: 'Liquidación Mensual', nota: 'Hasta 10 sesiones por prescripción' },
  { practica: 'Control de Niño Sano / Embarazo / Plan PMI', coseguro: '$0 (CERO)', cobro: 'Cobertura 100% DSS', nota: 'Sin costo adicionales' }
];
