import Link from "next/link";

export default function Footer() {
    return(
        <>
            <p className="self-end">Proudly created by <Link href={'https://github.com/slynite/status'} target="_blank" className='underline'>Slynite</Link> with <Link href={'https://nextjs.org'} target="_blank" className='underline'>Next.js</Link>.</p>
            <p className="self-end">Hosted on <Link href={'https://vercel.com/legal/privacy-policy'} target="_blank" className='underline'>Vercel</Link>.</p>
        </>
    )
}