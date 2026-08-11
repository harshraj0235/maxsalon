process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function searchPlaylists(query) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=EgIQAw%253D%253D`; // sp=EgIQAw%3D%3D filters for playlists
  const res = await fetch(url);
  const text = await res.text();
  const regex = /"playlistId":"(PL[a-zA-Z0-9_-]+)"/g;
  let match;
  const ids = new Set();
  while ((match = regex.exec(text)) !== null) {
    ids.add(match[1]);
    if (ids.size >= 3) break;
  }
  console.log(`--- ${query} ---`);
  for (const id of ids) console.log(id);
}

async function run() {
  await searchPlaylists('sufi hits playlist');
  await searchPlaylists('2000s indie pop india playlist');
}
run();
