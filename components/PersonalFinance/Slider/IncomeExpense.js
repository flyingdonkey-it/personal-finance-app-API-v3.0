import { formatCurrency } from '../../../utils/formatCurrency';

export function IncomeExpense({ incomeMonthlyAvg, expenseMonthlyAvg }) {
  return (
    <div className="border-2 shadow-md h-44 sm:h-64 bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:bg-[#F5F7F8]">
      <div className="mt-3 ml-4 mr-4 sm:mr-10 sm:ml-8 sm:mb-5 sm:mt-5">
        <div className="flex items-center">
          <div>
            <img className="w-6 h-6" src={`${process.env.ASSET_PREFIX}/activity.svg`} alt="Activity" />
          </div>
          <div className="ml-2">
            <p className="text-sm font-bold sm:text-2xl2 text-blue">Income vs Expenses</p>
          </div>
        </div>
        <div className="flex flex-col m-2 sm:m-6">
          <div className="flex">
            <div className="flex flex-col w-1/2 mr-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE]">
              <div className="mb-2 ml-2">
                <span className="text-xs font-medium text-blue">This month</span>
              </div>
              <div className="flex items-end ml-2 sm:justify-center sm:ml-0">
                <div>
                  <img src={`${process.env.ASSET_PREFIX}/slider/rectangle-1.svg`} alt="Rectangle" />
                  <span className="mr-1 font-bold text-[9px] sm:text-[11px] text-[#24CCA7]">Income</span>
                </div>
                <div>
                  <img src={`${process.env.ASSET_PREFIX}/slider/rectangle-2.svg`} alt="Rectangle" />
                  <span className="font-bold text-[9px] sm:text-[11px] text-[#4A56E2]">Expense</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="flex flex-col items-end pt-2 pb-2 mb-1 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE]">
                <div className="mr-2">
                  <p className="text-xs font-medium text-right text-blue">Total Income:</p>
                  <span className="text-xl font-bold text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-[#4A56E2] to-[#24CCA7]">
                    {formatCurrency(incomeMonthlyAvg || '')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end pt-2 pb-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE]">
                <div className="mr-2">
                  <p className="text-xs font-medium text-right text-blue">Total Expense:</p>
                  <span className="text-xl font-bold text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-[#D96C6C] to-[#4A56E2]">
                    {formatCurrency(Math.abs(expenseMonthlyAvg) || '')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}