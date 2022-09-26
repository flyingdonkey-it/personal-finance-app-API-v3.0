import { useState } from 'react';
import { MonthlySpendingBarChart } from '../Slider/MonthlySpendingBarChart';
import { MonthlySpendingChart } from './MonthlySpendingChart';
import { MonthlyIncomeChart } from './MonthlyIncomeChart';
import { IncomeExpensePieChart } from './IncomeExpensePieChart';

export function IncomeExpenseChart({ expenseData, incomeData, incomeMonthlyAvg, expenseMonthlyAvg, expenseMonthly, expenseLoading, incomeLoading, chartWidth }) {
  const [currentIndex, setCurrentIndex] = useState(1);

  const components = [
    { index: 1, hidden: false },
    { index: 2, hidden: true },
    { index: 3, hidden: true },
    { index: 4, hidden: true }
  ];

  function handleClickIndicator(e, index) {
    e.preventDefault();
    setCurrentIndex(index);
  };

  return (
    <div className="sm:w-2/5 sm:flex sm:ml-52 h-72 sm:h-96">
      <div className="hidden w-full sm:mr-32 h-72 sm:h-96 sm:block">
        {
          currentIndex === 1 &&
          <IncomeExpensePieChart incomeMonthlyAvg={incomeMonthlyAvg} expenseMonthlyAvg={expenseMonthlyAvg} incomeLoading={incomeLoading}
            expenseLoading={expenseLoading} />
        }
        {
          currentIndex === 2 &&
          <MonthlySpendingChart expenseData={expenseData} expenseLoading={expenseLoading} chartWidth={chartWidth} hideSeeMore={true} showInChartSlider={true} />
        }
        {
          currentIndex === 3 &&
          <div className="ml-8 mr-8">
            <MonthlySpendingBarChart expenseMonthly={expenseMonthly} expenseLoading={expenseLoading} chartWidth={chartWidth} chartAspect={1.5} showInChartSlider={true} />
          </div>
        }
        {
          currentIndex === 4 &&
          <MonthlyIncomeChart incomeData={incomeData} incomeLoading={incomeLoading} chartWidth={chartWidth} chartAspect={1.25} hideSeeMore={true} showInChartSlider={true} />
        }
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
      <div className="overflow-hidden rounded-2xl sm:hidden">
        <div className="h-80" key={`slide-item-${currentIndex}`}>
          {
            currentIndex === 1 &&
            <IncomeExpensePieChart incomeMonthlyAvg={incomeMonthlyAvg} expenseMonthlyAvg={expenseMonthlyAvg} incomeLoading={incomeLoading}
              expenseLoading={expenseLoading} />
          }
          {
            currentIndex === 2 &&
            <MonthlySpendingChart expenseData={expenseData} expenseLoading={expenseLoading} chartWidth={chartWidth} hideSeeMore={true} />
          }
          {
            currentIndex === 3 &&
            <div className="ml-8 mr-8">
              <MonthlySpendingBarChart expenseMonthly={expenseMonthly} expenseLoading={expenseLoading} chartWidth={chartWidth} chartAspect={1.25} showInChartSlider={true} />
            </div>
          }
          {
            currentIndex === 4 &&
            <div className="ml-8 mr-8">
              <MonthlyIncomeChart incomeData={incomeData} incomeLoading={incomeLoading} chartWidth={chartWidth} chartAspect={1.25} hideSeeMore={true} />
            </div>
          }
        </div>
      </div>
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