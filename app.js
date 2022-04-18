const candidates = [
  'Arlington Heights',
  // 'Brookfield',
  // 'Clarendon Hills',
  // 'Des Plaines',
  // 'Downers Grove',
  'Elmhurst',
  // 'Evanston',
  // 'Glen Ellyn',
  'Glencoe',
  // 'La Grange',
  // 'Morton Grove',
  // 'Mount Prospect',
  // 'Naperville',
  // 'Palatine',
  // 'Park Ridge',
  // 'Riverside',
  // 'Westmont',
];

const scores = new Map(candidates.map(c => [c, 0]));

const x = [];
for (let a = 0; a < candidates.length; a++) {
  for (let b = 0; b < candidates.length; b++) {
    x.push(Immutable.Set([ candidates[a], candidates[b] ]));
  }
}
const matchups = Immutable.Set(x);
console.log(matchups);

for (let a = 0; a < candidates.length; a++) {
  for (let b = 0; b < candidates.length; b++) {
    if (a === b) continue;
    document.body.innerHTML = `
      <h1>
        [A] ${candidates[a]}
        <br /> --or --
        <br /> [B] ${candidates[b]}
      </h1>
    `;

    const msg = `[A] ${candidates[a]}  --or--  [B] ${candidates[b]}`;
    const resp = prompt(msg);
    switch (resp) {
      case 'a':
        scores.set(candidates[a], scores.get(candidates[a]) + 1);
        scores.set(candidates[b], scores.get(candidates[b]) - 1);
        break;
      case 'b':
        scores.set(candidates[a], scores.get(candidates[a]) - 1);
        scores.set(candidates[b], scores.get(candidates[b]) + 1);
        break;
      default:
        alert(`expected 'a' or 'b' but got ${resp}`);
        b = b - 1;
    }
  }
}

const results = [...scores.entries()]
    .sort((left, right) => right[1] - left[1]);

let html = ``;
html += `<table>`;
html += `
  <tr>
    <thead>
      <td>Place</td>
      <td>Candidate</td>
      <td>Score</td>
    </thead>
  </tr>
`;
html += `<tbody>`;
for (let i = 0; i < results.length; i++) {
  const [candidate, score] = results[i];
  html += `
    <tr>
      <td>${i+1}</td>
      <td>${candidate}</td>
      <td>${score}</td>
    </tr>
  `;
}
html += `</tbody>`;
html += `</table>`;
document.body.innerHTML = html;