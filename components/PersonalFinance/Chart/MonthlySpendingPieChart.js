import { ActiveShapePieChart } from "../../ActiveShapePieChart";
import { LoadingSpinner } from '../../LoadingSpinner';

export function MonthlySpendingPieChart({ expenseData, expenseLoading, chartWidth, hideSeeMore, showInChartSlider, aspect }) {
  return (
    <div className="h-80">
      {
        expenseData && expenseData.length > 0 ?
          <div className="flex flex-col h-100 sm:h-90">
            <div className={`${showInChartSlider ? "sm:mb-2" : ""}`}>
              <ActiveShapePieChart data={expenseData} width={chartWidth} aspect={aspect} />
            </div>
            {/* Hide this if this is Income & Expense page */}
            {
              !hideSeeMore && 
              <div className="flex justify-center">
                <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]">See more</p>
              </div>
            }
          </div>
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