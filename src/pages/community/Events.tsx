import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  { id: 1, title: "Company Town Hall", date: "Dec 15", time: "3:00 PM", location: "Main Auditorium", attendees: 250 },
  { id: 2, title: "Holiday Party", date: "Dec 22", time: "6:00 PM", location: "Rooftop Lounge", attendees: 180 },
  { id: 3, title: "Q1 Planning Kickoff", date: "Jan 8", time: "10:00 AM", location: "Conference Room A", attendees: 45 },
];

export const Events = () => {
  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Community", to: "/" }, { label: "Events & Announcements" }]} />
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Events & Announcements</h1>
        <p className="text-muted-foreground">Stay connected with company happenings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="card-interactive p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-circle-primary"><Calendar className="w-5 h-5" /></div>
              <div>
                <p className="font-bold text-primary">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
            <div className="space-y-1 text-sm text-muted-foreground mb-4">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />{event.location}</p>
              <p className="flex items-center gap-2"><Users className="w-4 h-4" />{event.attendees} attending</p>
            </div>
            <Button size="sm" className="w-full">RSVP</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
