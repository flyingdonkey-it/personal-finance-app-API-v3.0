import React from 'react';
import { AccountsItem } from './AccountsItem';

export function AccountsType({ loading, accounts, accountsType, onAccountItemClick, showDetail }) {
  return (
    <div className="flex-col mb-3">
      <div className="flex justify-start mb-2 bg-primary sm:pl-7 pr-7">
        <div className="font-semibold text-center mt-3 sm:mt-6 ml-7 mr-6 text-[12px] sm:text-2xl2 text-primary-bold">
          {accountsType}
        </div>
      </div>
      {!loading && accounts && accounts.length > 0
        ? accounts.map((item, index) => (
            <AccountsItem
              item={item}
              key={index}
              onAccountItemClick={onAccountItemClick}
              showDetail={showDetail}
              accountsType={accountsType}
            />
          ))
        : !loading && (
            <div className="flex items-center justify-start font-semibold text-sm2 sm:text-2xl2 ml-7">{`You do not have any ${accountsType}.`}</div>
          )}
    </div>
  );
}
