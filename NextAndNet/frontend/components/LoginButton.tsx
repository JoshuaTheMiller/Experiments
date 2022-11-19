import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@mantine/core';

export default function Component() {
  const { data: session } = useSession();

  if(!session || !session.user) {
    return (
        <>          
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )
  }

  return (
    <>      
      <Button variant="outline" onClick={() => signOut()}>Sign out, {session.user.name}?</Button>      
    </>
  )
}