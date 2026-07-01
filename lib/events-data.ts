// TODO: connect this to Supabase (events table + a site_settings row for visibility)
// so events and the section toggle can be managed from the admin dashboard.

export interface UpcomingEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  // Flyer image path. Place flyers in /public/events/ and reference them here,
  // e.g. "/events/gala-flyer.jpg". Leave empty to show a styled placeholder.
  flyer: string
}

// Master switch — set to false (or toggle from the admin Events page) to hide
// the entire "Upcoming Events" section across the site.
export const eventsSectionEnabled = true

// Add upcoming events here. Each can include a flyer image to display in the slider.
export const upcomingEvents: UpcomingEvent[] = [
  {
    id: "1",
    title: "Back To School Fundraiser",
    date: "Saturday, July 25, 2026",
    location: "Pentecostal Gospel Temple, 5 Homestead Road, Kingston 2",
    description:
      "An evening of fun, food, and fellowship to raise funds for the foundation's back-to-school initiatives.",
    flyer: "/events/back-to-school-flyer.jpeg",
  },
  // {
  //   id: "2",
  //   title: "Youth Empowerment Workshop",
  //   date: "Coming Soon",
  //   location: "To Be Announced",
  //   description:
  //     "A hands-on workshop helping young people build skills, confidence, and community.",
  //   flyer: "",
  // },
  // {
  //   id: "3",
  //   title: "Community Fundraiser",
  //   date: "Coming Soon",
  //   location: "To Be Announced",
  //   description:
  //     "Join us as we come together to raise support for the next generation of leaders.",
  //   flyer: "",
  // },
]
