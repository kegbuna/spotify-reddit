module.exports = {
	clientId: process.env.spotify_clientId,
	clientSecret: process.env.spotify_clientSecret,
	scopes: ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public', 'playlist-modify-private', 'user-read-email'],
	redirectUri: process.env.spotify_redirectUri
};