"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const SearchBar = ({placeholder= 'Search...'}: {placeholder?:string}) => {

    const [query, setQuery] = useState('');
    const searchParams = useSearchParams()
    const router = useRouter();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          let newUrl = '';
    
          if(query) {
            newUrl = formUrlQuery({
              params: searchParams.toString(),
              key: 'query',
              value: query
            })
          } else {
            newUrl = removeKeysFromQuery({
              params: searchParams.toString(),
              keysToRemove: ['query']
            })
          }
    
          router.push(newUrl, { scroll: false });
        }, 300)
    
        return () => clearTimeout(delayDebounceFn);
      }, [query, searchParams, router])

  return (
    <div className='text-white'>

    <Image src="/assets/icons/search.svg" alt="search" width={24} height={24}/>
    <Input
        type='text'
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        />

    </div>
  )
}

export default SearchBar