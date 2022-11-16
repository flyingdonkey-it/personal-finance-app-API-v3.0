import axios from "axios";
import { UserTransactionsReducerActions } from "../reducers/userTransactionsReducer";

export function fetchUserTransactions(userId, accountId) {
  return async function (dispatch) {
    dispatch(userTransactionsLoading());
    const transactionsData = await RequestUserTransactions(userId, accountId);
    dispatch({
      type: UserTransactionsReducerActions.UserTransactionsLoaded,
      payload: transactionsData
    })
  }
}

export function userTransactionsLoading() {
  return {
    type: UserTransactionsReducerActions.UserTransactionsLoading
  }
}

async function RequestUserTransactions(userId, accountId) {
  //Used regular variables below as setState is asynchronous and did not work well in this scenario
  //this works perfectly in this scenario as dispatch() already triggers a re-render.

  //Payments percentage values of categories for pie chart
  let expenseData = [];
  //Monthly income values for bar chart
  let incomeData = [];
  //Sum of monthly average expenses
  let expenseMonthlyAvgData = 0;
  //Sum of monthly average incomes
  let incomeMonthlyAvgData = 0;
  //Monthly sum of payments in categories
  let expenseMonthlyData = [];
  //All payments by categories
  let paymentsData = [];
  //Expense values grouped by day
  let expensesByDate = [];
  //Income values grouped by day
  let incomesByDate = [];
  //If refresh connection returns error
  let refreshConnectionError = false;
  let dateGroupedTransactions = [];
  let currentAccount = {};

  const colorPallette = [
    "#4A56E2", "#4761DD", "#436BD7", "#4076D2", "#3C81CD", "#398CC7", "#3596C2", "#32A1BC", "#2EACB7", "#2BB7B2", "#27C1AC", "#24CCA7"
  ];

  //Grouping change history values as amount or object by month 
  function groupChangeHistoryByMonth(changeHistory, absoluteValue) {
    return Object.entries(changeHistory.reduce(function (r, a) {
      if (a.date) {
        r[a.date] = r[a.date] || [];
        r[a.date].push(absoluteValue ? Math.abs(a.amount) : { amount: a.amount, description: a.description });
        return r;
      }
    }, Object.create(null)));
  }

  //Grouping change history values as object by day 
  function groupChangeHistoryByDay(changeHistory) {
    return Object.entries(changeHistory.reduce(function (r, a) {
      if (a.date) {
        r[a.date.slice(0, 10)] = r[a.date.slice(0, 10)] || [];
        r[a.date.slice(0, 10)].push({ amount: a.amount, description: a.source });
        return r;
      }
    }, Object.create(null)));
  }

  //Grouping, ordering and getting sum of payments change histories by day
  function prepareExpenseMonthly(paymentsChangeHistory) {
    const groupedByMonthExpenses = groupChangeHistoryByMonth(paymentsChangeHistory, true);

    const orderedExpenseTotalByMonth = groupedByMonthExpenses.map(x => {
      return {
        key: x[0],
        value: x[1].reduce((sum, p) => { return sum + parseInt(p); }, 0).toString(),
        normalizedValue: x[1].reduce((sum, p) => { return sum + parseInt(p); }, 0) * 2.5
      }
    }).sort((a, b) => (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0)).slice(0, 12);

    return orderedExpenseTotalByMonth.map(x => { return { ...x, key: new Date(x.key + "-01").toLocaleString('en-us', { month: 'short' }) } });
  }

  //Grouping and ordering expense change histories by day
  function prepareExpenseByDate(expenseChangeHistory) {
    const groupedChangeHistory = groupChangeHistoryByMonth(expenseChangeHistory);

    groupedChangeHistory.forEach(x => x[0] = x[0] + "-01");
    groupedChangeHistory.sort((a, b) => (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0));

    return groupedChangeHistory;
  }

  //Before creating income & expense summary, creating or refreshing the relevant connections is required
  await axios
    .post(`/api/refresh-connection?userId=${userId}`)
    .then(async function (refreshResponse) {
      if (refreshResponse.status === 200) {

        await axios
          .get(`/api/transactions`, { params: { userId, limit: 20 } })
          .then(async function (response) {
            //Group all transactions by postDate
            dateGroupedTransactions = response.data.reduce(function (r, a) {
              if (a.postDate) {
                r[a.postDate.slice(0, 10)] = r[a.postDate.slice(0, 10)] || [];
                r[a.postDate.slice(0, 10)].push(a);
                return r;
              }
            }, Object.create(null));

            dateGroupedTransactions = Object.entries(dateGroupedTransactions);

            await axios.get(`/api/get-account`, { params: { userId, accountId: accountId } })
              .then(function (response) {
                currentAccount = response.data;
              }).catch(function (error) {
                console.warn(error);
                currentAccount = {};
              });

            if (!response.data?.length) return;

            //Creating expense summary between 2020-01 - 2021-01
            await axios
              .post(`/api/create-expense?userId=${userId}`, { fromMonth: '2020-01', toMonth: '2021-01' })
              .then(function (response) {
                const data = response.data;
                const paymentsTotal = data.payments.reduce((sum, p) => {
                  return sum + parseInt(p.avgMonthly);
                }, 0);

                expenseMonthlyAvgData =
                  parseInt(data.bankFees?.avgMonthly || "0") +
                  parseInt(data.cashWithdrawals?.avgMonthly || "0") +
                  parseInt(data.loanInterests?.avgMonthly || "0") +
                  parseInt(data.loanRepayments?.avgMonthly || "0") +
                  paymentsTotal;

                expenseData = data.payments.map((x, i) => {
                  return { name: x.division, value: x.percentageTotal, fill: colorPallette[parseInt(i % 12)] }
                });

                paymentsData = data.payments;

                let paymentsChangeHistory = [];
                data.payments.forEach(x =>
                  x.subCategory[0].changeHistory.forEach(y =>
                    paymentsChangeHistory.push({ date: y.date, amount: y.amount, description: x.division })
                  )
                );
                expenseMonthlyData = prepareExpenseMonthly(paymentsChangeHistory);
                let expenseChangeHistory = [];
                expenseChangeHistory.push(...data.bankFees?.changeHistory.map(x => {
                  return { date: x.date, amount: x.amount, description: 'Bank fee' }
                }));
                expenseChangeHistory.push(...data.cashWithdrawals?.changeHistory.map(x => {
                  return { date: x.date, amount: x.amount, description: 'Cash withdrawal' }
                }));
                expenseChangeHistory.push(...data.loanInterests?.changeHistory.map(x => {
                  return { date: x.date, amount: x.amount, description: 'Loan interest' }
                }));
                expenseChangeHistory.push(...data.loanRepayments?.changeHistory.map(x => {
                  return { date: x.date, amount: x.amount, description: 'Loan repayment' }
                }));
                expenseChangeHistory.push(...paymentsChangeHistory);

                expensesByDate = prepareExpenseByDate(expenseChangeHistory);
              })
              .catch(function (error) {
                console.warn(error);
                expenseMonthlyAvgData = 0;
                expenseData = [];
                expenseMonthlyData = [];
                paymentsData = [];
                refreshConnectionError = true;
              });

            //Creating income summary between 2020-01 - 2021-01
            await axios
              .post(`/api/create-income?userId=${userId}`, { fromMonth: '2020-01', toMonth: '2021-01' })
              .then(function (response) {
                const data = response.data;

                incomeMonthlyAvgData = parseInt(data.summary.regularIncomeAvg) + parseInt(data.summary.irregularIncomeAvg);
                incomeData = data.regular[0].changeHistory.slice(0, 12).map((x) => {
                  return { key: new Date(x.date).toLocaleString('en-us', { month: 'short' }), value: x.amount, normalizedValue: x.amount * 1.25 }
                });
                let incomeChangeHistory = [];
                incomeChangeHistory.push(...data.irregular[0].changeHistory);
                incomeChangeHistory.push(...data.otherCredit[0].changeHistory);
                incomeChangeHistory.push(...data.regular[0].changeHistory);

                incomesByDate = groupChangeHistoryByDay(incomeChangeHistory);
              })
              .catch(function (error) {
                console.warn(error);
                incomeMonthlyAvgData = 0;
                incomeData = [];
                refreshConnectionError = true;
              });


          })
          .catch(function (error) {
            console.warn(error);
            dateGroupedTransactions = [];
            incomeData = [];
            paymentsData = [];
            refreshConnectionError = true;
          });
      }
    })
    .catch(function (error) {
      console.warn(error);
      refreshConnectionError = true;
    });

  return {
    expenseData,
    incomeData,
    expenseMonthlyAvgData,
    incomeMonthlyAvgData,
    expenseMonthlyData,
    paymentsData,
    expensesByDate,
    incomesByDate,
    refreshConnectionError,
    dateGroupedTransactions,
    currentAccount,
    isCompleted: !refreshConnectionError
  };
}