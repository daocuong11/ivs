
async function basicAuth(req, res, next) {

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const isValidUser = username === 'my-username' && password === 'my-password';
    if (!isValidUser) { 
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    next();
}

module.exports = basicAuth;
