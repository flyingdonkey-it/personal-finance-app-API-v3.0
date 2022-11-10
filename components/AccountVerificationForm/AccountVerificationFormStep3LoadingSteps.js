import { useEffect,useState,useCallback } from 'react';
import axios from 'axios';
import { useTernaryState } from '../../utils/useTernaryState';
import { Button } from '../Button';
import { CircularProgressBar } from '../CircularProgressBar';
import { useAccountVerificationForm } from './AccountVerificationFormProvider';
import { AccountVerificationFormResumeInBackgroundModal } from './AccountVerificationFormResumeInBackgroundModal';

export function AccountVerificationFormStep3LoadingSteps() {

  const [isResumeModalOpen, openResumeModal, closeResumeModal] = useTernaryState(false);

  const { basiqConnection, finish} = useAccountVerificationForm();
  const { error, progress, completed, stepNameInProgress, reset, setJobId } = basiqConnection;

  useEffect(() => {
    const newJobId = new URLSearchParams(window.location.search).get("jobId");
    setJobId(newJobId);
  }, [])

  const { data } = useAccountsData({
    userId: sessionStorage.getItem("userId"),
  });

  const errorOrNoData = error || !data || data.length === 0;
  
  async function submit () {
    if(!errorOrNoData){
      finish()
    }
  }
  return (
    <div className="flex flex-col space-y-10 sm:space-y-12">
      <div className="flex flex-col items-center text-center space-y-8">
        <CircularProgressBar value={progress} error={error && errorOrNoData} />
        {error ? (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{error?.name}</h2>
              <p className="text-sm sm:text-base text-neutral-muted-darker">{error?.message}</p>
            </div>
            <Button block onClick={reset}>
              Try again
            </Button>
          </div>
        ) : (completed && !errorOrNoData) ? (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Connected 🎉</h3>
            </div>
            <Button block onClick={submit}>
              Continue
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{STEP_NAME_MAP[stepNameInProgress]}</h2>
            </div>
            <Button block variant="subtle" onClick={openResumeModal}>
              Resume in background
            </Button>
          </div>
        )}
      </div>
      <AccountVerificationFormResumeInBackgroundModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
    </div>
  );
}
function useAccountsData({ userId }) {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();
  
  const { updateAccountVerificationFormState } = useAccountVerificationForm();

  const fetchAccounts = useCallback(() => {
    axios
      .get('/api/accounts', { params: { userId } })
      .then(res => {
        res.data.map((i)=>{
          if(!i.disabled){
            updateAccountVerificationFormState({i})
            sessionStorage.setItem("currentAccountId", i.id);
          }
        })
        setData(res.data);
        setError(undefined);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchAccounts();
  }, [fetchAccounts]);

  return { data, loading, error, refetch };
}
const STEP_NAME_MAP = {
  'verify-credentials': 'Verifying credentials...',
  'retrieve-accounts': 'Retrieving accounts...',
};