import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AccontsItemDetail } from './AccontsItemDetail';
import { AccountsType } from './AccountsType';

export function AccountsPage({ manageAccountItemDetail }) {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [savingAccounts, setSavingAccounts] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [loans, setLoans] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});

  const getData = () => {
    setLoading(true);
    const userId = sessionStorage.getItem('userId');
    axios
      .get(`/api/accounts`, { params: { userId } })
      .then(function (response) {
        setLoading(false);
        response.data.forEach(item => {
          if (item.class.type === 'savings') {
            setSavingAccounts([...savingAccounts, item]);
          } else if (item.class.type === 'loans') {
            setLoans([...loans, item]);
          } else if (item.class.type === 'credit-card') {
            setCreditCards([...creditCards, item]);
          } else {
            return false;
          }
        });
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
    setSelectedAccount({ accountDetail: e.accountDetail, accountItem: e.item });
  };

  const onCloseAccountDetailClick = () => {
    setSelectedAccount({});
    setShowDetail(false);
  };

  return (
    <>
      {!showDetail && (
        <>
          <div className="flex justify-between mt-24 ml-6 mr-6 sm:mt-16 sm:ml-80 sm:mr-80">
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
          <div className="mt-6 sm:ml-80 sm:mr-80 bg-[#FCFCFC]">
            <AccountsType
              accounts={savingAccounts}
              accountsType="Savings accounts"
              onAccountItemClick={onAccountItemClick}
              onCloseAccountDetailClick={onCloseAccountDetailClick}
              loading={loading}
              showDetail={showDetail}
            />
            <AccountsType
              accounts={loans}
              accountsType="Loans"
              onAccountItemClick={onAccountItemClick}
              onCloseAccountDetailClick={onCloseAccountDetailClick}
              loading={loading}
              showDetail={showDetail}
            />
            <AccountsType
              accounts={creditCards}
              accountsType="Credit cards"
              onAccountItemClick={onAccountItemClick}
              onCloseAccountDetailClick={onCloseAccountDetailClick}
              loading={loading}
              showDetail={showDetail}
            />
          </div>
        </>
      )}
      {showDetail && (
        <AccontsItemDetail
          onClose={onCloseAccountDetailClick}
          selectedAccount={selectedAccount}
          manageAccountItemDetail={manageAccountItemDetail}
        />
      )}
    </>
  );
}
