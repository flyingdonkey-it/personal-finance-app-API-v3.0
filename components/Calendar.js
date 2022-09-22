import React from 'react';
import { DatePicker } from 'antd';

export function Calendar({ data, open }) {
  function sumAmount(date, isPositive) {
    return data.map(item => {
      if (date === item[0]) {
        const initalValue = 0;
        const sum = item[1].reduce(
          (previousValue, currentValue) => 
            (isPositive
                ? previousValue + (Number(currentValue.amount) > 0 ? Number(currentValue.amount) : 0)
                : previousValue + (Number(currentValue.amount) < 0 ? Number(currentValue.amount) : 0)),
          initalValue
        );
        return sum.toFixed(0)
      }
    });
  }

  return (
    <DatePicker
      open={open}
      className="w-0 custom-picker box-content"
      inputRender={null}
      inputReadOnly={true}
      showToday={false}
      bordered={false}
      showNow={false}
      input={null}
      clearIcon={false}
      suffixIcon={null}
      superNextIcon={false}
      superPrevIcon={false}
      placeholder={false}
      format="YYYY-MM-DD"
      dateRender={current => {
        const date = current.toISOString().split('T')[0];
        return data.find(element => element[0] === date) ? (
          <div className="rounded-lg ant-picker-cell ant-picker-cell-in-view ant-picker-cell-inner w-[2.1rem]" onClick={() => console.log(current.date())}>
            <div className="h-4 text-xs selected-date">
              {current.date()}
            </div>
            <div className="h-4 selected-amount text-[9px] text-blue">
              {sumAmount(date, true)}$
            </div>
            <div className="h-4 selected-amount text-[9px] text-[#8CA6DE]">
              {sumAmount(date, false)}$
            </div>
          </div>
        ) : (
          <div className="rounded-lg ant-picker-cell-inner ant-picker-cell-in-view selected-date text-blue w-[2.1rem] h-[3.3rem]" onClick={() => console.log(current.date())} >
            {current.date()}
          </div>
        );
      }}
    />
  );
}