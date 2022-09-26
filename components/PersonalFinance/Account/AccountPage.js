import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { LoadingSpinner } from '../../LoadingSpinner';
import { useAccountVerificationForm } from '../../AccountVerificationForm/AccountVerificationFormProvider';
import { AccountItemDetail } from './AccountItemDetail';
import { AccountType } from './AccountType';

const accountTypes = [
  { type: "savings", title: "Savings accounts" },
  { type: "mortgage", title: "Loans" },
  { type: "credit-card", title: "Credit cards" }
]

export function AccountPage() {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [accountsData, setAccountsData] = useState(new Map());
  const [institutionData, setInstitutionsData] = useState([]);

  const { resetForNewAccount } = useAccountVerificationForm();

  function onAddAccountClick() {
    resetForNewAccount();
  }

  function getData() {
    setLoading(true);

    const userId = sessionStorage.getItem('userId');
    axios
      .get(`/api/accounts`, { params: { userId } })
      .then(function (response) {
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

        axios
          .get('/api/institutions')
          .then(res => {
            setInstitutionsData(res.data);
            setLoading(false);
          })
          .catch(error => {
            console.warn('error', error);
            setInstitutionsData([]);
            setLoading(false);
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

  function onAccountItemClick(e) {
    setShowDetail(true);
    setSelectedAccount({ accountDetail: e.accountDetail, accountItem: e.item, accountsType: e.accountsType });
  };

  function onCloseAccountDetailClick() {
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
                <img className="hidden mr-3 w-7 h-7 sm:block" src="/wallet.svg" alt="My accounts" />
              </div>
              <div className="font-semibold text-2xl2 text-blue">My Accounts</div>
            </div>
            <div className="flex items-center justify-center sm:hidden">
              <img className="w-12 h-12" src="/add-account.svg" alt="Add Account" onClick={onAddAccountClick} />
            </div>
          </div>
          <div className="min-h-screen mt-6 sm:ml-80 sm:mr-80 bg-[#FCFCFC]">
            {loading ? (
              <div className="flex justify-center">
                <div className="mt-16">
                  {loading} {loading && <LoadingSpinner />}
                </div>
              </div>
            ) : (
              <>
                {
                  accountTypes.map((accountType, i) => {
                    return (
                      <AccountType key={"account-type-" + i}
                        accounts={accountsData.get(accountType.type)}
                        institutions={institutionData}
                        accountsType={accountType.title}
                        onAccountItemClick={onAccountItemClick}
                        onCloseAccountDetailClick={onCloseAccountDetailClick}
                        loading={loading}
                        showDetail={showDetail}
                      />
                    );
                  })
                }
              </>
            )}
          </div>
        </>
      )}
      {showDetail && <AccountItemDetail onClose={onCloseAccountDetailClick} selectedAccount={selectedAccount} />}
    </>
  );
}