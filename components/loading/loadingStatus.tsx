import Header from "../header/header";

export default function LoadingStatus() {
    return(
        <>
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
        </>
    )
}