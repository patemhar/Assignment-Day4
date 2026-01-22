import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import type { productInt } from "../constants/products";

const api = new ApiClient("https://dummyjson.com");

export const productKeys = {
    all: ["products"] as const,
    productDetail: (productId: number) => [...productKeys.all, productId] as const,
    categories: () => ["category"]
}

export const useProducts = () => {
    return useQuery({
        queryKey: productKeys.all,
        queryFn: async() => {
            const response = await api.get<any>("/products");
            return response;
        },
        staleTime: 60 * 1000,
    });
};

export const useDatailedPoduct = (id: number) => {
    return useQuery({
        queryKey: productKeys.productDetail(id),
        queryFn: async() => {
            const response = await api.get<any>(`/products/${id}`)
            return response;
        },
        staleTime: 60 * 1000,
    })
}

export const useCategories = () => {
    return useQuery({
        queryKey: productKeys.categories(),
        queryFn: async() => {
            const response = await api.get<string[]>(`/products/category-list`)
            return response;
        },
        staleTime: 60 * 1000,
    })
}