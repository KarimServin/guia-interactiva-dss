export type ModuleCategory = 
  | 'medicos'
  | 'medicamentos'
  | 'autorizaciones'
  | 'coseguros'
  | 'cobertura'
  | 'grupofamiliar'
  | 'pagos'
  | 'contacto';

export interface ActionModule {
  id: ModuleCategory;
  buttonNumber: number;
  title: string;
  verbTitle: string; // e.g., "Necesito atenderme con un médico"
  shortDesc: string;
  iconName: string;
  badgeText?: string;
  colorClass: {
    bg: string;
    border: string;
    text: string;
    hover: string;
    iconBg: string;
  };
  details: {
    summary: string;
    highlights: string[];
    steps?: { step: number; title: string; desc: string }[];
    faqs?: { q: string; a: string }[];
    relatedFormIds?: string[];
    quickActionLabel?: string;
    quickActionTarget?: string;
  };
}

export interface FormItem {
  id: string;
  code: string;
  title: string;
  category: 'Afiliación' | 'Grupo Familiar' | 'Medicamentos' | 'Autorizaciones' | 'Reembolsos y Pagos' | 'Subsidios';
  description: string;
  requiredDocs: string[];
  estimatedDays: string;
  isFillable: boolean;
  fields?: {
    id: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';
    options?: string[];
    required?: boolean;
    placeholder?: string;
  }[];
}

export interface MedicalProvider {
  id: string;
  name: string;
  specialty: string;
  city: 'Santa Fe' | 'Santo Tomé' | 'Rafaela' | 'Reconquista' | 'Esperanza' | 'San Justo' | 'Otras Localidades';
  address: string;
  phone: string;
  isEmergencyGuard: boolean;
  notes?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  discount: string; // e.g. "40% general / 70% crónicos"
  hasRecetaDigital: boolean;
}

export interface CredentialInfo {
  matricula: string;
  titularName: string;
  memberName: string;
  relation: 'Titular' | 'Cónyuge (+01)' | 'Hijo/a 1 (+11)' | 'Hijo/a 2 (+12)' | 'Hijo/a 3 (+13)';
  extensionCode: string;
  category: 'Matriculado Activo' | 'Socio Adherente' | 'Jubilado';
  validUntil: string;
  planName: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
