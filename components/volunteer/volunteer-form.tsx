"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, Mail, Phone, HeartHandshake, CheckCircle2 } from "lucide-react"
import { createVolunteer } from "@/services/volunteer.service"

interface VolunteerData {
  firstName: string
  lastName: string
  age: string
  sex: string
  email: string
  phone: string
  permissionToContact: boolean
}

const emptyForm: VolunteerData = {
  firstName: "",
  lastName: "",
  age: "",
  sex: "",
  email: "",
  phone: "",
  permissionToContact: false,
}

export function VolunteerForm() {
  const [form, setForm] = useState<VolunteerData>(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = <K extends keyof VolunteerData>(key: K, value: VolunteerData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: connect volunteer submission to Supabase volunteers table
    // TODO: send notification email to foundation admin when a volunteer signs up

    try {
        await createVolunteer({
          first_name: form.firstName,
          last_name: form.lastName,
          age: Number(form.age),
          sex: form.sex,
          email: form.email,
          phone_number: form.phone,
          consent: form.permissionToContact,
        })

        setSubmitted(true)
      }
      catch (error: any) {
        console.log("Full error:", error)
        console.log("Message:", error?.message)
        console.log("Code:", error?.code)
        console.log("Details:", error?.details)
        console.log("Hint:", error?.hint)

        alert(error?.message ?? "Failed")
      }
      finally {
        setIsSubmitting(false)
      }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto border-2">
        <CardContent className="py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-gold" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold mb-3">Thank You for Volunteering!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We&apos;ve received your information. Our team will be in touch soon with
            opportunities to get involved with the Jean Pierre Samuels Youth Foundation.
          </p>
          <Button
            className="mt-8 bg-gold hover:bg-gold-dark text-black font-semibold"
            onClick={() => {
              setForm(emptyForm)
              setSubmitted(false)
            }}
          >
            Submit Another Response
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto border-2">
      <CardHeader className="text-center pb-6 border-b">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
            <HeartHandshake className="h-6 w-6 text-gold" />
          </div>
        </div>
        <CardTitle className="font-serif text-2xl">Volunteer Sign-Up</CardTitle>
        <CardDescription className="text-base">
          Share your details and we&apos;ll reach out about ways to get involved.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <User className="h-5 w-5 text-gold mr-2" />
              Your Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min={1}
                  placeholder="Age"
                  required
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex">Sex *</Label>
                <Select
                  value={form.sex}
                  onValueChange={(value) => update("sex", value)}
                  required
                >
                  <SelectTrigger id="sex">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Mail className="h-5 w-5 text-gold mr-2" />
              Contact Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (876) 000-0000"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Permission to contact */}
          <div className="flex items-start gap-3 rounded-lg border border-gold/30 bg-gold/5 p-4">
            <Checkbox
              id="permissionToContact"
              checked={form.permissionToContact}
              onCheckedChange={(checked) =>
                update("permissionToContact", checked === true)
              }
              className="mt-0.5"
            />
            <Label
              htmlFor="permissionToContact"
              className="text-sm font-normal leading-relaxed cursor-pointer"
            >
              I give the Jean Pierre Samuels Youth Foundation permission to contact me
              using the information provided above.
            </Label>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold-dark text-black font-semibold h-12"
              disabled={isSubmitting || !form.permissionToContact}
            >
              <Phone className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Become a Volunteer"}
            </Button>
            {!form.permissionToContact && (
              <p className="text-sm text-muted-foreground text-center mt-3">
                Please grant permission to contact you to submit the form.
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
