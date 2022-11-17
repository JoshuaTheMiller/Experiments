import * as msal from "@azure/msal-browser";


const msalConfig : msal.Configuration = {
    auth: {
        // For env vars to be exposed in the browser:
        // https://nextjs.org/docs/basic-features/environment-variables
        clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,    
        redirectUri: '/'        
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance }