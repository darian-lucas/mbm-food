'use client'
// React Imports
import { useState } from 'react'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
  homeElement: ReactNode,
  container?: string,
  listClasses?: string,
  activeClasses?: string,
  capitalizeLinks?: boolean
}

const Breadcrumb = ({ homeElement, listClasses, activeClasses, capitalizeLinks, container }: TBreadCrumbProps) => {
  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)
  // States
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState<boolean>(false)
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  const getModeIcon = () => {
    return 'ri-arrow-right-s-fill'
  }

  return (
    <>
      {/* Tooltip */}
      <div className="relative inline-block">
        <div
          className={`cursor-pointer ${tooltipOpen && !open ? 'relative' : ''}`}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
        >
          <i className={getModeIcon()} />
          {tooltipOpen && !open && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded capitalize">
              Navigator
            </div>
          )}
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className={`flex items-center ${container || ''}`}> 
        <div className="flex items-center">
          <Link href="/" className="text-slate-900 font-bold hover:underline">
            {homeElement}
          </Link>
        </div>

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`
          const itemClasses = paths === href ? `${listClasses || ''} ${activeClasses || ''}` : listClasses || ''
          const itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1) : link

          return (
            <div key={index} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              <Link href={href} className={`hover:underline ${itemClasses}`}>
                {itemLink}
              </Link>
            </div>
          )
        })}
      </nav>
    </>
  )
}

export default Breadcrumb