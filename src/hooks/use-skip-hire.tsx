import { useState, useEffect, useCallback } from 'react';
import { SkipHireItem } from '@/types/skip-hire'; // Asigură-te că acest tip este corect definit
import { SkipHireAPI } from '@/lib/api/skip-hire'; // Calea către API-ul actualizat

export interface UseSkipHireReturn {
    data: SkipHireItem[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

function isSkipHireItem(item: unknown): item is SkipHireItem {
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    const obj = item as Record<string, unknown>;

    return (
        typeof obj.id === 'number' &&
        typeof obj.size === 'number' &&
        typeof obj.hire_period_days === 'number' &&
        (typeof obj.transport_cost === 'number' || obj.transport_cost === null) &&
        (typeof obj.per_tonne_cost === 'number' || obj.per_tonne_cost === null) &&
        typeof obj.price_before_vat === 'number' &&
        typeof obj.vat === 'number' &&
        typeof obj.postcode === 'string' &&
        typeof obj.area === 'string' &&
        typeof obj.forbidden === 'boolean' &&
        typeof obj.created_at === 'string' &&
        typeof obj.updated_at === 'string' &&
        typeof obj.allowed_on_road === 'boolean' &&
        typeof obj.allows_heavy_waste === 'boolean'
    );
}

function isSkipHireItemArray(data: unknown): data is SkipHireItem[] {
    return Array.isArray(data) && data.every(isSkipHireItem);
}

export function useSkipHire(): UseSkipHireReturn {
    const [data, setData] = useState<SkipHireItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result: unknown = await SkipHireAPI.fetchDataFromEnv();
            if (isSkipHireItemArray(result)) {
                setData(result);
            } else {
                setData([]);
                setError('Invalid data format received from API.');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred while fetching data.');
            }
            setData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
}
