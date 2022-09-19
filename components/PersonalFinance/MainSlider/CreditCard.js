import { formatCurrency } from '../../../utils/formatCurrency'

export function CreditCard({ balance }) {
  return (
    <div className='ml-4 mr-4 sm:ml-0 md:ml-0 lg:ml-0'>
      <div
        className="p-3 border-2 shadow-md sm:max-w-2xl bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:py-20 sm:px-10 sm:bg-[#F5F7F8]">
        <div className="flex flex-row">
          <div className="ml-2 font-bold text-sm2 leading-[17px] sm:-mt-14 sm:text-[26px] sm:leading-[31px] text-blue">
            <span>Credit cards</span>
          </div>
        </div>
        <div
          className="flex justify-between mt-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:p-8 sm:bg-[#FEFEFE] sm:pl-24 sm:pr-24">
          <div>
            <img className="w-16 h-16 sm:w-24 sm:h-24" src="/slider/money-horizontal.svg" alt="Money" />
          </div>
          <div>
            <p className="font-medium text-blue text-[10px] sm:text-[15px] leading-3">Total amount</p>
            <span className="text-2xl font-bold text-blue leading-[29px]">{formatCurrency(balance || '')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}