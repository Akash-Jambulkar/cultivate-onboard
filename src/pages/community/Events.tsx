import { useState } from "react";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { Calendar, MapPin, Clock, Users, Plus, Check, Megaphone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Event } from "@/types/onboarding";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sampleEvents: Event[] = [
  { 
    id: "sample-1", 
    title: "Company Town Hall", 
    description: "Quarterly all-hands meeting to discuss company updates, achievements, and upcoming initiatives.",
    date: "2024-12-15", 
    time: "15:00", 
    location: "Main Auditorium", 
    attendees: ["user-1", "user-2", "user-3"],
    createdAt: new Date().toISOString(),
  },
  { 
    id: "sample-2", 
    title: "Holiday Party", 
    description: "Annual holiday celebration with food, drinks, and entertainment. Bring your plus one!",
    date: "2024-12-22", 
    time: "18:00", 
    location: "Rooftop Lounge", 
    attendees: ["user-1", "user-4"],
    createdAt: new Date().toISOString(),
  },
  { 
    id: "sample-3", 
    title: "Q1 Planning Kickoff", 
    description: "Department-wide planning session for Q1 goals and initiatives.",
    date: "2025-01-08", 
    time: "10:00", 
    location: "Conference Room A", 
    attendees: [],
    createdAt: new Date().toISOString(),
  },
];

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "normal" | "important" | "urgent";
  createdAt: string;
}

const sampleAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Office Closed for Holidays",
    content: "The office will be closed from December 24th to January 2nd. Happy holidays to everyone!",
    priority: "important",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ann-2",
    title: "New Health Benefits Program",
    content: "We're excited to announce enhanced health benefits starting January 1st. Check your email for details.",
    priority: "normal",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const Events = () => {
  const { toast } = useToast();
  const [events, setEvents] = useLocalStorage<Event[]>("community-events", sampleEvents);
  const [announcements, setAnnouncements] = useLocalStorage<Announcement[]>("announcements", sampleAnnouncements);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [currentUserId] = useState(() => localStorage.getItem("user-id") || `user-${Date.now()}`);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "normal" as "normal" | "important" | "urgent",
  });

  const handleRSVP = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id === eventId) {
          const isAttending = event.attendees.includes(currentUserId);
          return {
            ...event,
            attendees: isAttending
              ? event.attendees.filter((id) => id !== currentUserId)
              : [...event.attendees, currentUserId],
          };
        }
        return event;
      })
    );

    const event = events.find((e) => e.id === eventId);
    const isAttending = event?.attendees.includes(currentUserId);
    
    toast({
      title: isAttending ? "RSVP Cancelled" : "RSVP Confirmed",
      description: isAttending 
        ? "You've been removed from the attendee list"
        : "You're all set! See you there!",
    });
  };

  const handleCreateEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date || !newEvent.time || !newEvent.location.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title.trim(),
      description: newEvent.description.trim(),
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location.trim(),
      attendees: [currentUserId],
      createdAt: new Date().toISOString(),
    };

    setEvents((prev) => [event, ...prev]);
    setNewEvent({ title: "", description: "", date: "", time: "", location: "" });
    setIsEventDialogOpen(false);

    toast({
      title: "Event created",
      description: "Your event has been added to the calendar",
    });
  };

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }

    const announcement: Announcement = {
      id: Date.now().toString(),
      title: newAnnouncement.title.trim(),
      content: newAnnouncement.content.trim(),
      priority: newAnnouncement.priority,
      createdAt: new Date().toISOString(),
    };

    setAnnouncements((prev) => [announcement, ...prev]);
    setNewAnnouncement({ title: "", content: "", priority: "normal" });
    setIsAnnouncementDialogOpen(false);

    toast({
      title: "Announcement posted",
      description: "Your announcement is now visible to everyone",
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    toast({ title: "Event deleted" });
  };

  const handleDeleteAnnouncement = (announcementId: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== announcementId));
    toast({ title: "Announcement deleted" });
  };

  const formatEventDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr + "T" + timeStr);
    return {
      day: date.toLocaleDateString("en-US", { day: "numeric" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      time: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
  };

  const priorityStyles = {
    normal: "border-border",
    important: "border-warning bg-warning/5",
    urgent: "border-destructive bg-destructive/5",
  };

  return (
    <div className="animate-fade-in">
      <PageBreadcrumb items={[{ label: "Community", to: "/" }, { label: "Events & Announcements" }]} />
      
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Events & Announcements</h1>
        <p className="text-muted-foreground">Stay connected with company happenings</p>
      </div>

      <Tabs defaultValue="events" className="space-y-6">
        <TabsList>
          <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
          <TabsTrigger value="announcements">Announcements ({announcements.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Event Title *</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Team Building Workshop"
                      maxLength={100}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Description</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="What's this event about?"
                      rows={3}
                      maxLength={500}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Date *</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Time *</label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
                        className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Location *</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Conference Room A"
                      maxLength={100}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm"
                    />
                  </div>
                  <Button className="w-full" onClick={handleCreateEvent}>
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => {
              const { day, month, time } = formatEventDate(event.date, event.time);
              const isAttending = event.attendees.includes(currentUserId);
              const isOwnEvent = !event.id.startsWith("sample-");

              return (
                <div key={event.id} className="card-interactive p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="icon-circle-primary">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-primary">{month} {day}</p>
                      <p className="text-sm text-muted-foreground">{time}</p>
                    </div>
                    {isOwnEvent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                  )}
                  <div className="space-y-1 text-sm text-muted-foreground mb-4">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {event.attendees.length} attending
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    variant={isAttending ? "outline" : "default"}
                    onClick={() => handleRSVP(event.id)}
                  >
                    {isAttending ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        You're Going
                      </>
                    ) : (
                      "RSVP"
                    )}
                  </Button>
                </div>
              );
            })}
          </div>

          {events.length === 0 && (
            <div className="card-interactive p-12 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground mb-2">No events yet</h3>
              <p className="text-muted-foreground mb-4">Be the first to create an event!</p>
              <Button onClick={() => setIsEventDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Megaphone className="w-4 h-4 mr-2" />
                  Post Announcement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Post Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Title *</label>
                    <input
                      type="text"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Announcement title"
                      maxLength={100}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Content *</label>
                    <textarea
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="What would you like to announce?"
                      rows={4}
                      maxLength={1000}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Priority</label>
                    <select
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, priority: e.target.value as "normal" | "important" | "urgent" }))}
                      className="w-full mt-1 p-3 rounded-xl border border-input bg-background text-sm"
                    >
                      <option value="normal">Normal</option>
                      <option value="important">Important</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <Button className="w-full" onClick={handleCreateAnnouncement}>
                    Post Announcement
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {announcements.map((announcement) => {
              const isOwn = !announcement.id.startsWith("ann-");
              
              return (
                <div 
                  key={announcement.id} 
                  className={`card-interactive p-6 border-l-4 ${priorityStyles[announcement.priority]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 mb-2">
                      <Megaphone className={`w-5 h-5 ${
                        announcement.priority === "urgent" ? "text-destructive" :
                        announcement.priority === "important" ? "text-warning" : "text-primary"
                      }`} />
                      <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                      {announcement.priority !== "normal" && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          announcement.priority === "urgent" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                        }`}>
                          {announcement.priority}
                        </span>
                      )}
                    </div>
                    {isOwn && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-foreground mb-2">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              );
            })}
          </div>

          {announcements.length === 0 && (
            <div className="card-interactive p-12 text-center">
              <Megaphone className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground mb-2">No announcements yet</h3>
              <p className="text-muted-foreground mb-4">Post the first announcement!</p>
              <Button onClick={() => setIsAnnouncementDialogOpen(true)}>
                <Megaphone className="w-4 h-4 mr-2" />
                Post Announcement
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
