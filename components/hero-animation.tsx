"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"

export default function HeroAnimation() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Updated with Pexels images
  const toolImages = [
    "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4162577/pexels-photo-4162577.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=800",
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateY: 45 },
    visible: {
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="w-full h-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {toolImages.map((src, index) => (
          <motion.div
            key={index}
            className="relative bg-background rounded-lg overflow-hidden shadow-lg"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="relative h-[200px] w-[200px]">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Arm Wrestling Equipment ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

