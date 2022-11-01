import { CustomBarChart } from '../../CustomBarChart';
import { LoadingSpinner } from '../../LoadingSpinner';

export function MonthlyIncomeBarChart({ incomeData, incomeLoading, chartWidth, chartAspect, hideSeeMore }) {
  return (
    <div className="h-80 sm:pl-24">
      {incomeData && incomeData.length > 0 ? (
        <div className="flex flex-col justify-between h-80 sm:h-64">
          <div className="sm:ml-24 ">
            <CustomBarChart data={incomeData} width={chartWidth} aspect={chartAspect} />
          </div>
          {/* Hide this if this is Income & Expense page */}
          {!hideSeeMore && (
            <div className="flex justify-center">
              <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE] lg:mt-8">See more</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center h-80">
          <div className="mt-16">
            {incomeLoading} {incomeLoading ? <LoadingSpinner /> : 'Income data not found'}
          </div>
        </div>
      )}
    </div>
  );
}
