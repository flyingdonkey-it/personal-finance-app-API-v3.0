const types = ['Income', 'Expenses'];

export function IncomeAndExpensesItemDetail() {
  return (
    <div>
      <div className="flex justify-between mt-24 ml-5 mr-5 sm:mt-12 sm:ml-96 sm:mr-96">
        <div>
          <img className="w-8 h-8" src="/back-button.svg" alt="Back" onClick={'onBackButtonClick'} />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl2 font-semibold">9th of March</div>
        </div>
        <div>
          <img className="w-8 h-8" src="/share-button.svg" alt="Share" />
        </div>
      </div>
      <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
        <div className="flex flex-col  p-6 mt-8 font-semibold ">
          <div className="text-base2 sm:text-xl">Income</div>
          <div className="mt-2 text-primary-bold font-bold text-2xl2 ">+20.000$</div>
        </div>
        <hr className="text-primary-bold w-100" />
        <div className="flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <div>
              <img className="w-10 h-10 rounded-full sm:w-14 sm:h-14" src={'/product-logo-square.svg'} alt={'avatar'} />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-end">
                <div className="font-bold sm:text-2xl2 text-primary-bold text-base2">+20.000$</div>
                <div className="text-primary-bold sm:text-xl text-base2">OW finance office</div>
              </div>
              <img className="w-10 h-10 rounded-full sm:w-12 sm:h-12" src={'/dots-menu.svg'} alt={'avatar'} />
            </div>
          </div>
          <hr className="text-primary-bold w-100" />
        </div>
      </div>
      <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
        <div className="flex flex-col">
          <div className="flex flex-col p-6 mt-8 font-semibold text-2xl2 ">
            <div className="text-base2 sm:text-xl">Expenses</div>
            <div className="mt-2 text-primary-bold font-bold sm:text-2xl2 text-2xl">-30.000$</div>
          </div>
          <hr className="text-primary-bold w-100" />
        </div>
        <div className="flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <div>
              <img className="w-10 h-10 rounded-full sm:w-14 sm:h-14" src={'/product-logo-square.svg'} alt={'avatar'} />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-end">
                <div className="font-bold sm:text-2xl2 text-primary-bold text-base2">+20.000$</div>
                <div className="text-primary-bold sm:text-xl text-base2">OW finance office</div>
              </div>
              <img className="w-10 h-10 rounded-full sm:w-12 sm:h-12" src={'/dots-menu.svg'} alt={'avatar'} />
            </div>
          </div>
          <hr className="text-primary-bold w-100" />
        </div>
        <div className="flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <div>
              <img className="w-10 h-10 rounded-full sm:w-14 sm:h-14" src={'/product-logo-square.svg'} alt={'avatar'} />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-end">
                <div className="font-bold sm:text-2xl2 text-primary-bold text-base2">+20.000$</div>
                <div className="text-primary-bold sm:text-xl text-base2">OW finance office</div>
              </div>
              <img className="w-10 h-10 rounded-full sm:w-12 sm:h-12" src={'/dots-menu.svg'} alt={'avatar'} />
            </div>
          </div>
          <hr className="text-primary-bold w-100" />
        </div>
        <div className="flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <div>
              <img className="w-10 h-10 rounded-full sm:w-14 sm:h-14" src={'/product-logo-square.svg'} alt={'avatar'} />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-end">
                <div className="font-bold sm:text-2xl2 text-primary-bold text-base2">+20.000$</div>
                <div className="text-primary-bold sm:text-xl text-base2">OW finance office</div>
              </div>
              <img className="w-10 h-10 rounded-full sm:w-12 sm:h-12" src={'/dots-menu.svg'} alt={'avatar'} />
            </div>
          </div>
          <hr className="text-primary-bold w-100" />
        </div>
      </div>
    </div>
  );
}
