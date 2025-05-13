import React, {ChangeEvent, useState} from "react";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

type InputParamsType = {
    id?: string,
    type?: string,
    label?: string,
    value?: string | number,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    placeholder?: string
}

type InputDatePickerType = {
    id?: string;
    label?: string;
    value?: string | number | null;
    onChange: (formattedDate: string) => void;
}

export const Input = ({id, type, label, value, onChange, disabled, placeholder}: InputParamsType) => {
    const [focused, setFocused] = useState<boolean>(false)

    const handleFocus = () => setFocused(true)

    const handleBlur = () => setFocused(false)

    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                className="w-full p-[10px] border border-gray-400 rounded-md outline-none text-[#000] text-md"
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
            />
            <label
                htmlFor={id}
                className={`absolute right-0 p-[10px] text-md pointer-events-none text-gray-600 transition-all duration-150 ${
                    focused || value
                        ? `-top-3 text-[0.7rem] bg-white py-[2px] px-[10px] mr-2 rounded-sm`
                        : `top-0}`
                }`}
            >
                {label}
            </label>
        </div>
    )
}

export const InputClock = ({id, type, label, value, onChange, disabled}: InputParamsType) => {
    const [focused, setFocused] = useState(false)

    const handleFocus = () => setFocused(true)
    const handleBlur = () => setFocused(false)

    const format = (val: string) => {
        const v = val.replace(/\D/g, "").slice(0, 6)
        return v.replace(/(\d{2})(\d{0,2})(\d{0,2})/, (_, h, m, s) =>
            [h, m, s].filter(Boolean).join(":")
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = format(e.target.value)
        onChange?.({...e, target: {...e.target, value: formatted}} as React.ChangeEvent<HTMLInputElement>)
    }

    return (
        <div className="relative w-full">
            <input
                id={id}
                type="text"
                className="w-full p-[10px] border border-gray-400 rounded-md outline-none text-[#000] text-md"
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={disabled}
                maxLength={8}
            />
            <label
                htmlFor={id}
                className={`absolute right-0 p-[10px] text-md pointer-events-none text-gray-600 transition-all duration-150 ${
                    focused || value
                        ? `-top-3 text-[0.7rem] bg-white py-[2px] px-[10px] mr-2 rounded-sm`
                        : `top-0}`
                }`}
            >
                {label}
            </label>
        </div>
    )
}

export const InputDatePicker = ({value, id, onChange, label}: InputDatePickerType) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    const formatDate = (date: DateObject | string | number | null) => {
        if (date instanceof DateObject) {
            return `${date.year}/${(date.month.index + 1).toString().padStart(2, "0")}/${date.day
                .toString()
                .padStart(2, "0")}`;
        }
        return date?.toString() || "";
    };

    // مدیریت تغییر مقدار
    const handleChange = (date: DateObject | string | number | null) => {
        const formattedDate = formatDate(date);
        onChange(formattedDate);
    };

    return (
        <div className="relative w-full">
            <DatePicker
                inputClass="w-full p-[10px] border border-gray-400 rounded-md outline-none text-[#000] text-md "
                containerClassName="w-full"
                value={value}
                onChange={handleChange}
                calendar={persian}
                locale={persian_fa}
                render={(
                    value: string | number | null,
                    openCalendar: () => void,
                    handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
                ) => (
                    <input
                        type="text"
                        className="w-full p-[10px] border border-gray-400 rounded-md outline-none text-[#000] text-md "
                        value={value?.toString() || ""}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleValueChange}
                        onClick={openCalendar}
                    />
                )}
            />
            <label
                htmlFor={id}
                className={`absolute right-0 p-[10px] text-md pointer-events-none text-gray-600 transition-all duration-150 ${
                    focused || value
                        ? `-top-3 text-[0.7rem] bg-white py-[2px] px-[10px] mr-2 rounded-sm`
                        : `top-0}`
                }`}
            >
                {label}
            </label>
        </div>
    )
}
