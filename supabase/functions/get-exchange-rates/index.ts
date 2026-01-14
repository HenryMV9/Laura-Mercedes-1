const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const BASE_CURRENCY = 'NGN';

const FALLBACK_RATES = {
  NGN: 1,
  USD: 0.0012,
  GBP: 0.00095,
  EUR: 0.0011,
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    let rates = FALLBACK_RATES;

    try {
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        rates = data.rates || FALLBACK_RATES;
      }
    } catch (apiError) {
      console.warn('Failed to fetch live rates, using fallback:', apiError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        base: BASE_CURRENCY,
        rates: rates,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        },
      }
    );
  } catch (error) {
    console.error('Error in get-exchange-rates:', error);

    return new Response(
      JSON.stringify({
        success: true,
        base: BASE_CURRENCY,
        rates: FALLBACK_RATES,
        timestamp: new Date().toISOString(),
        error: 'Using fallback rates',
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});