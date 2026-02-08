/**
 * DR. JORGE IGLESIAS MÁRQUEZ - CENTRALIZED CONTENT REPOSITORY
 * 
 * Este archivo centraliza toda la información del sitio web para facilitar su gestión y mantenimiento.
 * El orden sigue la lógica de navegación del sitio web:
 * [NOSOTROS <- GALERIA <- CONTACTO <- INICIO -> SERVICIOS -> RESULTADOS -> TESTIMONIOS]
 */

// ==========================================
// 1. CONFIGURACIÓN GENERAL & NAVEGACIÓN
// ==========================================

export const NAV_LINKS = [
    { id: "nosotros-title", label: "Nosotros", index: 0 },
    { id: "galeria-title", label: "Galería", index: 1 },
    { id: "contacto-title", label: "Contacto", index: 2 },
    { id: "hero", label: "Inicio", index: 3, isLogo: true },
    { id: "servicios-title", label: "Servicios", index: 4 },
    { id: "resultados-title", label: "Resultados", index: 5 },
    { id: "testimonios-title", label: "Testimonios", index: 6 },
];

export const CONTACT_INFO = {
    address: "Cl. 99 #49-56, Bogotá",
    city: "Bogotá, Colombia",
    phone: "+57 312 5452046",
    email: "contacto@driglesias.co",
    whatsappUrl: "https://wa.me/573125452046?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.4739412158856!2d-74.06432902502075!3d4.687393095287561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f84fa7a54449f%3A0xcc058c51fe2786f8!2sJorge%20Iglesias%20M%C3%A1rquez%20Dermatolog%C3%ADa%20y%20Medicina%20Est%C3%A9tica!5e0!3m2!1ses-419!2sco!4v1770142016380!5m2!1ses-419!2sco",
    socials: [
        { name: "Instagram", url: "https://www.instagram.com/drjorgeiglesiasmarquez/?hl=es" },
        { name: "Facebook", url: "https://www.facebook.com/DrJorgeIglesiasMarquez" },
        { name: "TikTok", url: "https://www.tiktok.com/@drjorgeiglesiasmarquez" }
    ]
};

export const COMMON_CONTENT = {
    back: "Regresar",
    copyright: "DR JORGE IGLESIAS",
    allRightsReserved: "TODOS LOS DERECHOS RESERVADOS",
    legacyTag: "Legado en Dermatología"
};

// ==========================================
// 2. SECCIÓN: INICIO (HERO)
// ==========================================

export const HERO_CONTENT = {
    slogan: {
        italic: "Excelencia Quirúrgica &",
        bold: "Arte en Dermatología",
        mobile: "Expertos en el cuidado de tu piel"
    },
    cta: "Agendar Cita",
    sideTexts: {
        left: "Legado",
        right: "Ciencia"
    }
};

// ==========================================
// 3. SECCIÓN: NOSOTROS (ABOUT)
// ==========================================

export const ABOUT_CONTENT = {
    editorial: {
        subtitle: "Ciencia & Bienestar",
        titleLight: "Nuestra",
        titleBold: "Filosofía",
        description: "La salud de su piel es la base de su belleza natural.",
        footerTag: "Cuidado Médico"
    },
    philosophy: {
        category: "Nuestra Filosofía",
        title: "Precisión & Arte",
        heading: "Fusión de Ciencia & Estética",
        description: "Fusionamos la ciencia más avanzada con una visión estética única para restaurar su belleza natural."
    },
    experience: {
        category: "Trayectoria",
        title: "Experiencia Consagrada",
        years: "+30",
        label: "Años de Excelencia",
        description: "Liderando el sector de la medicina estética con tecnología de punta y resultados comprobados."
    },
    doctor: {
        category: "Director Médico",
        name: "Dr. Jorge Iglesias Márquez",
        image: "/doctor.webp",
        overlayTitle: "Líder Médico",
        overlayDescription: "Líder en medicina estética con un enfoque integral y personalizado."
    }
};

// ==========================================
// 4. SECCIÓN: GALERÍA
// ==========================================

