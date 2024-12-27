const axios = require('axios');

async function sendSession(session) {
    const response = await axios.post('http://localhost:3005/send', session );
    console.log(response);
    return response;
}

test('server gets and sends back session', async () => {
    let request = {filename: "test", session:"test"}
    let response = await sendSession(request);
    expect(response.data).toEqual(request);
});