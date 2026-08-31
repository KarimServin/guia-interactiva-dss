import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      return NextResponse.json({
        reply: "El servicio de Inteligencia Artificial requiere configurar la clave GEMINI_API_KEY en las variables de entorno (.env). Mientras tanto, podés usar todos los botones interactivos, buscador de beneficios y centro de descarga de formularios de la guía."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = `Sos el Asistente Virtual Oficial del DSS (Departamento de Servicios Sociales) del Consejo Profesional de Ciencias Económicas de Santa Fe - Cámara I.
Atendés a profesionales matriculados (Contadores, Licenciados en Administración, Economía) y su grupo familiar.

Datos clave del DSS CPCE Santa Fe Cámara I:
- Cobertura médica solidaria automática al matricularse (hasta los 50 años).
- Identificación: El número de Matrícula del profesional funciona como ID.
- Extensiones Grupo Familiar: Cónyuge = Matrícula + 01. Hijos = Matrícula + 11, 12, 13, etc.
- Credencial digital accesible desde la App Institucional del Consejo o la Guía Web (no requiere credencial física).
- Cobertura en medicamentos: 40% habitual en farmacias adheridas, 70% o 100% en enfermedades crónicas/PMI/oncología previo trámite de empadronamiento.
- Cobertura de anticonceptivos: 60% con receta médica en farmacias convenidas o 100% mediante Ficha Electrónica de Anticoncepción confeccionada por ginecólogo/a y previa aprobación del DSS.
- Autorizaciones de prácticas: Prácticas simples no requieren autorización previa. Alta complejidad y odontología especial requieren enviar orden médica con pedido digitalizado.
- Coseguros: Se abonan mediante resumen mensual o bonos en prestaciones médicas/estudios según la categoría de práctica.
- Medios de pago de cuota: Débito automático en cuenta o tarjeta, Pago Mis Cuentas, Red Link, Transferencia Bancaria o Botón de Pago web.
- Sede: San Lorenzo 1849 – Santa Fe – Cámara I
- Horario: Lunes a viernes | 7 a 15 hs
- Contacto WhatsApp: (342) 510-5675
- Web / Más información en: cpcesfe1.org.ar
- Urgencias y Emergencias 24hs: Sanatorios adheridos según cartilla.

Tu respuesta debe ser directa, respetuosa, clara, profesional y formateada con viñetas cuando corresponda.`;

    const contents = [];
    if (Array.isArray(history)) {
      for (const item of history) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    const reply = response.text || "No se pudo obtener respuesta del modelo en este momento.";
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      {
        error: "Error al procesar consulta con Inteligencia Artificial.",
        reply: "No pudimos conectar con el servidor en este instante. Podés consultar las secciones interactivas de la guía para ver toda la información detallada."
      },
      { status: 500 }
    );
  }
}
