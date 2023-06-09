"use client"

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import Incidents from '@/components/incidents/incidents';
import Loading from '@/components/loading';
import Services from '@/components/services/services';
import { Status } from '@/types/status';;
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url: string | URL) => fetch(url).then(r => r.json())

export default function Home() {

  const { data, error, isLoading } = useSWR<Status, Error>('/api/status', fetcher, {
      refreshInterval: 120000,
      revalidateOnFocus: false,
    }
  )

  if (data !== undefined && data.status === 'success') {
    return (
      <main className="flex min-h-screen flex-col items-center p-8 lg:pt-24 lg:pb-24 lg:pl-64 lg:pr-64">
          <Header />
          <Services services={data.services} categories={data.categories} servicesDown={data.servicesDown} />
          <Incidents incidents={data.incidents} />
          <Footer />
        </main>
    )
  } else {
    if (isLoading) {
      return(
        <Loading />
      )
    } else {
      return(
        <main className="flex min-h-screen flex-col items-center p-8 lg:pt-24 lg:pb-24 lg:pl-64 lg:pr-64">
          <Header />
          <p className='mt-10 mb-10 text-xl'>There was an error fetching the data... Please contact <Link className={'underline'} href="mailto:support@slynite.com">support@slynite.com</Link> and try again later.</p>
          {error !== undefined ? <p className='mt-10 mb-10 text-xl'>Error: {error.message}</p> : <></>}
          {data?.message !== undefined ? <p className='mt-10 mb-10 text-xl'>Error: {data.message}</p> : <></>}
          <Footer />
        </main>
      )
    }
  }
}