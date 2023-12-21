import { Layout } from '@/components/Layout'
import { ProductsForm } from '@/components/ProductsForm'
import { useSession } from '@/utils/hooks/useSession'
import React from "react";

export default function ProductsPage() {
  const session = useSession()

  return (
    <Layout session={session}>
      <ProductsForm session={session} />
    </Layout>
  )
}
