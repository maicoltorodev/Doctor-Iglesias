import React from 'react';
import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from 'next/navigation';
import EditorialForm from '../../components/EditorialForm';

interface SectionPageProps {
    params: Promise<{
        section: string;
    }>;
}

export default async function SectionEditPage({ params }: SectionPageProps) {
    const { section: sectionName } = await params;

    const data = await db.query.siteContent.findFirst({
        where: eq(siteContent.section, sectionName)
    });

    if (!data) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <p className="text-white/40 text-sm">
                    Editando sección dinámica
                </p>
                <h2 className="text-4xl font-light capitalize">
                    {sectionName.replace('_', ' ')}
                </h2>
            </div>

            <EditorialForm
                section={sectionName}
                initialData={data.data}
            />
        </div>
    );
}
