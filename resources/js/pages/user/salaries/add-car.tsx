import DialogLayout from "@/layouts/dialog.layout";
import {Input} from "@/components/shared/input.components";
import {Button} from "@/components/ui/button";

type CreateCarSalaryType = {
    createCarSalaryState: boolean;
    setCreateCarSalaryState: (state: boolean) => void;
}

export default function AddCar({createCarSalaryState, setCreateCarSalaryState}: CreateCarSalaryType) {
    return (
        <DialogLayout state={createCarSalaryState} setState={setCreateCarSalaryState} title="افزودن تنخواه خودرویی">
            <form className="mt-6">
                <div className="flex flex-col items-center gap-y-4">
                    <div className="flex items-center gap-x-2 w-full">
                        <Input id="car" label="مدل ماشین" />
                        <Input type="number" id="generation" label="سال ساخت (ماشین)" />
                    </div>

                    <Input id="pelak" label="پلاک ماشین" />
                    <Input id="disc" label="مسافت طی شده (کیلومتر)" />
                </div>

                <Button size="xl" className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] w-full mt-4">
                    <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[26px]" />
                    ثبت تنخواه خودرویی
                </Button>
            </form>
        </DialogLayout>
    )
}
