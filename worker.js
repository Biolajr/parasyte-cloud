export default {
  async fetch(request, env) {
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': 'https://parasyte.cloud',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();
      const { name, email, subject, message } = body;

      // Validate
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), {
          status: 400, headers
        });
      }

      // Send via Resend
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'PArAsYtE Contact <contact@parasyte.cloud>',
          to: ['infra@parasyte.cloud'],
          reply_to: email,
          subject: `[parasyte.cloud] ${subject} — from ${name}`,
          html: `
            <h2>New message from parasyte.cloud</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr/>
            <p>${message}</p>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Resend error:', err);
        return new Response(JSON.stringify({ error: 'Failed to send' }), {
          status: 500, headers
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500, headers
      });
    }
  }
};
