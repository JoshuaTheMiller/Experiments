import { useSession } from 'next-auth/react';
import { useState } from 'react';
import LoginButton from '../components/LoginButton';

function IndexPage() {  
  const [isPrepped, setIsPrepped] = useState(false)  

  const { data: session } = useSession();  

  return (  
    <>
      <h1>Hello!</h1>

      <LoginButton/>

      {!session || !session.user ?  <></> : <p>{JSON.stringify(session.user)}</p>}
    </>  
  );
}

export default IndexPage;
