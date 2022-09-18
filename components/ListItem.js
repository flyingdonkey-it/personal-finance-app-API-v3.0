export function ListItem({ item, imagePrefix, randomDivider }) {
  return (
    <div className="p-2 mb-2 sm:bg-[#F5F7F8] bg-list-item-color sm:p-4 rounded-[20px]">
      <div className="flex justify-between">
        <div className="flex">
          <div>
            <img className="w-9 h-9" src={`/${imagePrefix}-${parseInt(Math.random() * 100 % randomDivider)}.svg`} alt={imagePrefix} />
          </div>
          <div className="ml-2 text-sm2 sm:text-sm3">
            <div className="font-medium">
              {item.description}
            </div>
            <div className="text-xs font-normal sm:text-sm2">
              {item.dateDescription}
            </div>
          </div>
        </div>
        <div className="self-center font-semibold text-blue">
          {item.amount} $
        </div>
      </div>
    </div>
  );
}
