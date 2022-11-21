import axios from "axios";
import { UserTransactionsReducerActions } from "../reducers/userTransactionsReducer";

export function fetchUserTransactions(userId, accountId) {
  return async function (dispatch) {
    dispatch(userTransactionsLoading());
    const transactionsData = await RequestUserTransactions(userId, accountId);
    dispatch(userTransactionsLoaded(transactionsData));
  }
}

export function userTransactionsLoaded(payload) {
  return {
    type: UserTransactionsReducerActions.UserTransactionsLoaded,
    payload: payload
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

  //If refresh connection returns error
  let refreshConnectionError = false;
  let dateGroupedTransactions = [];
  let currentAccount = {};

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
          })
          .catch(function (error) {
            console.warn(error);
            dateGroupedTransactions = [];
            refreshConnectionError = true;
          });
      }
    })
    .catch(function (error) {
      console.warn(error);
      refreshConnectionError = true;
    });

  return {
    refreshConnectionError,
    dateGroupedTransactions,
    currentAccount,
    isCompleted: !refreshConnectionError
  };
}