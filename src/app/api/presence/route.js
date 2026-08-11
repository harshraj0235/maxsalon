// Store active connections in memory
// Note: In serverless environments (like Vercel), this may reset across cold starts,
// but it is perfect for a self-hosted Node.js VPS.
let activeUsers = new Map();

export async function POST(request) {
  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
    }

    const now = Date.now();
    activeUsers.set(userId, now);

    // Clean up stale users who haven't pinged in > 15 seconds
    // (Meaning they closed the tab or lost connection)
    for (const [id, lastSeen] of activeUsers.entries()) {
      if (now - lastSeen > 15000) {
        activeUsers.delete(id);
      }
    }

    // Return the current number of active listeners
    return new Response(JSON.stringify({ count: activeUsers.size }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process presence' }), { status: 500 });
  }
}
