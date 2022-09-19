import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../LoadingSpinner';
import { TransactionItem } from './TransactionItem';
import { TransactionItemDetail } from './TransactionItemDetail';
import { Calendar } from './Calendar';

export function TransactionPage({ limit, inTransactionsPage, managePages, hideHomePageItems }) {
  const [dateGroupedTransactions, setDateGroupedTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [open, setOpen] = useState(false);

  const getData = () => {
    setLoading(true)
    const userId = sessionStorage.getItem("userId")
    axios
      .get(`/api/transactions`, { params: { userId, limit } })
      .then(function (response) {
        setLoading(false);

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
  }

  const onTransactionItemClick = (e) => {
    if (!inTransactionsPage) {
      hideHomePageItems(true);
    }

    setShowDetail(true);
    setSelectedTransaction(e.transactionDetail);
  }

  const onCloseTransactionDetailClick = () => {
    if (!inTransactionsPage) {
      hideHomePageItems(false);
    }

    setSelectedTransaction({});
    setShowDetail(false);
  }

  const onSeeAllClick = () => {
    managePages(4, 'Upload');
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      {!showDetail &&
        <>
          <div className="flex justify-between ml-6 mr-6 sm:mt-44 sm:ml-80 sm:mr-80">
            <div className="flex">
              <div className="hidden mr-4 sm:block">
                <img className="w-6 h-6" src="/swap.svg" alt="Swap" />
              </div>
              <div className={`font-semibold text-blue ${inTransactionsPage ? 'text-2xl2' : 'text-base2'}`}>
                Transactions
              </div>
            </div>
            <div className="flex items-center justify-center pr-4" >
              {inTransactionsPage
                ? (
                  <div>
                <img className="w-7 h-7" src="/calendar.svg" alt="Calendar" onClick={()=> setOpen(!open)}/>
                <Calendar data={dateGroupedTransactions || []} open={open} />
                </div>
                )
                : <p className='font-semibold underline text-sm2 text-blue bg-[#FEFEFE]'onClick={onSeeAllClick}>See all</p>}
            </div>
          </div>
          <div className="sm:ml-80 sm:mr-80 bg-[#FCFCFC]">
            {dateGroupedTransactions.length > 0 ? (
              dateGroupedTransactions.map((groupedItem, gIndex) => {
                return (
                  <div key={'grouped-transaction-' + gIndex}>
                    <div className='pt-5 pb-4 font-semibold text-sm2 text-blue bg-[#FEFEFE]'>
                      <div className='ml-8'>
                        {groupedItem[0]}
                      </div>
                    </div>
                    {
                      groupedItem[1].map((transaction, tIndex) => {
                        return (
                          <div key={'transaction-item-' + gIndex + '-' + tIndex} className="pt-2 pb-2" onClick={(e) => onTransactionItemClick({ transactionDetail: transaction, ...e })}>
                            <TransactionItem item={transaction} />
                          </div>
                        )
                      })
                    }
                  </div>
                );
              })
            ) :
              <div className="flex justify-center">
                <div className='mt-16'>
                  {loading} {loading ? <LoadingSpinner /> : "Transactions not Found"}
                </div>
              </div>
            }
          </div>
        </>
      }
      {showDetail &&
        <TransactionItemDetail detail={selectedTransaction} closeTransactionDetailClick={onCloseTransactionDetailClick} />
      }
    </>
  );
}

