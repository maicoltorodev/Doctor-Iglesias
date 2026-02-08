import React from 'react';
import { db } from "@/db";
import { results } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Plus, Edit, Activity } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteButton } from '../components/DeleteButton';
import { deleteResult } from '../actions';

async function getResults() {
    return await db.query.results.findMany({
        orderBy: [asc(results.order)]
    });
}

export default async function ResultsManagement() {
    const list = await getResults();

    return (
        <div className="space-y-10 pb-20">
            <div className="flex items-center justify-between">
                <p className="text-white/40 max-w-lg leading-relaxed">
                    Gestione los casos de éxito (Antes y Después).
                    Se requiere al menos un caso para mantener la sección activa.
                </p>
                <Link
                    href="/admin/results/new"
                    className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform"
                >
                    <Plus size={18} /> Nuevo Caso
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {list.map((result) => (
                    <div key={result.id} className="group bg-white/5 border border-white/5 rounded-[40px] p-8 space-y-8 hover:bg-white/[0.08] transition-all">
                        <div className="flex items-center justify-between px-2">
                            <div className="space-y-1">
                                <h4 className="text-lg font-light">{result.title}</h4>
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20">Caso {result.caseId}</span>
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/admin/results/${result.id}`} className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                                    <Edit size={16} />
                                </Link>
                                <DeleteButton
                                    id={result.id}
                                    onDelete={deleteResult}
                                    label="caso"
                                    canDelete={list.length > 1}
                                    disabledMessage="Debe haber al menos un caso de éxito."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <p className="text-[9px] font-bold tracking-widest uppercase text-white/20 text-center">Antes</p>
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative ring-1 ring-white/10">
                                    <Image src={result.beforeImage} alt="Antes" fill className="object-cover" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[9px] font-bold tracking-widest uppercase text-white/20 text-center">Después</p>
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden relative ring-1 ring-white/10">
                                    <Image src={result.afterImage} alt="Después" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {list.length === 0 && (
                <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                    <Activity size={48} className="mx-auto text-white/5 mb-4" />
                    <p className="text-white/20">No hay casos de éxito registrados.</p>
                </div>
            )}
        </div>
    );
}
