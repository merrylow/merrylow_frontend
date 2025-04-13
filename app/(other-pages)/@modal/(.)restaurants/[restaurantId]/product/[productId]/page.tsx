// import Image from 'next/image';
// import Link from 'next/link';
// import { FaChevronLeft } from "react-icons/fa6";
// import { IoHeartOutline } from "react-icons/io5";
// import ProductModal from "@/components/modal";

// const ProductPage = () => {

//      return (
//           <ProductModal>
//                <div className="w-full h-full relative flex flex-col justify-start overflow-y-scroll">

//                     {/* Product Image */}
//                     <section className="w-full h-96 rounded-t-4xl relative overflow-hidden">
//                          <Image
//                               src="/Yam and palava sauce-marg-tee.jpg" // Replace with your real image
//                               alt="Carbonara pasta"
//                               fill
//                               className="object-cover"
//                          />
//                     </section>

//                     {/* Back Button */}
//                     <section className="fixed flex justify-start items-center w-[88%] h-10 top-36 left-1/2 -translate-x-1/2">
//                          <Link
//                               href='/restaurants'
//                               className='w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-black/20 shadow-[2px_5px_11px_rgba(0,1,0,0.45)] transition-all'
//                               aria-label='Go back'
//                          >
//                               <FaChevronLeft className='size-5 fill-gray-pale' />
//                          </Link>
//                     </section>


//                     {/* Main Content */}
//                     <section className="flex-1 w-[88%] mx-auto mt-6 space-y-6 pb-32">

//                          {/* Product Info */}
//                          <div className="flex justify-between items-start">
//                               <div>
//                                    <h1 className="text-xl text-secondary-light font-extrabold">Carbonara pasta</h1>
//                                    <p className="text-md text-secondary-soft">Smoked pork, Pecorino cheese, ground black pepper</p>
//                                    <div className="flex items-center gap-2 mt-2">
//                                         <span className="text-lg font-extrabold text-primary-main">₵7.50</span>
//                                    </div>
//                               </div>
//                               <IoHeartOutline className='size-8' />
//                          </div>

//                          {/* Add More Section */}
//                          <div className="space-y-4">
//                               <h2 className="text-lg text-secondary-light font-bold">Add more</h2>

//                               {Array(10).fill(0).map((_, i) => (
//                                    <div className="flex justify-between items-center" key={i}>
//                                         <div className="flex items-center gap-2">
//                                              <p className="text-base text-black-soft">Parmesan cheese</p>
//                                         </div>
//                                         <span className="text-base text-black-soft font-semibold">+€2.50</span>
//                                    </div>
//                               ))}
//                          </div>

//                          {/* Package Section */}
//                          <div className="space-y-4">
//                               <h2 className="text-lg text-secondary-light font-bold">Package</h2>

//                               {Array(10).fill(0).map((_, i) => (
//                                    <div className="flex justify-between items-center" key={i}>
//                                         <div className="flex items-center gap-2">
//                                              <p className="text-base text-black-soft">Package box cost</p>
//                                         </div>
//                                         <span className="text-base text-black-soft font-semibold">+€0.50</span>
//                                    </div>

//                               ))}
//                          </div>
//                     </section>

//                     <section className="mb-40"></section>

//                     {/* Bottom Action Bar */}
//                     <section className="fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[88%] bg-transparent py-4 flex justify-between items-center">
//                          <div className="w-[40%] h-11 flex justify-center items-center gap-5 bg-primary-pale rounded-full">
//                               <button className="w-6 h-6 flex items-center justify-center bg-primary-main text-white text-md rounded-lg">-</button>
//                               <span className="text-md text-primary-main font-bold">1</span>
//                               <button className="w-6 h-6 flex items-center justify-center bg-primary-main text-white text-lg rounded-lg pb-0.5">+</button>
//                          </div>

//                          <button className="w-[55%] h-11 bg-primary-main text-white rounded-full font-bold text-[15px]">
//                               Add to order
//                          </button>
//                     </section>
//                </div>
//           </ProductModal>
//      );
// };

// export default ProductPage;




























// Revised Product Modal Page
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa6';
import { IoHeartOutline } from 'react-icons/io5';
import ProductModal from '@/components/modal';

const ProductPage = () => {

  return (
    <ProductModal>
      <div className='fixed inset-0 flex flex-col max-h-[95vh] bg-white rounded-t-4xl'>

        {/* Product Image */}
        <section className='w-full h-96 rounded-t-4xl relative overflow-hidden shrink-0'>
          <Image
            src='/Yam and palava sauce-marg-tee.jpg'
            alt='Carbonara pasta'
            fill
            className='object-cover'
            priority
          />
        </section>

        {/* Back Button */}
        <section className='fixed flex justify-start items-center w-[88%] h-10 top-36 left-1/2 -translate-x-1/2 z-10'>
          <Link
            href='/restaurants'
            className='w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-black/20 shadow-[2px_5px_11px_rgba(0,1,0,0.45)] transition-all'
            aria-label='Go back'
          >
            <FaChevronLeft className='size-5 fill-gray-pale' />
          </Link>
        </section>

        {/* Scrollable Main Content */}
        <div className='flex-1 overflow-y-auto'>

          <section className='flex-1 w-[88%] mx-auto mt-6 space-y-6 pb-32'>

            {/* Product Info */}
            <div className='flex justify-between items-start'>
              <div>
                <h1 className='text-xl text-secondary-light font-extrabold'>Carbonara pasta</h1>
                <p className='text-md text-secondary-soft'>Smoked pork, Pecorino cheese, ground black pepper</p>
                <div className='flex items-center gap-2 mt-2'>
                  <span className='text-lg font-extrabold text-primary-main'>₵7.50</span>
                </div>
              </div>
              <IoHeartOutline className='size-8' />
            </div>

            {/* Add More Section */}
            <div className='space-y-4'>
              <h2 className='text-lg text-secondary-light font-bold'>Add more</h2>

              {Array(2).fill(0).map((_, i) => (
                <div className='flex justify-between items-center' key={i}>
                  <div className='flex items-center gap-2'>
                    <p className='text-base text-black-soft'>Parmesan cheese</p>
                  </div>
                  <span className='text-base text-black-soft font-semibold'>+€2.50</span>
                </div>
              ))}
            </div>

            {/* Package Section */}
            <div className='space-y-4'>
              <h2 className='text-lg text-secondary-light font-bold'>Package</h2>

              {Array(2).fill(0).map((_, i) => (
                <div className='flex justify-between items-center' key={i}>
                  <div className='flex items-center gap-2'>
                    <p className='text-base text-black-soft'>Package box cost</p>
                  </div>
                  <span className='text-base text-black-soft font-semibold'>+€0.50</span>
                </div>
              ))}
            </div>

          </section>

          <section className='mb-40'></section>

        </div>

        {/* Bottom Action Bar */}
        <section className='fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[88%] bg-transparent py-4 flex justify-between items-center z-10'>
          <div className='w-[40%] h-11 flex justify-center items-center gap-5 bg-primary-pale rounded-full'>
            <button className='w-6 h-6 flex items-center justify-center bg-primary-main text-white text-md rounded-lg'>-</button>
            <span className='text-md text-primary-main font-bold'>1</span>
            <button className='w-6 h-6 flex items-center justify-center bg-primary-main text-white text-lg rounded-lg pb-0.5'>+</button>
          </div>

          <button className='w-[55%] h-11 bg-primary-main text-white rounded-full font-bold text-[15px]'>
            Add to order
          </button>
        </section>

      </div>
    </ProductModal>
  );
};

export default ProductPage;
