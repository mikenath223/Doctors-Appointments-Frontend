import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { Availability, AvailableTimes } from "../../domain/user";

interface BasicDateCalendarProp {
  setAvailability: (value: Array<AvailableTimes>) => void;
  availability?: Array<Availability>;
  setSelectedDate: (value: string) => void;
}

const BasicDateCalendar: React.FC<BasicDateCalendarProp> = ({
  availability,
  setAvailability,
  setSelectedDate,
}) => {
  const availableDates = new Set(
    availability?.map((item) => dayjs(item.date).format("YYYY-MM-DD"))
  );

  const shouldDisableDate = (date: Dayjs) => {
    return !availableDates.has(date.format("YYYY-MM-DD"));
  };

  const handleChangeDate = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      const selectedAvailability = availability?.find(
        (item) => dayjs(item.date).format("YYYY-MM-DD") === formattedDate
      );

      setSelectedDate(formattedDate);
      setAvailability(selectedAvailability?.availableTimes ?? []);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        shouldDisableDate={shouldDisableDate}
        onChange={handleChangeDate}
      />
    </LocalizationProvider>
  );
};

export default BasicDateCalendar;
