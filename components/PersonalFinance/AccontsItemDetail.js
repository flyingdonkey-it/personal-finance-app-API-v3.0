import React from 'react';

export function AccontsItemDetail({ detail, onClose }) {
  function onBackButtonClick() {
    onClose();
  }
  return (
    <div>
      <div className="flex justify-between mt-24 ml-5 mr-5 sm:mt-12 sm:ml-96 sm:mr-96">
        <div className="flex items-start">
          <img className="w-12 h-12" src="/back-button.svg" alt="Back" onClick={onBackButtonClick} />
          <div className="flex flex-col ml-6 items-start font-semibold text-center">
            <div className="text-2xl2 text-primary-bold">{detail.institution}</div>
            <div className="text-green-link text-[20px]">{'Saving Accounts'}</div>
          </div>
        </div>
        <div className="flex flex-col items-center"></div>
        <div>
          <img className="w-8 h-8" src="/share-button.svg" alt="Share" />
        </div>
      </div>
      <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
        <div className="flex justify-between mt-8 sm:pl-6 font-semibold sm:hidden text-2xl2 text-primary-bold">
          <div>Total:</div>
          <div>{detail.fund} $</div>
        </div>
        <div className="justify-between hidden p-8 pl-16 pr-16 mt-8 font-semibold sm:flex text-2xl2 text-primary-bold bg-[#F5F7F8]">
          <div>Total:</div>
          <div>{detail.fund} $</div>
        </div>
        <div className=" sm:flex sm:mt-8 ">
          <div className="sm:ml-16">
            <div className="mt-7 text-base2">
              <div>Account number</div>
              <div className="mt-1 font-semibold">{detail.accountNumber}</div>
            </div>
            <div className="mt-7 text-base2">
              <div>Account holder</div>
              <div className="mt-1 font-semibold">{detail.accountHolder}</div>
            </div>
            <div className="mt-7 text-base2">
              <div>Date and time</div>
              <div className="mt-1 font-semibold">{detail.accountExpirationDate}</div>
            </div>
            <div className="mt-7 text-base2">
              <div>Phone number</div>
              <div className="mt-1 font-semibold">{detail.phoneNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
