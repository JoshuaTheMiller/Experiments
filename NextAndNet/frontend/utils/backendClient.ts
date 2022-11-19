import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"; 

// TODO: actually make this useful
async function sendRequest<TBody, TResponse>(req: NextApiRequest, route:string, method:"get"|"post") {
    const session = await getSession({req:req});

    if(!session) {
        return "Nope";
    }

    if(!session.accessToken) {
        return "Nope";
    }

    const access_token = session?.accessToken;

    const response = await fetch(route, {
        method: method,
        headers: {
            "asaasdf":access_token
        }
    })

    if(!response.ok) {
        return "Nope";
    }        

    return await response.text() as TResponse;
}

export default sendRequest

