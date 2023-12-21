import { Layout } from '@/components/Layout'
import { useSession } from '@/utils/hooks/useSession'
import React from "react";

export default function Home() {
  const session = useSession()

  return <Layout session={session}>Welcome to Relay.club!</Layout>
}