export const GALLERY_CONTENT = {
    editorial: {
        subtitle: "Espacios",
        titleLight: "Nuestra",
        titleBold: "Galería",
        description: "Un recorrido visual por nuestras instalaciones de vanguardia.",
        footerTag: "Instalaciones Premium"
    }
};

export const GALLERY_LIST = [
    { src: "/clinica.webp", category: "Nuestra Clínica", title: "Sede Bogotá - Espacio 1" },
    { src: "/clinica.webp", category: "Nuestra Clínica", title: "Sede Bogotá - Espacio 2" },
    { src: "/clinica.webp", category: "Nuestra Clínica", title: "Sede Bogotá - Espacio 3" }
];

// ==========================================
// 5. SECCIÓN: CONTACTO
// ==========================================

export const CONTACT_CONTENT = {
    editorial: {
        subtitle: "Ubicación & Contacto",
        titleLight: "Contacto",
        titleBold: "& Ubicación",
        description: "Estamos aquí para atenderle y responder todas sus dudas.",
        footerTag: "Atención Personalizada"
    },
    cards: {
        map: {
            category: "Ubicación",
            title: "Mapa Google",
            overlay: "Ver ubicación interactiva en Google Maps."
        },
        clinic: {
            category: "Sede Principal",
            title: "Calle 99 # 49-56, Bogotá CO",
            overlayTitle: "Dirección"
        },
        socials: {
            category: "Atención",
            title: "Canales Directos"
        }
    }
};

// ==========================================
// 6. SECCIÓN: SERVICIOS
// ==========================================

export const SERVICES_CONTENT = {
    editorial: {
        subtitle: "Medicina & Estética",
        titleLight: "Estética &",
        titleBold: "Cuidado",
        description: "Protocolos diseñados para armonizar y potenciar su belleza natural.",
        footerTag: "Estética Avanzada"
    },
    cards: {
        category: "Servicio Especializado",
        overlayTitle: "Protocolos Médicos",
        overlayTag: "Ver Detalles"
    }
};

