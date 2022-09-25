import axios from 'axios';
import { useState, useEffect } from 'react';
import { dateConverter } from '../../utils/dateConverter';
import { formatCurrency } from '../../utils/formatCurrency';
import { IncomeAndExpensesItemDetailCard } from '../IncomeAndExpensesItemDetailCard';
import { LoadingSpinner } from '../LoadingSpinner';

export function IncomeAndExpensesItemDetail() {
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  //Calendardan gelen date prop'u eklenince bu date kaldırılacak!!
  const date = '2020-03-09';
  const selectedDate = date?.slice(0, 7);
  const dateTitle = dateConverter(date);

  function getData() {
    setExpenseLoading(true);
    setIncomeLoading(true);

    const userId = sessionStorage.getItem('userId');

    axios
      .post(`/api/create-expense?userId=${userId}`, { fromMonth: `${selectedDate || '2020-01'}`, toMonth: '2020-12' })
      .then(function (response) {
        const total = response.data.payments.reduce(
          (acc, curr) => acc + +curr.subCategory[0].changeHistory[0].amount,
          0
        );
        setExpenseTotal(total);
        response.data.payments.map(item => {
          setExpenseData(expenseData => [
            ...expenseData,
            {
              source: item.division,
              expense: item.subCategory[0].changeHistory[0].amount,
            },
          ]);
        });
        setExpenseLoading(false);
      })
      .catch(function (error) {
        console.warn(error);
        setExpenseData([]);
        setExpenseLoading(false);
      });

    axios
      .post(`/api/create-income?userId=${userId}`, { fromMonth: `${selectedDate || '2020-01'}`, toMonth: '2020-12' })
      .then(function (response) {
        const total = response.data.otherCredit.reduce((acc, curr) => acc + +curr.current.amount, 0);
        setIncomeTotal(total);
        setIncomeData(response.data);
        setIncomeLoading(false);
      })
      .catch(function (error) {
        console.warn(error);
        setIncomeData([]);
        setIncomeLoading(false);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-24 ml-5 mr-5 sm:mt-12 sm:ml-96 sm:mr-96">
        <div>
          <img className="w-8 h-8" src="/back-button.svg" alt="Back" onClick={'onBackButtonClick'} />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl2 font-semibold">{dateTitle}</div>
        </div>
        <div>
          <img className="w-8 h-8" src="/share-button.svg" alt="Share" />
        </div>
      </div>
      {incomeLoading ? (
        <div className="flex items-center justify-center sm:mt-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
          <div className="flex flex-col  p-6 mt-8 font-semibold ">
            <div className="text-base2 sm:text-xl">Income</div>

            <div className="mt-2 text-primary-bold font-bold text-2xl2 ">{formatCurrency(incomeTotal)}</div>
          </div>
          <hr className="text-primary-bold w-100" />
          {incomeData.otherCredit?.map((item, index) => (
            <IncomeAndExpensesItemDetailCard key={index} item={item} path="income" />
          ))}
        </div>
      )}
      {expenseLoading ? (
        <div className="flex items-center justify-center sm:mt-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
          <div className="flex flex-col">
            <div className="flex flex-col p-6 mt-8 font-semibold text-2xl2 ">
              <div className="text-base2 sm:text-xl">Expenses</div>
              <div className="mt-2 text-primary-bold font-bold sm:text-2xl2 text-2xl">
                {formatCurrency(expenseTotal)}
              </div>
            </div>
            <hr className="text-primary-bold w-100" />
          </div>
          {expenseData?.map((item, index) => (
            <IncomeAndExpensesItemDetailCard key={index} item={item} path="expenses" />
          ))}
        </div>
      )}
    </div>
  );
}
