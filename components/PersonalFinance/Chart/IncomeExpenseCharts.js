import { useState } from 'react';
import { MonthlySpendingBarChart } from '../Slider/MonthlySpendingBarChart';
import { MonthlySpendingPieChart } from './MonthlySpendingPieChart';
import { MonthlyIncomeBarChart } from './MonthlyIncomeBarChart';
import { IncomeExpensePieChart } from './IncomeExpensePieChart';

const incomeExpenseIndex = 1;
const monthlySpendingPieIndex = 2;
const monthlySpendingBarIndex = 3;
const monthlyIncomeIndex = 4;

export function IncomeExpenseCharts({ expenseData, incomeData, incomeMonthlyAvg, expenseMonthlyAvg, expenseMonthly, expenseLoading, incomeLoading, chartWidth }) {
  const [currentIndex, setCurrentIndex] = useState(1);

  const components = [
    { index: incomeExpenseIndex },
    { index: monthlySpendingPieIndex },
    { index: monthlySpendingBarIndex },
    { index: monthlyIncomeIndex }
  ];

  //Slide action to show a chart
  function handleClickIndicator(e, index) {
    e.preventDefault();
    setCurrentIndex(index);
  };

  return (
    <div className="sm:w-2/5 sm:flex sm:ml-52 h-72 sm:h-96">
      {/* DESKTOP VIEW */}
      <div className="hidden w-full sm:mr-32 h-72 sm:h-96 sm:block">
        {
          currentIndex === incomeExpenseIndex &&
          <IncomeExpensePieChart incomeMonthlyAvg={incomeMonthlyAvg} expenseMonthlyAvg={expenseMonthlyAvg} incomeLoading={incomeLoading}
            expenseLoading={expenseLoading} />
        }
        {
          currentIndex === monthlySpendingPieIndex &&
          <MonthlySpendingPieChart expenseData={expenseData} expenseLoading={expenseLoading} chartWidth={chartWidth} hideSeeMore={true} showInChartSlider={true} />
        }
        {
          currentIndex === monthlySpendingBarIndex &&
          <div className="ml-8 mr-8">
            <MonthlySpendingBarChart expenseMonthly={expenseMonthly} expenseLoading={expenseLoading} chartWidth={chartWidth} chartAspect={1.5} showInChartSlider={true} />
          </div>
        }
        {
          currentIndex === monthlyIncomeIndex &&
          <MonthlyIncomeBarChart incomeData={incomeData} incomeLoading={incomeLoading} chartWidth={chartWidth} chartAspect={1.25} hideSeeMore={true} showInChartSlider={true} />
        }
        {/* CAROUSEL INDICATOR */}
        <div className="hidden mt-16 mr-6 sm:block">
          <div className="flex justify-end">
            <div className="space-x-3">
              {components.map((item) => (
                <button id={'carousel-indicator-' + item.index} key={item.index} type='button'
                  className={'w-4 h-2 rounded ' + (item.index === currentIndex ? 'bg-[#4A56E2]' : 'bg-[rgba(74,86,226,0.3)]')}
                  aria-current={currentIndex === item.index}
                  onClick={(e) => handleClickIndicator(e, item.index)}
                  aria-label={'Slide ' + item.index}></button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE VIEW */}
      <div className="overflow-hidden rounded-2xl sm:hidden">
        <div className="h-80" key={`slide-item-${currentIndex}`}>
          {
            currentIndex === incomeExpenseIndex &&
            <IncomeExpensePieChart incomeMonthlyAvg={incomeMonthlyAvg} expenseMonthlyAvg={expenseMonthlyAvg} incomeLoading={incomeLoading}
              expenseLoading={expenseLoading} />
          }
          {
            currentIndex === monthlySpendingPieIndex &&
            <MonthlySpendingPieChart expenseData={expenseData} expenseLoading={expenseLoading} chartWidth={chartWidth} aspect={1} hideSeeMore={true} />
          }
          {
            currentIndex === monthlySpendingBarIndex &&
            <div className="ml-8 mr-8">
              <MonthlySpendingBarChart expenseMonthly={expenseMonthly} expenseLoading={expenseLoading} chartWidth={chartWidth} chartAspect={1.25} showInChartSlider={true} />
            </div>
          }
          {
            currentIndex === monthlyIncomeIndex &&
            <div className="ml-8 mr-8">
              <MonthlyIncomeBarChart incomeData={incomeData} incomeLoading={incomeLoading} chartWidth={chartWidth} chartAspect={1.25} hideSeeMore={true} />
            </div>
          }
        </div>
      </div>
      {/* CAROUSEL INDICATOR */}
      <div className='absolute z-30 flex space-x-3 -translate-x-1/2 left-1/2 sm:hidden'>
        {components.map((item) => (
          <button id={'carousel-indicator-' + item.index} key={item.index} type='button'
            className={'w-4 h-4 rounded-full ' + (item.index === currentIndex ? 'bg-[#4A56E2]' : 'bg-[rgba(74,86,226,0.3)]')}
            aria-current={currentIndex === item.index}
            onClick={(e) => handleClickIndicator(e, item.index)}
            aria-label={'Slide ' + item.index}></button>
        ))}
      </div>
    </div>
  );
}