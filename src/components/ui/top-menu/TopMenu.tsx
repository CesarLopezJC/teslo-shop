'use client';
import { titleFont } from '@/config/fonts';
import { IoSearchOutline, IoCartOutline, IoMenuOutline } from 'react-icons/io5';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCartStore, useUIStore } from '@/store';

export const TopMenu = () => {
  const openMenu = useUIStore(state => state.openSideMenu);
  const totalItems = useCartStore(state => state.getTotalItems());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [])

  return (
    <nav className='flex px-5 justify-between items-center w-full'>

      {/* LOGO */}
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>


      {/*central menu */}
      <div className='hidden sm:block'>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/men'>MEN</Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/women'>WOMEN</Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/kid'>KIDS</Link>
      </div>



      {/* SEARCH, CART,  MENU */}
      <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>

        <Link href={
          loading && totalItems === 0 ?
            '/empty' :
            '/cart'}
          className='mx-2'>
          <div className='relative'>
            {
              loading && totalItems > 0 && (
                <span className='fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
                  {totalItems}
                </span>
              )
            }
            <IoCartOutline className='w-5 h-5' />
          </div>

        </Link>


        <button className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          onClick={() => openMenu()}
        >Menu</button>

      </div>

    </nav>
  )
}
