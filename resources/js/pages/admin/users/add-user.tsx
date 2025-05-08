import DialogLayout from "@/layouts/dialog.layout";
import {Input} from "@/components/shared/input.components";
import {Button} from "@/components/ui/button";
import {useUserStore} from "@/stores/admin/useUsersStore";
import {FormEvent} from "react";
import {useForm} from "@inertiajs/react";

type AddUserProps = {
    createUserState: boolean,
    setCreateUserState: (state: boolean) => void
}

type CreateUserForm = {
    name: string;
    image: string;
    username: string;
    mobile: string;
    national_code: string;
    father_name: string;
    zip: string;
    personally_code: string;
    bimeh_code: string;
    landing_phone: string;
    mobile_friend: string;
    activity_status: boolean;
    salary_status: boolean;
    bimeh_status: boolean;
    car_status: boolean;
    lunch_status: boolean;
    address: string;
    role_direction: string;
    password: string;
}

export default function AddUser({createUserState, setCreateUserState}: AddUserProps) {
    const {createUser} = useUserStore()

    const {data, setData} = useForm<CreateUserForm>({
        activity_status: false,
        address: "",
        bimeh_code: "",
        bimeh_status: false,
        car_status: false,
        father_name: "",
        image: "",
        landing_phone: "",
        lunch_status: false,
        mobile: "",
        mobile_friend: "",
        name: "",
        national_code: "",
        password: "",
        personally_code: "",
        role_direction: "",
        salary_status: false,
        username: "",
        zip: ""
    })

    const handleCreateUser = (e: FormEvent) => {
        e.preventDefault()
        createUser(data, setCreateUserState)
    }

    return (
        <DialogLayout state={createUserState} setState={setCreateUserState} title="افزودن کاربر">
            <form onSubmit={handleCreateUser} className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2 w-full">
                    <Input id="name" label="نام و نام خانوادگی" value={data.name} onChange={(e) => setData("name", e.target.value)}/>
                    <Input id="username" label="نام کاربری" value={data.username} onChange={(e) => setData("username", e.target.value)}/>
                </div>

                <div className="flex items-center gap-x-2 w-full">
                    <Input id="mobile" label="شماره موبایل" value={data.mobile} onChange={(e) => setData("mobile", e.target.value)}/>
                    <Input id="national_code" label="کدملی" value={data.national_code} onChange={(e) => setData("national_code", e.target.value)}/>
                </div>

                <div className="flex items-center gap-x-2 w-full">
                    <Input id="father_name" label="نام پدر" value={data.father_name} onChange={(e) => setData("father_name", e.target.value)}/>
                    <Input type="number" id="zip" label="کدپستی" value={data.zip} onChange={(e) => setData("zip", e.target.value)}/>
                </div>

                <div className="flex items-center gap-x-2 w-full">
                    <Input type="number" id="personally_code" label="کد پرسنلی" value={data.personally_code} onChange={(e) => setData("personally_code", e.target.value)}/>
                    <Input type="number" id="bimeh_code" label="شماره بیمه" value={data.bimeh_code} onChange={(e) => setData("bimeh_code", e.target.value)}/>
                </div>

                <div className="flex items-center gap-x-2 w-full">
                    <Input type="number" id="landing_phone" label="تلفن ثابت" value={data.landing_phone} onChange={(e) => setData("landing_phone", e.target.value)}/>
                    <Input id="mobile_friend" label="شماره همراه نزدیکان" value={data.mobile_friend} onChange={(e) => setData("mobile_friend",e.target.value)}/>
                </div>

                <div className="flex items-center gap-x-2 w-full">
                    <Input id="role_direction" label="صمت اجرایی" value={data.role_direction} onChange={(e) => setData("role_direction",e.target.value)}/>
                    <Input id="password" label="رمزعبور" value={data.password} onChange={(e) => setData("password",e.target.value)}/>
                </div>

                <div className="flex items-center gap-x-2 w-full">
                    <Input id="address" label="آدرس"  value={data.address} onChange={(e) => setData("address",e.target.value)}/>
                </div>

                <Button size="xl"
                        className="bg-[#3a84e3] flex items-center gap-x-2 text-white hover:bg-[#1775ef] w-full">
                    <img src="/static/icons/light/light-plus-icon.svg" alt="plus icon" className="w-[26px]"/>
                    افزودن کاربر جدید
                </Button>
            </form>
        </DialogLayout>
    )
}
