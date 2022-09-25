import { CustomBarChart } from "../../CustomBarChart";
import { LoadingSpinner } from '../../LoadingSpinner';

export function MonthlyIncomeChart({ incomeData, incomeLoading, chartWidth, chartAspect, hideSeeMore }) {
  return (
    <div className="h-72 sm:h-80">
      {
        incomeData && incomeData.length > 0 ?
          <>
            <div className="sm:ml-24">
              <CustomBarChart data={incomeData} width={chartWidth} aspect={chartAspect} />
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
              {incomeLoading} {incomeLoading ? <LoadingSpinner /> : "Income data not found"}
            </div>
          </div>
      }
    </div>
  );
}