import AdminLayout from "@/layouts/admin.layout";
import {PaginationType, UserType} from "@/types";
import TableInfo from "@/components/admin/table-info.component";
import Datatable from "@/common/datatable.common";
import StatusBadges from "@/components/shared/status-badges.component";
import Pagination from "@/common/pagination.common";
import {useState} from "react";
import AddUser from "@/pages/admin/users/add-user";

type UsersListProps = {
    users: PaginationType<UserType>;
    users_count: number
}

export default function UsersList({users, users_count}: UsersListProps) {
    const [addUserState, setAddUserState] = useState<boolean>(false)

    const usersTable = [
        {key: 'image', label: 'عکس'},
        {key: 'name', label: 'نام و نام خانوادگی'},
        {key: 'username', label: 'نام کاربری'},
        {key: 'mobile', label: 'شماره موبایل'},
        {key: 'national_code', label: 'کدملی'},
        {key: 'role_direction', label: 'صمت اجرایی'},
        {key: 'activity_status', label: 'فعالیت', render: (value: string) => (<StatusBadges status={value} readOnly={true}/>)},
        {key: 'salary_status', label: 'تنخواه', render: (value: string) => (<StatusBadges status={value} readOnly={true}/>)},
        {key: 'bimeh_status', label: 'بیمه', render: (value: string) => (<StatusBadges status={value} readOnly={true}/>)},
        {key: 'car_status', label: 'خودرویی', render: (value: string) => (<StatusBadges status={value} readOnly={true}/>)},
        {key: 'lunch_status', label: 'بن ناهار', render: (value: string) => (<StatusBadges status={value} readOnly={true}/>)},
        {
            key: 'delete_action',
            label: 'حذف',
            action: {
                label: 'حذف',
                onClick: () => alert("delete"),
            },
        },
        {
            key: 'update_action',
            label: 'ویرایش',
            action: {
                label: 'ویرایش',
                onClick: () => alert("update"),
            },
        },
    ];

    return (
        <AdminLayout>
            <AddUser createUserState={addUserState} setCreateUserState={setAddUserState}/>

            <div className="flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
                <div
                    className="flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
                    <div className="flex w-full flex-col gap-6">
                        <header className="flex items-center justify-between">
                            <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-900">کارکنان شما</h1>
                        </header>

                        <TableInfo count={users_count} title="کاربران ثبت شده">
                            <button className="max-md:hidden text-blue-900 font-bold cursor-pointer"
                                    onClick={() => setAddUserState(true)}>
                                افزودن کاربر
                            </button>
                        </TableInfo>

                        <Datatable columns={usersTable} data={users.data}/>
                        <Pagination data={users}/>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
