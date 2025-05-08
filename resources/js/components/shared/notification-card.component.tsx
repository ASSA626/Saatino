type UserNotificationCardType = {
    type: string
    title: string
    description: string
    date: string
}

export default function NotificationCard({type, title, description, date}: UserNotificationCardType) {
    return (
        <div className="flex items-start justify-between gap-x-3 p-3 border border-gray-300 shadow-creditCard rounded-xl">
            <div className="bg-[#3a84e3] p-2.5 rounded-lg w-[50px] h-[45px] flex items-center justify-center shadow-lg">
                <img src={`/static/icons/light/light-${type === 'salary' ? "card" : (type === 'vacation' ? "vacation" : "mission")}-icon.svg`} alt="wallet icon" className="w-full" />
            </div>

            <div className="flex flex-col items-start gap-y-0.5 w-full">
                <p className="text-lg font-bold">{title}</p>
                <p className="text-[13px]">{description}</p>
            </div>
        </div>
    )
}
