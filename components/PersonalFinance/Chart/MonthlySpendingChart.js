import { ActiveShapePieChart } from "../../ActiveShapePieChart";
import { LoadingSpinner } from '../../LoadingSpinner';

export function MonthlySpendingChart({ expenseData, expenseLoading, chartWidth, hideSeeMore, showInChartSlider }) {
  return (
    <div className="h-72 sm:h-80">
      {
        expenseData && expenseData.length > 0 ?
          <>
            <div className={`${showInChartSlider ? "sm:mb-2" : "sm:ml-48"}`}>
              <ActiveShapePieChart data={expenseData} width={chartWidth} />
            </div>
            {
              !hideSeeMore && 
              <div className="flex justify-center">
                <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]">See more</p>
              </div>
            }
          </>
          :
          <div className="flex justify-center h-80">
            <div className="mt-16">
              {expenseLoading} {expenseLoading ? <LoadingSpinner /> : "Expense data not found"}
            </div>
          </div>
      }
    </div>
  );
}