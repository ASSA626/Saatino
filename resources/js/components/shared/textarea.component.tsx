import {ChangeEvent, useState} from "react";

type InputParamsType = {
    id?: string,
    label?: string,
    value?: string | number,
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    disabled?: boolean,
    placeholder?: string
}

export const Textarea = ({id, label, value, onChange, disabled, placeholder}: InputParamsType) => {
    const [focused, setFocused] = useState<boolean>(false)

    const handleFocus = () => setFocused(true)

    const handleBlur = () => setFocused(false)

    return (
        <div className="relative w-full">
            <textarea
                id={id}
                className="w-full p-[10px] border border-gray-400 rounded-md outline-none text-[#000] text-md h-32 resize-none"
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
