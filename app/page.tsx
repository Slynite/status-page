"use client"

import Header from '@/components/header/header';
import Incidents from '@/components/incidents/incidents';
import LoadingStatus from '@/components/loading/loadingStatus';
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
        <>
		  	<Header />
          	<Services services={data.services} categories={data.categories} servicesDown={data.servicesDown} />
          	<Incidents incidents={data.incidents} />
        </>
    )
  } else {
    if (isLoading) {
      return(
        <LoadingStatus />
      )
    } else {
      return(
        <>
		      <Header />
          <p className='mt-10 mb-10 text-xl'>There was an error fetching the data... Please contact <Link className={'underline'} href="mailto:support@slynite.com">support@slynite.com</Link> and try again later.</p>
          {error !== undefined ? <details className='mt-10 mb-10 text-xl self-start'>Error: {error.message}</details> : <></>}
          {data?.message !== undefined ? <details className='mt-10 mb-10 text-xl self-start'>Error: {data.message}</details> : <></>}
        </>
      )
    }
  }
}