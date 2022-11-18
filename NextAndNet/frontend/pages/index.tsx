import { useEffect, useState } from 'react';
import LoginButton from '../components/LoginButton';

function IndexPage() {  
  const [isPrepped, setIsPrepped] = useState(false)  

  return (  
    <>
      <h1>Hello!</h1>

      <LoginButton/>
    </>  
  );
}

export default IndexPage;
