import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type Option = {
    [key: string]: any;
};

type SelectBoxProps = {
    title: string;
    options: Option[];
    value?: string | number;
    onChange: (value: string) => void;
    labelKey: string;
    valueKey: string;
};

const SelectBox = ({title, options, value, onChange, labelKey, valueKey}: SelectBoxProps) => {
    // یافتن آیتم انتخاب شده
    const selectedOption = options.find(
        (option) => (option[valueKey] ?? option.id)?.toString() === value?.toString()
    );

    return (
        <Select
            onValueChange={onChange}
            value={value?.toString()}
        >
            <SelectTrigger
                className="w-full p-[10px] border border-gray-400 rounded-md outline-none text-[#000] text-md"
            >
                <SelectValue
                    placeholder={title}
                >
                    {selectedOption
                        ? (selectedOption[labelKey] ?? 'بدون نام')
                        : title
                    }
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem
                        key={option[valueKey] ?? option.id ?? Math.random()}
                        value={(option[valueKey] ?? '').toString()}
                    >
                        {option[labelKey] ?? 'بدون نام'}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectBox;
