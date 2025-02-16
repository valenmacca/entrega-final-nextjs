import Link from "next/link"

  export default function notFound (){
    return(
        <>
        <p> no se encontro ninguna web</p>
        <Link href="/">volver al home</Link>
        </>
    )
}