export const SERVICES_LIST = [
    {
        id: 1,
        label: "Alopecia",
        slug: "alopecia",
        description: "Tratamientos avanzados para la recuperación capilar y fortalecimiento del folículo.",
        image: "/servicios/alopecia.webp",
        specs: {
            duration: { value: "45-60 min", sub: "Sesión ágil" },
            recovery: { value: "Inmediata", sub: "Sin baja médica" },
            frequency: { value: "3-5 Sesiones", sub: "Intervalo mensual" },
            result: { value: "Natural", sub: "Crecimiento real" }
        },
        benefits: ["Fortalecimiento Folicular", "Estimulación del Crecimiento", "Densidad Capilar Mejorada", "Tecnología No Invasiva", "Protocolo Personalizado", "Resultados Duraderos"],
        faqs: [
            { question: "¿El tratamiento es doloroso?", answer: "Nuestros protocolos capilares están diseñados para ser mínimamente invasivos. La mayoría de pacientes reporta una sensación leve y perfectamente tolerable." },
            { question: "¿Cuándo empezaré a ver resultados?", answer: "Generalmente, se observa una disminución de la caída en el primer mes, y una mejora visible en la densidad a partir del tercer mes." },
            { question: "¿Requiere tiempo de baja?", answer: "Absolutamente no. Es un procedimiento 'lunch-break', puedes retomar tu agenda inmediatamente." }
        ]
    },
    {
        id: 2,
        label: "Melasma",
        slug: "melasma",
        description: "Protocolos especializados para el control de manchas y pigmentación facial.",
        image: "/servicios/melasma.webp",
        specs: {
            duration: { value: "30-45 min", sub: "Tratamiento láser" },
            recovery: { value: "Inmediata", sub: "Protección solar" },
            frequency: { value: "4-6 Sesiones", sub: "Control progresivo" },
            result: { value: "Piel Clara", sub: "Tono uniforme" }
        },
        benefits: ["Unificación del Tono", "Control de Pigmentación", "Luminosidad Natural", "Tratamiento Seguro", "Resultados Graduales", "Mejora de Textura"],
        faqs: [
            { question: "¿Qué causa el melasma?", answer: "Es una condición multifactorial influenciada por la genética, hormonas y exposición solar. Nuestro protocolo aborda todas estas aristas." },
            { question: "¿Es una cura definitiva?", answer: "El melasma se controla. Nuestro objetivo es llevar la piel a su mejor estado y darte las herramientas para mantenerlo en el tiempo." },
            { question: "¿Necesito cuidados especiales?", answer: "El uso de fotoprotección física y química es fundamental después de cada sesión para garantizar el éxito del tratamiento." }
        ]
    },
    {
        id: 3,
        label: "Cicatrices",
        slug: "cicatrices",
        description: "Suavizamos marcas y cicatrices con tecnología láser de última generación.",
        image: "/servicios/cicatrices.webp",
        specs: {
            duration: { value: "40-50 min", sub: "Sesión técnica" },
            recovery: { value: "24-48 horas", sub: "Enrojecimiento leve" },
            frequency: { value: "3-5 Sesiones", sub: "Según evolución" },
            result: { value: "Suavidad", sub: "Textura mejorada" }
        },
        benefits: ["Remodelación de Colágeno", "Mejora de Textura", "Reducción de Relieve", "Tecnología Láser", "Seguridad Médica", "Resultados Visibles"],
        faqs: [
            { question: "¿Cuántas sesiones necesito?", answer: "Depende del tipo de cicatriz. Un protocolo estándar suele oscilar entre 3 y 5 sesiones para ver cambios profundos." },
            { question: "¿Quedan marcas después del láser?", answer: "Inmediatamente después hay un enrojecimiento leve que desaparece en 24-48 horas, dejando la piel renovada." },
            { question: "¿Es apto para todo tipo de piel?", answer: "Sí, contamos con tecnología láser ajustable para tratar diferentes fototipos de piel con total seguridad." }
        ]
    },
    {
        id: 4,
        label: "Láser Pro",
        slug: "laser-pro",
        description: "Tecnología láser de alta precisión para diversos tratamientos dermatológicos.",
        image: "/servicios/laser-pro.webp",
        specs: {
            duration: { value: "20-60 min", sub: "Según zona" },
            recovery: { value: "Inmediata", sub: "Sin incapacidad" },
            frequency: { value: "2-4 Sesiones", sub: "Efecto acumulativo" },
            result: { value: "Alta Gama", sub: "Precisión total" }
        },
        benefits: ["Precisión Milimétrica", "Regeneración de Tejido", "Mínima Incomodidad", "Seguridad Certificada", "Tecnología FDA", "Versatilidad Clínica"],
        faqs: [
            { question: "¿Para qué sirve el Láser Pro?", answer: "Es nuestra plataforma más versátil, ideal para lesiones vasculares, manchas solares y rejuvenecimiento global de la piel." },
            { question: "¿Duele el procedimiento?", answer: "Utilizamos sistemas de enfriamiento avanzado y, si es necesario, anestesia tópica para que la experiencia sea muy cómoda." },
            { question: "¿Cuántas sesiones se recomiendan?", answer: "Varía según el objetivo, pero la mayoría de pacientes logran su meta en 2 a 4 sesiones." }
        ]
    },
    {
        id: 5,
        label: "Facial Exclusivo",
        slug: "facial-exclusivo",
        description: "Limpieza y nutrición profunda personalizada según las necesidades de tu piel.",
        image: "/servicios/facial.webp",
        specs: {
            duration: { value: "60 min", sub: "Nutrición profunda" },
            recovery: { value: "Inmediata", sub: "Efecto glow" },
            frequency: { value: "Mensual", sub: "Mantenimiento" },
            result: { value: "Luminosidad", sub: "Piel vitalizada" }
        },
        benefits: ["Hidratación Profunda", "Limpieza de Poros", "Extracción de Impurezas", "Nutrición Celular", "Relax & Bienestar", "Efecto Glow Inmediato"],
        faqs: [
            { question: "¿Cada cuánto debo hacérmelo?", answer: "Recomendamos una sesión mensual para mantener la piel en condiciones óptimas de salud y luminosidad." },
            { question: "¿Puedo maquillarme después?", answer: "Es mejor esperar unas 6-12 horas para que la piel absorba todos los nutrientes aplicados durante el tratamiento." },
            { question: "¿Es apto para pieles sensibles?", answer: "Totalmente. Personalizamos los productos y la intensidad del procedimiento según la tolerancia de tu piel." }
        ]
    },
    {
        id: 6,
        label: "Rellenos",
        slug: "rellenos",
        description: "Restauración de volúmenes faciales con resultados naturales y armonizados.",
        image: "/servicios/rellenos.webp",
        specs: {
            duration: { value: "45 min", sub: "Armonización" },
            recovery: { value: "Inmediata", sub: "Retorno laboral" },
            frequency: { value: "Anual", sub: "Mantenimiento" },
            result: { value: "Natural", sub: "Volumen sutil" }
        },
        benefits: ["Armonía Facial", "Reposición de Volumen", "Resultados Inmediatos", "Seguridad Médica", "Biocompatibilidad", "Efecto Rejuvenecedor"],
        faqs: [
            { question: "¿Qué material se utiliza?", answer: "Utilizamos exclusivamente productos de alta gama (Ácido Hialurónico) totalmente reabsorbibles y seguros." },
            { question: "¿Cuánto dura el efecto?", answer: "Dependiendo del metabolismo de cada paciente, los resultados se mantienen entre 10 y 14 meses." },
            { question: "¿Se nota que me hice algo?", answer: "Nuestra filosofía es la naturalidad. El objetivo es que te veas más descansada y jovial, no transformada." }
        ]
    },
    {
        id: 7,
        label: "Perfilamiento",
        slug: "perfilamiento",
        description: "Definición de contorno mandibular y perfil facial con técnicas no quirúrgicas.",
        image: "/servicios/perfilamiento.webp",
        specs: {
            duration: { value: "40-60 min", sub: "Sesión ágil" },
            recovery: { value: "Inmediata", sub: "Sin baja médica" },
            frequency: { value: "3-5 Sesiones", sub: "Intervalo mensual" },
            result: { value: "Natural", sub: "Armonía total" }
        },
        benefits: ["Definición de Ángulos", "Proyección de Mentón", "Contorno Marcado", "Sin Cirugía", "Mínimo Tiempo de Recuperación", "Mejora del Perfil"],
        faqs: [
            { question: "¿Es doloroso?", answer: "Se realiza con microcánulas o agujas muy finas, la molestia es mínima y el material contiene anestésico local." },
            { question: "¿Se inflama mucho la zona?", answer: "Puede haber una inflamación leve por 24-48 horas, pero no impide realizar actividades normales." },
            { question: "¿Se puede combinar con otros tratamientos?", answer: "Sí, suele combinarse con toxina botulínica para un resultado de armonización global." }
        ]
    },
    {
        id: 8,
        label: "Láser Íntimo",
        slug: "laser-intimo",
        description: "Tratamientos de rejuvenecimiento íntimo con tecnología láser CO2.",
        image: "/servicios/laser-intimo.webp",
        specs: {
            duration: { value: "30 min", sub: "Sesión láser" },
            recovery: { value: "Rápida", sub: "Cuidados íntimos" },
            frequency: { value: "3 Sesiones", sub: "Efecto funcional" },
            result: { value: "Bienestar", sub: "Salud íntima" }
        },
        benefits: ["Salud Vaginal", "Tensado del Canal", "Mejora de Lubricación", "Sin Dolor", "Sesiones Cortas", "Recuperación Rápida"],
        faqs: [
            { question: "¿Qué beneficios médicos tiene?", answer: "Ayuda con la incontinencia urinaria leve, la resequedad y mejora la elasticidad del tejido." },
            { question: "¿Cuántas sesiones se necesitan?", answer: "El protocolo estándar es de 3 sesiones espaciadas cada 4 semanas." },
            { question: "¿Requiere reposo sexual?", answer: "Se recomienda evitar relaciones sexuales durante los primeros 5-7 días posteriores al tratamiento." }
        ]
    },
    {
        id: 9,
        label: "Blefaroplastia",
        slug: "blefaroplastia",
        description: "Rejuvenecimiento de la mirada mediante corrección de párpados.",
        image: "/servicios/blefaroplastia.webp",
        specs: {
            duration: { value: "60-90 min", sub: "Microcirugía" },
            recovery: { value: "5-7 días", sub: "Retiro de puntos" },
            frequency: { value: "Única", sub: "Efecto duradero" },
            result: { value: "Apertura", sub: "Mirada joven" }
        },
        benefits: ["Mirada Despejada", "Eliminación de Bolsas", "Retiro de Exceso de Piel", "Cicatrices Invisibles", "Efecto Duradero", "Apertura Ocular"],
        faqs: [
            { question: "¿Es cirugía o láser?", answer: "Realizamos blefaroplastia quirúrgica convencional o asistida por tecnología, según la necesidad del paciente." },
            { question: "¿Cuándo se retiran los puntos?", answer: "Generalmente se retiran entre el 5to y 7mo día después del procedimiento." },
            { question: "¿Queda mucha morados?", answer: "Varía por paciente, pero solemos usar protocolos anti-equimosis para minimizar los morados y la inflamación." }
        ]
    },
    {
        id: 10,
        label: "Lipólisis",
        slug: "lipolisis",
        description: "Eliminación de grasa localizada y moldeamiento corporal avanzado.",
        image: "/servicios/lipolisis.webp",
        specs: {
            duration: { value: "2-3 horas", sub: "Moldeamiento" },
            recovery: { value: "3-5 días", sub: "Uso de faja" },
            frequency: { value: "Única", sub: "Grasa localizada" },
            result: { value: "Escultural", sub: "Contorno definido" }
        },
        benefits: ["Reducción de Medidas", "Definición Corporal", "Tecnología Avanzada", "Seguridad Quirúrgica", "Piel más Firme", "Resultados Permanentes"],
        faqs: [
            { question: "¿Es para bajar de peso?", answer: "No, es un tratamiento de moldeamiento y eliminación de grasa localizada que no cede con dieta o ejercicio." },
            { question: "¿Requiere faja?", answer: "Sí, el uso de faja post-quirúrgica es vital durante el primer mes para ayudar a que la piel se adhiera correctamente." },
            { question: "¿Cuándo veo el resultado final?", answer: "Aunque el cambio es inmediato, el resultado óptimo se aprecia a los 3-6 meses una vez baja la inflamación." }
        ]
    },
    {
        id: 11,
        label: "Hiperhidrosis",
        slug: "hiperhidrosis",
        description: "Tratamientos efectivos para el control de la sudoración excesiva.",
        image: "/servicios/hiperdrosis.webp",
        specs: {
            duration: { value: "20 min", sub: "Sesión rápida" },
            recovery: { value: "Inmediata", sub: "Sin marcas" },
            frequency: { value: "Semestral", sub: "Control de sudor" },
            result: { value: "Seco", sub: "Seguridad total" }
        },
        benefits: ["Control de Sudor", "Seguridad Social", "Eficacia Comprobada", "Procedimiento Rápido", "Sin Cirugía", "Efecto Duradero"],
        faqs: [
            { question: "¿Cómo funciona?", answer: "Utilizamos toxina botulínica para bloquear temporalmente las señales nerviosas que activan las glándulas sudoríparas." },
            { question: "¿En qué zonas se aplica?", answer: "Las zonas más comunes son axilas, palmas de las manos y plantas de los pies." },
            { question: "¿Cuánto dura el efecto?", answer: "Los resultados suelen mantenerse entre 6 y 9 meses, dependiendo de cada organismo." }
        ]
    },
    {
        id: 12,
        label: "Toxina Botulínica",
        slug: "toxina-botulinica",
        description: "Prevención y tratamiento de arrugas de expresión con acabado natural.",
        image: "/servicios/toxina-botulinica.webp",
        specs: {
            duration: { value: "15-20 min", sub: "Dosis médica" },
            recovery: { value: "Inmediata", sub: "Sin inflamación" },
            frequency: { value: "4-6 meses", sub: "Mantenimiento" },
            result: { value: "Relajado", sub: "Expresión natural" }
        },
        benefits: ["Adiós a las Arrugas", "Prevención de Envejecimiento", "Mirada Descansada", "Expresión Natural", "Procedimiento de 15 min", "Sin Tiempo de Recuperación"],
        faqs: [
            { question: "¿Me veré 'congelada'?", answer: "No. Aplicamos dosis precisas para suavizar las líneas manteniendo la movilidad y expresividad natural de tu rostro." },
            { question: "¿A qué edad debo empezar?", answer: "La toxina preventiva o 'Baby Botox' es ideal desde los 25-30 años antes de que las líneas se vuelvan permanentes." },
            { question: "¿Cuándo se ve el efecto?", answer: "El resultado empieza a notarse a los 3-4 días y llega a su punto máximo a los 15 días." }
        ]
    },
    {
        id: 13,
        label: "Hialurónico",
        slug: "hialuronico",
        description: "Hidratación profunda y relleno de surcos con ácido hialurónico.",
        image: "/servicios/hialuronico.webp",
        specs: {
            duration: { value: "30-45 min", sub: "Hidratación" },
            recovery: { value: "Inmediata", sub: "Sin moretones" },
            frequency: { value: "Anual", sub: "Bioestimulación" },
            result: { value: "Jugoso", sub: "Máxima hidratación" }
        },
        benefits: ["Hidratación Extrema", "Efecto Relleno Sutil", "Mejora de Elasticidad", "Seguridad Total", "Procedimiento Rápido", "Piel más Jugosa"],
        faqs: [
            { question: "¿Es igual que la toxina?", answer: "No. El hialurónico rellena e hidrata, mientras que la toxina relaja el músculo para quitar arrugas de movimiento." },
            { question: "¿Se puede aplicar en labios?", answer: "Es el tratamiento estrella para dar volumen, hidratación y definición a los labios con resultados hermosos." },
            { question: "¿Requiere cuidados posteriores?", answer: "Solo evitar masajear la zona tratada y no realizar ejercicio intenso por las primeras 24 horas." }
        ]
    },
    {
        id: 14,
        label: "Tensado",
        slug: "tensado",
        description: "Tecnología HIFU y radiofrecuencia para combatir la flacidez cutánea.",
        image: "/servicios/tensado.webp",
        specs: {
            duration: { value: "60 min", sub: "Tecnología HIFU" },
            recovery: { value: "Inmediata", sub: "Efecto lifting" },
            frequency: { value: "1-2 veces/año", sub: "Colágeno activo" },
            result: { value: "Firmeza", sub: "Piel compacta" }
        },
        benefits: ["Lifting sin Cirugía", "Estimulación de Elastina", "Piel Firme", "Contorno Definido", "Sin Agujas", "Resultados Progresivos"],
        faqs: [
            { question: "¿Qué tecnología usan?", answer: "Utilizamos HIFU (Ultrasonido Focalizado de Alta Intensidad) que llega a las capas más profundas de la piel." },
            { question: "¿Cuántas sesiones son?", answer: "Dependiendo del grado de flacidez, solemos recomendar 1 o 2 sesiones anuales como mantenimiento." },
            { question: "¿Se siente calor?", answer: "Se percibe una sensación de calor profundo que es indicativo de que el colágeno se está estimulando correctamente." }
        ]
    },
    {
        id: 15,
        label: "Hilos",
        slug: "hilos",
        description: "Lifting sin cirugía mediante hilos tensores reabsorbibles.",
        image: "/servicios/hilos.webp",
        specs: {
            duration: { value: "45-60 min", sub: "BIO-Hilos" },
            recovery: { value: "24-48 horas", sub: "Cuidados leves" },
            frequency: { value: "12-18 meses", sub: "Efecto tensor" },
            result: { value: "Elevación", sub: "V-Shape natural" }
        },
        benefits: ["Elevación de Tejidos", "Bioestimulación", "Efecto V-Shape", "Material Reabsorbible", "Mínima Invasión", "Resultados Duraderos"],
        faqs: [
            { question: "¿Se notan los hilos?", answer: "No, se colocan en el plano profundo de la piel y son totalmente imperceptibles a la vista y al tacto." },
            { question: "¿Cuánto duran los resultados?", answer: "El efecto tensor dura unos 12-18 meses, aunque la mejora en la calidad de piel es permanente." },
            { question: "¿Duele la aplicación?", answer: "Se realiza con anestesia local en los puntos de entrada, por lo que el paciente no siente dolor durante el procedimiento." }
        ]
    },
    {
        id: 16,
        label: "Cirugía",
        slug: "cirugia",
        description: "Procedimientos quirúrgicos dermatológicos con la más alta seguridad médica.",
        image: "/servicios/cirugia.webp",
        specs: {
            duration: { value: "30-60 min", sub: "Cirujano Experto" },
            recovery: { value: "7-10 días", sub: "Alta médica" },
            frequency: { value: "Única", sub: "Resolución total" },
            result: { value: "Salud", sub: "Sin cicatrices" }
        },
        benefits: ["Resolución Definitiva", "Excelencia Quirúrgica", "Seguridad del Paciente", "Anestesia Local", "Intervención Ambulatoria", "Mínimo Tiempo Quirúrgico"],
        faqs: [
            { question: "¿Qué tipo de cirugías realizan?", answer: "Desde retiro de nevos (lunares) y quistes hasta corrección de lóbulos de oreja y lesiones benignas de piel." },
            { question: "¿Queda cicatriz?", answer: "Como cirujanos especialistas, buscamos la técnica que deje la marca más estética y oculta posible." },
            { question: "¿Es doloroso el post-operatorio?", answer: "Suele ser muy llevadero con analgésicos comunes, la mayoría de pacientes no reporta dolor significativo." }
        ]
    }
];

