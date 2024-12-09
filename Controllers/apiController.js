async function getTrack (req, res) {
    const token = req.headers.authorization
    const trackEndPoint = req.params.trackEndPoint
    const axios = require('axios')

    try{const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackEndPoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        }
    })
    
    res.json(response.data);
} catch (error) {
    console.log (trackEndPoint)
    console.error(error);
        res.status(400).json({ error: "Could not get track" });
}
}
async function getArtist(req, res) {
    const token = req.headers.authorization;
    const artistId = req.params.artistId;
    const axios = require('axios')

    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`,
            {
                method: 'GET',
                headers: { 'Authorization': `${token}` }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Could not get artist info" });
    }
}


module.exports = {
    
    
    
    getTrack,
    getArtist
}