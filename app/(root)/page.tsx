import AdCarousel from '@/components/adCarousel'
import Link from 'next/link'
import Card from '@/components/card'
// import { auth } from '@/lib/auth'
import fetchRestaurantsAndProducts from '@/lib/api'


const Home = async () => {
    const session = 1

    return (
        <main className='w-full mx-auto min-h-screen space-y-10'>
            <section className='w-[90%] mx-auto'>
                <h1 className='text-lg font-bold text-secondary-light -mb-7'>
                    {/*Hello {session ? (session?.user?.name)?.split(' ')[0] : 'there'}👋🏽*/}
                    Hello there👋🏽
                </h1>
            </section>
            {/* ad carousel */}
            <section className="w-[90%] h-[15rem] min-h-[15rem] mx-auto mb-12 rounded-[18px]">
                <AdCarousel />
            </section>


            {/* what people are ordering */}
            <section className='card-section'>
              <div className='w-[90%] h-[14%] mx-auto flex justify-between items-center'>
                <h1 className='font-bold text-secondary-light text-[18px]'>What others are ordering🔥</h1>

                <Link href='/' className='see-all-btn px-5'>See all</Link>
              </div>

              <div className="slider-container">
                <div className="shrink-0 w-[0.5px] ml-[-10px] snap-start" />

                {Array(6).fill(0).map((_, i) => (
                  <Card
                    key={i}
                    cardClass={'w-[271px] h-full shrink-0'}
                    cardDetails={{ imgSrc: '/jollof-rice-marg-tee-1094739000-612x612.jpg', name: 'Meal name' }}  />
                ))}
              </div>
            </section>


            {/* top vendors */}
            <section className='card-section'>
              <div className='w-[90%] h-[14%] mx-auto flex justify-between items-center'>
                <h1 className='section-heading'>Top vendors👏</h1>

                <Link href='/' className='see-all-btn'>See all</Link>
              </div>

              <div className="slider-container">
                <div className="shrink-0 w-[0.5px] ml-[-10px] snap-start" />

                {Array(6).fill(0).map((_, i) => (
                  <Card
                    key={i}
                    cardClass={'w-[190px] h-48 shrink-0'}
                    cardDetails={{ imgSrc: '/Yam and palava sauce-marg-tee.jpg', name: 'Vendor name' }}
                  />
                ))}
              </div>
            </section>


            {/* recently viewed */}
            <section className="card-section">
              <div className='w-[90%] h-[14%] mx-auto flex justify-between items-center'>
                <h1 className='section-heading'>Recently viewed</h1>

                <Link href='/' className='see-all-btn'>See all</Link>
              </div>

              <div className="slider-container">
                <div className="shrink-0 w-[0.5px] ml-[-10px] snap-start" />

                {Array(6).fill(0).map((_, i) => (
                  <Card
                    key={i}
                    cardClass={'w-[280px] h-full shrink-0'}
                    cardDetails={{ imgSrc: '/jollof-rice-marg-tee-1094739000-612x612.jpg', name: 'Meal namee' }} />
                ))}
              </div>
            </section>

            <section className='mb-20'></section>
        </main>
    )
}


export default Home