export const SERVICE_DETAIL_CONTENT = {
    badges: {
        protocol: "Protocolo de Autor",
        excellence: "Excelencia Médica",
        technical: "Ficha Técnica"
    },
    cardLabels: {
        category: "Dermatología Avanzada",
        overlayTitle: "Ciencia y Arte",
        overlayDescription: "Cuidado premium personalizado.",
        overlayTag: "Info Clínica"
    },
    cta: "Iniciar Consulta",
    benefits: {
        subtitle: "El Enfoque Científico",
        titleLight: "Beneficios",
        titleBold: "Clave",
        description: "Diseñado bajo rigurosos estándares médicos para maximizar la eficacia y garantizar una experiencia segura."
    },
    faq: {
        subtitle: "Dudas Comunes",
        titleLight: "Información",
        titleBold: "Adicional"
    }
};

// ==========================================
// 7. SECCIÓN: RESULTADOS
// ==========================================

export const RESULTS_CONTENT = {
    editorial: {
        subtitle: "Piel Saludable",
        titleLight: "Casos de",
        titleBold: "Éxito",
        description: "Resultados que reflejan la excelencia en el tratamiento médico.",
        footerTag: "Experiencia Real"
    },
    comparison: {
        before: "Antes",
        after: "Después",
        tag: "Resultado Real"
    }
};

