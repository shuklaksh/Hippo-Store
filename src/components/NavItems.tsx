'use client';

import { PRODUCT_CATEGORIES } from '@/app/config';
import React, { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const NavItems = () => {
    const[activeIndex, setActiveIndex] = useState<null | number>(null);
    const navRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(navRef, () => setActiveIndex(null));

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if(event.key === 'Escape') setActiveIndex(null);
        }
        document.addEventListener('keydown',handler);

        return () => {
            document.removeEventListener('keydown',handler);
        }
    },[])
  return (
    <div className='flex gap-4 h-full' ref={navRef}>
      { PRODUCT_CATEGORIES.map((category,i) => {

        const handleOpen = () => {
            if(activeIndex === i) setActiveIndex(null)
            else  setActiveIndex(i);
        }

        const isOpen = i === activeIndex;
        const isAnyOpen = activeIndex !== null;

        return (
            <NavItem key={category.value} category={category} handleOpen={handleOpen} isOpen={isOpen} isAnyOpen={isAnyOpen} />
        )

      })}

    </div>
  )
}

export default NavItems
