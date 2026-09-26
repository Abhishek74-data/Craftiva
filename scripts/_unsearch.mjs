const queries = {
  beds: "luxury bedroom bed interior",
  wardrobes: "walk in closet wardrobe interior",
  office: "home office desk interior design",
  kids: "kids room interior design",
  tables: "coffee table living room interior",
  chairs: "accent armchair interior corner",
  ottomans: "ottoman bench living room interior",
  storage: "storage cabinet console interior design",
};

for (const [key, query] of Object.entries(queries)) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=12`;
  const json = await (await fetch(url)).json();
  const items = (json.results || []).filter((r) => !r.premium);
  const top = items.sort((a, b) => b.likes - a.likes).slice(0, 4);
  console.log(`\n=== ${key}: ${query} (${json.total}) ===`);
  for (const p of top) {
    console.log(`${p.id} | ${p.likes}H | ${p.width}x${p.height} | ${(p.alt_description || "").slice(0, 80)}`);
    console.log(`   ${p.urls.raw.split("?")[0]}`);
  }
}