import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import size from "react-element-popper/animations/size";
import persian_fa from "react-date-object/locales/persian_fa";

function DatePickers({ adInfo, setAdInfo }) {
  const dateHandler = (e) => {
    setAdInfo({ ...adInfo, constractionDate: new Date(e) });
  };
  return (
    <div className="flex items-center gap-3">
      <h2>تاریخ ساخت : </h2>
      <DatePicker
        animations={[size()]}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={adInfo.constractionDate}
        onChange={(e) => dateHandler(e)}
      />
    </div>
  );
}

export default DatePickers;
