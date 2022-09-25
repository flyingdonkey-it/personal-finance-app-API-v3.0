import { Expenditures } from './Expenditures';

export function IncomeExpense() {
  return (
    <>
      <div className='flex justify-between mt-20 ml-6 mr-6 sm:mt-16 sm:ml-80 sm:mr-80'>
        <div className='flex'>
          <div className='hidden mr-4 sm:block'>
            <img className='hidden mr-3 w-7 h-7 sm:block' src='/wallet.svg' alt='My accounts' />
          </div>
          <div className='font-semibold text-2xl2 text-blue'>Income & Expenses</div>
        </div>
        <div className='flex items-center justify-center sm:hidden'>
          <img className='w-9 h-9' src='/calendar.svg' alt='Add Account' />
        </div>
      </div>
      <div className='min-h-screen mt-6 sm:ml-80 sm:mr-80 bg-[#FCFCFC]'>
        <div>
          <Expenditures />
        </div>
      </div>
    </>
  );
}
