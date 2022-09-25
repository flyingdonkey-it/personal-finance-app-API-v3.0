import { useState, useEffect } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../../LoadingSpinner';
import { formatCurrency } from '../../../utils/formatCurrency';

export function Expenditures() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === 'next') {
      if ((currentIndex + 1) < payments.length) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    if (e.currentTarget.name === 'prev') {
      if ((currentIndex - 1) >= 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const createExpense = () => {
    setLoading(true);
    const userId = sessionStorage.getItem('userId');
    axios
      .post(`/api/create-expense?userId=${userId}`, { fromMonth: '2020-03', toMonth: '2020-06' })
      .then((response) => {
        setPayments(response.data.payments);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    createExpense();
  }, []);

  return (
    <div className='mt-4 mb-2 ml-7 mr-7 sm:mb-5'>
      <p className='text-[#4A56E2] text-base font-semibold'>Categorization of Expenditures</p>
      {loading ?(
        <div className="flex justify-center">
          <div className="mt-16">
            {loading} {loading && <LoadingSpinner />}
          </div>
        </div>
      ):(
        <div className='flex items-center w-full mt-2'>
          <div id='controls-carousel' className='relative w-full' data-carousel='static'>
            <div>
              {payments.map((item, index) => (
                <div key={index}
                     className={index === currentIndex ? 'duration-200 ease-in-out' : 'hidden duration-700 ease-in-out'}
                     data-carousel-item={index === currentIndex ? 'active' : ''}>
                  <div className='p-3 w-full bg-white rounded-lg border border-[#E0EAFF] shadow-md dark:bg-[#E0EAFF] dark:border-gray-700'>
                    <h5 className='mb-2 text-xl font-semibold tracking-tight text-[#24CCA7]'>{item.division}</h5>
                    <p className='mb-3 font-normal text-base text-[#4A56E2] font-medium leading-[19px]'>{formatCurrency(item.avgMonthly)}</p>
                  </div>
                </div>
              ))}
              <button type='button'
                      name={'prev'}
                      onClick={handleClick}
                      className='absolute top-0 left-0 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none'>
        <span
          className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/10 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
            <svg aria-hidden='true' className='w-6 h-6 text-white dark:text-gray-800' fill='none' stroke='currentColor'
                 viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'></path></svg>
            <span className='sr-only'>Previous</span>
        </span>
              </button>
              <button type='button'
                      name={'next'}
                      onClick={handleClick}
                      className='absolute top-0 right-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none'>
        <span
          className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/10 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
            <svg aria-hidden='true' className='w-6 h-6 text-white dark:text-gray-800' fill='none' stroke='currentColor'
                 viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' trokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path></svg>
            <span className='sr-only'>Next</span>
        </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}