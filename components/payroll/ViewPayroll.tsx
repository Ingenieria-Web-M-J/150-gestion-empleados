import { TbCalendarTime } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";
import { SetStateAction, useState } from "react";
import { FormPayroll } from "./FormPayroll";
import { ChartPayroll } from "./ChartPayroll";
import { TablePayroll } from "./TablePayroll";
import { MenuButton } from "../MenuButton";
import { COUNT_HOURS_WORKED_BY_MONTH_AND_EMPLOYEE, GET_HOURS_WORKED_BY_MONTH_AND_EMPLOYEE } from "@/hooks/react-query/query/hours-worked";
import { formatDateYearMonth } from "@/utils/formatDate";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES_BY_ID } from "@/hooks/react-query/query/employee";

interface ViewPayrollProps {
    idEmployee?: string | null;
    setIsModalHourOpen: any;
    user: string | null;
}

export const ViewPayroll = ({ idEmployee, setIsModalHourOpen, user }: ViewPayrollProps) => {
    const [selectedOption, setSelectedOption] = useState('reportHours');
    const [idHour, setIdHour] = useState(null);

    const handleOptionClick = (option: SetStateAction<string>) => {
        setSelectedOption(option);
    };
    const { data: hours, loading: loadingHours } = useQuery(GET_HOURS_WORKED_BY_MONTH_AND_EMPLOYEE, {
        variables: { employeeId: idEmployee, yearMonth: formatDateYearMonth(new Date()) }
    });

    const { data: hoursWorked } = useQuery(COUNT_HOURS_WORKED_BY_MONTH_AND_EMPLOYEE, {
        variables: { employeeId: idEmployee, yearMonth: formatDateYearMonth(new Date()) }
    });

    const { data: employee } = useQuery(GET_EMPLOYEES_BY_ID, { variables: { id: idEmployee } });
    const workedHours = hoursWorked?.countHoursWorkedByMonthAndEmployee || 0;
    const salary = employee?.getEmployeesByID[0]?.baseSalary || 0;
    const total = workedHours * salary;
    return (
        <>
            <div className="flex overflow-x-auto whitespace-nowrap w-full">
                <MenuButton
                    icon={GrUserWorker}
                    label="Horas Trabajadas"
                    selected={selectedOption === 'workHour'}
                    onClick={() => handleOptionClick('workHour')}
                />
                <MenuButton
                    icon={TbCalendarTime}
                    label="Reportar Horas"
                    selected={selectedOption === 'reportHours'}
                    onClick={() => handleOptionClick('reportHours')}
                />
                <MenuButton
                    icon={FaChartPie}
                    label="Resumen"
                    selected={selectedOption === 'summary'}
                    onClick={() => handleOptionClick('summary')}
                />
            </div>

            {idEmployee && (
                <div className="mt-4">
                    {selectedOption === 'workHour' && (
                        <TablePayroll idHour={idHour} hours={hours.getHoursWorkedByMonthAndEmployee} setIsModalDeleteOpen={setIsModalHourOpen} setRowId={setIdHour} />
                    )}
                    {selectedOption === 'reportHours' && (
                        <FormPayroll idEmployee={idEmployee} user={user} />
                    )}
                    {selectedOption === 'summary' && (
                        <ChartPayroll hours={hours.getHoursWorkedByMonthAndEmployee} />
                    )}
                </div>
            )}

            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border border-green-400 mt-6 rounded-xl">
                <div className="flex items-center">
                    <TbReportMoney size={50} className="text-green-500" />
                    <div className="flex flex-col items-center mx-5 space-y-1">
                        <h2 className="text-lg font-medium text-gray-700 sm:text-2xl">Horas trabajadas</h2>
                        <div className="px-2 text-sm text-green-500 bg-gray-100 rounded-full sm:px-4 sm:py-1">
                            {workedHours} Horas
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-green-600 sm:text-4xl">${total} <span className="text-base font-medium">/Mes</span></h2>
            </div>
        </>
    );
};
