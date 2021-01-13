const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch');

const PORT = 3001;
const API_SERVICE_URL = "https://api.exchangeratesapi.io/latest"


const Rates = require("./rates")

// start the server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})

const checkResponseStatus = (res) => {
    if(res.ok){
        return res
    } else {
        throw new Error(`The HTTP status of the response: ${res.status} (${res.statusText})`)
    }
}

app.use('/api/rates', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api/rates`]: '',
    },
})
)

// app.use('/api/rates', (res, req, next) => {
//     // const base = req.query.base
//     // const currency = req.query.symbols
//     if(req.query.name && req.query.name =='CZK') {
//         next()
//     }
//     else {
//         res.status(403).send()
//     }
// })


app.get("", (req, res, error) => {
    // if(error || res.statusCode > 400) {
    //     res.send('not found')
    //     console.log(error);
    // }
    const base = req.query.base
    const currency = req.query.symbols
    
    res.status(200).send(base + " " + currency)
    
})

// app.get('/api/rates', async (req, res) => {
//     console.log("/api/rates endpoint called");
    
//     const options = {
//         "method": "GET",
//     }

//     const response = await fetch(API_SERVICE_URL, {
//         params: {
//             base: req.query.base,
//             currency:req.query.symbols
//         },
//     },)
//     .then(checkResponseStatus)
//     .then((response)=> response.json())
//     .catch(err => console.log("message: ", err))

//     console.log("response: ", response);
//     res.send(response);
    
// })
