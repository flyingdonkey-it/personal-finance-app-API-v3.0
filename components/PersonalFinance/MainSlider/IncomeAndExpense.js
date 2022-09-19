import { formatCurrency } from '../../../utils/formatCurrency';

export function IncomeAndExpense({ income, expense }) {
  return (
    <div className="ml-4 mr-4 sm:ml-0">
      <div
        className='border-2 shadow-md bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:py-20 sm:px-10 sm:bg-[#F5F7F8] sm:pl-24 sm:pr-24'>
        <div className="flex flex-row">
          <div className="mt-4 ml-4 font-bold text-sm2 leading-[17px] sm:-mt-14 sm:text-[26px] sm:leading-[31px]">
            <span>Income vs Expenses</span>
          </div>
        </div>
        <div className="flex justify-around mt-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE] sm:pl-24 sm:pr-24 sm:pt-12 sm:pb-12">
          <div className="flex flex-col">
            <div>
              <span className="font-medium text-[10px] sm:text-[12px] text-[#4A56E2] leading-[12px]">This month</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <img className="w-6 h-16" src="/slider/rectangle-1.svg" alt="Rectangle" />
                <span className="mr-1 font-bold text-[9px] sm:text-[11px] text-[#24CCA7] leading-[11px]">Income</span>
              </div>
              <div>
                <img className="w-6 h-12" src="/slider/rectangle-2.svg" alt="Rectangle"/>
                <span className="font-bold text-[9px] sm:text-[11px] text-[#4A56E2] leading-[11px]">Expense</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-16 h-16 sm:w-24 sm:h-24">
            <div>
              <p className="font-medium text-[#4A56E2] text-[10px] sm:text-[15px] leading-3">Total Income:</p>
              <span className="text-2xl font-bold text-transparent text-[16px] sm:text-[18px] bg-clip-text bg-gradient-to-r from-[#4A56E2] to-[#24CCA7] leading-[19px]">{formatCurrency(income || '')}</span>
            </div>
            <div>
              <p className="font-medium text-[#4A56E2] text-[10px] sm:text-[15px] leading-3">Total Expense:</p>
              <span className="text-2xl font-bold text-transparent text-[16px] sm:text-[18px] bg-clip-text bg-gradient-to-r from-[#D96C6C] to-[#4A56E2] leading-[19px]">{formatCurrency(expense || '')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}