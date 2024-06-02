import { useQuery } from "@apollo/client";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Spinner from "../Spinner";
import { GET_PERFORMANCE_EVALUATION_BY_EMPLOYEE } from "@/hooks/react-query/query/performance-evaluation";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface ViewEvaluationProps {
    idEvaluation: string | null;
    idEmployee: string | null;
    setOpenModalView: React.Dispatch<React.SetStateAction<boolean>>;

}

export const ViewEvaluation = ({ idEvaluation, idEmployee, setOpenModalView }: ViewEvaluationProps) => {
    const { data, loading } = useQuery(GET_PERFORMANCE_EVALUATION_BY_EMPLOYEE, {
        variables: { id: idEvaluation, employeeId: idEmployee },
    });

    const currentEvaluation = data?.performanceEvaluationByEmployee;
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {
                        currentEvaluation && (



                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                                <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-md shadow-md">
                                    <div className="space-y-8">
                                        <button className="justify-end flex right-2  text-red-500 hover:text-red-700" onClick={() => setOpenModalView(false)}>
                                            < IoMdClose size={25}/>
                                            Cerrar
                                        </button>
                                        <div className="flex items-start justify-between">

                                            <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-blue-300 w-min">
                                                Fecha Inicial: <strong>{new Date(currentEvaluation.initialDate).toLocaleDateString()}</strong>
                                            </span>
                                            <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-blue-300 w-min">
                                                Fecha Final: <strong>{new Date(currentEvaluation.finalDate).toLocaleDateString()}</strong>
                                            </span>
                                        </div>
                                        <div className="flex flex-col space-y-4 text-gray-700">

                                            <p className="flex items-center space-x-2">
                                                <span className="text-blue-500" >Por Mejorar:</span>

                                                <span className="text-gray-900 truncate w-fit">{currentEvaluation.improvementOpportunities}</span>
                                            </p>
                                            <p className="flex items-center space-x-2">
                                                <span className="text-blue-500" >Descripción:</span>
                                                <span className="truncate w-fit">{currentEvaluation.description}</span>
                                            </p>

                                            <div className="flex flex-col space-y-1">
                                                <span className="truncate w-fit">
                                                    <strong>Registrado Por:</strong> {currentEvaluation.createdBy.name}
                                                </span>
                                                <span className="truncate w-fit">{currentEvaluation.createdBy.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </>

            )}
        </>
    );
};
