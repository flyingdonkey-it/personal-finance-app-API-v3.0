
const parts = [
  { src: '/slider/Rectangle%20173.svg', name: 'JAN' },
  { src: '/slider/Rectangle%20172.svg', name: 'FEB' },
  { src: '/slider/Rectangle%20171.svg', name: 'MAR' },
  { src: '/slider/Rectangle%20170.svg', name: 'APR' },
  { src: '/slider/Rectangle%20169.svg', name: 'MAY' },
  { src: '/slider/Rectangle%20166.svg', name: 'JUN' },
  { src: '/slider/Rectangle%20164.svg', name: 'JUL' },
  { src: '/slider/Rectangle%20165.svg', name: 'AUG' },
  { src: '/slider/Rectangle%20166.svg', name: 'SEP' },
  { src: '/slider/Rectangle%20168.svg', name: 'OCT' },
  { src: '/slider/Rectangle%20167.svg', name: 'NOV' },
  { src: '/slider/Rectangle%20167.svg', name: 'DEC' },
];

export function MonthlySpending() {

  return (
    <div className="border-2 shadow-md h-44 sm:h-64 bg-[#fbfbfb] rounded-2xl border-[#e0eaff] sm:bg-[#F5F7F8]">
      <div className="mt-2 ml-3 mr-10 sm:ml-8 sm:mb-5 sm:mt-5">
        <div className="flex items-center">
          <div className="ml-2">
            <p className="text-sm font-bold sm:text-2xl2 text-blue">Monthly spendings</p>
          </div>
        </div>
        <div className="flex flex-col m-3 sm:m-6">
          <div className="sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:bg-[#FEFEFE]">
            <div className="flex flex-col items-center w-full sm:mt-3 sm:mb-3">
              <div className="flex w-full mb-4 text-xs font-medium sm:ml-4 align-left text-blue">
                This year
              </div>
              <div className="flex items-end ml-8 sm:ml-0">
                {parts.map((item) => (
                  <div className="flex flex-col items-center mr-0.5" key={item.name}>
                    <div>
                      <img src={item.src} alt="Rectangle" />
                    </div>
                    <div className="font-bold text-xs2 sm:text-xs mr-0.5 sm:mr-1 text-blue">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}