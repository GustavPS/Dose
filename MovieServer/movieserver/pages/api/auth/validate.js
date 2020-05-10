const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SERVERSECRET';

export default async (req, res) => {
    console.log(req.body.token);
    await fetch('http://192.168.0.105:3000/api/auth/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: req.body.token,
        }),
    })
    .then((r) => r.json())
    .then((data) => {
        console.log(data);
        if (data.valid) {
            const token = jwt.sign(
                {
                    username: data.username
                },
                jwtSecret,
                {
                    expiresIn: 3000, // 50 min
                },
            );
            res.status(200).json({
                status: 'success',
                token: token
            })
        } else {
            res.status(200).json({
                status: 'error',
                error: 'Not a valid token'
            })
        }
    });
  }
  