import React, { useState } from 'react';
import { AccontsItemDetail } from './AccontsItemDetail';
import { AccountsType } from './AccountsType';

const savingAccounts = [
  {
    id: '1',
    institution: 'ANZ',
    fund: '100,000,00',
    img: 'product-logo-square.svg',
  },
  {
    id: '2',
    institution: 'Bank of Melbourne',
    fund: '200,000,00',
    accountNumber: '123457890786543',
    accountHolder: 'lorem ipsum',
    accountExpirationDate: '04.04.2023',
    phoneNumber: '(03) 94******',
    img: 'product-logo-square.svg',
  },
];

const loans = [
  {
    id: '1',
    institution: 'Bankwest',
    fund: '100,000,00',
    img: 'product-logo-square.svg',
  },
  {
    id: '2',
    institution: 'ING',
    fund: '100,000,00',
    img: 'product-logo-square.svg',
  },
];

const creditCards = [
  {
    id: '1',
    institution: 'ANZ',
    fund: '100,000,00',
    img: 'product-logo-square.svg',
  },
  {
    id: '2',
    institution: 'ING',
    fund: '100,000,00',
    img: 'product-logo-square.svg',
  },
  {
    id: '3',
    institution: 'Westpac',
    fund: '100,000,00',
    img: 'product-logo-square.svg',
  },
  {
    id: '4',
    institution: 'ANZ',
    fund: '100,000,00',
    img: 'product-logo-square.svg',
  },
];

export function AccountsPage() {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});

  const onAccountItemClick = e => {
    setShowDetail(true);
  };

  const onCloseAccountDetailClick = () => {
    setSelectedAccount({});
    setShowDetail(false);
  };

  return (
    <>
      {!showDetail && (
        <div className=" sm:flex sm:flex-col sm:w-3/4 sm:m-auto sm:pt-[60px] mt-36 mb-36 ">
          <div className="hidden sm:flex items-center pb-8 text-2xl2">
            <img className="w-7 h-7  hidden sm:block mr-3" src="/wallet.svg" alt="My accounts" />
            <div className="text-primary-bold font-semibold sm:text-2xl2">My accounts</div>
          </div>
          <AccountsType
            accounts={savingAccounts}
            accountsType="Savings accounts"
            onAccountItemClick={onAccountItemClick}
          />
          <AccountsType accounts={loans} accountsType="Loans" onAccountItemClick={onAccountItemClick} />
          <AccountsType accounts={creditCards} accountsType="Credit cards" onAccountItemClick={onAccountItemClick} />
        </div>
      )}
      {showDetail && <AccontsItemDetail detail={savingAccounts[1]} onClose={onCloseAccountDetailClick} />}
    </>
  );
}
