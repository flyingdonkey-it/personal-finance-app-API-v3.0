import { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu } from '../Menu';
import { HomeChart } from './Chart/HomeChart';
import { IncomeExpenseChart } from './Chart/IncomeExpenseChart';
import { PersonalFinanceFooter } from "./PersonalFinanceFooter";
import { PersonalFinanceHeader } from './PersonalFinanceHeader';
import { ProfileLayout } from './ProfileLayout';
import { TransactionPage } from './Transaction';
import { HomeSlider, Expenditures } from './Slider';
import { AccountPage } from './Account'
import { IncomeExpensePage } from './IncomeExpense';

const colorPallette = [
  "#4A56E2", "#4761DD", "#436BD7", "#4076D2", "#3C81CD", "#398CC7", "#3596C2", "#32A1BC", "#2EACB7", "#2BB7B2", "#27C1AC", "#24CCA7"
];

export function PersonalFinanceLayout() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);
  const [selectedMenuTitle, setSelectedMenuTitle] = useState("Home");
  const [hideHomePageItems, setHideHomePageItems] = useState(false);
  const [hideIncomeExpensePageItems, setHideIncomeExpensePageItems] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseMonthlyAvgData, setExpenseMonthlyAvgData] = useState(0);
  const [incomeMonthlyAvgData, setIncomeMonthlyAvgData] = useState(0);
  const [expenseMonthlyData, setExpenseMonthlyData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);
  const [refreshConnectionError, setRefreshConnectionError] = useState(false);
  const [expenseLoading, setExpenseLoading] = useState(true);
  const [incomeLoading, setIncomeLoading] = useState(true);

  function setIncomeExpenseData() {
    const userId = sessionStorage.getItem("userId");
    axios
      .post(`/api/refresh-connection?userId=${userId}`)
      .then(function (refreshResponse) {
        if (refreshResponse.status === 200) {
          axios
            .post(`/api/create-expense?userId=${userId}`, { fromMonth: '2020-01', toMonth: '2021-01' })
            .then(function (response) {
              const data = response.data;
              const paymentsTotal = data.payments.reduce((sum, p) => {
                return sum + parseInt(p.avgMonthly);
              }, 0);

              setExpenseMonthlyAvgData(
                parseInt(data?.bankFees?.avgMonthly || "0") +
                parseInt(data?.cashWithdrawals?.avgMonthly || "0") +
                parseInt(data?.loanInterests?.avgMonthly || "0") +
                parseInt(data?.loanRepayments?.avgMonthly || "0") +
                paymentsTotal);
              setExpenseData(data.payments.map((x, i) => {
                return { name: x.division, value: x.percentageTotal, fill: colorPallette[parseInt(i % 12)] }
              }));
              setExpenseMonthlyData(prepareExpenseMonthlyData(data.payments));
              setPaymentsData(data.payments);
              setExpenseLoading(false);
            })
            .catch(function (error) {
              console.warn(error);
              setExpenseMonthlyAvgData(0);
              setExpenseData([]);
              setExpenseMonthlyData([]);
              setPaymentsData([]);
              setExpenseLoading(false);
            });

          axios
            .post(`/api/create-income?userId=${userId}`, { fromMonth: '2020-01', toMonth: '2021-01' })
            .then(function (response) {
              const data = response.data;

              setIncomeMonthlyAvgData(parseInt(data.summary.regularIncomeAvg) + parseInt(data.summary.irregularIncomeAvg));
              setIncomeData(data.regular[0].changeHistory.slice(0, 12).map((x) => {
                return { key: new Date(x.date).toLocaleString('en-us', { month: 'short' }), value: x.amount, normalizedValue: x.amount * 1.25 }
              }));
              setIncomeLoading(false);
            })
            .catch(function (error) {
              console.warn(error);
              setIncomeMonthlyAvgData(0);
              setIncomeData([]);
              setIncomeLoading(false);
            });
        }
      })
      .catch(function (error) {
        console.warn(error);
        setRefreshConnectionError(true);
        setExpenseLoading(false);
        setIncomeLoading(false);
      });
  }

  function prepareExpenseMonthlyData(payments) {
    const flatExpenseChangeHistory = [].concat.apply([], payments.map(x => x.subCategory[0].changeHistory));

    const groupedByMonthExpenses = Object.entries(flatExpenseChangeHistory.reduce(function (r, a) {
      if (a.date) {
        r[a.date] = r[a.date] || [];
        r[a.date].push(Math.abs(a.amount));
        return r;
      }
    }, Object.create(null)));

    const orderedExpenseTotalByMonth = groupedByMonthExpenses.map(x => {
      return {
        key: x[0],
        value: x[1].reduce((sum, p) => { return sum + parseInt(p); }, 0).toString(),
        normalizedValue: x[1].reduce((sum, p) => { return sum + parseInt(p); }, 0) * 2.5
      }
    }).sort((a, b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0)).slice(0, 12);

    return orderedExpenseTotalByMonth.map(x => { return { ...x, key: new Date(x.key + "-01").toLocaleString('en-us', { month: 'short' }) } });
  }

  function manageMenus(isMainMenu) {
    if (isMainMenu) {
      setProfileMenuOpen(false);
      setMainMenuOpen(!mainMenuOpen);
      return;
    }

    setMainMenuOpen(false);
    setProfileMenuOpen(!profileMenuOpen);
  }

  function managePages(selectedPageIndex, selectedMenuTitle) {
    setSelectedMenuTitle(selectedMenuTitle);
    setMainMenuOpen(false);
    setSelectedPageIndex(selectedPageIndex);
  }

  useEffect(() => {
    if ((expenseData.length === 0 || incomeData.length === 0) && !refreshConnectionError) {
      setIncomeExpenseData();
    }
  }, [expenseData, incomeData]);

  return (
    <>
      <div className="flex flex-col">
        <div>
          <PersonalFinanceHeader isMenuOpen={mainMenuOpen} showProfileLine={selectedPageIndex && selectedPageIndex === 1} menuIconClick={() => manageMenus(true)} profileMenuOpenClick={() => manageMenus(false)}
            selectedPageIndex={selectedPageIndex}></PersonalFinanceHeader>
        </div>
        <div className={`${selectedPageIndex && selectedPageIndex === 1 ? "mt-36 mb-24" : ""} ${selectedPageIndex && selectedPageIndex === 3 ? "mt-20 mb-24" : ""} sm:hidden h-full`}>
          {selectedPageIndex &&
            selectedPageIndex === 1 &&
            <div className="flex flex-col">
              {!hideHomePageItems &&
                <>
                  <HomeSlider incomeMonthlyAvg={incomeMonthlyAvgData} expenseMonthlyAvg={expenseMonthlyAvgData} expenseMonthly={expenseMonthlyData} expenseLoading={expenseLoading} chartWidth={"100%"} chartAspect={3} />
                  <HomeChart expenseData={expenseData} incomeData={incomeData} expenseLoading={expenseLoading} incomeLoading={incomeLoading} chartWidth={"100%"} chartAspect={1.25} />
                </>
              }
              <div className="mt-12">
                <TransactionPage limit={10} inTransactionsPage={false} managePages={managePages} hideHomePageItems={setHideHomePageItems} />
              </div>
            </div>
          }
          {selectedPageIndex &&
            selectedPageIndex === 2 &&
            <>
              <AccountPage />
            </>
          }
          {selectedPageIndex &&
            selectedPageIndex === 3 &&
            <div className="flex flex-col">
              {!hideIncomeExpensePageItems &&
                <>
                  <IncomeExpensePage />
                  <IncomeExpenseChart expenseData={expenseData} incomeData={incomeData} incomeMonthlyAvg={incomeMonthlyAvgData}
                    expenseMonthlyAvg={expenseMonthlyAvgData} expenseMonthly={expenseMonthlyData} expenseLoading={expenseLoading}
                    incomeLoading={incomeLoading} chartWidth={"100%"} />
                  <Expenditures payments={paymentsData} expenseLoading={expenseLoading} />
                </>
              }
              <div className="mt-12">
                <TransactionPage limit={10} inTransactionsPage={false} managePages={managePages} hideHomePageItems={setHideIncomeExpensePageItems} />
              </div>
            </div>
          }
          {selectedPageIndex &&
            selectedPageIndex === 4 &&
            <div className="mt-20 mb-20">
              <TransactionPage limit={20} inTransactionsPage={true} />
            </div>
          }
        </div>
        <Menu desktopMainMenuItems={DESKTOP_MENU_ITEMS} mobileMainMenuItems={MOBILE_MENU_ITEMS} open={mainMenuOpen} setMenuOpen={() => manageMenus(true)}
          onMenuItemClick={managePages} selectedMenuTitle={selectedMenuTitle}></Menu>
        <div className="hidden sm:block">
          <ProfileLayout open={profileMenuOpen} setMenuOpen={() => manageMenus(false)}></ProfileLayout>
        </div>
        <div className="z-0 flex-col hidden w-full mb-12 overflow-y-scroll bg-menu mt-[9.5rem] sm:flex min-h-[60rem] max-h-[60rem]">
          <div className="hidden sm:block">
            {selectedPageIndex &&
              selectedPageIndex === 1 &&
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
                      <HomeSlider incomeMonthlyAvg={incomeMonthlyAvgData} expenseMonthlyAvg={expenseMonthlyAvgData} expenseMonthly={expenseMonthlyData} expenseLoading={expenseLoading} chartWidth={"100%"} chartAspect={3} />
                      <HomeChart expenseData={expenseData} incomeData={incomeData} expenseLoading={expenseLoading} incomeLoading={incomeLoading} chartWidth={"65%"} chartAspect={1.5} />
                    </div>
                  </div>
                }
                <TransactionPage limit={10} inTransactionsPage={false} managePages={managePages} hideHomePageItems={setHideHomePageItems} />
              </>
            }
            {selectedPageIndex &&
              selectedPageIndex === 2 &&
              <>
                <AccountPage />
              </>
            }
            {selectedPageIndex &&
              selectedPageIndex === 3 &&
              <>
                {!hideIncomeExpensePageItems &&
                  <>
                    <IncomeExpensePage />
                    <div className="flex">
                      <IncomeExpenseChart expenseData={expenseData} incomeData={incomeData} incomeMonthlyAvg={incomeMonthlyAvgData}
                        expenseMonthlyAvg={expenseMonthlyAvgData} expenseMonthly={expenseMonthlyData} expenseLoading={expenseLoading}
                        incomeLoading={incomeLoading} chartWidth={"75%"} />
                      <Expenditures payments={paymentsData} expenseLoading={expenseLoading} />
                    </div>
                  </>
                }
                <div className="mt-12">
                  <TransactionPage limit={10} inTransactionsPage={false} managePages={managePages} hideHomePageItems={setHideIncomeExpensePageItems} />
                </div>
              </>
            }
            {selectedPageIndex &&
              selectedPageIndex === 4 &&
              <>
                <TransactionPage limit={20} inTransactionsPage={true} />
              </>
            }
          </div>
        </div>
        <PersonalFinanceFooter menuItems={DESKTOP_FOOTER_MENU_ITEMS} middleMenuItems={DESKTOP_FOOTER_MIDDLE_MENU_ITEMS} onMenuItemClick={managePages}></PersonalFinanceFooter>
      </div>
    </>
  );
}

