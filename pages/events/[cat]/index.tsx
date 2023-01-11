import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CityEvents = ({ data }) => {
  return (
    <div>
      <h1>{`City ${data[0].city}`}</h1>
      {
        data.map((event) => {
          return (
            <div key={event.id}>
              <Link href={`/events/${event.city}/${event.id}`} passHref>
                <Image width={300} height="200" src={event.image} alt={event.description}/>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </Link>
              <br />
            </div>
          )
        })
      }
    </div>
  )
}

export default CityEvents;

export async function getStaticPaths() {
  const { events_categories } = await import("../../../data/data.json")
  const allPaths = events_categories.map((event) => {
    return {
      params: {
        cat: event.id.toString()
      }
    }
  })
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const { allEvents } = await import("../../../data/data.json");
  const id = context?.params.cat;
  const data = allEvents.filter((event) => event.city === id);
  return {
    props: {
      data
    }
  }
}