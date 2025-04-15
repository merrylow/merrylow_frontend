'use client'

import { useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

const FavouriteIcon = () => {
     const [isFavorited, setIsFavorited] = useState(false);

     return (
          <button
               title='favourite button'
               type='button'
               onClick={() => setIsFavorited(prev => !prev)}
               className='flex items-center justify-center rounded-full transition-colors duration-300 border-none outline-none'
          >
               {isFavorited ? (
                    <IoHeart className='size-9 fill-primary-main' />
               ) : (
                    <IoHeartOutline className='size-9 text-primary-main' />
               )}
          </button>
     );
};

export default FavouriteIcon;