export const RESULTS_LIST = [
    { title: "Antiacné", id: "01", before: "/resultados/resultado-1.png", after: "/resultados/resultado-2.png" },
    { title: "Perfilamiento", id: "02", before: "/resultados/resultado-3.webp", after: "/resultados/resultado-4.webp" },
    { title: "Lipomax", id: "03", before: "/resultados/resultado-5.webp", after: "/resultados/resultado-6.webp" }
];

// ==========================================
// 8. SECCIÓN: TESTIMONIOS
// ==========================================

export const TESTIMONIALS_CONTENT = {
    editorial: {
        subtitle: "Experiencias",
        titleLight: "Voces de",
        titleBold: "Confianza",
        description: "Historias reales de pacientes que confiaron en nuestra excelencia.",
        footerTag: "Testimonios Reales"
    }
};

export const TESTIMONIALS_LIST = [
    {
        name: "Ana María P.",
        text: "La atención del Dr. Iglesias transformó mi piel por completo. Eternamente agradecida.",
        treatment: "Rejuvenecimiento Facial"
    },
    {
        name: "Carlos R.",
        text: "Profesionalismo y tecnología de punta. Los resultados superaron mis expectativas.",
        treatment: "Tratamiento Láser"
    },
    {
        name: "Sofía L.",
        text: "Excelente trato y resultados naturales. Me devolvieron la confianza en mí misma.",
        treatment: "Armonización Facial"
    }
];

