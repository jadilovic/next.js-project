import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HomePage = ({data}) => {
  return (
    <main>
      <h1>Home Page</h1>
      {data.map(event => {
        return (
          <Link key={event.id} href={`/events/${event.id}`}>
            <Image width={200} height={100} src={event.image} alt="" />
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </Link>
        )
      })}
    </main>
  )
}

export default HomePage