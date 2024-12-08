
import CountUp from 'react-countup';




const CountCard = ({className, num, headding}) => {
  return (
    <div className='h-[142px] w-[315px] bg-white shadow-sm text-center rounded-2xl'> 
     <h4 className={`pt-10 text-4xl font-normal text-gray-900 leading-6 ${className}`}><CountUp  start={0} end={num} duration={2}/></h4>
     <h3 className={`text-md font-normal text-gray-600 leading-6 pt-2 ${className}`}>{headding}</h3>
    </div>
  )
}

export default CountCard