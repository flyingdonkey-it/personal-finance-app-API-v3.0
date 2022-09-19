import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../LoadingSpinner';

export function AccountsItem({ item, onAccountItemClick, showDetail, accountsType }) {
  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState([]);

  const getData = () => {
    setLoading(true);
    axios
      .get('/api/institutions-detail', { params: { institutionId: item.institution } })
      .then(res => {
        setLoading(false);
        setSelectedAccount(res.data);
      })
      .catch(error => {
        console.warn('error', error);
        setLoading(false);
        setSelectedAccount([]);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!showDetail &&
        (loading ? (
          <div className="flex justify-center">
            <div className="mt-16">
              {loading} {loading && <LoadingSpinner />}
            </div>
          </div>
        ) : (
          <>
            {selectedAccount.map((account, index) => (
              <div
                className="flex mb-2 pt-1 pb-1 sm:pt-3 sm:pb-3 sm:bg-[#F5F7F8]"
                key={index}
                onClick={e => onAccountItemClick({ accountDetail: account, item, accountsType, ...e })}
              >
                <div key={index} className="flex justify-between items-center w-full px-7">
                  <div className="flex justify-center items-center rounded-full sm:pl-6 sm:pr-6 ">
                    <img
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-full"
                      src={account.logo.links.square}
                      alt={account.name}
                    />
                    <div className="ml-3 text-sm2 sm:text-2xl2 font-semibold sm:font-medium">{account.name}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-center text-sm3 sm:text-2xl2 text-primary-accent">
                      {item.availableFunds} $
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ))}
    </>
  );
}
