import { rest } from 'msw';

export const handlers = [
    rest.post('http://localhost:3000/api/auth/validate', (req, res, ctx) => {
        if (req.body.token === 'fail') {
            return res(
                ctx.status(200),
                ctx.json({
                    valid: false,
                })
            );
        } else {
            return res(
                ctx.status(200),
                ctx.json({
                    valid: true,
                    username: 'test'
                })
            );
        }
    })
]