import Footer from "./footer/footer";
import Header from "./header/header";

export default function Loading() {
    return(
        <main className="flex min-h-screen flex-col items-center p-8 lg:pt-24 lg:pb-24 lg:pl-64 lg:pr-64">
            <Header />
            <div className='bg-zinc-800 w-full rounded-2xl p-6 text-base mt-10 mb-10 animate-pulse'>
                <div className='bg-zinc-700 rounded-lg p-4 mb-6'>
                    <div className="rounded-full h-4 w-8/12 bg-zinc-500" />
                </div>
                <div className="space-y-3">
                    <div className='bg-zinc-700 rounded-lg p-4 grid grid-cols-2'>
                        <div className="rounded-full h-4 w-8/12 bg-zinc-500" />
                        <div className="inline-flex items-center px-2.5 py-0.5 justify-self-end rounded-full h-4 w-4/12 bg-zinc-500" />
                    </div>
                    <div className='bg-zinc-700 rounded-lg p-4 grid grid-cols-2'>
                        <div className="rounded-full h-4 w-8/12 bg-zinc-500" />
                        <div className="inline-flex items-center px-2.5 py-0.5 justify-self-end rounded-full h-4 w-4/12 bg-zinc-500" />
                    </div>
                    <div className='bg-zinc-700 rounded-lg p-4 grid grid-cols-2'>
                        <div className="rounded-full h-4 w-8/12 bg-zinc-500" />
                        <div className="inline-flex items-center px-2.5 py-0.5 justify-self-end rounded-full h-4 w-4/12 bg-zinc-500" />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}