export const MOBILE_MENU_ITEMS = [
  { pageIndex: 1, title: "Home", image: "/home.svg", selectedImage: "/home-white.svg" },
  { pageIndex: 2, title: "Work", image: "/work.svg", selectedImage: "/work-white.svg" },
  { pageIndex: 3, title: "Chart", image: "/chart.svg", selectedImage: "/chart-white.svg" },
  { pageIndex: 4, title: 'Upload', image: "/upload.svg", selectedImage: "/upload-white.svg" }
];

export const DESKTOP_MENU_ITEMS = [
  { pageIndex: 1, title: "Home", image: "/home.svg" },
  { pageIndex: 2, title: "My Accounts", image: "/wallet.svg" },
  { pageIndex: 3, title: "Income vs Expenses", image: "/activity.svg" },
  { pageIndex: 4, title: 'Transactions', image: "/swap.svg" }
];

export const DESKTOP_FOOTER_MENU_ITEMS = [
  { pageIndex: 1, title: "Home", image: "/home-white.svg" },
  { pageIndex: 2, title: "My Accounts", image: "/wallet-white.svg" },
  { pageIndex: 3, title: "Income vs Expenses", image: "/activity-white.svg" },
  { pageIndex: 4, title: "Transactions", image: "/swap-white.svg" }
];

export const DESKTOP_FOOTER_MIDDLE_MENU_ITEMS = [
  { title: "Profile settings", image: "/settings-white.svg" },
  { title: "Add account", image: "/plus-white.svg" }
];