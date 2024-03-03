import { ProductType } from "@/types/Product";
import { ref } from "vue";

export default function useAPI() {
    const get = async ({
        page,
        size,
        error,
    }: {
        page: number;
        size: number;
        error?: boolean;
    }): Promise<{ items: ProductType[]; maxPages: number }> => {
        try {
            await delay(500);
            if (error) throw new Error("404 Not Found");

            const response = await fetch("/data.json");
            const data: ProductType[] = await response.json();
            const maxPages = ref(Math.ceil(data.length / size));

            const start = (page - 1) * size;
            const end = start + size;
            const paginatedData = data.slice(start, end);

            return { items: paginatedData, maxPages: maxPages.value };
        } catch (error) {
            throw error;
        }
    };

    const delay = (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    return { get };
}
