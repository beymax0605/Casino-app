// @ts-ignore
// eslint-disable-next-line no-restricted-globals
let ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
  const query = `{
        jackpots {
          amount
          game
        }
        games {
          id
          categories
          name
          image
        }
    }`

  fetch('https://pnpap5qx07.execute-api.eu-west-1.amazonaws.com/dev/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: query})
  })
    .then(r => r.json())
    .then(data => ctx.postMessage(data));
});
