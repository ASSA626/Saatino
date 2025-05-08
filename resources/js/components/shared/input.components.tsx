import React, {ChangeEvent, useState} from "react";

type InputParamsType = {
    id?: string,
    type?: string,
    label?: string,
    value?: string | number,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    placeholder?: string
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
        onChange?.({ ...e, target: { ...e.target, value: formatted } } as React.ChangeEvent<HTMLInputElement>)
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

export const InputAuth = () => {
    return (
        <input type="text"/>
    )
}
