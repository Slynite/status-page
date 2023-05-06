import Image from "next/image";

export default function Header() {
    return(
        <>
            <Image src="/logo512.png" alt="Slynite status Logo" width={150} height={150} />
            <h1 className='font-semibold text-2xl md:text-4xl mt-4' >Slynite <p className='text-transparent bg-clip-text bg-gradient-to-r from-gradient-primary to-gradient-secondary inline-block'>status monitor</p></h1>  
        </>
    )
}
