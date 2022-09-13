import React from 'react';
import { AccountsItem } from './AccountsItem';

export function AccountsType({ accounts, accountsType, onAccountItemClick }) {
  return (
    <div className="flex-col mb-3">
      <div className="flex justify-start mb-2 bg-primary sm:pl-7 pr-7">
        <div className="font-semibold text-center mt-3 sm:mt-6 ml-7 mr-6 text-[12px] sm:text-2xl2 text-primary-bold">
          {accountsType}
        </div>
      </div>
      {accounts.map((item, index) => (
        <AccountsItem item={item} index={index} onAccountItemClick={onAccountItemClick} />
      ))}
    </div>
  );
}
