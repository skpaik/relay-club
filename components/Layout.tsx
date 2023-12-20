import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Menu } from './Menu'
import { SbSessionProps} from "@/src/models";

export function Layout({ session, children }: PropsWithChildren<SbSessionProps>) {
  return (
    <>
      <Head>
        <title>Relay.club</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="p-4 border-b bg-white flex justify-between">
          <h1>
            <Link href="/" className="text-red-800 hover:text-red-700 drop-shadow">
                Relay.club
            </Link>
          </h1>
          <Menu session={session} />
        </header>
        <main className="flex-1 p-4">{children}</main>
        <footer className="bg-sky-700 text-white p-4">
            Copyright @ Relay.club
        </footer>
      </div>
    </>
  )
}
