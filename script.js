 function sortByLength(str) {
  return str
    .split(" ")
    .sort((a, b) => a.length - b.length || a.localeCompare(b))
    .join(" ");
}

function stripUrlParams(url, paramsToStrip = []) {
  const [base, query] = url.split("?");
  if (!query) return url;

  const params = new Map();
  for (const pair of query.split("&")) {
    const [key, value] = pair.split("=");
    if (paramsToStrip.includes(key)) continue;
    params.set(key, value);
  }

  if (params.size === 0) return base;

  const result = [...params]
    .map(([k, v]) => (v === undefined ? k : `${k}=${v}`))
    .join("&");
  return `${base}?${result}`;
}

function partitions(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let part = 1; part <= n; part++) {
    for (let total = part; total <= n; total++) {
      dp[total] += dp[total - part];
    }
  }

  return dp[n];
}

function analysePhrase(phrase) {
  let longueur = 0;
  let mots = 1;
  let voyelles = 0;
  const lettresVoyelles = "aeiouyAEIOUY";

  for (let i = 0; phrase[i] !== "."; i++) {
    const c = phrase[i];
    longueur++;
    if (c === " ") mots++;
    if (lettresVoyelles.includes(c)) voyelles++;
  }

  return { longueur, mots, voyelles };
}

console.log(analysePhrase("Hello my friend."));
// { longueur: 15, mots: 3, voyelles: 5 }
console.log(partitions(10));
// 42
console.log(sortByLength("Hello my friend"));
// "my Hello friend"
console.log(stripUrlParams("https://edabit.com?a=1&b=2&a=2"));
// "https://edabit.com?a=2&b=2"