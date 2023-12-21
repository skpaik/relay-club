import { Layout } from '@/components/Layout'
import { ProductsAddForm } from '@/components/ProductsAddForm'
import { useSession } from '@/utils/hooks/useSession'
import React from "react";

export default function ProductsPage() {
  const session = useSession()

  if (!session) return null

  return (
    <Layout session={session}>
      <ProductsAddForm session={session} />
    </Layout>
  )
}
