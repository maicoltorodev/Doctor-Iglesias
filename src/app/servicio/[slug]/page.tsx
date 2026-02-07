"use client";

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { notFound } from 'next/navigation';
import { SERVICES_LIST } from '@/constants/content';
import CustomCursor from "@/components/ui/CustomCursor";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import FloatingAction from "@/components/ui/FloatingAction";
import { CtaButton } from '@/components/ui/CtaButton';
import { ArrowLeft, Plus, Minus, Clock, Activity, Calendar, Sparkles } from 'lucide-react';
import { Obra } from '@/components/ui/Obra';
import { BackLink } from '@/components/ui/BackLink';

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function ServicePage({ params }: ServicePageProps) {
    const { slug } = use(params);
    const service = SERVICES_LIST.find((s) => s.slug === slug);
    const cursorState = useCustomCursor();
    const [isLeftHovered, setIsLeftHovered] = React.useState(false);
    const [isRightHovered, setIsRightHovered] = React.useState(false);

    if (!service) {
        notFound();
    }

    const imgSrc = service.image || "/imagen-ph-1.webp";

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
        }
    };

    const faqs = getFaqs(slug);

    return (
        <main className="h-screen w-full bg-[#f2f0f4] relative overflow-hidden flex flex-col selection:bg-black/10 selection:text-black">

            {/* 0. ATMÓSFERA VIVA (Living Background) - REMOVED FOR PERFORMANCE */}
            {/* Texture Overlay (Noise) - Reduced opacity slightly to not hide colors */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 opacity-[0.4] bg-[url('/noise.png')] mix-blend-overlay"></div>
            </div>

            {/* PIEZAS DE MÁRMOL ARQUITECTÓNICAS (Fixed Marco) */}
            <div className="fixed inset-0 z-[70] pointer-events-none">
                {/* SENSORS: Capas invisibles para activar el efecto al pasar el mouse */}
                <div
                    onMouseEnter={() => setIsLeftHovered(true)}
                    onMouseLeave={() => setIsLeftHovered(false)}
                    className="absolute top-0 left-0 w-[500px] h-[180px] pointer-events-auto cursor-none z-10"
                    style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                />
                <div
                    onMouseEnter={() => setIsRightHovered(true)}
                    onMouseLeave={() => setIsRightHovered(false)}
                    className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-auto cursor-none clip-triangle-right z-10"
                />

                {/* Esquina Superior Izquierda */}
                <div className="absolute top-0 left-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                    <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${isLeftHovered ? '-translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'}`}>
                        <div
                            className="absolute inset-0 bg-marble-texture border-b border-r border-white/20"
                            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                        >
                            {/* Brillo Especular */}
                            <div className="absolute bottom-0 left-0 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent transform -rotate-[19.8deg] origin-bottom-left"></div>
                        </div>
                    </div>
                </div>

                {/* Esquina Inferior Derecha */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[180px] pointer-events-none filter drop-shadow-[0_-20px_40px_rgba(0,0,0,0.25)]">
                    <div className={`absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${isRightHovered ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'}`}>
                        <div className="absolute inset-0 clip-triangle-right bg-marble-texture border-t border-l border-white/20">
                            {/* Brillo Especular */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent transform rotate-[19.8deg] origin-top-left translate-y-[0.5px]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENIDO CENTRAL SCROLLEABLE */}
            <div
                className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden z-30 scrollbar-hide relative"
                data-lenis-prevent="true"
            >
                {/* BARRA DE NAVEGACIÓN SUPERIOR (Scrollable flow) */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-8 lg:top-12 left-0 right-0 z-[60] flex items-center justify-center px-8 lg:px-20 pointer-events-none"
                >
                    <BackLink />
                </motion.div>
                <section className="min-h-screen flex flex-col items-center justify-center px-8 lg:px-20 max-w-7xl w-full mx-auto relative pt-40 lg:pt-0">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

                        {/* COLUMNA IZQUIERDA (7/12): TITULAR Y DESCRIPCIÓN */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.15 } }
                            }}
                            className="lg:col-span-7 space-y-12 lg:pr-12"
                        >
                            <motion.div variants={fadeUp} className="space-y-6">
                                <div className="flex items-center space-x-4 opacity-40">
                                    <span className="h-[1px] w-12 bg-black"></span>
                                    <p className="text-[10px] tracking-[0.6em] uppercase font-bold italic font-serif text-black">Protocolo de Autor</p>
                                </div>
                                <h1 className="relative">
                                    <span className="text-6xl lg:text-[100px] xl:text-[130px] font-extralight tracking-tighter leading-[0.8] text-black block">
                                        {service.label}
                                    </span>
                                    <span className="font-serif italic text-black/25 tracking-[0.2em] uppercase text-xl lg:text-[40px] xl:text-[50px] block mt-4 lg:mt-8">
                                        Excelencia <span className="text-black/10">/</span> Médica
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.div variants={fadeUp} className="space-y-10">
                                <p className="text-xl lg:text-2xl font-serif italic text-black/50 leading-relaxed max-w-xl border-l border-black/10 pl-8">
                                    "{service.description}"
                                </p>

                                <div className="flex items-center space-x-8 pt-4">
                                    <CtaButton label="Iniciar Consulta" className="min-w-[260px] py-6 shadow-xl" />
                                    <div className="hidden lg:block h-[1px] flex-1 bg-gradient-to-r from-black/10 to-transparent"></div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* COLUMNA DERECHA (5/12): IMAGEN PRINCIPAL */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotate: -2 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number], delay: 0.5 }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="absolute -inset-10 border border-black/[0.03] rounded-full rotate-45 pointer-events-none"></div>

                            <div className="relative z-10 scale-105 lg:scale-110 translate-x-4 lg:translate-x-12">
                                <Obra
                                    src={imgSrc}
                                    alt={service.label}
                                    category="Dermatología Avanzada"
                                    title={service.label}
                                    overlayTitle="Ciencia y Arte"
                                    overlayDescription="Cuidado premium personalizado."
                                    overlayTag="Info Clínica"
                                    hideInfo={true}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* SCROLL INDICATOR REFINADO */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-20"
                    >
                        <div className="w-[1px] h-16 bg-gradient-to-b from-black to-transparent"></div>
                    </motion.div>
                </section>

                {/* 2. BARRA DE DATOS CLÍNICOS (QUICK INFO) - PREMIUM PANEL */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full py-12 lg:py-24 relative z-40"
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-20">
                        {/* Título de Sección Sutil */}
                        <div className="text-center mb-12 opacity-40">
                            <span className="text-[9px] tracking-[0.6em] uppercase font-bold">Ficha Técnica</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {[
                                { icon: Clock, label: "Duración", value: "45-60 min", sub: "Sesión ágil" },
                                { icon: Activity, label: "Recuperación", value: "Inmediata", sub: "Sin baja médica" },
                                { icon: Calendar, label: "Frecuencia", value: "3-5 Sesiones", sub: "Intervalo mensual" },
                                { icon: Sparkles, label: "Resultado", value: "Natural", sub: "Armonía total" }
                            ].map((item, i) => (
                                <div key={i} className="group relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 hover:bg-white/60 transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 overflow-hidden">
                                    {/* Brillo de fondo al hover */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                        {/* Icono Flotante */}
                                        <div className="w-10 h-10 rounded-full bg-white/50 border border-white/60 flex items-center justify-center text-black/60 group-hover:text-black group-hover:scale-110 transition-all duration-500 mb-2">
                                            <item.icon strokeWidth={1.5} size={18} />
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-black/40 block mb-1">{item.label}</span>
                                            <span className="text-2xl lg:text-3xl font-light text-black block tracking-tight group-hover:tracking-normal transition-all duration-500">{item.value}</span>
                                        </div>

                                        <div className="w-8 h-[1px] bg-black/10 group-hover:w-16 transition-all duration-500"></div>

                                        <span className="text-xs font-serif italic text-black/50 group-hover:text-black/70 transition-colors">
                                            {item.sub}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* 3. SECCIÓN DE BENEFICIOS: GRID PREMIUM */}
                <section className="w-full max-w-7xl mx-auto py-24 lg:py-40 px-8 lg:px-20 relative z-30">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* Cabecera Lateral de Sección con Sticky */}
                        <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-10">
                            <div>
                                <span className="text-[10px] tracking-[0.5em] uppercase font-extrabold text-black/30 block mb-6">El Enfoque Científico</span>
                                <h2 className="text-5xl lg:text-7xl font-light text-black leading-[0.9]">
                                    Beneficios <br />
                                    <span className="font-serif italic text-black/40 relative">
                                        Clave
                                        <span className="absolute -bottom-2 left-0 w-24 h-[2px] bg-black/10"></span>
                                    </span>
                                </h2>
                            </div>
                            <p className="text-black/60 text-sm leading-relaxed max-w-[300px] font-medium border-l-2 border-black/5 pl-6">
                                Diseñado bajo rigurosos estándares médicos para maximizar la eficacia y garantizar una experiencia segura.
                            </p>
                        </div>

                        {/* Grid de Beneficios Refinado */}
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-8">
                            {(function () {
                                const getBenefits = (s: string) => {
                                    if (s.includes('alopecia')) return ["Fortalecimiento Folicular", "Estimulación del Crecimiento", "Densidad Capilar Mejorada", "Tecnología No Invasiva", "Protocolo Personalizado", "Resultados Duraderos"];
                                    if (s.includes('facial') || s.includes('melasma') || s.includes('hialuronico')) return ["Unificación del Tono", "Luminosidad Inmediata", "Textura Suavizada", "Hidratación Profunda", "Sin Tiempo de Recuperación", "Piel Radiante"];
                                    if (s.includes('laser') || s.includes('cicatrices')) return ["Precisión Milimétrica", "Regeneración de Tejido", "Mínima Incomodidad", "Seguridad Certificada", "Mejora Visible", "Tecnología FDA"];
                                    return ["Evaluación Médica Experta", "Tecnología de Vanguardia", "Resultados Naturales", "Seguridad del Paciente", "Atención Premium", "Seguimiento Integral"];
                                };
                                return getBenefits(slug as string).map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.6, delay: i * 0.1 }}
                                        className="group relative bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/50 hover:border-white/60 p-8 lg:p-10 rounded-2xl transition-all duration-500 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 overflow-hidden"
                                    >
                                        {/* Número de fondo sutil */}
                                        <span className="absolute top-2 right-4 text-6xl font-serif italic text-black/[0.03] group-hover:text-black/[0.06] transition-colors duration-500 scale-150 origin-top-right">
                                            0{i + 1}
                                        </span>

                                        <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black group-hover:scale-150 transition-all duration-500"></div>
                                                <div className="h-[1px] w-8 bg-black/10 group-hover:w-16 transition-all duration-500"></div>
                                            </div>

                                            <h3 className="text-xl lg:text-2xl font-light text-black leading-tight group-hover:translate-x-1 transition-transform duration-500">
                                                {benefit}
                                            </h3>
                                        </div>
                                    </motion.div>
                                ));
                            })()}
                        </div>
                    </div>
                </section>

                {/* 4. PREGUNTAS FRECUENTES (FAQ) - ACORDEÓN PREMIUM */}
                <section className="w-full py-20 lg:py-32 relative z-30">
                    <div className="max-w-4xl mx-auto px-8 lg:px-20">
                        <div className="text-center mb-16 space-y-4">
                            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-black/30">Dudas Comunes</span>
                            <h2 className="text-3xl lg:text-5xl font-light text-black">Información <span className="font-serif italic text-black/40">Adicional</span></h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <AccordionItem key={i} question={faq.question} answer={faq.answer} i={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. FOOTER / SIGNATURE: CIERRE DE PÁGINA */}

                {/* 4. FOOTER / SIGNATURE: CIERRE DE PÁGINA */}
                <footer className="w-full pb-32 pt-12 flex flex-col items-center justify-center relative">
                    <div className="w-20 h-[1px] bg-black/10 mb-20"></div>
                    <div className="text-center space-y-4">
                        <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-black/20 block">Legado en Dermatología</span>
                        <div className="h-10 opacity-20 grayscale brightness-0 flex justify-center">
                            <Image
                                src="/logo.webp"
                                alt="Dr. Jorge Iglesias Márquez Signature"
                                width={120}
                                height={30}
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col items-center opacity-10 space-y-2">
                        <span className="text-[8px] tracking-widest font-bold text-black">DR JORGE IGLESIAS</span>
                        <span className="text-[8px] tracking-widest font-serif italic font-bold text-black">SERVICIOS DE AUTOR</span>
                    </div>
                </footer>
            </div>

            <CustomCursor cursorState={cursorState} />
            <FloatingAction className="left-10" />
        </main>
    );
}

