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
      summary: 'La incorporación al Departamento de Servicios Sociales (DSS) se realiza de forma automática al matricularte en el CPCE Santa Fe (Cámara I) para profesionales de hasta 50 años. Para inscripciones directas o declaraciones sanitarias, debés presentar la Solicitud de Afiliación Directa y la Declaración Jurada de Salud.',
      highlights: [
        'Sistema Solidario: Creado y sostenido por los profesionales matriculados en el CPCE Santa Fe - Cámara I.',
        'Afiliación Automática: Se genera sin trámites adicionales al matricularte (para profesionales de hasta 50 años).',
        'Formularios Oficiales: Solicitud de Afiliación Directa (afiliacion.pdf) y Declaración Jurada de Salud (Formulario DD JJ Salud.pdf).',
        'Sin Credenciales Físicas: Tu número de Matrícula Titular te identifica ante médicos, sanatorios y farmacias.'
      ],
      steps: [
        { step: 1, title: 'Matriculación en CPCE', desc: 'Al matricularte en la Cámara I del CPCE Santa Fe, el alta en el DSS es automática si tenés hasta 50 años.' },
        { step: 2, title: 'Descargar Formularios Oficiales', desc: 'En la sección de Formularios podés descargar la Solicitud de Afiliación Directa y la Declaración Jurada de Salud.' },
        { step: 3, title: 'Presentación', desc: 'Enviá la documentación completa por correo a dss@cpn.org.ar o en la sede de San Lorenzo 1849, Santa Fe.' }
      ],
      faqs: [
        { q: '¿Qué sucede si tengo más de 50 años al momento de matricularme?', a: 'En ese caso, podés consultar en la secretaría del DSS para evaluar la incorporación conforme a las reglamentaciones vigentes.' },
        { q: '¿Debo realizar algún trámite presencial para mi afiliación titular?', a: 'No, la afiliación del titular es 100% automática al concretar el trámite de matriculación profesional.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Ir al Centro de Formularios Oficiales',
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
      summary: 'Podés extender los beneficios de tu cobertura médica adhiriendo a tu cónyuge e hijos. Para el alta o modificación de familiares debés presentar el formulario de Actualización de Datos Personales y Familiares junto con la Declaración Jurada de Salud de cada integrante.',
      highlights: [
        'Formularios requeridos: Actualización de Datos Personales y Familiares (Actualizacion de datos DSS.pdf) y Declaración Jurada de Salud (Formulario DD JJ Salud.pdf).',
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
        { step: 1, title: 'Descargar Formularios de Alta', desc: 'Obtené desde la sección Formularios los PDF oficiales de Actualización de Datos Personales y Declaración Jurada de Salud.' },
        { step: 2, title: 'Adjuntar la documentación', desc: 'Certificado de matrimonio/convivencia o partida de nacimiento del hijo/a.' },
        { step: 3, title: 'Presentar en el DSS', desc: 'Enviar vía e-mail a dss@cpn.org.ar o en la sede de San Lorenzo 1849 – Santa Fe – Cámara I.' }
      ],
      faqs: [
        { q: '¿Cómo mantengo la cobertura de mi hijo estudiante mayor de 21 años?', a: 'Debés presentar anualmente en el mes de Abril el Certificado de Alumno Regular emitido por la institución universitaria o terciaria reconocida.' }
      ],
      relatedFormIds: []
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
      summary: 'Identificarte ante médicos, sanatorios y farmacias es simple: solo indicá tu número de matrícula titular (o extensión de familiar) y presentá tu DNI. En caso de cambiar de residencia, descargá la Declaración de Cambio de Domicilio.',
      highlights: [
        'Identificación en consulta: No necesitás credencial física. Presentate únicamente indicando tu número de matrícula titular (o extensión) y tu DNI.',
        'Notificación de Cambios: En caso de modificar tu dirección, completá la Declaración de Cambio de Domicilio (Cambio de Domicilio.pdf).',
        'Credencial digital: Llevá tu credencial y la de tu familia en el celular descargando la App oficial del Consejo.'
      ],
      appLinks: {
        android: 'https://play.google.com/store/apps/details?id=com.cpcesantafe.app&hl=es_AR',
        ios: 'https://apps.apple.com/ne/app/cpce-santa-fe-cra-i/id1661334681'
      },
      faqs: [
        { q: '¿Qué hago si el prestador me pide credencial física?', a: 'Podés informar que el DSS opera sin credencial física obligatoria mediante N° de Matrícula, o mostrar tu Credencial Digital desde la App institucional.' }
      ],
      relatedFormIds: []
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
      summary: 'Accedé a atención médica buscando profesionales en nuestra cartilla digital y emitiendo previamente tu orden de consulta. Para requerimientos de prácticas y estudios, utilizá la Solicitud de Prescripción / Autorización Médica.',
      highlights: [],
      steps: [
        { 
          step: 1, 
          title: 'Buscar un prestador', 
          desc: 'Consultá la [Cartilla de Prestadores Online](https://dss.contadores.org.ar/cartilla) o comunicate por WhatsApp al (342) 510-5675.' 
        },
        { 
          step: 2, 
          title: 'Emitir la orden de consulta', 
          desc: 'Ingresá al [Software de Gestión](https://contadores.org.ar/php/login.php) y generá la orden de consulta.' 
        },
        { 
          step: 3, 
          title: 'Asistir al turno', 
          desc: 'Presentate con tu DNI y la Orden de consulta emitida. Si requerís autorizar estudios, adjuntá la Solicitud de Prescripción Médica.' 
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
      summary: 'Obtené una cobertura del 60% en medicamentos generales aprobados en farmacias adheridas con tu receta y N° de Matrícula/DNI. Además, podés registrar la Ficha de Tratamiento Prolongado (válida por 6 meses) para automatizar la dispensa habitual.',
      highlights: [
        'Modalidad de Compra en Mostrador: Presentá en cualquier farmacia adherida tu Receta Médica (física o digital) y acreditá identidad con tu N° de Matrícula Profesional o DNI. La farmacia aplica el 60% de descuento directo sobre el precio de lista y abonás únicamente el 40% restante.',
        'Tratamientos Prolongados / Crónicos: Para medicamentos de uso habitual o crónico, presentá la Ficha de Tratamiento Prolongado en la secretaría del DSS. Cuenta con una validez de 6 meses y automatiza el expendio directo en farmacia sin trámites adicionales.',
        'Vademécum Oficial: Incluye las principales monodrogas y presentaciones comerciales aprobadas.',
        'Doble Cobertura Complementaria: Sumá descuentos si contás con otra obra social o prepaga.'
      ],
      steps: [
        { 
          step: 1, 
          title: 'Prescripción Médica', 
          desc: 'Obtené la Receta Médica (física o digital) emitida por tu profesional de salud.' 
        },
        { 
          step: 2, 
          title: 'Compra en Mostrador (60% Descuento)', 
          desc: 'Acreditá tu identidad en cualquier farmacia adherida con tu N° de Matrícula Profesional o DNI para aplicar el 60% de descuento directo (abonás el 40% restante).' 
        },
        { 
          step: 3, 
          title: 'Tratamientos Prolongados / Crónicos', 
          desc: 'Presentá en la secretaría del DSS la Ficha de Tratamiento Prolongado (validez de 6 meses) para automatizar el expendio directo sin trámites adicionales.' 
        }
      ],
      faqs: [
        { q: '¿Cómo opera la doble cobertura con otra obra social?', a: 'Podés comprar beneficiándote de ambos descuentos. Confeccionás la orden según requerimientos de tu otra obra social y presentás ambas credenciales en la farmacia.' },
        { q: '¿Qué cantidades de medicamentos se reconocen por receta?', a: 'Hasta 2 productos distintos por receta, hasta 2 envases chicos o 1 grande.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Buscador de Farmacias y Vademécum',
      quickActionTarget: 'vademecum'
    }
  },
  {
    id: 'anticonceptivas',
    buttonNumber: 6,
    title: 'Pastillas anticonceptivas',
    verbTitle: 'Cobertura de anticonceptivos',
    shortDesc: 'Cobertura del 60% con receta médica en farmacias convenidas o 100% con Ficha Electrónica de Anticoncepción previa y vigente.',
    iconName: 'HeartPulse',
    colorClass: {
      bg: 'bg-white',
      border: 'border-rose-100',
      text: 'text-rose-900',
      hover: 'hover:border-rose-400 hover:shadow-xl',
      iconBg: 'bg-rose-600 text-white'
    },
    details: {
      summary: 'La cobertura de medicamentos anticonceptivos puede gestionarse de dos maneras: Con receta médica (60% de cobertura en farmacias convenidas según el listado) o Con Ficha Electrónica de Anticoncepción (100% de cobertura mediante ficha confeccionada por su ginecólogo/a y aprobada previamente por la Obra Social).',
      highlights: [
        'Con Receta Médica (60%): Cobertura del 60% adquiridos en farmacias convenidas, mediante la receta correspondiente y de acuerdo con el listado incluido.',
        'Con Ficha Electrónica (100%): Cobertura del 100% mediante ficha electrónica confeccionada por médico/a ginecólogo/a y aprobada por la Obra Social.',
        'Sin Receta Adicional con Ficha Vigente: Una vez aprobada y vigente, no es necesario presentar receta adicional para cada dispensa.',
        'Importante: La cobertura del 100% requiere que la ficha electrónica haya sido previamente confeccionada, aprobada y se encuentre vigente.'
      ],
      steps: [
        { 
          step: 1, 
          title: 'Con Receta Médica (60%)', 
          desc: 'Presentá tu receta médica en farmacias convenidas para acceder a la cobertura del 60% de los medicamentos incluidos.' 
        },
        { 
          step: 2, 
          title: 'Con Ficha Electrónica (100%)', 
          desc: 'Solicitá a tu médico/a ginecólogo/a la confección de la ficha electrónica de anticoncepción para su evaluación y aprobación previa por la Obra Social.' 
        },
        { 
          step: 3, 
          title: 'Retiro con Ficha Vigente', 
          desc: 'Con la ficha aprobada y vigente, el anticonceptivo indicado contará con 100% de cobertura sin requerir recetas adicionales para cada dispensa.' 
        }
      ],
      faqs: [
        { q: '¿Cómo obtengo el 60% de cobertura en anticonceptivos?', a: 'Los anticonceptivos tienen una cobertura del 60% cuando son adquiridos en farmacias convenidas, mediante la correspondiente receta médica y de acuerdo con el listado de medicamentos incluidos en la cobertura.' },
        { q: '¿Cómo accedo a la cobertura del 100% en anticonceptivos?', a: 'El afiliado puede acceder a una cobertura del 100% mediante una ficha electrónica confeccionada por su médico/a ginecólogo/a. Una vez aprobada por la Obra Social y vigente, contará con 100% de cobertura sin necesidad de receta adicional mientras permanezca vigente.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Ver Vademécum de Anticonceptivos',
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
      summary: 'Gestioná la autorización de tus estudios y prácticas presentando la prescripción médica oficial o la ficha correspondiente (Solicitud de Prescripción / Autorización Médica, Ficha Odontológica Oficial o Solicitud de Cobertura en Ortodoncia).',
      highlights: [],
      steps: [
        {
          step: 1,
          title: 'Formulario / Indicación Médica',
          desc: 'Completá junto a tu profesional la Solicitud de Prescripción Médica (pmedica.pdf), Ficha Odontológica u Ortodoncia.'
        },
        {
          step: 2,
          title: 'Envío por WhatsApp',
          desc: 'Enviá la foto del formulario completo al [WhatsApp (342) 510-5675](https://wa.me/5493425105675).'
        },
        {
          step: 3,
          title: 'Procesamiento',
          desc: 'Auditoría Médica procesará la solicitud y recibirás la autorización digital en tu celular.'
        }
      ],
      faqs: [
        { q: '¿Cuál es el canal oficial para enviar la indicación médica?', a: 'El único canal habilitado es el WhatsApp (342) 510-5675 en el horario de Lunes a viernes de 7 a 15 hs.' }
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
      relatedFormIds: [],
      quickActionLabel: 'Ir al Centro de Formularios',
      quickActionTarget: 'formularios'
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
      summary: 'Al autorizar una práctica médica, el DSS cubre el porcentaje correspondiente y registra la diferencia restante como coseguro en tu cuenta corriente. No debés realizar pagos directos en los centros de atención.',
      highlights: [
        'Funcionamiento del coseguro: El saldo restante se incorpora automáticamente a la cuenta corriente del afiliado.',
        'Sin cobro en el acto: No es necesario abonar importes en clínicas o sanatorios al momento de la prestación.',
        'Liquidación en cuota mensual: El coseguro se incluye en tu cuota del mes siguiente.'
      ],
      steps: [
        { step: 1, title: 'Práctica Autorizada', desc: 'El DSS cubre el porcentaje correspondiente según tu plan (70% Plan General / 60% Plan Básico).' },
        { step: 2, title: 'Atención Sin Abono Directo', desc: 'No es necesario abonar importes en clínicas, sanatorios o centros médicos.' },
        { step: 3, title: 'Liquidación Mensual', desc: 'El saldo restante se liquida en tu factura del mes siguiente.' }
      ],
      faqs: [
        { q: '¿Debo abonar algo en la clínica o centro médico al momento de la prestación?', a: 'No, el coseguro se liquida en tu factura mensual del DSS.' }
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
      summary: 'El DSS ofrece esquemas de cobertura diferenciados según tu plan (General o Básico). Para solicitar el cambio entre planes, utilizá el formulario de Solicitud de Cambio de Plan de Cobertura.',
      highlights: [
        'Formulario de Cambio de Plan: Solicitud de Cambio de Plan de Cobertura (Cambio de Plan.pdf).',
        'Plan General: Cobertura del 70% en prácticas médicas y 100% en internación.',
        'Plan Básico: Cobertura del 60% en prácticas médicas y 80% en internación.',
        'Medicamentos: Cobertura del 60% en ambos planes para Vademécum.'
      ],
      steps: [
        { 
          step: 1, 
          title: 'Verificar Plan Activo', 
          desc: 'Consultá tu plan de cobertura activo con la administración del DSS.' 
        },
        { 
          step: 2, 
          title: 'Cambio de Plan', 
          desc: 'Si deseás modificar tu plan, descargá y completá la Solicitud de Cambio de Plan de Cobertura en la sección Formularios.' 
        }
      ],
      faqs: [
        { q: '¿Cómo sé a qué plan estoy adherido?', a: 'Podés consultar tu plan activo poniéndote en contacto con la administración del DSS o revisándolo en tus recibos de aportes.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Preguntar al Asistente Virtual',
      quickActionTarget: 'asistente'
    }
  },
  {
    id: 'pagos',
    buttonNumber: 10,
    title: 'Medios de pago',
    verbTitle: '¿Cómo pagar mi cuota?',
    shortDesc: 'Información sobre cuotas, débito automático, homebanking, botón de pago y subsidios.',
    iconName: 'CreditCard',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-blue-900 text-white'
    },
    details: {
      summary: 'Conocé las alternativas de pago de tu cuota de afiliación y coseguros. Además, para tramitar reintegros especiales o guarderías, utilizá la Solicitud de Subsidio por Guardería.',
      highlights: [
        'Débito Automático en CBU (Banco Macro, Santa Fe, Nación, otros) o Tarjeta de Crédito. Para poder adherir el pago de las obligaciones mensuales al débito automático de su cuenta bancaria de la entidad financiera de la que usted sea cliente, deberá ingresar en el [Software Profesional](http://contadores.org.ar/php/login.php), opción Cuentas Corrientes / Débitos Automáticos y completar el formulario, indicando los conceptos que desea que se debiten. Luego debe imprimir, firmar, escanear y enviar el formulario a claudio@cpn.org.ar',
        'Pago de DSS por Home Banking / Red Link:\n\n• Ingresá a Pagos → Asociaciones y Clubes.\n• Seleccioná Caja Seg Social Prof Cs Es Santa Fe Camara Primera.\n• Ingresá tu Código de Pago Link: matrícula sin guion, anteponiendo los ceros correspondientes.\n  Ej.: matrícula 01-1234 → 010001234.\n• Luego Confirmá el pago.\n\nRed Banelco / Pago Mis Cuentas:\n\n• Rubro Clubes y Asociaciones → Caja CS Económicas SF → ingresá el mismo código matrícula sin guion, anteponiendo los ceros correspondientes.\n  Ej.: matrícula 01-1234 → 010001234.',
        'Botón de Pago Web desde la Autogestión del Consejo: Ingresá en el [Software Profesional](http://contadores.org.ar/php/login.php), pestaña Cuentas Corrientes → Botón de Pago Integral.'
      ],
      steps: [
        { step: 1, title: 'Elegí el medio de pago', desc: 'Recomendamos adherir al Débito Automático para evitar vencimientos.' },
        { step: 2, title: 'Tramitar Subsidios', desc: 'Para subsidio por guardería, completá la Solicitud de Subsidio por Guardería y adjuntá la factura correspondiente.' },
        { step: 3, title: 'Comprobante de Pago', desc: 'Obtené el comprobante apto para deducción en Impuesto a las Ganancias.' }
      ],
      faqs: [
        { q: '¿Puedo deducir las aportaciones del DSS en Impuesto a las Ganancias?', a: 'Sí, la cuota del DSS es computable como gasto médico deducción cuota obra social/prepaga conforme a la normativa de AFIP/ARCA.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Ir al Centro de Formularios',
      quickActionTarget: 'formularios'
    }
  },
  {
    id: 'contacto',
    buttonNumber: 11,
    title: 'Contacto',
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
      summary: 'Si aún no pudiste resolver tu duda o requerís una gestión asistida, nuestro equipo está a tu disposición por múltiples vías de atención presencial y digital.',
      highlights: [
        'Sede Central: San Lorenzo 1849 – Santa Fe – Cámara I',
        'Horario de Atención: Lunes a viernes | 7 a 15 hs',
        'Contacto WhatsApp: WA (342) 510-5675 (https://wa.me/5493425105675)',
        'Web: cpcesfe1.org.ar',
        'Correo Electrónico: dss@cpn.org.ar'
      ],
      faqs: [
        { q: '¿Adónde llamo en caso de una urgencia médica fuera del horario administrativo?', a: 'Comunicate directamente con la guardia del sanatorio contratado indicando tu número de matrícula DSS, o al servicio de emergencias médicas contratado.' }
      ],
      relatedFormIds: [],
      quickActionLabel: 'Enviar WhatsApp de Contacto',
      quickActionTarget: 'https://wa.me/5493425105675'
    }
  },
  {
    id: 'cuotas',
    buttonNumber: 12,
    title: 'Valores de cuota',
    verbTitle: 'Consultar valores de cuota',
    shortDesc: 'Consultá los valores actualizados de cuotas mensuales y coseguros del DSS.',
    iconName: 'CreditCard',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-blue-600 text-white'
    },
    details: {
      summary: 'Accedé a la tabla actualizada con los valores vigentes de la cuota mensual del Departamento de Servicios Sociales (DSS) para el Plan General y Plan Básico, así como el esquema de coseguros.',
      highlights: [
        'Valores Oficiales: Cuotas mensuales actualizadas para titulares y grupo familiar.',
        'Esquema de Planes: Consulta detallada según Plan General y Plan Básico.',
        'Acceso Directo: Accedé al detalle completo en la sección oficial de cuotas.'
      ],
      relatedFormIds: [],
      quickActionLabel: 'Consultá valores de cuota aquí',
      quickActionTarget: 'https://dss.contadores.org.ar/cuotas'
    }
  }
];

export const FORMS_DATA: FormItem[] = [
  {
    id: 'FORM-01',
    code: 'DSS-FORM-01',
    title: 'Solicitud de Afiliación Directa',
    category: 'Afiliación',
    description: 'Formulario oficial de incorporación e inscripción al Departamento de Servicios Sociales (DSS) para matriculados.',
    requiredDocs: ['Fotocopia de DNI (frente y dorso)', 'Constancia de matriculación emitida por CPCE Santa Fe Cámara I'],
    estimatedDays: '24 a 48 hs hábiles',
    isFillable: false,
    fileUrl: '/formularios/afiliacion.pdf'
  },
  {
    id: 'FORM-02',
    code: 'DSS-FORM-02',
    title: 'Declaración Jurada de Salud',
    category: 'Afiliación',
    description: 'Declaración jurada obligatoria de antecedentes médicos de salud para el titular y su grupo familiar a incorporar.',
    requiredDocs: ['Firmado por el titular matriculado', 'Estudios médicos complementarios (si corresponde)'],
    estimatedDays: '24 a 48 hs hábiles',
    isFillable: false,
    fileUrl: '/formularios/Formulario DD JJ Salud.pdf'
  },
  {
    id: 'FORM-03',
    code: 'DSS-FORM-03',
    title: 'Actualización de Datos Personales y Familiares',
    category: 'Afiliación',
    description: 'Formulario para actualizar datos de contacto, grupo familiar, estado civil o información personal en el DSS.',
    requiredDocs: ['Documentación respaldatoria del cambio (DNI, actas, etc.)'],
    estimatedDays: '24 a 48 hs hábiles',
    isFillable: false,
    fileUrl: '/formularios/Actualizacion de datos DSS.pdf'
  },
  {
    id: 'FORM-04',
    code: 'DSS-FORM-04',
    title: 'Declaración de Cambio de Domicilio',
    category: 'Afiliación',
    description: 'Trámite de notificación y cambio de domicilio particular o laboral para actualización en la base del DSS.',
    requiredDocs: ['Constancia o certificado de domicilio / Servicio a su nombre'],
    estimatedDays: '24 hs hábiles',
    isFillable: false,
    fileUrl: '/formularios/Cambio de Domicilio.pdf'
  },
  {
    id: 'FORM-05',
    code: 'DSS-FORM-05',
    title: 'Solicitud de Cambio de Plan de Cobertura',
    category: 'Afiliación',
    description: 'Formulario para solicitar la modificación o pase entre los distintos planes de salud del DSS.',
    requiredDocs: ['Nota firmada por el titular solicitando la modificación del plan'],
    estimatedDays: '48 a 72 hs hábiles',
    isFillable: false,
    fileUrl: '/formularios/Cambio de Plan.pdf'
  },
  {
    id: 'FORM-06',
    code: 'DSS-FORM-06',
    title: 'Solicitud de Prescripción / Autorización Médica',
    category: 'Autorizaciones',
    description: 'Formulario para la solicitud y autorización previa de prestaciones médicas, estudios y prácticas complejas.',
    requiredDocs: ['Orden o prescripción médica del profesional tratante'],
    estimatedDays: '24 a 48 hs hábiles',
    isFillable: false,
    fileUrl: '/formularios/pmedica.pdf'
  },
  {
    id: 'FORM-07',
    code: 'DSS-FORM-07',
    title: 'Solicitud de Cobertura Oncológica',
    category: 'Medicamentos',
    description: 'Formulario especial para la auditoría médica y provisión de medicamentos y tratamientos de oncología con cobertura especial.',
    requiredDocs: ['Resumen de Historia Clínica elaborado por oncólogo tratante', 'Protocolo del tratamiento prescripto'],
    estimatedDays: '48 a 72 hs hábiles (Auditoría Médica)',
    isFillable: false,
    fileUrl: '/formularios/oncologia.pdf'
  },
  {
    id: 'FORM-08',
    code: 'DSS-FORM-08',
    title: 'Ficha Odontológica Oficial',
    category: 'Autorizaciones',
    description: 'Planilla para registro de odontograma, diagnóstico y solicitud de prácticas odontológicas en prestadores de convenio.',
    requiredDocs: ['Completado y firmado por el odontólogo prestador'],
    estimatedDays: 'Inmediato / Auditoría según práctica',
    isFillable: false,
    fileUrl: '/formularios/Ficha odontologica.pdf'
  },
  {
    id: 'FORM-09',
    code: 'DSS-FORM-09',
    title: 'Solicitud de Cobertura en Ortodoncia',
    category: 'Autorizaciones',
    description: 'Formulario de auditoría médica para inicio y plan de tratamiento ortodóncico de afiliados.',
    requiredDocs: ['Diagnóstico del especialista ortodoncista', 'Estudios cefalométricos y trazados iniciales'],
    estimatedDays: '3 a 5 días hábiles',
    isFillable: false,
    fileUrl: '/formularios/ortodoncia.pdf'
  },
  {
    id: 'FORM-10',
    code: 'DSS-FORM-10',
    title: 'Solicitud de Subsidio por Guardería',
    category: 'Subsidios',
    description: 'Solicitud de reintegro o subsidio por gastos de guardería e institución maternal para hijos de afiliados.',
    requiredDocs: ['Factura / Recibo oficial de la institución educativa o guardería', 'Partida de nacimiento del menor'],
    estimatedDays: '5 a 7 días hábiles',
    isFillable: false,
    fileUrl: '/formularios/guarderia.pdf'
  }
];

export const MEDICAL_PROVIDERS: MedicalProvider[] = [];

export const PHARMACIES_DATA: Pharmacy[] = [
  { id: 'ph1', name: 'Farmacia del Consejo (Sede)', city: 'Santa Fe', address: 'San Lorenzo 1849', phone: 'WA (342) 510-5675', discount: '40% Directo / 70% Crónicos', hasRecetaDigital: true },
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

export interface PlanComparisonItem {
  category: string;
  prestacion: string;
  descripcion: string;
  planGeneral: string;
  planBasico: string;
  carencia: string;
}

export const PLANES_COMPARATIVE_DATA: PlanComparisonItem[] = [
  // 1. CONSULTAS Y DIAGNÓSTICO DE BAJA COMPLEJIDAD
  { category: 'Consultas y Baja Complejidad', prestacion: 'Consultas Consultorio / Domicilio', descripcion: 'Atención médica general y especializada en consultorio o domicilio', planGeneral: 'V. Modulado (100%)', planBasico: 'V. Modulado (100%)', carencia: '3 Meses' },
  { category: 'Consultas y Baja Complejidad', prestacion: 'Diagnóstico y Tratamiento de Baja Complejidad', descripcion: 'Autorización Previa / Coseguro', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Consultas y Baja Complejidad', prestacion: 'Laboratorio de Análisis Clínicos', descripcion: 'Análisis clínicos de rutina y especiales', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Consultas y Baja Complejidad', prestacion: 'Radiología', descripcion: 'Estudios radiológicos convencionales', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Consultas y Baja Complejidad', prestacion: 'Kinesiología / Fisiatría', descripcion: 'Tope: 20 sesiones anuales', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Consultas y Baja Complejidad', prestacion: 'Ecografías Generales', descripcion: 'Ecografías generales y ginecológicas', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Consultas y Baja Complejidad', prestacion: 'Tratamiento Esclerosante', descripcion: 'Tope: 08 sesiones por única vez', planGeneral: '70%', planBasico: 'Sin Cobertura', carencia: '3 Meses' },

  // 2. PREVENCIÓN Y CHEQUEO ANUAL
  { category: 'Prevención y Chequeo Anual', prestacion: 'Chequeo Preventivo Anual', descripcion: 'Autorización 100% cobertura 1ª práctica del año', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Prevención y Chequeo Anual', prestacion: 'Colposcopía y Papanicolaou', descripcion: 'Exámenes ginecológicos preventivos anuales', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Prevención y Chequeo Anual', prestacion: 'Senografías (Mamografía)', descripcion: 'Mujeres desde los 35 años', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Prevención y Chequeo Anual', prestacion: 'PSA (Antígeno Prostático)', descripcion: 'Hombres mayores a 45 años', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Prevención y Chequeo Anual', prestacion: 'Ecografía Prostática', descripcion: 'Hombres mayores a 45 años', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },

  // 3. DIAGNÓSTICO Y TRATAMIENTO DE ALTA COMPLEJIDAD
  { category: 'Diagnóstico de Alta Complejidad', prestacion: 'Tomografía Axial Computada (TAC)', descripcion: 'Autorización Previa / Coseguro', planGeneral: '70%', planBasico: '60%', carencia: '6 Meses' },
  { category: 'Diagnóstico de Alta Complejidad', prestacion: 'Resonancia Magnética Nuclear (RMN)', descripcion: 'Autorización Previa / Coseguro', planGeneral: '70%', planBasico: '60%', carencia: '6 Meses' },
  { category: 'Diagnóstico de Alta Complejidad', prestacion: 'Cámara Gamma', descripcion: 'Estudios de medicina nuclear con autorización previa', planGeneral: '70%', planBasico: '60%', carencia: '6 Meses' },
  { category: 'Diagnóstico de Alta Complejidad', prestacion: 'Densitometría Ósea', descripcion: 'Autorización Previa / Coseguro', planGeneral: '70%', planBasico: '60%', carencia: '6 Meses' },
  { category: 'Diagnóstico de Alta Complejidad', prestacion: 'PET (Tomografía por Emisión de Positrones)', descripcion: 'Autorización Previa / Coseguro', planGeneral: '50%', planBasico: '50%', carencia: '6 Meses' },

  // 4. ESPECIALIDADES Y SALUD MENTAL
  { category: 'Especialidades y Salud Mental', prestacion: 'Neurología', descripcion: 'Autorización Previa / Coseguro', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Especialidades y Salud Mental', prestacion: 'Alergia', descripcion: 'Reintegro / Determinado por Auditoría Médica', planGeneral: 'Según Reglamento', planBasico: 'Según Reglamento', carencia: '3 Meses' },
  { category: 'Especialidades y Salud Mental', prestacion: 'Nefrología', descripcion: 'Autorización Previa / Coseguro', planGeneral: '100%', planBasico: '100%', carencia: '3 Meses' },
  { category: 'Especialidades y Salud Mental', prestacion: 'Psiquiatría', descripcion: 'Reintegro valor consulta. Tope 6 anuales', planGeneral: '100%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Especialidades y Salud Mental', prestacion: 'Psicología y Psicopedagogía', descripcion: 'Individual / Familiar / Grupal (Tope 20 anuales) / Pruebas psicométricas', planGeneral: '50%', planBasico: '40%', carencia: '3 Meses' },
  { category: 'Especialidades y Salud Mental', prestacion: 'Fonoaudiología', descripcion: 'Autorización / Tope: 30 sesiones anuales', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },

  // 5. MEDICAMENTOS Y VACUNAS
  { category: 'Medicamentos y Vacunas', prestacion: 'Medicamentos en Farmacias Adheridas', descripcion: 'Colegio de Farmacéuticos / Descuento directo', planGeneral: '60%', planBasico: 'Según Convenio', carencia: '3 Meses' },
  { category: 'Medicamentos y Vacunas', prestacion: 'Vacunas', descripcion: 'Reintegro. Límite según Reglamento', planGeneral: '50%', planBasico: 'Sin Cobertura', carencia: 'Sin carencia' },

  // 6. ASISTENCIA SANATORIAL E INTERNACIONES
  { category: 'Asistencia Sanatorial e Internaciones', prestacion: 'Asistencia Sanatorial (Internaciones)', descripcion: 'Honorarios, pensión y gastos. Autorización Previa / Coseguro', planGeneral: '100%', planBasico: '80%', carencia: '3 Meses' },
  { category: 'Asistencia Sanatorial e Internaciones', prestacion: 'Habitación Privada', descripcion: 'Por Reintegro - 3 Días', planGeneral: '100%', planBasico: '80%', carencia: '3 Meses' },
  { category: 'Asistencia Sanatorial e Internaciones', prestacion: 'Intervenciones Quirúrgicas', descripcion: 'Ambulatorio / Internación', planGeneral: '100%', planBasico: '80%', carencia: '6 a 12 Meses' },

  // 7. SALUD NUTRICIONAL, MATERNO Y ORTOPEDIA
  { category: 'Salud Nutricional, Materno y Ortopedia', prestacion: 'Nutrición', descripcion: 'Autorización / Coseguro', planGeneral: '70%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Salud Nutricional, Materno y Ortopedia', prestacion: 'Plan Materno Infantil', descripcion: 'Coversión 100% embarazo y 1er año del bebé (Según Reglamento)', planGeneral: '100%', planBasico: '100%', carencia: '3 Meses' },
  { category: 'Salud Nutricional, Materno y Ortopedia', prestacion: 'Traumatología, Prótesis y Órtesis', descripcion: 'Provisión / Reintegro menor presupuesto', planGeneral: '60%', planBasico: '40%', carencia: '6 Meses' },
  { category: 'Salud Nutricional, Materno y Ortopedia', prestacion: 'Alquiler de Elementos Ortopédicos', descripcion: 'Sillas de ruedas, muletas, elementos de rehabilitación', planGeneral: '60%', planBasico: '40%', carencia: '6 Meses' },
  { category: 'Salud Nutricional, Materno y Ortopedia', prestacion: 'Audífonos', descripcion: 'Con tope según presupuesto y auditoría', planGeneral: 'Según Reglamento', planBasico: 'Según Reglamento', carencia: '6 Meses' },
  { category: 'Salud Nutricional, Materno y Ortopedia', prestacion: 'Ambulancia y Traslados', descripcion: 'Traslados de urgencia / Reintegros', planGeneral: '30%', planBasico: 'Sin Cobertura', carencia: '3 Meses' },

  // 8. ODONTOLOGÍA Y VISIÓN
  { category: 'Odontología y Salud Visual', prestacion: 'Afiliados con Cobertura Especial', descripcion: 'Valor Modulado', planGeneral: '100%', planBasico: '100%', carencia: '6 Meses' },
  { category: 'Odontología y Salud Visual', prestacion: 'Odontología - Dentistería', descripcion: 'Reintegros - Padrón por Autorización Coseguro', planGeneral: '70%', planBasico: '70%', carencia: '6 Meses' },
  { category: 'Odontología y Salud Visual', prestacion: 'Odontología - Prótesis', descripcion: 'Reintegros según arancel', planGeneral: '50%', planBasico: 'Sin Cobertura', carencia: '6 Meses' },
  { category: 'Odontología y Salud Visual', prestacion: 'Odontología - Ortodoncia', descripcion: 'Reintegros - Según Reglamento', planGeneral: '70%', planBasico: 'Sin Cobertura', carencia: '6 Meses' },
  { category: 'Odontología y Salud Visual', prestacion: 'Óptica', descripcion: 'Anteojos recetados cada dos años', planGeneral: '100%', planBasico: '60%', carencia: '3 Meses' },
  { category: 'Odontología y Salud Visual', prestacion: 'Exímer Láser (Cirugía Refractiva)', descripcion: 'Por reintegro - Valor Modulado segun dioptrías (2.5 a +6 D)', planGeneral: '50% a 100%', planBasico: 'Sin Cobertura', carencia: '12 Meses' },

  // 9. TRATAMIENTOS ESPECIALES Y SUBSIDIOS
  { category: 'Tratamientos Especiales y Subsidios', prestacion: 'Tratamiento Oncológico', descripcion: 'Pensión, Honorarios, Gastos y Terapia Radiante (Autorización Previa)', planGeneral: '100%', planBasico: '100%', carencia: '12 Meses' },
  { category: 'Tratamientos Especiales y Subsidios', prestacion: 'Subsidios Familiares y Guarderías', descripcion: 'Módulo Fijo por reintegro', planGeneral: '100%', planBasico: 'Sin Cobertura', carencia: '12 Meses' },
  { category: 'Tratamientos Especiales y Subsidios', prestacion: 'Celiaquía (Alimentos sin TACC)', descripcion: 'Subsidio mensual según ley nacional', planGeneral: '100%', planBasico: '100%', carencia: 'Sin carencia' },
  { category: 'Tratamientos Especiales y Subsidios', prestacion: 'Servicio de Sepelio', descripcion: 'Cobertura directa o subsidio por fallecimiento', planGeneral: '100%', planBasico: '100%', carencia: '6 Meses' },
  { category: 'Tratamientos Especiales y Subsidios', prestacion: 'Fertilización Asistida', descripcion: 'Módulo Fijo según reglamento', planGeneral: '100%', planBasico: '60%', carencia: '6 Meses' },
  { category: 'Tratamientos Especiales y Subsidios', prestacion: 'Coseguro Otra Obra Social', descripcion: 'Prácticas reconocidas por DSS por Reintegro', planGeneral: 'Según Reintegro', planBasico: 'Según Reintegro', carencia: 'Carencia DSS' }
];
