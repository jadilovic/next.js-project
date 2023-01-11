import Image from 'next/image'
import Link from 'next/link';

const Events = ({data}) => {
  return (
    <div>
      <h2>Events Page</h2>
      <div>
        {data.map(event => {
          return (
            <Link key={event.id} href={`/events/${event.id}`}>
              <Image width={300} height={150} src={event.image} alt={event.description} />
              <h2>{event.title}</h2>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Events;

export async function getStaticProps() {
  const { events_categories } = await import('../../data/data.json');

  return {
    props: {
      data: events_categories,
    }
  }
}