import React from 'react'

const Hero = ({title, subtitle}) => {
  return (
    <>
    <section className="bg-indigo-900 py-24 min-[400px]:py-28 sm:py-32 md:py-20 lg:py-28 xl:py-32 mb-4">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {title}
          </h1>
          <p className="my-4 sm:my-5 text-lg sm:text-xl md:text-2xl text-white">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero