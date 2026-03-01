export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    try {
      const { prompt } = await request.json();

      // Aegis-7: Security & Defense
      const aegis = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [{ role: 'system', content: 'You are Aegis-7. Focus on security and threats.' }, { role: 'user', content: prompt }]
      });

      // Chronos: History & Context
      const chronos = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [{ role: 'system', content: 'You are Chronos. Focus on historical data and patterns.' }, { role: 'user', content: prompt }]
      });

      // Gemini: Synthesis & Strategy
      const gemini = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [{ role: 'system', content: 'You are Gemini. Synthesize the advice of Aegis and Chronos.' }, { role: 'user', content: prompt }]
      });

      return new Response(JSON.stringify({ aegis: aegis.response, chronos: chronos.response, gemini: gemini.response }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
    }
  }
};

