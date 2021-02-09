onmessage = function(e) {
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
    .then(data => postMessage(data));
}
