import React from 'react'
import { heroVideo } from '../assets/assets'

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      style={{
        minHeight: '100vh',
      }}
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20" />

      {/* Text Content */}
      <div className="absolute top-0 left-0 p-8 md:p-12 max-w-lg z-10">
        <h1 className="text-white text-1xl md:text-5xl font-bold mb-4 drop-shadow-lg">
         LOYAN
        </h1>
        <p className="text-white text-base md:text-lg font-normal mb-6 drop-shadow">
          A season imagined in lightness. Fluid lines, feminine touches and soft textures define a new balance between elegance and freedom.
        </p>
        <a
          href="#"
          className="inline-block text-white font-semibold tracking-wide border-b-2 border-white pb-1 uppercase text-sm hover:opacity-80 transition"
        >
          Women’s Edit
        </a>
      </div>
    </section>
  )
}

export default Hero
