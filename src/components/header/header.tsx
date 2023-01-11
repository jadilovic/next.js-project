import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header>
      <div className='topNav'>
        <Image src={'/next.svg'} width={50} height={50} alt="header logo"/>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/about-us">About us</Link>
            </li>
          </ul>
        </nav>
      </div>
      <h1>Header title h1</h1>
    </header>
  )
}

export default Header