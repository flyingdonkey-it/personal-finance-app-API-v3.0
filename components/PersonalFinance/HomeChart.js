import { useEffect, useState } from "react";
import axios from 'axios';
import { ListItem } from "../ListItem";
import { CustomPieChart } from "../CustomPieChart";
import { LoadingSpinner } from '../LoadingSpinner';
import { CustomBarChart } from "../CustomBarChart";

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
  {
    description: 'Disney+', dateDescription: '5th of every month', amount: '-20.00'
  },
]

const colorPallette = [
  "#4A56E2", "#4761DD", "#436BD7", "#4076D2", "#3C81CD", "#398CC7", "#3596C2", "#32A1BC", "#2EACB7", "#2BB7B2", "#27C1AC", "#24CCA7"
];

export function HomeChart({ chartWidth }) {
  const [selectedChartItem, setSelectedChartItem] = useState(1);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [refreshConnectionError, setRefreshConnectionError] = useState(false);

  function getExpenseData() {
    setExpenseLoading(true);
    setIncomeLoading(true);

    const userId = sessionStorage.getItem("userId");
    axios
      .post(`/api/refresh-connection?userId=${userId}`)
      .then(function (refreshResponse) {
        if (refreshResponse.status === 200) {
          axios
            .post(`/api/create-expense?userId=${userId}`, { fromMonth: '2020-03', toMonth: '2020-06' })
            .then(function (response) {
              setExpenseData(response.data.payments.map((x, i) => {
                return { name: x.division, value: x.percentageTotal, fill: colorPallette[parseInt(i % 12)] }
              }));
              setExpenseLoading(false);
            })
            .catch(function (error) {
              console.warn(error);
              setExpenseData([]);
              setExpenseLoading(false);
            });

          axios
            .post(`/api/create-income?userId=${userId}`, { fromMonth: '2020-01', toMonth: '2020-12' })
            .then(function (response) {
              setIncomeData(response.data.regular[0].changeHistory.map((x) => {
                return { key: new Date(x.date).toLocaleString('en-us', { month: 'short' }), value: x.amount, normalizedValue: x.amount * 1.25 }
              }));
              setIncomeLoading(false);
            })
            .catch(function (error) {
              console.warn(error);
              setIncomeData([]);
              setIncomeLoading(false);
            });
        }
      })
      .catch(function (error) {
        console.warn(error);
        setRefreshConnectionError(true);
        setExpenseLoading(false);
        setIncomeLoading(false);
      });
  }

  function onItemClick(itemIndex) {
    setSelectedChartItem(itemIndex);
  }

  const handleClickIndicator = (e, index) => {
    e.preventDefault();
    setSelectedChartItem(index);
  };

  useEffect(() => {
    if (expenseData.length === 0 && !refreshConnectionError) {
      getExpenseData();
    }
  }, [expenseData]);

  return (
    <div className="flex flex-col mt-12 sm:mt-1 sm:mr-80 sm:w-1/2">
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
      <div className="flex flex-col mt-4 sm:mt-0">
        {
          selectedChartItem &&
          selectedChartItem === expensesIndex &&
          <div>
            {
              expenseData.length > 0 ?
                <>
                  <div className="justify-center hidden sm:flex">
                    <div>
                      <img className="w-6 h-6" src="/upload.svg" alt="Upload" />
                    </div>
                    <div className="ml-2 font-semibold text-blue text-2xl2">
                      Expenses
                    </div>
                  </div>
                  <div>
                    <CustomPieChart data={expenseData} width={chartWidth} />
                  </div>
                  <div className="flex justify-center">
                    <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]">See more</p>
                  </div>
                </>
                :
                <div className="flex justify-center">
                  <div className='mt-16'>
                    {expenseLoading} {expenseLoading ? <LoadingSpinner /> : "Expense data not found"}
                  </div>
                </div>
            }
          </div>
        }
        {
          selectedChartItem &&
          selectedChartItem === upcomingPaymentsIndex &&
          <div className="flex flex-col justify-between">
            <div className="justify-center hidden sm:flex">
              <div>
                <img className="w-6 h-6" src="/calendar.svg" alt="Calendar" />
              </div>
              <div className="ml-2 font-semibold text-blue text-2xl2">
                Upcoming payments
              </div>
            </div>
            <div className="ml-11 mr-11">
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
          <div className="flex flex-col justify-between ml-8 mr-8">
            <div className="justify-center hidden sm:flex">
              <div>
                <img className="w-6 h-6" src="/download.svg" alt="Income" />
              </div>
              <div className="ml-2 font-semibold text-blue text-2xl2">
                Income
              </div>
            </div>
            {
              incomeData.length > 0 ?
                <>
                  <div>
                    <CustomBarChart data={incomeData} width={chartWidth} />
                  </div>
                  <div className="flex justify-center">
                    <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]">See more</p>
                  </div>
                </>
                :
                <div className="flex justify-center">
                  <div className='mt-16'>
                    {incomeLoading} {incomeLoading ? <LoadingSpinner /> : "Income data not found"}
                  </div>
                </div>
            }
          </div>
        }
      </div>
      <div className="hidden mt-5 basis-1/2 sm:block md:ml-16 sm:ml-16 lg:ml-24 xl:ml-32 2xl:ml-14">
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