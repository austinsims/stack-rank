const candidates = [
  'Arlington Heights',
  'Brookfield',
  'Clarendon Hills',
  'Des Plaines',
  'Downers Grove',
  'Elmhurst',
  'Evanston',
  'Glen Ellyn',
  'Glencoe',
  'La Grange',
  'Morton Grove',
  'Mount Prospect',
  'Naperville',
  'Palatine',
  'Park Ridge',
  'Riverside',
  'Westmont',
];

const scores = new Map(candidates.map(c => [c, 0]));

const builder = [];
for (let a = 0; a < candidates.length; a++) {
  for (let b = 0; b < candidates.length; b++) {
    if (a === b) continue;
    builder.push(Immutable.Set([candidates[a], candidates[b]]));
  }
}
const matchups = Immutable.Set(builder).toArray();

for (let i = 0; i < matchups.length; i++) {
  const matchup = matchups[i];
  const array = matchup.toArray();
  const candidateA = array[0];
  const candidateB = array[1];

  document.body.innerHTML = `
      <p>
        (${i+1} of ${matchups.length})
        <br /> <progress value="${i+1}" max="${matchups.length}"></progress>
      </p>
      <h1>
        <br />[A] ${candidateA}
        <br /> --or --
        <br /> [B] ${candidateB}
      </h1>
    `;

  const msg = `[A] ${candidateA}  --or--  [B] ${candidateB}`;
  const resp = prompt(msg);
  switch (resp) {
    case 'a':
      scores.set(candidateA, scores.get(candidateA) + 1);
      scores.set(candidateB, scores.get(candidateB) - 1);
      break;
    case 'b':
      scores.set(candidateA, scores.get(candidateA) - 1);
      scores.set(candidateB, scores.get(candidateB) + 1);
      break;
    default:
      alert(`expected 'a' or 'b' but got ${resp}`);
      i--;
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
      <td>${i + 1}</td>
      <td>${candidate}</td>
      <td>${score}</td>
    </tr>
  `;
}
html += `</tbody>`;
html += `</table>`;
document.body.innerHTML = html;