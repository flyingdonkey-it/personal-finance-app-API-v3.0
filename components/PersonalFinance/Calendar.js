import React from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

export function Calendar({ data, open }) {

  const sumPozitiveAmount =(date) => {
    return data.map(item => {
      if (date === item[0]) {
        const initalValue = 0;
         const sum = item[1].reduce(
          (previousValue, currentValue) => previousValue + (Number(currentValue.amount) > 0 ? Number(currentValue.amount) : 0) ,
          initalValue
        );
        return sum.toFixed(0)
      }
    });
  }
  const sumNegativeAmount =(date) => {
    return data.map(item => {
      if (date === item[0]) {
        const initalValue = 0;
         const sum = item[1].reduce(
          (previousValue, currentValue) => previousValue + (Number(currentValue.amount) < 0 ? Number(currentValue.amount) : 0) ,
          initalValue
        );
        return sum.toFixed(0)
      }
    });
  }
  return (
    <DatePicker
      open={open} 
      className="custom-picker w-0 box-content"
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
            <div className="rounded-lg ant-picker-cell ant-picker-cell-in-view ant-picker-cell-inner w-[2.1rem] " onClick={() => console.log(current.date())}>
              <div className='selected-date h-4 text-xs'>
                {current.date()}
                </div>
                <div className='selected-amount h-4 text-[9px] text-[#4A56E2]'>
                  {sumPozitiveAmount(date)}$ 
                </div>
                <div className='selected-amount h-4 text-[9px] text-[#8CA6DE]'> 
                  {sumNegativeAmount(date)}$
                </div>
              </div> 
        ) : (
          <div className="ant-picker-cell-inner ant-picker-cell-in-view ant-picker-cell-inner selected-date text-[#4A56E2] w-[2.1rem] h-[3.3rem] rounded-lg" onClick={() => console.log(current.date())} >
            {current.date()}
          </div>
        );
      }}
    />
  );
}