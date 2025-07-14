// "use client";

// type SizeOption = {
//     value: string;
//     label: string;
// };

// type Props = {
//     value: string;
//     onChange: (value: string) => void;
//     label?: string;
//     required?: boolean;
//     className?: string;
// };

// const sizeOptions: SizeOption[] = [
//     { value: "XS", label: "XS" },
//     { value: "S", label: "S" },
//     { value: "M", label: "M" },
//     { value: "L", label: "L" },
//     { value: "XL", label: "XL" },
//     { value: "XXL", label: "XXL" },
//     { value: "XXXL", label: "XXXL" },
// ];

// const SizeSelectCard = ({ value, onChange, label, required, className }: Props) => {
//     return (
//         <div className={`flex flex-col gap-2 my-3 ${className}`}>
//             {label && (
//                 <label className="text-xs font-bold text-slate-500">
//                     {label}
//                     {required && <sup className="text-red-600">*</sup>}
//                 </label>
//             )}
//             <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
//                 {sizeOptions.map((option) => (
//                     <button
//                         type="button"
//                         key={option.value}
//                         onClick={() => onChange(option.value)}
//                         className={`p-3 rounded-lg border text-sm font-semibold text-center ${value === option.value
//                                 ? "bg-primary text-white border-white"
//                                 : "bg-white text-gray-700 border-gray-300"
//                             } hover:shadow-md transition`}
//                     >
//                         {option.label}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SizeSelectCard;


"use client";


type CardOption = {
    value: string;
    label: string;
};

type Props = {
    value: string;
    onChange: (value: string) => void;
    options: CardOption[];
    label?: string;
    required?: boolean;
    className?: string;
};

const CardSelectSize = ({ value, onChange, options, label, required, className }: Props) => {
    return (
        <div className={`flex flex-col gap-2 my-3 ${className}`} >
            {label && (
                <label className="text-xs font-bold text-slate-500">
                    {label}
                    {required && <sup className="text-red-600">*&#41;</sup>}
                </label>
            )}
            <div className="flex gap-4">
                {options.map((option) => (
                    <button
                        type="button"
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={`flex-1 p-4 rounded-lg border text-sm font-semibold ${value === option.value
                            ? "bg-primary text-white border-white"
                            : "bg-white text-gray-700 border-gray-300"
                            } hover:shadow-md transition`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CardSelectSize;

