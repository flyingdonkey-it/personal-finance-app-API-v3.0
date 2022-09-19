import { formatCurrency } from '../../../utils/formatCurrency';

export function Savings({ balance }) {
  return (
    <div className="ml-4 mr-4 sm:ml-0">
      <div className="pt-4 pb-8 pl-8 pr-8 border-2 shadow-md bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:bg-[#F5F7F8]">
        <div className="flex items-center">
          <div>
            <img className="w-6 h-6 sm:w-10 sm:h-10" src="/slider/bank-of-melbourne.svg" alt="Bank of Melbourne" />
          </div>
          <div className="ml-2">
            <p className="text-3xl font-bold text-blue">Savings account</p>
          </div>
        </div>
        <div className="flex mt-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE] sm:pl-28 sm:pr-28">
          <div>
            <img className="w-16 h-16 sm:w-24 sm:h-24" src="/slider/money-vertical.svg" alt="Money" />
          </div>
          <div className="text-end">
            <p className="font-medium text-blue text-[10px] sm:text-[15px] leading-3">Total amount</p>
            <span className="text-3xl font-bold text-blue leading-[29px]">{formatCurrency(balance || '')}</span>
          </div>
        </div>
        <div className="w-8/12 mt-2 border-t-8 rounded-md border-blue sm:mt-4"></div>
      </div>
    </div>
  );
}