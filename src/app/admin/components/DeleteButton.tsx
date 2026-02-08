"use client";

import React, { useState } from 'react';
import { Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/useToast';

interface DeleteButtonProps {
    id: number;
    onDelete: (id: number) => Promise<{ success: boolean; error?: string }>;
    label?: string;
    canDelete?: boolean;
    disabledMessage?: string;
}

export const DeleteButton = ({
    id,
    onDelete,
    label,
    canDelete = true,
    disabledMessage = "No se puede eliminar el último elemento para mantener la integridad de la sección."
}: DeleteButtonProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { addToast } = useToast();

    const handleDelete = async () => {
        if (!canDelete) {
            addToast(disabledMessage, 'error');
            return;
        }

        if (!confirm(`¿Estás seguro de que deseas eliminar este ${label || 'ítem'}? Esta acción no se puede deshacer.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const result = await onDelete(id);
            if (result.success) {
                addToast(`${label || 'Ítem'} eliminado correctamente`, 'success');
            } else {
                addToast(result.error || 'Error al eliminar', 'error');
            }
        } catch (error) {
            addToast('Error de red al intentar eliminar', 'error');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-3 rounded-xl transition-all disabled:opacity-50 ${canDelete
                    ? 'bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-500/10'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
            title={canDelete ? 'Eliminar' : disabledMessage}
        >
            {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
    );
};
