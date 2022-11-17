import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { useEffect, useState } from 'react';

function SignInButton() {  
  const { instance } = useMsal();

  const signInFunc = async () => {        
    const accounts = instance.getAllAccounts();
    if (accounts.length === 0) {
        // No user signed in
        instance.loginRedirect();
    }
  }

  return (    
    <button onClick={signInFunc}>Sign In</button>  
  );
}

function WelcomeUser() {
  const { accounts } = useMsal();
  const username = accounts[0].username;

  return <p>Welcome, {username}</p>;
}

function IndexPage() {  
  const { instance } = useMsal();

  const [isPrepped, setIsPrepped] = useState(false)  

  useEffect(() => {   
    console.log("Prepping") 
    instance.handleRedirectPromise()
    .then(() => {
      setIsPrepped(true);
      console.log("Prepped!");
    })
    .catch(() => console.log("sad"))   
  }, [])

  if (!isPrepped) return <p>Loading...</p>  

  return (  
    <>
      <h1>Hello!</h1>

      <AuthenticatedTemplate>
        <p>This will only render if a user is signed-in.</p>
        <WelcomeUser />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>This will only render if a user is not signed-in.</p>    
        { isPrepped ? <SignInButton/> : <></>}               
      </UnauthenticatedTemplate>
    </>  
  );
}

export default IndexPage;
