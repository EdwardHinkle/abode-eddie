import * as jwt from "jsonwebtoken";

export let approveRequest = (req, res, next) => {

    let config = req.app.get('config');

    let requestInfo = req.session.indieAuthRequest;

    if (requestInfo === undefined || requestInfo.redirect_uri === undefined) {
        console.log('Either no IndieAuth Request or no Redirect URI');
        next()
    }

    console.log("Request Info");
    console.log(requestInfo);

    const payload = {
        client_id: requestInfo.client_id,
        redirect_uri: requestInfo.redirect_uri,
        me: req.session.username,
        state: requestInfo.state,
        id: new Date().getTime(),
        scope: undefined
    };

    if (requestInfo.response_type == 'code' && requestInfo.scopes.length > 1) {
        payload.scope = requestInfo.scopes.map(scope => scope.id).filter(scope => scope !== 'id')
    }

    console.log('jwt payload');
    console.log(payload);

    let token = jwt.sign(payload, config.jwt_secret, {
        expiresIn: 120 // expires in 2 minutes
    }, null);

    // TODO: Eventually I want to remove this me attribute as it's not part of the spec but Micro.blog requires it
    let redirectUrl = requestInfo.redirect_uri + (requestInfo.redirect_uri.indexOf('?') === -1 ? '?' : '&') + `code=${token}&me=${req.session.username}`;
    if (requestInfo.state !== undefined) {
        redirectUrl += `&state=${requestInfo.state}`;
    }

    delete req.session.indieAuth;

    console.log("approval redirectUrl", redirectUrl);

    res.redirect(302, redirectUrl);

};