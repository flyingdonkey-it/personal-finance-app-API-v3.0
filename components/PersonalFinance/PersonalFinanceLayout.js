import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu } from './Menu';
import { HomeCharts } from './Chart/HomeCharts';
import { IncomeExpenseCharts } from './Chart/IncomeExpenseCharts';
import { PersonalFinanceFooter } from "./PersonalFinanceFooter";
import { PersonalFinanceHeader } from './PersonalFinanceHeader';
import { ProfileLayout } from './ProfileLayout';
import { TransactionPage } from './Transaction';
import { HomeSlider, Expenditures } from './Slider';
import { AccountPage } from './Account'
import { IncomeExpensePage } from './IncomeExpense';

const homePageIndex = 1;
const accountPageIndex = 2;
const incomeExpensePageIndex = 3;
const transactionPageIndex = 4;


export function PersonalFinanceLayout() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);
  const [selectedMenuTitle, setSelectedMenuTitle] = useState("Home");
  const [hideHomePageItems, setHideHomePageItems] = useState(false);
  const [hideTransactionPageItems, setHideTransactionPageItems] = useState(false);
  const [hideIncomeExpensePageItems, setHideIncomeExpensePageItems] = useState(false);
 
  let { dateGroupedTransactions, expenseData, incomeData, expenseMonthlyAvgData, currentAccount,
    incomeMonthlyAvgData, expenseMonthlyData, paymentsData, expensesByDate, incomesByDate } = useSelector(state => state.userTransactions);

  //Manage main and profile menus on desktop
  function manageMenus(isMainMenu) {
    if (isMainMenu) {
      setProfileMenuOpen(false);
      setMainMenuOpen(!mainMenuOpen);
      return;
    }
    
    setMainMenuOpen(false);
    setProfileMenuOpen(!profileMenuOpen);
  }
  
  //When any page item is clicked to show
  function managePages(selectedPageIndex, selectedMenuTitle) {
    setSelectedMenuTitle(selectedMenuTitle);
    setMainMenuOpen(false);
    setSelectedPageIndex(selectedPageIndex);
    manageDetailPages(false, false, false);
  }
  
  //Hide or show detail pages depending on context
  function manageDetailPages(hideHomePageItems, hideTransactionPageItems, hideIncomeExpensePageItems) {
    setHideHomePageItems(hideHomePageItems);
    setHideTransactionPageItems(hideTransactionPageItems);
    setHideIncomeExpensePageItems(hideIncomeExpensePageItems);
  }

  return (
    <>
      <div className="flex flex-col">
        {/* HEADER */}
        <div>
          <PersonalFinanceHeader isMenuOpen={mainMenuOpen} showProfileLine={selectedPageIndex && selectedPageIndex === 1} menuIconClick={() => manageMenus(true)} profileMenuOpenClick={() => manageMenus(false)}
            selectedPageIndex={selectedPageIndex}></PersonalFinanceHeader>
        </div>
        {/* MOBILE VIEW */}
        <div className={`${selectedPageIndex && selectedPageIndex === homePageIndex ? "mt-36 mb-24" : ""} ${selectedPageIndex && selectedPageIndex === incomeExpensePageIndex ? "mt-20 mb-24" : ""} sm:hidden h-full`}>
          {/* HOME PAGE */}
          {selectedPageIndex &&
            selectedPageIndex === homePageIndex &&
            <div className="flex flex-col">
              {!hideHomePageItems &&
                <>
                  <HomeSlider incomeMonthlyAvg={incomeMonthlyAvgData} expenseMonthlyAvg={expenseMonthlyAvgData} expenseMonthly={expenseMonthlyData} expenseLoading={false} chartWidth={"100%"} chartAspect={3} />
                  <HomeCharts expenseData={expenseData} incomeData={incomeData} expenseLoading={false} incomeLoading={false} chartWidth={"100%"} chartAspect={1.25} />
                </>
              }
              <TransactionPage currentAccount={currentAccount} dateGroupedTransactions={dateGroupedTransactions?.slice(0,10)} limit={10} inTransactionsPage={false} managePages={managePages} manageDetailPages={manageDetailPages} />
            </div>
          }
          {/* ACCOUNT PAGE */}
          {selectedPageIndex &&
            selectedPageIndex === accountPageIndex &&
            <>
              <AccountPage />
            </>
          }
          {/* INCOME & EXPENSE PAGE */}
          {selectedPageIndex &&
            selectedPageIndex === incomeExpensePageIndex &&
            <div className="flex flex-col">
              {
                !hideIncomeExpensePageItems &&
                <IncomeExpensePage incomeLoading={false} expenseLoading={false} incomesByDate={incomesByDate}
                  expensesByDate={expensesByDate} manageDetailPages={manageDetailPages} />
              }
              {
                !hideHomePageItems &&
                <>
                  <IncomeExpenseCharts expenseData={expenseData} incomeData={incomeData} incomeMonthlyAvg={incomeMonthlyAvgData}
                    expenseMonthlyAvg={expenseMonthlyAvgData} expenseMonthly={expenseMonthlyData} expenseLoading={false}
                    incomeLoading={false} chartWidth={"100%"} />
                  <Expenditures payments={paymentsData} expenseLoading={false} />
                </>
              }
              {
                !hideTransactionPageItems &&
                <TransactionPage currentAccount={currentAccount} dateGroupedTransactions={dateGroupedTransactions?.slice(0,10)} limit={10} inTransactionsPage={false} managePages={managePages} manageDetailPages={manageDetailPages} />
              }
            </div>
          }
          {/* TRANSACTION PAGE */}
          {selectedPageIndex &&
            selectedPageIndex === transactionPageIndex &&
            <div className="mt-20 mb-20">
              <TransactionPage currentAccount={currentAccount} dateGroupedTransactions={dateGroupedTransactions?.slice(0,20)} limit={20} inTransactionsPage={true} />
            </div>
          }
        </div>
        {/* MAIN MENU */}
        <Menu desktopMainMenuItems={DESKTOP_MENU_ITEMS} mobileMainMenuItems={MOBILE_MENU_ITEMS} open={mainMenuOpen} setMenuOpen={() => manageMenus(true)}
          onMenuItemClick={managePages} selectedMenuTitle={selectedMenuTitle}></Menu>
        {/* PROFILE MENU */}
        <div className="hidden sm:block">
          <ProfileLayout open={profileMenuOpen} setMenuOpen={() => manageMenus(false)}></ProfileLayout>
        </div>
        {/* DESKTOP VIEW */}
        <div className="z-0 flex-col hidden w-full mb-12 overflow-y-scroll bg-menu mt-[9.5rem] sm:flex min-h-[60rem] max-h-[60rem]">
          <div className="hidden sm:block">
            {/* HOME PAGE */}
            {selectedPageIndex &&
              selectedPageIndex === homePageIndex &&
              <>
                {!hideHomePageItems &&
                  <div className="flex flex-col">
                    <div className="flex mt-8 ml-52">
                      <div className="mr-4">
                        <img className="w-7 h-7" src="/wallet.svg" alt="Wallet" />
                      </div>
                      <span className="font-bold text-2xl2 text-blue">Your finances at a glance</span>
                    </div>
                    <div className="flex w-full mt-6">
                      <HomeSlider incomeMonthlyAvg={incomeMonthlyAvgData} expenseMonthlyAvg={expenseMonthlyAvgData} expenseMonthly={expenseMonthlyData} expenseLoading={false} chartWidth={"100%"} chartAspect={3} />
                      <HomeCharts expenseData={expenseData} incomeData={incomeData} expenseLoading={false} incomeLoading={false} chartWidth={"65%"} chartAspect={1.5} />
                    </div>
                  </div>
                }
                <TransactionPage currentAccount={currentAccount} dateGroupedTransactions={dateGroupedTransactions?.slice(0,10)} limit={10} inTransactionsPage={false} managePages={managePages} manageDetailPages={manageDetailPages} />
              </>
            }
            {/* ACCOUNT PAGE */}
            {selectedPageIndex &&
              selectedPageIndex === accountPageIndex &&
              <>
                <AccountPage />
              </>
            }
            {/* INCOME & EXPENSE PAGE */}
            {selectedPageIndex &&
              selectedPageIndex === incomeExpensePageIndex &&
              <>
                {
                  !hideIncomeExpensePageItems &&
                  <IncomeExpensePage incomeLoading={false} expenseLoading={false} incomesByDate={incomesByDate}
                    expensesByDate={expensesByDate} manageDetailPages={manageDetailPages} />}
                {
                  !hideHomePageItems &&
                  <>
                    <div className="flex">
                      <IncomeExpenseCharts expenseData={expenseData} incomeData={incomeData} incomeMonthlyAvg={incomeMonthlyAvgData}
                        expenseMonthlyAvg={expenseMonthlyAvgData} expenseMonthly={expenseMonthlyData} expenseLoading={false}
                        incomeLoading={false} chartWidth={"75%"} />
                      <Expenditures payments={paymentsData} expenseLoading={false} />
                    </div>
                  </>
                }
                {
                  !hideTransactionPageItems &&
                  <div className="mt-12">
                    <TransactionPage currentAccount={currentAccount} dateGroupedTransactions={dateGroupedTransactions?.slice(0,10)} limit={10} inTransactionsPage={false} managePages={managePages} manageDetailPages={manageDetailPages} />
                  </div>
                }
              </>
            }
            {/* TRANSACTION PAGE */}
            {selectedPageIndex &&
              selectedPageIndex === transactionPageIndex &&
              <>
                <TransactionPage currentAccount={currentAccount} dateGroupedTransactions={dateGroupedTransactions?.slice(0,20)} limit={20} inTransactionsPage={true} />
              </>
            }
          </div>
        </div>
        {/* FOOTER */}
        <PersonalFinanceFooter menuItems={DESKTOP_FOOTER_MENU_ITEMS} middleMenuItems={DESKTOP_FOOTER_MIDDLE_MENU_ITEMS} onMenuItemClick={managePages} />
      </div>
    </>
  );
}

