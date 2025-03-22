"use client"

import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  videoSrc: string
  fallbackImage: string
}

export default function VideoBackground({ videoSrc, fallbackImage }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Play video when it's loaded
    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.error("Error playing video:", error)
      })
    }

    video.addEventListener("canplay", handleCanPlay)

    // Clean up
    return () => {
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImage}
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <img
          src={fallbackImage || "/placeholder.svg"}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>
      {/* Overlay to make text more readable */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  )
}

