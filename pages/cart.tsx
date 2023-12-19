import { Layout } from '../components/Layout'
import { CartForm } from '../components/CartForm'
import { useSession } from '../utils/hooks/useSession'

export default function CartPage() {
  const session = useSession()

  if (!session) return null

  return (
    <Layout session={session}>
      <CartForm session={session} />
    </Layout>
  )
}
