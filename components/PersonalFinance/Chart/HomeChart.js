import { useState } from "react";
import { ListItem } from "../../ListItem";
import { MonthlySpendingChart } from "./MonthlySpendingChart";
import { MonthlyIncomeChart } from "./MonthlyIncomeChart";

const expensesIndex = 1;
const upcomingPaymentsIndex = 2;
const incomeIndex = 3;

const items = [
  { index: expensesIndex, title: "Expenses" },
  { index: upcomingPaymentsIndex, title: "Upcoming payments" },
  { index: incomeIndex, title: "Income" },
]

const upcomingPayments = [
  {
    description: 'Disney+', dateDescription: '5th of every month', amount: '-20.00'
  },
  {
    description: 'Spotify', dateDescription: '18th of every month', amount: '-11.00'
  },
  {
    description: 'Amazon', dateDescription: '10th of May, every year', amount: '-20.00'
  },
]

export function HomeChart({ expenseData, incomeData, expenseLoading, incomeLoading, chartWidth }) {
  const [selectedChartItem, setSelectedChartItem] = useState(1);

  function onItemClick(itemIndex) {
    setSelectedChartItem(itemIndex);
  }

  const handleClickIndicator = (e, index) => {
    e.preventDefault();
    setSelectedChartItem(index);
  };

  return (
    <div className="flex flex-col mt-12 sm:w-3/5 sm:mt-1 sm:mr-80">
      <div className="flex items-center ml-12 mr-12 border-2 rounded-3xl border-[#4A56E2] sm:hidden">
        {
          items &&
          items.map((item, i) => {
            return (
              <div key={'chart-title-' + i} className={`p-2 text-xs
                ${selectedChartItem === item.index ? 'text-white rounded-xl bg-[#4A56E2]' : 'text-black bg-white rounded-3xl'}
                ${i === items.length - 1 ? 'pl-[0.81rem] pr-4' : 'pl-5 pr-4'}`}
                onClick={() => onItemClick(item.index)}>
                {item.title}
              </div>
            );
          })
        }
      </div>
      <div className="flex flex-col mt-4 sm:mt-0 h-80">
        {
          selectedChartItem &&
          selectedChartItem === expensesIndex &&
          <div className="flex flex-col justify-between h-80">
            <div className="justify-center hidden mb-4 sm:flex">
              <div>
                <img className="w-6 h-6" src="/upload.svg" alt="Upload" />
              </div>
              <div className="ml-2 font-semibold text-blue text-2xl2">
                Expenses
              </div>
            </div>
            <MonthlySpendingChart expenseData={expenseData} expenseLoading={expenseLoading} chartWidth={chartWidth} />
          </div>
        }
        {
          selectedChartItem &&
          selectedChartItem === upcomingPaymentsIndex &&
          <div className="flex flex-col justify-between h-80">
            <div className="justify-center hidden mb-4 sm:flex">
              <div>
                <img className="w-6 h-6" src="/calendar.svg" alt="Calendar" />
              </div>
              <div className="ml-2 font-semibold text-blue text-2xl2">
                Upcoming payments
              </div>
            </div>
            <div className="ml-12 mr-12 sm:ml-36 sm:mr-36">
              {
                upcomingPayments &&
                upcomingPayments.map((item, i) => {
                  return (
                    <ListItem key={'upcoming-payment-' + i} item={item} imagePrefix={"payee-company"} randomDivider={3} />
                  );
                })
              }
            </div>
            <div className="flex justify-center">
              <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]">See more</p>
            </div>
          </div>
        }
        {
          selectedChartItem &&
          selectedChartItem === incomeIndex &&
          <div className="flex flex-col justify-between ml-8 mr-8 h-80">
            <div className="justify-center hidden sm:flex">
              <div>
                <img className="w-6 h-6" src="/download.svg" alt="Income" />
              </div>
              <div className="ml-2 font-semibold text-blue text-2xl2">
                Income
              </div>
            </div>
            <MonthlyIncomeChart incomeData={incomeData} incomeLoading={incomeLoading} chartWidth={chartWidth} chartAspect={1.25} />
          </div>
        }
      </div>
      <div className="hidden basis-1/2 sm:block sm:ml-16 sm:mr-10">
        <div className="flex justify-end">
          <div className="space-x-3">
            {items.map((item) => (
              <button id={'carousel-indicator-' + item.index} key={item.index} type='button'
                className={'w-4 h-2 rounded ' + (item.index === selectedChartItem ? 'bg-[#4A56E2]' : 'bg-[rgba(74,86,226,0.3)]')}
                aria-current={selectedChartItem === item.index}
                onClick={(e) => handleClickIndicator(e, item.index)}
                aria-label={'Slide ' + item.index}></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}