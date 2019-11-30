import * as express from 'express'
import { sendNomineeMailBatch } from './mail_handler'


export default async (req: express.Request, res: express.Response) => {
    if ('type' in req.body) {
        await handleMailPost({type: req.body.type, entries: req.body.entries})
        res.status(200).send('Good boy')
    } else {
        res.status(404).send('Type must be included in post body')
    }
}

interface MailRequest {
    type: MailRequestTypes,
    entries?: number[]
}
enum MailRequestTypes {
    NOMINEE = 'nominee'
}
async function handleMailPost(mailRequest: MailRequest) {
    switch(mailRequest.type) {
        case MailRequestTypes.NOMINEE:
            if (mailRequest.entries) {
                return sendNomineeMailBatch(mailRequest.entries)
            }
        default:
            return 'No action'
    }
}