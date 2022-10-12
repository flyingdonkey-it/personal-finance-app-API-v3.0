import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../../LoadingSpinner';
import { useToggleState } from '../../../utils/useToggleState';
import { Calendar } from '../../Calendar';
import { TransactionItem } from './TransactionItem';
import { TransactionItemDetail } from './TransactionItemDetail';

export function TransactionPage({ limit, inTransactionsPage, managePages, manageDetailPages }) {
  const [dateGroupedTransactions, setDateGroupedTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [showCalendar, setShowCalendar] = useToggleState(false);

  //Get all transactions of user
  function getData() {
    setLoading(true);
    const userId = sessionStorage.getItem('userId');
    axios
      .get(`/api/transactions`, { params: { userId, limit } })
      .then(function (response) {
        setLoading(false);

        //Group all transactions by postDate
        const dateGroupedTransactions = response.data.reduce(function (r, a) {
          if (a.postDate) {
            r[a.postDate.slice(0, 10)] = r[a.postDate.slice(0, 10)] || [];
            r[a.postDate.slice(0, 10)].push(a);
            return r;
          }
        }, Object.create(null));

        setDateGroupedTransactions(Object.entries(dateGroupedTransactions));
      })
      .catch(function (error) {
        console.warn(error);
        setDateGroupedTransactions([]);
        setLoading(false);
      });
  };

  //Open transaction detail
  function onTransactionItemClick(e) {
    if (!inTransactionsPage) {
      manageDetailPages(true, false, true);
    }

    setShowDetail(true);
    setSelectedTransaction(e.transactionDetail);
  };

  //Close transaction detail
  function onCloseTransactionDetailClick() {
    if (!inTransactionsPage) {
      manageDetailPages(false, false, false);
    }

    setSelectedTransaction({});
    setShowDetail(false);
  };

  //Redirect to transactions page
  function onSeeAllClick() {
    managePages(4, 'Upload');
  };

  //When any date clicked on calendar show transaction detail
  function onCalendarItemClick(date) {
    setShowDetail(true);
    const selectedDate = dateGroupedTransactions.find(item => item[0] === date);
    selectedDate.map(item => {
      setSelectedTransaction(item[0]);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* When any transaction is not selected */}
      {!showDetail && (
        <>
          <div className="flex justify-between ml-6 mr-6 sm:mt-12 sm:ml-52 sm:mr-80">
            <div className="flex">
              <div className="hidden mr-4 sm:block">
                <img className="w-6 h-6" src={`${process.env.ASSET_PREFIX}/swap.svg`} alt="Swap" />
              </div>
              <div className={`font-semibold text-blue sm:text-2xl2 ${inTransactionsPage ? 'text-2xl2' : 'text-base2'}`}>
                Transactions
              </div>
            </div>
            <div className="flex items-center justify-center pr-4">
              {inTransactionsPage ? (
                <div className="h-14">
                  <img className="w-7 h-7" src={`${process.env.ASSET_PREFIX}/calendar.svg`} alt="Calendar" onClick={setShowCalendar} />
                  {/* TRANSACTIONS CALENDAR */}
                  {showCalendar && (
                    <Calendar
                      data={dateGroupedTransactions || []}
                      open={showCalendar}
                      onCalendarItemClick={onCalendarItemClick}
                    />
                  )}
                </div>
              ) : (
                <p className="font-semibold underline text-sm2 text-blue bg-[#FEFEFE]" onClick={onSeeAllClick}>
                  See all
                </p>
              )}
            </div>
          </div>
          <div className="sm:ml-52 sm:mr-80 bg-[#FCFCFC]">
            {dateGroupedTransactions.length > 0 ? (
              dateGroupedTransactions.map((groupedItem, gIndex) => {
                return (
                  <div key={'grouped-transaction-' + gIndex}>
                    <div className="pt-5 pb-4 font-semibold text-sm2 text-blue bg-[#FEFEFE]">
                      <div className="ml-8">
                        {/* TRANSACTION DATE */}
                        {groupedItem[0]}
                      </div>
                    </div>
                    {/* TRANSACTION LIST ON DATE */}
                    {
                      groupedItem[1].map((transaction, tIndex) => {
                        return (
                          <div key={'transaction-item-' + gIndex + '-' + tIndex} className="pt-2 pb-2"
                            onClick={e => onTransactionItemClick({ transactionDetail: transaction, ...e })}>
                              <TransactionItem item={transaction} />
                          </div>
                        );
                      })
                    }
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center">
                <div className="mt-16">
                  {loading} {loading ? <LoadingSpinner /> : 'Transactions not Found'}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {/* When any transaction is selected */}
      {showDetail && (
        <TransactionItemDetail
          detail={selectedTransaction}
          closeTransactionDetailClick={onCloseTransactionDetailClick}
        />
      )}
    </>
  );
}
