const cachios = require('cachios')
const express = require('express')
const router = express.Router()

const endpoint = 'https://ryanfreeman.dev/wordpress/wp-json/wp/v2'

cachios.getResponseCopy = ({ status, headers, data }) => {
    return {
        status,
        headers,
        data
    }
}

router.get('*', async(req, res) => {
    const url = endpoint + req.originalUrl.replace('/api', '')

    cachios.get(url, {
        ttl: 3600
    }).then(r => {
        res.set('x-wp-total', r.headers['x-wp-total'])
        res.set('x-wp-totalpages', r.headers['x-wp-totalpages'])
        res.json(r.data)
    }).catch(e => res.send(url + ' ' + e.message))
})

module.exports = router