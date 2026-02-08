import React from 'react';
import { db } from "@/db";
import { services } from "@/db/schema";
import { asc } from "drizzle-orm";
import {
    Plus,
    Edit,
    GripVertical,
    Eye
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteButton } from '../components/DeleteButton';
import { deleteService } from '../actions';

async function getServices() {
    return await db.query.services.findMany({
        orderBy: [asc(services.order)]
    });
}

export default async function ServicesManagement() {
    const list = await getServices();

    return (
        <div className="space-y-10 pb-20">
            <div className="flex items-center justify-between">
                <p className="text-white/40 max-w-lg leading-relaxed">
                    Añada o edite los servicios médicos que se ofrecen en la clínica.
                    El orden de aparición afectará al scroll horizontal de la web.
                    <br />
                    <span className="text-[10px] text-white/20 uppercase tracking-tighter">Mínimo 1 servicio requerido.</span>
                </p>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform"
                >
                    <Plus size={18} /> Nuevo Servicio
                </Link>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[40px] overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Orden</th>
                            <th className="px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Imagen</th>
                            <th className="px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Nombre</th>
                            <th className="px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Slug</th>
                            <th className="px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {list.map((service) => (
                            <tr key={service.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <GripVertical size={16} className="text-white/10 group-hover:text-white/30" />
                                        <span className="text-sm font-medium">{service.order}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="w-16 h-12 rounded-lg bg-white/5 relative overflow-hidden ring-1 ring-white/10">
                                        <Image
                                            src={service.image}
                                            alt={service.label}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-medium">{service.label}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <code className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">/{service.slug}</code>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/servicio/${service.slug}`}
                                            target="_blank"
                                            className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                            title="Ver en la web"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        <Link
                                            href={`/admin/services/${service.id}`}
                                            className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                            title="Editar"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <DeleteButton
                                            id={service.id}
                                            onDelete={deleteService}
                                            label="servicio"
                                            canDelete={list.length > 1}
                                            disabledMessage="Debe haber al menos un servicio para no romper la sección."
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {list.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <p className="text-white/20">No hay servicios registrados aún.</p>
                    <Link href="/admin/services/new" className="text-white text-sm font-bold tracking-widest uppercase underline underline-offset-8">
                        Crear el primero
                    </Link>
                </div>
            )}
        </div>
    );
}
