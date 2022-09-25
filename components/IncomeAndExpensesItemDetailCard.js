import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

export function IncomeAndExpensesItemDetailCard({ item, path }) {
  return (
    <div className="flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <div>
          <img className="w-10 h-10 rounded-full sm:w-14 sm:h-14" src={'/product-logo-square.svg'} alt={'avatar'} />
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-end">
            <div className="font-bold sm:text-2xl2 text-primary-bold text-base2">
              {formatCurrency(path === 'income' ? item.current.amount : item.expense)}
            </div>
            <div className="text-primary-bold sm:text-xl text-base2">{item.source}</div>
          </div>
          <img className="w-10 h-10 rounded-full sm:w-12 sm:h-12" src={'/dots-menu.svg'} alt={'avatar'} />
        </div>
      </div>
      <hr className="text-primary-bold w-100" />
    </div>
  );
}
