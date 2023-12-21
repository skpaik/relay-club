import { Layout } from '@/components/Layout'
import { ProductsEditForm } from '@/components/ProductsEditForm'
import { useSession } from '@/utils/hooks/useSession'
import React from "react";

export default function ProductsPage() {
  const session = useSession()

  if (!session) return null

  return (
    <Layout session={session}>
      <ProductsEditForm session={session} />
    </Layout>
  )
}
