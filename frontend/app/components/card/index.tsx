"use client";

import { ReactNode } from "react";

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
};

const CardSelect = ({ value, onChange, options, label, required }: Props) => {
    return (
        <div className="flex flex-col gap-2 my-3">
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
                                ? "bg-[#2E8B57] text-white border-white"
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

export default CardSelect;
