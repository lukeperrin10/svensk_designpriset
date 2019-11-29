import * as express from 'express'


export default async (req: express.Request, res: express.Response) => {
    if ('type' in req.body) {
        await handleMailPost({type: req.body.type, entries: req.body.entries})
        res.status(200).send('Good boy')
    } else {
        res.status(404).send('Type must be included in post body')
    }
}

interface MailRequest {
    type: string,
    entries?: number[]
}
async function handleMailPost(mailRequest: MailRequest) {

}