import { CustomBarChart } from "../../CustomBarChart";
import { LoadingSpinner } from '../../LoadingSpinner';

export function MonthlySpendingBarChart({ expenseMonthly, expenseLoading, showInChartSlider, chartWidth, chartAspect }) {
  return (
    <div className={`${showInChartSlider ? "h-44 sm:h-80" : "border-2 shadow-md h-44 sm:h-64 bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:bg-[#F5F7F8]"}`}>
      <div className={`${showInChartSlider ? "" : "mt-3 ml-4 mr-10 sm:ml-8 sm:mt-5"}`}>
        <div className="flex items-center sm:mb-1">
          {!showInChartSlider &&
            <div>
              <img className="w-6 h-6" src="/chart.svg" alt="Chart" />
            </div>
          }
          <div className={`${showInChartSlider ? "ml-20" : "ml-2"}`}>
            <p className="text-sm font-bold sm:text-2xl2 text-blue">
              Monthly spendings
            </p>
          </div>
        </div>
        <div className={`flex flex-col m-3 sm:m-0`}>
          <div className={`${showInChartSlider ? "" : "sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE]"}`}>
            <div className="flex flex-col items-center w-full sm:mt-3">
              <div className="flex w-full mb-1 text-xs font-medium sm:ml-4 align-left text-blue">
                This year
              </div>
              <div className="flex items-end">
                {
                  expenseMonthly && expenseMonthly.length > 0 ?
                    <div className={`${showInChartSlider ? "h-64 sm:h-52 w-72 sm:w-[30rem]" : "h-36 w-72 sm:w-96"}`}>
                      <CustomBarChart data={expenseMonthly} width={chartWidth} aspect={chartAspect} />
                    </div>
                    :
                    <div className="flex justify-center h-32">
                      <div className="mt-16">
                        {expenseLoading} {expenseLoading ? <LoadingSpinner /> : "Expense data not found"}
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}