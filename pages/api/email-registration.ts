// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import fs from 'fs';

type Data = {
  message: string
}

type Event = {
  id: string,
  title: string,
  city: string,
  description: string,
  image: string,
  emails_registered: []
}

function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json');
}

function extractData(filePath: string) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData.toString());
  return data;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {method} = req;
    const filePath = buildPath();
    const {events_categories, allEvents} = extractData(filePath);
// console.log(allEvents);

    if (!allEvents) {
      return res.status(404).json({
        message: "There is no requested database"
      })
    }

    if (method === "POST") {
      const {email, eventId} = req.body;

      if (!email || !email.includes("@")) {
        res.status(422).json({message: "Email is not valid"})
      }

      const newAllEvents = allEvents.map((event: Event) => {
        if (event.id === eventId) {
          const registeredEmails: Array<string> = event.emails_registered;
            if (registeredEmails.includes(email)) {
            res.status(409).json({message: "This email has been registered"});
            return event;
          }
          return {
            ...event,
            emails_registered: [...event.emails_registered, email]
          }
        }
        return event;
      })

      fs.writeFileSync(filePath, JSON.stringify({events_categories, allEvents: newAllEvents}))
      res.status(200).json({message: `You have been successfully registered for the event ${eventId} with email ${email}`});
    }
}