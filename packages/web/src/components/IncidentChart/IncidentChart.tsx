import moment from "moment";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Incident } from "worksafe-client/dist/services/incident";
import { ElementContainer } from "../ElementContainer/ElementContainer";

export const IncidentChart = ({ incidents }: { incidents: Incident[] }) => {
  const chartData = useMemo(() => {
    const LAST_DAYS = 7;
    let dateArr = Array.from({ length: LAST_DAYS });

    dateArr = dateArr.map((_, index) => {
      const date = moment().subtract(index, "days");
      const noIncidents = incidents.filter((incident) => {
        const createdAt = moment(incident.createdAt);
        const isSame = createdAt.isSame(date, "date");
        return isSame;
      }).length;
      return {
        date: date.format("MM-DD"),
        incident: noIncidents,
      };
    });
    return dateArr;
  }, [incidents]);

  return (
    <ElementContainer>
      <h1 className="mb-8 text-2xl font-bold">Last 7 Days Incidents</h1>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="date" reversed={true} />
            <YAxis allowDecimals={false} />
            <Line dataKey="incident" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ElementContainer>
  );
};