export const MOBILE_MENU_ITEMS = [
  { pageIndex: homePageIndex, title: "Home", image: "/home.svg", selectedImage: "/home-white.svg" },
  { pageIndex: accountPageIndex, title: "Work", image: "/work.svg", selectedImage: "/work-white.svg" },
  { pageIndex: incomeExpensePageIndex, title: "Chart", image: "/chart.svg", selectedImage: "/chart-white.svg" },
  { pageIndex: transactionPageIndex, title: 'Upload', image: "/upload.svg", selectedImage: "/upload-white.svg" }
];

export const DESKTOP_MENU_ITEMS = [
  { pageIndex: homePageIndex, title: "Home", image: "/home.svg" },
  { pageIndex: accountPageIndex, title: "My Accounts", image: "/wallet.svg" },
  { pageIndex: incomeExpensePageIndex, title: "Income vs Expenses", image: "/activity.svg" },
  { pageIndex: transactionPageIndex, title: 'Transactions', image: "/swap.svg" }
];

export const DESKTOP_FOOTER_MENU_ITEMS = [
  { pageIndex: homePageIndex, title: "Home", image: "/home-white.svg" },
  { pageIndex: accountPageIndex, title: "My Accounts", image: "/wallet-white.svg" },
  { pageIndex: incomeExpensePageIndex, title: "Income vs Expenses", image: "/activity-white.svg" },
  { pageIndex: transactionPageIndex, title: "Transactions", image: "/swap-white.svg" }
];

export const DESKTOP_FOOTER_MIDDLE_MENU_ITEMS = [
  { title: "Profile settings", image: "/settings-white.svg" },
  { title: "Add account", image: "/plus-white.svg" }
];