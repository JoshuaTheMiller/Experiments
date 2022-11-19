import { NextApiRequest, NextApiResponse } from 'next'
import sendRequest from '../../../utils/backendClient';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {    
    const response = await sendRequest(_req, "https://echothing.free.beeceptor.com", "get")

    res.status(200).json(response);    
}

export default handler

