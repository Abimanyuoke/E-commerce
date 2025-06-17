"use client";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const Payment = ({ value, onChange }: Props) => {
    const options = ["CASH", "QRIS"];

    return (
        <div className="flex gap-4 my-2">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onChange(option)}
                    className={`flex-1 p-4 rounded-lg border text-sm font-semibold ${value === option
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-700 border-gray-300"
                        } hover:shadow-md transition`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Payment;
