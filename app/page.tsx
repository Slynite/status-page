import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Incidents from '@/components/incidents/incidents';
import Services from '@/components/services/services'
import { Status } from '@/types/status'
import Link from 'next/link';
import { getStatus } from './api/status/route';

async function getData() {
  const response: Status = await getStatus().then((res) => res.json());

  if (response.status == "success") {
    return response;
  } else {
    console.log("Error fetching data" + response);
    return undefined;
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center lg:pt-24 lg:pb-24 lg:pl-64 lg:pr-64">
      <Header />
      {data !== undefined && data.services.length !== 0 ? (
        <>
          <Services services={data.services} servicesDown={data.servicesDown} />
          <Incidents incidents={data.incidents} />
        </>
        ) : (
          <p className='mt-10 mb-10 text-xl'>There was an error fetching the data... Please contact <Link className={'underline'} href="mailto:support@slynite.com">support@slynite.com</Link> and try again later.</p>
        )
      }
      <Footer />
    </main>
  )
}
