import PaymentButton from '../../components/PaymentButton'
import Link from "next/link";



export default function Home() {
  return (
    <div>
      <h1>Helllloooooo homepage</h1>
      <Link href={'/products'}><button className='bg-slate-700 p-4'>
        Products</button></Link>
      <PaymentButton />
    </div>
  );
}
