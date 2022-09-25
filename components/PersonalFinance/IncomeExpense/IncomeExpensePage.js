import { useToggleState } from '../../../utils/useToggleState';
import { Calendar } from '../../Calendar';

export function IncomeExpensePage() {
  const [showCalendar, setShowCalendar] = useToggleState(false);

  return (
    <>
      <div className="flex justify-between ml-6 mr-6 sm:mt-12 sm:ml-52 sm:mr-80">
        <div className="flex">
          <div className="hidden mr-4 sm:block">
            <img className="w-6 h-6" src="/upload.svg" alt="Upload" />
          </div>
          <div className="font-semibold text-blue text-2xl2">
            Income and Expenses
          </div>
        </div>
        <div className="flex items-center justify-center pr-4" >
          <div className="h-14">
            <img className="w-7 h-7" src="/calendar.svg" alt="Calendar" onClick={setShowCalendar} />
            {showCalendar &&
              <Calendar data={[]} open={showCalendar} />}
          </div>
        </div>
      </div>
    </>
  );
}