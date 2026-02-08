import React from 'react';
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from 'next/navigation';
import ServiceForm from '../../components/ServiceForm';

interface ServiceEditPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ServiceEditPage({ params }: ServiceEditPageProps) {
    const { id } = await params;

    // Si el ID es 'new', Next.js debería haberlo manejado por la ruta /new, 
    // pero por si acaso, o si se usa el mismo componente:
    if (id === 'new') return notFound();

    const service = await db.query.services.findFirst({
        where: eq(services.id, parseInt(id))
    });

    if (!service) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <p className="text-white/40 text-sm">
                    Editando servicio
                </p>
                <h2 className="text-4xl font-light">
                    {service.label}
                </h2>
            </div>

            <ServiceForm initialData={service} />
        </div>
    );
}