// COMPONENTES & HELPERS ADICIONALES

const AccordionItem = ({ question, answer, i }: { question: string, answer: string, i: number }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border-b border-black/10 last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between group text-left"
            >
                <span className={`text-lg lg:text-xl font-light transition-colors duration-300 ${isOpen ? 'text-black' : 'text-black/60 group-hover:text-black'}`}>
                    {question}
                </span>
                <div className={`relative w-8 h-8 flex items-center justify-center rounded-full border border-black/10 transition-all duration-300 ${isOpen ? 'bg-black text-white border-black' : 'bg-transparent text-black group-hover:border-black/30'}`}>
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="minus"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Minus size={14} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plus"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Plus size={14} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 text-black/50 font-serif leading-relaxed max-w-2xl text-base lg:text-lg">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const getFaqs = (slug: string) => {
    // FAQs personalizadas según el servicio
    if (slug.includes('alopecia') || slug.includes('capilar')) {
        return [
            { question: "¿El tratamiento es doloroso?", answer: "Nuestros protocolos capilares están diseñados para ser mínimamente invasivos. La mayoría de pacientes reporta una sensación leve, perfectamente tolerable, y utilizamos técnicas de confort para maximizar su comodidad." },
            { question: "¿Cuándo empezaré a ver resultados?", answer: "La regeneración capilar es un proceso biológico progresivo. Generalmente, se observa una disminución de la caída en el primer mes, y una mejora visible en la densidad y calidad del cabello a partir del tercer mes." },
            { question: "¿Requiere tiempo de baja?", answer: "Absolutamente no. Es un procedimiento 'lunch-break', lo que significa que puedes retomar tu agenda social o laboral inmediatamente después de salir de la consulta." }
        ];
    }
    if (slug.includes('laser') || slug.includes('cicatrices')) {
        return [
            { question: "¿Cuántas sesiones son necesarias?", answer: "Depende de la profundidad y tipo de cicatriz. Un protocolo estándar suele oscilar entre 3 y 5 sesiones, espaciadas cada 4-6 semanas para permitir la regeneración completa del colágeno." },
            { question: "¿Quedarán marcas después del láser?", answer: "Inmediatamente después puede haber un ligero enrojecimiento (similar a haber tomado el sol) que desaparece en 24-48 horas. No quedan marcas permanentes negativas, al contrario, la piel se renueva." },
            { question: "¿Es compatible con el sol?", answer: "Se recomienda evitar la exposición solar directa 2 semanas antes y después del tratamiento. Utilizamos fotoprotección avanzada post-procedimiento para garantizar la seguridad." }
        ];
    }
    // Default / Facial
    return [
        { question: "¿Soy candidato/a para este procedimiento?", answer: "Este tratamiento es altamente versátil. Realizamos una evaluación dermatológica previa con escáner facial para personalizar el protocolo exacto a las necesidades únicas de tu piel." },
        { question: "¿Cuánto dura el efecto?", answer: "Los resultados son duraderos gracias a la estimulación biológica profunda. Dependiendo de los hábitos del paciente y el mantenimiento, los efectos óptimos pueden mantenerse de 12 a 18 meses." },
        { question: "¿Puedo maquillarme después?", answer: "Recomendamos dejar respirar la piel durante las primeras 12 horas. Después de este periodo, puedes usar maquillaje mineral sin ningún inconveniente." }
    ];
};
