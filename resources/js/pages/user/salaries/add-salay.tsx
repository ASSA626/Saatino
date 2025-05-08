import DialogLayout from "@/layouts/dialog.layout";
import {Input} from "@/components/shared/input.components";
import {Button} from "@/components/ui/button";
import {useSalaryStore} from "@/stores/user/useSalaryStore";
import {useForm} from "@inertiajs/react";
import {FormEvent, useEffect} from "react";

type CreateSalaryType = {
    createSalaryState: boolean;
    setCreateSalaryState: (state: boolean) => void;
}

type CreateSalaryForm = {
    title: string;
    count: number;
    value: number;
    total: number;
    description: string;
}

export default function AddSalary({createSalaryState, setCreateSalaryState}: CreateSalaryType) {
    const {createSalary} = useSalaryStore()
    const {data, setData, processing} = useForm<CreateSalaryForm>({
        title: "",
        count: 0,
        value: 0,
        total: 0,
        description: ''
    })

    useEffect(() => {
        const calculatedTotal = data.count * data.value;
        setData("total", calculatedTotal);
    }, [data.count, data.value]);

    const handleSalary = (e: FormEvent) => {
        e.preventDefault()
        createSalary(data, setCreateSalaryState)
    }

    return (
        <DialogLayout state={createSalaryState} setState={setCreateSalaryState} title="افزودن تنخواه جدید">
            <form onSubmit={handleSalary} className="mt-5">
                <div className="flex flex-col items-center gap-y-4">
                    <Input id="title" label="عنوان تنخواه" value={data.title} onChange={(e) => setData("title", e.target.value)}/>

                    <div className="flex items-center gap-x-2 w-full">
                        <Input type="number" id="count" label="تعداد" value={data.count} onChange={(e) => setData("count", Number(e.target.value))}/>
                        <Input type="number" id="value" label="مقدار (مبلغ)" value={data.value} onChange={(e) => setData("value", Number(e.target.value))}/>
                    </div>

                    <Input id="description" label="توضیحات" value={data.description} onChange={(e) => setData("description", e.target.value)}/>
                </div>

                <div className="w-full border border-dashed border-gray-400 p-3 rounded-md my-3 text-center">
                    {data.total} تومان
                </div>

                <Button size="xl" className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] w-full mt-2">
                    <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[26px]" />
                    ثبت تنخواه
                </Button>
            </form>
        </DialogLayout>
    )
}
