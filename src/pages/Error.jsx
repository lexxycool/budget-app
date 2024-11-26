import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import dog from '../assets/sad-dog.jpg'
import { Link, useNavigate, useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className='error'>
      <img 
        src={dog}
        alt='sad_dog' 
        width={400}
      />
      <h1>Uh oh! We've got a problem </h1>
      <p>{error.message || error.statusText}</p>
      <div className='flex-md'>
        <button 
          className='btn btn--dark'
          onClick={() => navigate(-1)}
        >
            <ArrowUturnLeftIcon width={20} />
            <span>Go Back </span>
        </button>
        <Link
          to='/'
          className='btn btn--dark'
        >
          <HomeIcon width={20}/>
          <span> Back to Homepage </span>
        </Link>

      </div>
    </div>
  )
}

export default Error