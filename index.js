export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const { prompt } = await request.json();

    // AEGIS-7 (Tactical)
    const aegis = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [{ role: 'system', content: 'You are Aegis-7. Tactical and defensive.' }, { role: 'user', content: prompt }]
    });

    // CHRONOS (History)
    const chronos = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', {
      messages: [{ role: 'system', content: 'You are Chronos. You challenge safety with history.' }, { role: 'user', content: prompt }]
    });

    // GEMINI (Synthesis)
    const gemini = await env.AI.run('@cf/google/gemma-7b-it-loas', {
      messages: [{ role: 'system', content: 'You are Gemini. Summarize the debate.' }, { role: 'user', content: prompt }]
    });

    return new Response(JSON.stringify({ aegis: aegis.response, chronos: chronos.response, gemini: gemini.response }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
};


