import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import Router from 'next/router'
import { supabase } from '@/utils/supabaseClient'
import React from 'react'

export interface Props {
  session: AuthSession | null
}

export function Menu({ session }: Props) {
  return (
    <ul className="flex space-x-4">
      {session ? (
        <>
          <li>
            <Link href="/products" className="btn-link">Products</Link>
          </li>
          <li>
            <Link href="/cart" className="btn-link">Cart</Link>
          </li>
          <li>
            <button
              className="btn-link"
              onClick={() => {
                supabase.auth.signOut()
                Router.push('/')
              }}
            >
              Sign out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/products" className="btn-link">Products</Link>
          </li>
          <li>
            <Link href="/cart" className="btn-link">Cart</Link>
          </li>
          <li>
            <Link href="/signin" className="btn-link">Sign in/Sign up</Link>
          </li>
        </>
      )}
    </ul>
  )
}
