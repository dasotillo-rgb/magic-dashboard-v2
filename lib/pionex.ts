import { RestClient } from 'pionex-api-client';

// Asegúrate de tener NEXT_PUBLIC_PIONEX_API_KEY y PIONEX_API_SECRET en tu .env.local
const API_KEY = process.env.NEXT_PUBLIC_PIONEX_API_KEY || '';
const API_SECRET = process.env.PIONEX_API_SECRET || '';

export const pionexClient = new RestClient({
    apiKey: API_KEY,
    apiSecret: API_SECRET,
});

export const getPionexMarketData = async (symbol: string) => {
    try {
        // Wrapper para obtener datos. APE ajustará esto según la respuesta real de la API.
        const ticker = await pionexClient.getTicker({ symbol });
        return ticker;
    } catch (error) {
        console.error("Error fetching Pionex market data:", error);
        return null;
    }
};
