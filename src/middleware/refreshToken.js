const jwt = require('jsonwebtoken');
import axios from "axios";

export default function refreshToken({ next, router }) {
    if (!localStorage.getItem('jwt-refresh')) {
        return router.push({ name: 'login' });
    }
    let token = localStorage.getItem('jwt-access');
    let tokenDecoded = jwt.decode(token);
    let jwtExp = new Date(parseInt(tokenDecoded.exp) * 1000);
    let dateControl = new Date(jwtExp.getTime() - (60 * 1000));
    let now = new Date();

    if (now.getTime() >= dateControl.getTime()) {
        const token = localStorage.getItem("jwt-refresh");

        axios.post("http://localhost:3000/auth/refresh", {},
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function (response) {
                localStorage.setItem("jwt-access", response.data.access_token);
            }).catch(function (err) {
                console.error(err);
            });
    }

    return next();
}