// ==========================================
// 9. INTERACCIONES (FAB & MENSAJES)
// ==========================================

export const FAB_CONTENT = {
    sectionMessages: {
        0: [ // NOSOTROS
            "Todos tenemos una historia!",
            "Ética y excelencia médica",
            "Más de 10 años cuidando pieles",
            "Nuestra misión es tu bienestar",
            "Compromiso con la dermatología"
        ],
        1: [ // GALERIA
            "Explora nuestra clínica",
            "Tecnología de última generación",
            "Espacios diseñados para tu confort",
            "Nuestras instalaciones premium",
            "Vanguardia en cada rincón"
        ],
        2: [ // CONTACTO
            "¿Agendamos tu valoración?",
            "Hablemos por WhatsApp hoy",
            "Estamos listos para atenderte",
            "Tu cita a un solo click",
            "Resolvamos tus dudas ahora"
        ],
        3: [ // INICIO
            "¡Llego la hora de agendar!",
            "Tu piel, es una prioridad absoluta",
            "Dermatología estética de lujo",
            "Descubre tu mejor versión",
            "Cuidado experto y personalizado"
        ],
        4: [ // SERVICIOS
            "Tratamientos faciales avanzados",
            "Tecnología láser de punta",
            "Soluciones para cada tipo de piel",
            "Procedimientos mínimamente invasivos",
            "Renueva tu piel con nosotros"
        ],
        5: [ // RESULTADOS
            "Casos reales, cambios naturales",
            "Mira el poder del rejuvenecimiento",
            "Testimonios visuales de éxito",
            "Resultados que hablan por sí solos",
            "Transformaciones que inspiran"
        ],
        6: [ // TESTIMONIOS
            "La confianza de mis pacientes",
            "Lo que dicen quienes nos visitan",
            "Experiencias que avalan nuestro trabajo",
            "Seguridad y satisfacción garantizada",
            "Historias reales de cuidado facial"
        ]
    },
    generalPhrases: [
        "¿Te gustaría agendar una cita?",
        "Tu piel merece atención experta",
        "Escríbeme para una valoración",
        "Dermatología de alta gama",
        "Agenda tu espacio exclusivo",
        "¿Dudas sobre algún tratamiento?",
        "Resultados naturales garantizados",
        "Cuidamos cada detalle de tu piel",
        "Expertos en rejuvenecimiento",
        "La salud de tu piel es lo primero"
    ],
    defaultMessage: "Agendar con el Doctor"
};

// ==========================================
// 10. PÁGINAS DE ERROR (404 & 500)
// ==========================================

export const ERROR_PAGES_CONTENT = {
    notFound: {
        code: "404",
        badge: "Coordenadas Incorrectas",
        titleLight: "Este espacio aún",
        titleBold: "no ha sido esculpido.",
        description: "La página que buscas no forma parte de nuestra galería actual. Te invitamos a redescubrir la armonía en nuestra colección principal."
    },
    serverError: {
        code: "500",
        badge: "Incidencia Técnica",
        titleLight: "Interrupción",
        titleBold: "inesperada.",
        description: "Incluso en los protocolos más precisos, surgen pausas necesarias. Nuestro equipo técnico ya está restaurando el equilibrio.",
        cta: "Reintentar Conexión"
    }
};
