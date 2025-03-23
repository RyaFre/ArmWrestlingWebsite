"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the form data to your server here
    console.log("Form submitted:", formState)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }))
  }

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-primary-foreground py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Contact Us</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Have questions about our products or services? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formState.subject} onValueChange={handleSelectChange}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                        <SelectItem value="order-status">Order Status</SelectItem>
                        <SelectItem value="technical-support">Technical Support</SelectItem>
                        <SelectItem value="training-inquiry">Training Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitted}>
                  {isSubmitted ? (
                    <span className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Message Sent
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.8391876071766!2d18.4244328!3d-33.9248685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc6764c6e2b7b7%3A0x8c9c99fefcec8e97!2sCape%20Town%20Stadium!5e0!3m2!1sen!2sza!4v1648226618092!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                    <div className="p-2 rounded-full bg-accent/10 mb-2">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-primary">Our Location</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Fitness Street
                      <br />
                      Cape Town, 8001
                      <br />
                      South Africa
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                    <div className="p-2 rounded-full bg-accent/10 mb-2">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-primary">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      +27 21 123 4567
                      <br />
                      +27 82 987 6543
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                    <div className="p-2 rounded-full bg-accent/10 mb-2">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-primary">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      info@boerforce.co.za
                      <br />
                      support@boerforce.co.za
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                    <div className="p-2 rounded-full bg-accent/10 mb-2">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-primary">Business Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 9AM - 6PM
                      <br />
                      Saturday: 10AM - 4PM
                      <br />
                      Sunday: Closed
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <p className="max-w-[700px] mx-auto">
              Can't find the answer you're looking for? Reach out to our customer support team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
              <div className="space-y-2">
                <h3 className="font-bold">Do you offer international shipping?</h3>
                <p className="text-primary-foreground/80">
                  Yes, we ship our products worldwide. Shipping costs and delivery times vary by location.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">What is your return policy?</h3>
                <p className="text-primary-foreground/80">
                  We offer a 30-day return policy for unused items in their original packaging.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Do you offer custom equipment?</h3>
                <p className="text-primary-foreground/80">
                  Yes, we can create custom arm wrestling equipment for specific needs. Contact us for details.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">How can I track my order?</h3>
                <p className="text-primary-foreground/80">
                  Once your order ships, you'll receive a tracking number via email to monitor your delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

