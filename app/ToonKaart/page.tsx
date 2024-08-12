import dynamic from 'next/dynamic'

export default function MyPage() {
    const Map = dynamic(() => import('@/modules/MapModule'), {
        ssr: false
      });

  
    return <main>
      <Map />
    </main>
  }