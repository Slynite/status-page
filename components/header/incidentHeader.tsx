import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function IncidentHeader() {
    return(
        <div className="mb-10">
            <div className="flex items-center mb-2">
                <Image src="/logo512.png" alt="Slynite status Logo" width={45} height={45} />
                <h1 className="text-xl ml-3">Slynite status</h1>
            </div>
            <Link href="/">
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium inline-flex items-center px-3 py-1.5 rounded">
                    <ArrowLeftIcon className="mr-2 w-4 h-4" /> Go to overview
                </button>
            </Link>
        </div>
    )
}