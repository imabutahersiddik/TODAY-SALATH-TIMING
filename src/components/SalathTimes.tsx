import { motion } from 'framer-motion'

type SalathTimesType = {
  salathTimes: {
    Fajr: string
    Sunrise: string
    Dhuhr: string
    Asr: string
    Maghrib: string
    Isha: string
  }
}

export default function SalathTimes({ salathTimes }: SalathTimesType) {
  function toArabic(salathName: string) {
    switch (salathName) {
      case 'Fajr':
        return 'END OF NIGHT SALATH'
      case 'Sunrise':
        return 'Sunrise'
      case 'Dhuhr':
        return 'MIDDLE OF DAY SALATH'
      case 'Asr':
        return 'EVENING OF DAY SALATH'
      case 'Maghrib':
        return 'END OF DAY SALATH'
      case 'Isha':
        return 'START OF NIGHT SALATH'
    }
  }

  function convertTime(time: string) {
    const split = time.split(':')
    const hours = Number(split[0])
    const minutes = split[1]

    if (hours < 12) return time + ' AM'

    return `${
      hours - 12 > 10
        ? `0${hours - 12}:${minutes} PM`
        : `${hours}:${minutes} PM`
    }`
  }

  return (
    <motion.ul
      variants={salathListContainerVariants}
      initial='initial'
      animate='animate'
      className='flex flex-col items-stretch max-w-md w-full gap-3 overflow-hidden'
    >
      {Object.entries(salathTimes).map((salath) => {
        return (
          <motion.li
            variants={salathVariant}
            key={salath[0]}
            className='flex py-3 px-5 items-center justify-between flex-1 w-full bg-primary-700 text-primary-200 rounded-md text-xl'
          >
            <p>{convertTime(salath[1])}</p>
            <p>{toEnglish(salath[0])}</p>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

const salathListContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const salathVariant = {
  initial: { x: '100%' },
  animate: { x: '0' },
}
