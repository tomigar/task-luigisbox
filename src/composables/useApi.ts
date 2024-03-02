import { ProductType } from "@/types/Product";

export default function useAPI() {
    const get = async ({
        page,
        size,
        error,
    }: {
        page: number;
        size: number;
        error?: boolean;
    }): Promise<ProductType[]> => {
        try {
            await delay(500);
            if (error) throw new Error("404 Not Found");

            const response = await fetch("/data.json");
            const data: ProductType[] = await response.json();

            const start = (page - 1) * size;
            const end = start + size;
            const paginatedData = data.slice(start, end);
            return paginatedData;
        } catch (error) {
            throw error;
        }
    };

    const delay = (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const itemsLength = async (): Promise<number> => {
        try {
            const response = await fetch("/data.json");
            const data: ProductType[] = await response.json();
            return data.length;
        } catch (error) {
            throw error;
        }
    };

    return { get, itemsLength };
}
