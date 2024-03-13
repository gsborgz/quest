import Link from 'next/link';
import Shop from './shop/page';

export default function Home() {
  return (
    <>
      <h1 className='m-0'>Em Construção (Home)</h1>

      <Link href='/shop'>Shop</Link>
    </>
  );
}
