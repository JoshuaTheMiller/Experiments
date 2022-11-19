import { NextApiRequest, NextApiResponse } from 'next'
import sendRequest from '../../../utils/backendClient';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {    
    const response = await sendRequest<string,string>(_req, "https://echothing.free.beeceptor.com", "get")

    console.log(response);    

    res.status(200).json(response);    
}

export default handler

