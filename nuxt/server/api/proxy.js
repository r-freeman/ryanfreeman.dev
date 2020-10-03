const cachios = require('cachios')
const express = require('express')
const router = express.Router()

const WORDPRESS_API = 'https://ryanfreeman.dev/wordpress/wp-json/wp/v2'

cachios.getResponseCopy = ({ status, headers, data }) => {
    return {
        status,
        headers,
        data
    }
}

// requests to /api are proxied through to wordpress and cached
router.get('*', async(req, res) => {
    const url = WORDPRESS_API + req.originalUrl.replace('/api', '')

    cachios.get(url, {
        // cache for one hour
        ttl: 3600
    }).then(r => {
        res.set('x-wp-total', r.headers['x-wp-total'])
        res.set('x-wp-totalpages', r.headers['x-wp-totalpages'])
        res.json(r.data)
    }).catch(e => res.send(url + ' ' + e.message))
})

module.exports = router