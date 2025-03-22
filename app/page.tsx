"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import VideoBackground from "@/components/video-background"
import ScrollAnimation from "@/components/scroll-animation"

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null)

  return (
    <main className="flex flex-col min-h-screen">
      <section className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 space-y-8 min-h-[90vh]">
        <VideoBackground
          videoSrc="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47b5e33cd8b7688&profile_id=139&oauth2_token_id=57447761"
          fallbackImage="https://images.pexels.com/photos/8111311/pexels-photo-8111311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />

        <div className="container flex flex-col items-center text-center space-y-4 max-w-3xl relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Revolutionary Arm Wrestling Equipment
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-[700px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our premium selection of high-end training and competition equipment designed for serious arm
            wrestlers and athletes.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/products">
                Shop Equipment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <Link href="/about">Training Guides</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Button
            variant="ghost"
            className="text-white rounded-full p-2"
            onClick={() => featuresRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
              <ArrowRight className="h-6 w-6 rotate-90" />
            </motion.div>
          </Button>
        </motion.div>
      </section>

      <section ref={featuresRef} className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <ScrollAnimation className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                Engineered for Champions
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our equipment is designed with input from world champions and biomechanics experts to deliver unmatched
                performance and results.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <ScrollAnimation key={index} delay={index * 0.2} direction="up">
                <div className="flex flex-col items-center space-y-4 p-6 bg-primary-foreground rounded-lg">
                  <div className="p-3 rounded-full bg-accent/10">
                    <feature.icon className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{feature.name}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container px-4 md:px-6">
          <ScrollAnimation className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Competition-Grade Equipment
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Explore our tournament-approved equipment used by champions worldwide.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="mt-8 bg-primary hover:bg-primary/90">
                <Link href="/products">View All Equipment</Link>
              </Button>
            </motion.div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/8111311/pexels-photo-8111311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Arm wrestling competition"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="right" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Train Like a Champion</h2>
                <p className="text-muted-foreground">
                  Our equipment is used by professional arm wrestlers around the world, including multiple world
                  champions and national team members. With ArmForce Pro gear, you're training with the same tools the
                  pros use.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Biomechanically optimized designs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tournament-approved specifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive training systems</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/products">Explore Training Equipment</Link>
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  )
}

const features = [
  {
    name: "Tournament Approved",
    description: "Our competition equipment meets or exceeds all international arm wrestling federation standards.",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    name: "Biomechanically Optimized",
    description:
      "Designed with advanced biomechanical principles to maximize training efficiency and prevent injuries.",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  },
  {
    name: "Lifetime Performance Guarantee",
    description: "We stand behind our equipment with comprehensive warranty coverage and performance guarantees.",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

