"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, MapPin, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { upcomingEvents, eventsSectionEnabled } from "@/lib/events-data"

export function EventsSection() {
  const [current, setCurrent] = useState(0)
  const events = upcomingEvents
  const total = events.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + total) % total)
    },
    [total],
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Auto-advance the slider
  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 6000)
    return () => clearInterval(timer)
  }, [total])

  // If the admin has hidden the section, or there are no events, render nothing.
  if (!eventsSectionEnabled || total === 0) return null

  const event = events[current]

  return (
    <section id="upcoming-events" className="py-20 lg:py-28 bg-black text-white scroll-mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-wider">
            What&apos;s Happening
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mt-3 text-balance">
            Upcoming EventRaheim
          </h2>
          <p className="text-white/70 mt-4">
            Stay connected with the foundation. Browse our upcoming events and flyers below.
          </p>
        </div>

        {/* Slider */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-neutral-900 border-gold/20 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Flyer */}
              <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[420px] bg-neutral-800">
                {event.flyer ? (
                  <Image
                    src={event.flyer || "/placeholder.svg"}
                    alt={`${event.title} flyer`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30">
                    <ImageIcon className="h-12 w-12 mb-3" />
                    <p className="text-sm">Flyer coming soon</p>
                  </div>
                )}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/50" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/50" />
              </div>

              {/* Details */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="font-serif text-2xl font-bold text-gold mb-4">
                  {event.title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar className="h-5 w-5 text-gold shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="h-5 w-5 text-gold shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed">{event.description}</p>
              </div>
            </div>
          </Card>

          {/* Controls */}
          {total > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                aria-label="Previous event"
                className="border-gold/40 text-gold hover:bg-gold hover:text-black bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {events.map((e, i) => (
                  <button
                    key={e.id}
                    onClick={() => goTo(i)}
                    aria-label={`Go to event ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      i === current ? "w-8 bg-gold" : "w-2.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                aria-label="Next event"
                className="border-gold/40 text-gold hover:bg-gold hover:text-black bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
