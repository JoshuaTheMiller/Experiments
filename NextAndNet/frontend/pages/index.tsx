import { useSession } from 'next-auth/react';
import { useState } from 'react';
import LoginButton from '../components/LoginButton';

function IndexPage() {
  const [isPrepped, setIsPrepped] = useState(false)

  const { data: session } = useSession();

  const [text, setText] = useState("");

  if (session && session.user) {
    fetch("/api/thing/echo").then((r) => {
      r.text().then((t) => setText(t))
    })
  }

  return (
    <>
      <h1>Hello!</h1>
      <p>{text}</p>
    </>
  );
}

export default IndexPage;
