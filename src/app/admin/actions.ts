"use server";

import { db } from "@/db";
import { siteContent, services, galleryItems, results, testimonials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Helper function to revalidate all pages
function revalidateAll() {
    revalidatePath('/', 'layout');
    revalidatePath('/mobile', 'page');
}

// 1. Update site_content (Editorial)
export async function updateSiteContent(section: string, data: any) {
    try {
        await db.update(siteContent)
            .set({ data, updatedAt: new Date() })
            .where(eq(siteContent.section, section));

        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error updating site content:", error);
        return { success: false, error: "Failed to update content" };
    }
}

// 2. CRUD for Services
export async function createService(data: any) {
    try {
        await db.insert(services).values(data);
        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error creating service:", error);
        return { success: false, error: "Failed to create service" };
    }
}

export async function updateService(id: number, data: any) {
    try {
        await db.update(services)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(services.id, id));

        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error updating service:", error);
        return { success: false, error: "Failed to update service" };
    }
}

export async function deleteService(id: number) {
    try {
        await db.delete(services).where(eq(services.id, id));
        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error deleting service:", error);
        return { success: false, error: "Failed to delete service" };
    }
}

// 3. CRUD for Gallery
export async function updateGalleryItem(id: number, data: any) {
    try {
        await db.update(galleryItems)
            .set(data)
            .where(eq(galleryItems.id, id));

        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error updating gallery item:", error);
        return { success: false, error: "Failed to update item" };
    }
}

export async function deleteGalleryItem(id: number) {
    try {
        await db.delete(galleryItems).where(eq(galleryItems.id, id));
        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error deleting gallery item:", error);
        return { success: false, error: "Failed to delete item" };
    }
}

// 4. CRUD for Results
export async function updateResult(id: number, data: any) {
    try {
        await db.update(results)
            .set(data)
            .where(eq(results.id, id));

        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error updating result:", error);
        return { success: false, error: "Failed to update result" };
    }
}

export async function deleteResult(id: number) {
    try {
        await db.delete(results).where(eq(results.id, id));
        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error deleting result:", error);
        return { success: false, error: "Failed to delete result" };
    }
}

// 5. CRUD for Testimonials
export async function updateTestimonial(id: number, data: any) {
    try {
        await db.update(testimonials)
            .set(data)
            .where(eq(testimonials.id, id));

        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error updating testimonial:", error);
        return { success: false, error: "Failed to update testimonial" };
    }
}

export async function deleteTestimonial(id: number) {
    try {
        await db.delete(testimonials).where(eq(testimonials.id, id));
        revalidateAll();
        return { success: true };
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return { success: false, error: "Failed to delete testimonial" };
    }
}
