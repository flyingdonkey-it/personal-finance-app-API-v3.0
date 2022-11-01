import { ActiveShapePieChart } from '../../ActiveShapePieChart';
import { LoadingSpinner } from '../../LoadingSpinner';

export function MonthlySpendingPieChart({ expenseData, expenseLoading, chartWidth, hideSeeMore, showInChartSlider }) {
  return (
    <div className="h-80">
      {expenseData && expenseData.length > 0 ? (
        <div className="flex flex-col justify-between h-80 sm:h-64">
          <div className={`${showInChartSlider ? 'sm:mb-2' : 'sm:ml-48'}`}>
            <ActiveShapePieChart data={expenseData} width={chartWidth} />
          </div>
          {/* Hide this if this is Income & Expense page */}
          {!hideSeeMore && (
            <div className="flex justify-center">
              <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]">See more</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center h-80">
          <div className="mt-16">
            {expenseLoading} {expenseLoading ? <LoadingSpinner /> : 'Expense data not found'}
          </div>
        </div>
      )}
    </div>
  );
}
