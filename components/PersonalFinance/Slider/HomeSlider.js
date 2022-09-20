import { useEffect, useState } from 'react';
import axios from 'axios';
import { Savings } from './Savings';
import { Loans } from './Loans';
import { CreditCard } from './CreditCard';
import { IncomeExpense } from './IncomeExpense';
import { MonthlySpending } from './MonthlySpending';

export function HomeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [loansBalance, setLoansBalance] = useState(0);
  const [creditCardBalance, setCreditCardBalance] = useState(0);
  const [incomeMonthlyTotal] = useState(16250);
  const [expenseMonthlyTotal] = useState(12350);

  const components = [
    // eslint-disable-next-line react/jsx-key
    { index: 0, hidden: false, component: <Savings balance={savingsBalance} /> },
    { index: 1, hidden: true, component: <Loans balance={loansBalance} /> },
    { index: 2, hidden: true, component: <CreditCard balance={creditCardBalance} /> },
    { index: 3, hidden: true, component: <MonthlySpending /> },
    { index: 4, hidden: true, component: <IncomeExpense income={incomeMonthlyTotal} expense={expenseMonthlyTotal} /> }
  ];

  const handleClickIndicator = (e, index) => {
    e.preventDefault();
    setCurrentIndex(index);
  };

  const createExpense = () => {
    //const userId = sessionStorage.getItem('userId');
    // axios
    //   .post(`/api/create-expense?userId=${userId}`, { fromMonth: '2019-05', toMonth: '2019-09' })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.error(error));

    // axios.post(`/api/create-income?userId=${userId}`, { fromMonth: '2019-05', toMonth: '2019-09' })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.error(error));
  };

  const fetchAccounts = () => {
    const userId = sessionStorage.getItem("userId");
    axios.get('/api/accounts', { params: { userId } })
      .then((response) => {
        setSavingsBalance(response.data.find(f => f.class.type === 'savings').balance);
        setLoansBalance(parseFloat(response.data.find(f => f.class.type === 'mortgage').balance));
        setCreditCardBalance(response.data.find(f => f.class.type === 'credit-card').balance);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchAccounts();
    createExpense();
  }, []);

  return (
    <div className="sm:w-2/5 sm:flex sm:ml-64 sm:mt-12">
      <div className="hidden w-full sm:block">
        {components[currentIndex].component}
        <div className="hidden mt-5 sm:block">
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
      <div className="relative mt-6 overflow-hidden rounded-2xl sm:hidden ml-9 mr-9">
        <div className="h-48 sm:h-72" key={components[currentIndex].index}>
          {components[currentIndex].component}
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