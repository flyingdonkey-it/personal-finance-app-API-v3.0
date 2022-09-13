import React from 'react';
import { AccountsType } from './AccountsType';

export function AccountsPage() {
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
  return (
    <>
      <div className="mt-36 mb-36 sm:hidden">
        <AccountsType accounts={savingAccounts} accountsType="Savings accounts" />
        <AccountsType accounts={loans} accountsType="Loans" />
        <AccountsType accounts={creditCards} accountsType="Credit cards" />
      </div>
      <div className="hidden sm:flex sm:flex-col w-3/4 sm:m-auto pt-[60px] ">
        <div className="flex items-center pb-8 text-2xl2">
          <img className="w-7 h-7  hidden sm:block mr-3" src="/wallet.svg" alt="My accounts" />
          <div className="text-primary-bold font-semibold sm:text-2xl2">My accounts</div>
        </div>
        <AccountsType accounts={savingAccounts} accountsType="Savings accounts" />
        <AccountsType accounts={loans} accountsType="Loans" />
        <AccountsType accounts={creditCards} accountsType="Credit cards" />
      </div>
    </>
  );
}
