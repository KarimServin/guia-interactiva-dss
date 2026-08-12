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
      content: "El Departamento de Servicios Sociales (DSS) es un sistema solidario de cobertura de salud creado y sostenido por los profesionales matriculados del Consejo Profesional de Ciencias Económicas de Santa Fe – Cámara I.",
      note: "La afiliación es automática al momento de la matriculación del profesional (hasta los 50 años de edad)."
    },
    {
      id: "soy-afiliado",
      title: "SOY AFILIADO",
      icon: "UserCheck",
      content: "Tu número de matrícula funciona como identificación dentro del DSS. No es obligatorio contar con credencial física. También podés acceder a una credencial digital desde la App Institucional del Consejo o esta misma Guía.",
      note: "Alternativas: Mi número de afiliado / ¿Cuál es mi número de afiliado?"
    },
    {
      id: "grupo-familiar",
      title: "MI GRUPO FAMILIAR",
      icon: "Users",
      content: "Cada integrante posee una extensión vinculada a la matrícula titular:\n• Cónyuge: Matrícula + 01\n• Hijos: Matrícula + 11, 12, 13, etc., según el orden de incorporación.",
      note: "Hijos cubiertos hasta 21 años (o 25 con certificado regular universitario)."
    }
  ]
};

export const ACTION_MODULES: ActionModule[] = [
  {
    id: 'medicos',
    buttonNumber: 1,
    title: 'Consultas médicas',
    verbTitle: 'Necesito atenderme con un médico',
    shortDesc: 'Atención médica con tu matrícula, profesionales en cartilla, guardias y consultas sin orden física.',
    iconName: 'Stethoscope',
    colorClass: {
      bg: 'bg-white',
      border: 'border-blue-100',
      text: 'text-blue-900',
      hover: 'hover:border-blue-400 hover:shadow-xl',
      iconBg: 'bg-blue-600 text-white'
    },
    details: {
      summary: 'Para consultas médicas con profesionales o centros adheridos, solo necesitás informar tu número de matrícula titular o la extensión correspondiente a tu grupo familiar.',
      highlights: [
        'Atención directa en consultorio o sanatorio adherido presentando DNI y N° de Matrícula.',
        'No requiere la presentación de bono físico previa para consultas generales.',
        'Acceso a cartilla médica actualizada de la Cámara I (Santa Fe, Santo Tomé, Rafaela, Reconquista, etc.).',
        'Atención de Guardia y Urgencias las 24 horas en sanatorios contratados.'
      ],
      steps: [
        { step: 1, title: 'Buscá el profesional', desc: 'Consultá nuestra Cartilla Médica filtrando por especialidad y ciudad.' },
        { step: 2, title: 'Agendá el turno', desc: 'Comunicate directamente con el consultorio o sanatorio seleccionado.' },
        { step: 3, title: 'Presentate con tu Matrícula', desc: 'Al momento de ser atendido, indicá tu N° de Matrícula (y extensión si es familiar). El profesional registrará la consulta en el sistema.' }
      ],
      faqs: [
        { q: '¿Necesito comprar un bono en el Consejo antes de ir al médico?', a: 'No, no es necesario comprar bonos previa consulta. El profesional factura directamente al DSS y el valor del coseguro correspondiente se liquida en tu resumen mensual.' },
        { q: '¿Cómo me identifico si no tengo credencial física?', a: 'Únicamente mencionando tu número de Matrícula e indicando que pertenecés al DSS CPCE Santa Fe Cámara I. Si lo preferís, podés mostrar la Credencial Digital desde el teléfono.' }
      ],
      relatedFormIds: ['FORM-01', 'FORM-05'],
      quickActionLabel: 'Ver Cartilla Médica',
      quickActionTarget: 'cartilla'
    }
  },
  {
    id: 'medicamentos',
    buttonNumber: 2,
    title: 'Farmacia y medicamentos',
    verbTitle: 'Quiero comprar medicamentos',
    shortDesc: '40% de descuento en medicamentos de venta con receta y planes de cobertura al 70% o 100%.',
    iconName: 'Pill',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-sky-600 text-white'
    },
    details: {
      summary: 'El DSS ofrece un 40% de descuento automático en medicamentos del Vademécum institucional en la red de farmacias adheridas del Colegio de Farmacéuticos de Santa Fe.',
      highlights: [
        'Descuento directo del 40% en mostrador de farmacias presentando receta médica y N° de Matrícula.',
        'Plan Cronicidad (70% o 100% de cobertura) para patologías crónicas de tratamiento prolongado.',
        'Plan Materno Infantil (PMI): 100% en medicamentos para la embarazada y el bebé hasta el año de vida.',
        'Aceptación de Receta Médica Digital o Impresa con firma profesional.'
      ],
      steps: [
        { step: 1, title: 'Pedí la receta a tu médico', desc: 'Asegurate de que la receta consigne tu N° de Matrícula, fecha, diagnóstico y firma.' },
        { step: 2, title: 'Dirigite a una farmacia adherida', desc: 'Presentá la receta en cualquier farmacia integrada a la red FASAFE / Colegio de Farmacéuticos.' },
        { step: 3, title: 'Recibí el descuento en el acto', desc: 'La farmacia aplicará el 40% de descuento directo en el importe abonado.' }
      ],
      faqs: [
        { q: '¿Cómo tramito la cobertura al 70% por medicamento crónico?', a: 'Debés presentar el Formulario de Solicitud de Cobertura Especial firmado por tu médico tratante en el DSS. Una vez auditado y aprobado, el descuento mayor se aplica directamente en la farmacia.' },
        { q: '¿Qué cubre el Plan Materno Infantil?', a: 'Cubre el 100% de los medicamentos prescriptos para la madre durante el embarazo y hasta 30 días posteriores al parto, y para el bebé hasta el primer año de vida.' }
      ],
      relatedFormIds: ['FORM-03'],
      quickActionLabel: 'Buscador de Farmacias y Cobertura',
      quickActionTarget: 'vademecum'
    }
  },
  {
    id: 'autorizaciones',
    buttonNumber: 3,
    title: 'Estudios, prácticas y odontología',
    verbTitle: 'Necesito autorizar una práctica',
    shortDesc: 'Requisito obligatorio para estudios de alta complejidad, cirugías u odontología especial.',
    iconName: 'ClipboardCheck',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-blue-900 text-white'
    },
    details: {
      summary: 'Ciertas prácticas médicas y odontológicas de mediana o alta complejidad requieren autorización previa de la Auditoría Médica del DSS para garantizar tu cobertura.',
      highlights: [
        'Prácticas SIMPLES (análisis clínicos básicos, Rx simple, ecografías estándar) NO requieren autorización previa.',
        'Prácticas COMPLEJAS (RMN, TAC, Endoscopías, Cirugías, Kinesiología >10 sesiones) SÍ requieren autorización previa.',
        'Trámite 100% digital: podés adjuntar la orden médica desde esta misma web o por WhatsApp institucional.',
        'Respuesta habitual en 24 a 48 horas hábiles.'
      ],
      steps: [
        { step: 1, title: 'Tomá foto de la orden médica', desc: 'Verificá que se lea claramente el diagnóstico, solicitud y datos del profesional prescriptor.' },
        { step: 2, title: 'Enviá la solicitud digital', desc: 'Ingresá al módulo de Solicitud de Autorización Online en esta guía o por correo a dss@cpcesfe1.org.ar.' },
        { step: 3, title: 'Recibí la orden autorizada', desc: 'Te notificaremos por e-mail o WhatsApp con el comprobante de autorización para presentar en el centro médico.' }
      ],
      faqs: [
        { q: '¿Tiene vencimiento la orden médica autorizada?', a: 'Sí, la autorización tiene una validez de 30 días corridos a partir de la fecha de aprobación.' },
        { q: '¿Qué hago si la práctica es de urgencia?', a: 'En urgencias sanatoriales, la autorización es gestionada internamente por la oficina de admisión del sanatorio contratado.' }
      ],
      relatedFormIds: ['FORM-04', 'FORM-05'],
      quickActionLabel: 'Simulador de Autorización Online',
      quickActionTarget: 'autorizador'
    }
  },
  {
    id: 'coseguros',
    buttonNumber: 4,
    title: 'Coseguros',
    verbTitle: 'Acerca de los coseguros',
    shortDesc: 'Información sobre el sistema solidario, tabla de coseguros y modo de liquidación.',
    iconName: 'DollarSign',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-sky-600 text-white'
    },
    details: {
      summary: 'El coseguro es un arancel moderador del sistema solidario de salud. Permite mantener aportes accesibles y evitar el sobreuso de prestaciones.',
      highlights: [
        'Los coseguros no se abonan al médico en efectivo salvo excepciones informadas expresamente.',
        'Se incluyen en la liquidación mensual de gastos de matrícula emitida por el Consejo.',
        'Los montos están fijados según la arancelaria oficial del DSS y se actualizan periódicamente.',
        'Coseguro $0 para programas especiales como Control del Niño Sano, Embarazo y Enfermedades Crónicas en programa.'
      ],
      steps: [
        { step: 1, title: 'Realizás la atención', desc: 'El prestador registra la consulta o estudio con tu número de matrícula.' },
        { step: 2, title: 'Procesamiento en DSS', desc: 'Auditoría registra el coseguro reglamentario asignado a la práctica.' },
        { step: 3, title: 'Abonás en tu resumen', desc: 'Verificás el detalle en tu resumen mensual del Consejo y pagás por tu medio habitual.' }
      ],
      faqs: [
        { q: '¿El médico puede cobrarme un plus o adicional en el consultorio?', a: 'No. Ningún prestador en cartilla está autorizado a cobrar montos adicionales no estipulados por el DSS. Si ocurre, podés realizar el reclamo en el Departamento.' },
        { q: '¿Dónde consulto el detalle de los coseguros liquidados?', a: 'En el Portal de Autogestión del Consejo o descargando el detalle de facturación mensual.' }
      ],
      relatedFormIds: ['FORM-05'],
      quickActionLabel: 'Ver Tabla de Coseguros',
      quickActionTarget: 'coseguro-tabla'
    }
  },
  {
    id: 'cobertura',
    buttonNumber: 5,
    title: 'Prácticas y medicamentos',
    verbTitle: 'Consultas sobre mi cobertura',
    shortDesc: 'Aclará todas tus dudas sobre planes, alcance del PMO, prótesis, internación y reciprocidad nacional.',
    iconName: 'ShieldCheck',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-blue-900 text-white'
    },
    details: {
      summary: 'Resolver inmediatamente cualquier duda sobre los límites, porcentajes de cobertura y prestadores disponibles para garantizar tu tranquilidad médica.',
      highlights: [
        'Internación Sanatorial: Cobertura del 100% en sanatorios en convenio en habitación compartida o individual según indicación auditada.',
        'Salud Mental y Psicología: Sesiones con profesionales en cartilla con coseguro reducido.',
        'Prótesis y Órtesis: 100% de cobertura en prótesis de origen nacional requeridas por indicación médica.',
        'Reciprocidad Nacional: Cobertura médica mediante convenios con Consejos de Ciencias Económicas de todo el país durante viajes o traslados.'
      ],
      faqs: [
        { q: '¿Qué debo hacer si viajo a otra provincia argentina?', a: 'Solicitá en la secretaría del DSS la Carta de Reciprocidad Nacional antes de viajar. Ante cualquier eventualidad médica, serás atendido por la obra social del Consejo local.' },
        { q: '¿Cómo funciona la cobertura en Odontología?', a: 'Incluye consultas, arreglos, extracciones y odontopediatría con prestadores del Colegio de Odontólogos. Prácticas complejas como prótesis u ortodoncia tienen aranceles diferenciados en convenio.' }
      ],
      relatedFormIds: ['FORM-01', 'FORM-04'],
      quickActionLabel: 'Preguntar al Asistente Virtual',
      quickActionTarget: 'asistente'
    }
  },
  {
    id: 'grupofamiliar',
    buttonNumber: 6,
    title: 'Cobertura del grupo familiar',
    verbTitle: 'Mi grupo familiar',
    shortDesc: 'Inclusión de cónyuge, convivencia, hijos e hijas. Extensiones +01, +11, +12...',
    iconName: 'Users',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-sky-600 text-white'
    },
    details: {
      summary: 'Permite incorporar a tu cónyuge o conviviente e hijos con una extensión vinculada a tu número de matrícula titular.',
      highlights: [
        'Cónyuge / Conviviente: Código de extensión Matrícula + 01.',
        'Hijos e hijas: Código de extensión Matrícula + 11 (primer hijo), +12 (segundo hijo), +13 (tercer hijo), etc.',
        'Cobertura de hijos hasta los 21 años de edad.',
        'Prórroga hasta los 25 años inclusive si cursan estudios superiores/universitarios de forma regular.'
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
    id: 'pagos',
    buttonNumber: 7,
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
    buttonNumber: 8,
    title: 'Canales de contacto',
    verbTitle: 'Contacto y ayuda',
    shortDesc: 'Atención personalizada, WhatsApp de urgencias, dirección de la sede y horarios de atención.',
    iconName: 'Headphones',
    colorClass: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-blue-900',
      hover: 'hover:border-sky-500 hover:shadow-md',
      iconBg: 'bg-sky-600 text-white'
    },
    details: {
      summary: 'Si aún no pudiste resolver tu duda o requerís una gestión asistida, nuestro equipo está a tu disposición por múltiples vías.',
      highlights: [
        'Sede Central: San Lorenzo 1849 – Santa Fe – Cámara I',
        'Horario de Atención: Lunes a viernes | 7 a 15 hs',
        'Contacto WhatsApp: WA 3425 10-5675',
        'Web: cpcesfe1.org.ar',
        'Más información en: cpcesfe1.org.ar',
        'Correo Electrónico: dss@cpcesfe1.org.ar'
      ],
      faqs: [
        { q: '¿Adónde llamo en caso de una urgencia médica fuera del horario administrativo?', a: 'Comunicate directamente con la guardia del sanatorio contratado indicando tu número de matrícula DSS, o al servicio de emergencias médicas contratado.' }
      ],
      quickActionLabel: 'Enviar Mensaje Directo',
      quickActionTarget: 'contacto-directo'
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

export const MEDICAL_PROVIDERS: MedicalProvider[] = [
  { id: 'p1', name: 'Sanatorio Garay', specialty: 'Sanatorio e Internación / Guardia 24hs', city: 'Santa Fe', address: 'Rivadavia 3100, Santa Fe', phone: '0342-450-5000', isEmergencyGuard: true, notes: 'Guardia activa adultos y pediatría 24hs. Consultorios externos con turno previo.' },
  { id: 'p2', name: 'Sanatorio de Mayo', specialty: 'Sanatorio e Internación / Guardia 24hs', city: 'Santa Fe', address: 'Suipacha 2650, Santa Fe', phone: '0342-450-2000', isEmergencyGuard: true, notes: 'Servicio de urgencia permanente. Maternidad y Neonatología.' },
  { id: 'p3', name: 'Sanatorio Santa Fe', specialty: 'Sanatorio General / Cirugías / Guardia', city: 'Santa Fe', address: 'Bv. Gálvez 2040, Santa Fe', phone: '0342-450-8000', isEmergencyGuard: true, notes: 'Diagnóstico por imágenes y traumatología de urgencia.' },
  { id: 'p4', name: 'Clínica de la Ciudad', specialty: 'Clínica e Internación', city: 'Santo Tomé', address: 'Av. 7 de Marzo 1850, Santo Tomé', phone: '0342-474-1234', isEmergencyGuard: true, notes: 'Guardia médica y consultorios con matrícula DSS.' },
  { id: 'p5', name: 'Sanatorio Nosti', specialty: 'Sanatorio General / Urgencias', city: 'Rafaela', address: 'Pueyrredón 82, Rafaela', phone: '03492-50-3000', isEmergencyGuard: true, notes: 'Atención médica integral departamento Castellanos.' },
  { id: 'p6', name: 'Sanatorio Reconquista', specialty: 'Sanatorio General / Guardia', city: 'Reconquista', address: 'Rivadavia 540, Reconquista', phone: '03482-42-1000', isEmergencyGuard: true, notes: 'Atención de alta complejidad en el norte provincial.' },
  { id: 'p7', name: 'Dr. Roberto Fernández', specialty: 'Cardiología Adultos', city: 'Santa Fe', address: 'San Martín 2850, Piso 3', phone: '0342-455-1122', isEmergencyGuard: false, notes: 'Atención directa por matrícula.' },
  { id: 'p8', name: 'Dra. Silvina Rossi', specialty: 'Pediatría y Neonatología', city: 'Santa Fe', address: 'Crespo 2430', phone: '0342-456-7890', isEmergencyGuard: false, notes: 'Control de niño sano (coseguro $0).' },
  { id: 'p9', name: 'Centro Odontológico del Consejo', specialty: 'Odontología General y Cirugía Oral', city: 'Santa Fe', address: 'San Lorenzo 1849, Anexo', phone: 'WA 3425 10-5675', isEmergencyGuard: false, notes: 'Atención prioritaria matriculados y familiares.' },
  { id: 'p10', name: 'Centro de Diagnóstico por Imágenes', specialty: 'Radiología, TAC, Resonancia', city: 'Santa Fe', address: 'La Rioja 2340', phone: '0342-452-9999', isEmergencyGuard: false, notes: 'Estudios de alta complejidad con orden autorizada.' },
  { id: 'p11', name: 'Dra. Gabriela Castro', specialty: 'Ginecología y Obstetricia', city: 'Esperanza', address: 'Aarón Castellanos 1250, Esperanza', phone: '03496-42-5566', isEmergencyGuard: false, notes: 'Atención en departamento Las Colonias.' }
];

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
