export default {
  async fetch(request, env) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers });

    try {
      const { prompt } = await request.json();
      const aegis = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
        messages: [{ role: 'system', content: 'You are Aegis-7. Defensive.' }, { role: 'user', content: prompt }]
      });
      const chronos = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', {
        messages: [{ role: 'system', content: 'You are Chronos. Historical.' }, { role: 'user', content: prompt }]
      });
      const gemini = await env.AI.run('@cf/google/gemma-7b-it-loas', {
        messages: [{ role: 'system', content: 'You are Gemini. Synthesize.' }, { role: 'user', content: prompt }]
      });

      return new Response(JSON.stringify({ aegis: aegis.response, chronos: chronos.response, gemini: gemini.response }), {
        headers: { ...headers, "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
    }
  }
};

