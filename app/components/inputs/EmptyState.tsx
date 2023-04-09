'use client'

import { useRouter } from 'next/navigation'
import Button from '../Button'
import React from 'react'

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
    const router = useRouter();

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center '>
        <header>
            <h3 className='text-lg'>{title}</h3>
            <p>{subtitle}</p>
        </header>
        <div className='w-44 mt-4'>
            {showReset && (
                <Button outline label='Remove all filters' onClick={() => router.push('/')}/>
            )}
        </div>
    </div>
  )
}

export default EmptyState