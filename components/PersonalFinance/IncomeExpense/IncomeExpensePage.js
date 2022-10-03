import { useEffect, useState } from 'react';
import { useToggleState } from '../../../utils/useToggleState';
import { Calendar } from '../../Calendar';
import { IncomeExpenseItem } from './IncomeExpenseItem';

export function IncomeExpensePage({ incomeLoading, expenseLoading, incomesByDate, expensesByDate, manageDetailPages }) {
  const [showCalendar, setShowCalendar] = useToggleState(false);
  const [incomeExpenseByDate, setIncomeExpenseByDate] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedIncomes, setSelectedIncomes] = useState([]);
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  function onCalendarItemClick(date) {
    setShowDetail(true);
    manageDetailPages(true, true, false);

    setSelectedDate(date);

    let incomes = [];
    const selectedIncomeValues = incomesByDate.find(item => item[0] === date);
    if (selectedIncomeValues) {
      selectedIncomeValues[1].map(x => incomes.push(x));
    }
    setSelectedIncomes(incomes);

    let expenses = [];
    const selectedExpenseValues = expensesByDate.find(item => item[0] === date);
    if (selectedExpenseValues) {
      selectedExpenseValues[1].map(x => expenses.push(x));
    }
    setSelectedExpenses(expenses);
  };

  function onCloseIncomeExpenseDetailClick() {
    manageDetailPages(false, false, false);
    setSelectedIncomes({});
    setSelectedExpenses({});
    setShowDetail(false);
  };

  useEffect(() => {
    if (incomesByDate.length > 0 && expensesByDate.length > 0) {
      const incomeExpenseAggregatedData = [];
      incomeExpenseAggregatedData.push(...incomesByDate);
      incomeExpenseAggregatedData.push(...expensesByDate);
      setIncomeExpenseByDate(incomeExpenseAggregatedData);
    }
  }, [incomesByDate, expensesByDate]);

  return (
    <>
      {!showDetail &&
        <div className="flex justify-between ml-6 mr-6 sm:mt-12 sm:ml-52 sm:mr-80">
          <div className="flex">
            <div className="hidden mr-4 sm:block">
              <img className="w-6 h-6" src="/upload.svg" alt="Upload" />
            </div>
            <div className="font-semibold text-blue text-2xl2">
              Income and Expenses
            </div>
          </div>
          <div className="flex items-center justify-center pr-4" >
            <div className="h-14">
              <img className="w-7 h-7" src="/calendar.svg" alt="Calendar" onClick={setShowCalendar} />
              {showCalendar &&
                <Calendar data={incomeExpenseByDate || []} open={showCalendar} onCalendarItemClick={onCalendarItemClick} />}
            </div>
          </div>
        </div>}
      {showDetail &&
        <IncomeExpenseItem incomeLoading={incomeLoading} expenseLoading={expenseLoading} selectedDate={selectedDate}
          incomeDetails={selectedIncomes} expenseDetails={selectedExpenses} closeIncomeExpenseDetailClick={onCloseIncomeExpenseDetailClick} />
      }
    </>
  );
}