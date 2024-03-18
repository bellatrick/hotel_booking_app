
import { FaSpinner } from 'react-icons/fa'

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
        <FaSpinner className="animate-spin   w-[40px] h-[40px] text-primary" />
      </div>
  )
}

export default LoadingSpinner