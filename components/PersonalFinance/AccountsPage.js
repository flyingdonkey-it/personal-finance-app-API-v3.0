import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import { AccountsItemDetail } from './AccountsItemDetail';
import { AccountsType } from './AccountsType';

export function AccountsPage() {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [accountsData, setAccountsData] = useState(new Map());

  const getData = () => {
    setLoading(true);
    const userId = sessionStorage.getItem('userId');
    axios
      .get(`/api/accounts`, { params: { userId } })
      .then(function (response) {
        setLoading(false);
        function groupBy(list, keyGetter) {
          const map = new Map();
          list.forEach(item => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
              map.set(key, [item]);
            } else {
              collection.push(item);
            }
          });
          return map;
        }

        setAccountsData(groupBy(response.data, item => item.class.type));
      })
      .catch(function (error) {
        console.warn(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onAccountItemClick = e => {
    setShowDetail(true);
    setSelectedAccount({ accountDetail: e.accountDetail, accountItem: e.item, accountsType: e.accountsType });
  };

  const onCloseAccountDetailClick = () => {
    setSelectedAccount({});
    setShowDetail(false);
  };

  return (
    <>
      {!showDetail && (
        <>
          <div className="flex justify-between mt-20 ml-6 mr-6 sm:mt-16 sm:ml-80 sm:mr-80">
            <div className="flex">
              <div className="hidden mr-4 sm:block">
                <img className="w-7 h-7  hidden sm:block mr-3" src="/wallet.svg" alt="My accounts" />
              </div>
              <div className="font-semibold text-2xl2 text-blue">My Accounts</div>
            </div>
            <div className="sm:hidden flex items-center justify-center pr-4">
              <img className="w-12 h-12" src="/add-account.svg" alt="Add Account" />
            </div>
          </div>
          <div className="mt-6 sm:ml-80 sm:mr-80 bg-[#FCFCFC] min-h-screen">
            {loading ? (
              <div className="flex justify-center">
                <div className="mt-16">
                  {loading} {loading && <LoadingSpinner />}
                </div>
              </div>
            ) : (
              <>
                <AccountsType
                  accounts={accountsData.get('savings')}
                  accountsType="Savings accounts"
                  onAccountItemClick={onAccountItemClick}
                  onCloseAccountDetailClick={onCloseAccountDetailClick}
                  loading={loading}
                  showDetail={showDetail}
                />
                <AccountsType
                  accounts={accountsData.get('mortgage')}
                  accountsType="Loans"
                  onAccountItemClick={onAccountItemClick}
                  onCloseAccountDetailClick={onCloseAccountDetailClick}
                  loading={loading}
                  showDetail={showDetail}
                />
                <AccountsType
                  accounts={accountsData.get('credit-card')}
                  accountsType="Credit cards"
                  onAccountItemClick={onAccountItemClick}
                  onCloseAccountDetailClick={onCloseAccountDetailClick}
                  loading={loading}
                  showDetail={showDetail}
                />
              </>
            )}
          </div>
        </>
      )}
      {showDetail && <AccountsItemDetail onClose={onCloseAccountDetailClick} selectedAccount={selectedAccount} />}
    </>
  );
}
