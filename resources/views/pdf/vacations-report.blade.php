<!DOCTYPE html>
<html lang="fa">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title> فرم گزارشگیری مرخصی: {{ $user->name }} </title>

        @vite('resources/css/app.css')

        <style>
            @font-face {
                font-family: 'BTitr';
                font-style: normal;
                font-weight: normal;
                src: local('B Titr Bold'), url('/public/static/fonts/BTitr.woff') format('woff');
            }
        </style>
    </head>
    <body style="font-family:'BTitr';" class="flex flex-col h-screen text-sm text-black tracking-tight">
        <div class="py-3 px-6 mt-2.5">
            <header class="w-full flex justify-between bg-gray-200 rounded-sm px-4 py-0.5 border border-dashed border-gray-600">
                <div class="flex items-center gap-3">
                    @if($user->image)
                        <img src="{{ $user->image }}" alt="{{ $user->name }}" class="w-14 h-14 rounded-full">
                    @else
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                             alt="{{ $user->fullname }}" class="w-14 h-14 rounded-full">
                    @endif
                    <div class="flex flex-col gap-1">
                        <p class="text-[10px]">نام و نام خانوادگی: {{ $user->name }}</p>
                        <p class="text-[10px] text-center">کدملی: {{ $user->national_code }}</p>
                    </div>
                </div>

                <div class="flex flex-col justify-center gap-1">
                    <p class="text-[10px]"> گزارشگیری مرخصی ها از تاریخ {{ \App\Helper\DateConverterHelper::miladi_to_shamsi($start_date) }} تا تاریخ {{ \App\Helper\DateConverterHelper::miladi_to_shamsi($end_date) }}</p>
                    <p class="text-[10px] text-center">مهندسان مشاور زمین ترسیم خاورمیانه</p>
                </div>
            </header>
        </div>

        <div class="w-full mx-auto px-6 mb-3">
            <table class="border-collapse border border-gray-600 w-full text-[10px]">
                <thead>
                <tr class="text-center">
                    <th class="font-normal border border-gray-200 h-[6px]">ردیف</th>
                    <th class="font-normal border border-gray-200 h-[6px]">نوع مرخصی</th>
                    <th class="font-normal border border-gray-200 h-[6px]">تاریخ ایجاد مرخصی</th>
                    <th class="font-normal border border-gray-200 h-[6px]">شروع مرخصی</th>
                    <th class="font-normal border border-gray-200 h-[6px]">پایان مرخصی</th>
                    <th class="font-normal border border-gray-200 h-[6px]">وضعیت مرخصی</th>
                </tr>
                </thead>
                <tbody>
                @foreach ($vacations as $vacation)
                    <tr class="text-center">
                        <td class="text-[10px] p-0 font-bold border border-gray-200 !h-[6px]">{{ $loop->iteration }}</td>
                        <td class="text-[10px] p-0 font-bold border border-gray-200 !h-[6px]">{{ $vacation['vacation_type'] }}</td>
                        <td class="text-[10px] p-0 font-bold border border-gray-200 !h-[6px]">{{ \App\Helper\DateConverterHelper::miladi_to_shamsi($vacation['created_at']) }}</td>
                        @if($vacation['vacation_type'] !== "ساعتی")
                            <td class="text-[10px] p-0 font-bold border border-gray-200 !h-[6px]">{{ \App\Helper\DateConverterHelper::miladi_to_shamsi($vacation['start_date']) }}</td>
                            <td class="text-[10px] p-0 font-bold border border-gray-200 !h-[6px]">{{ \App\Helper\DateConverterHelper::miladi_to_shamsi($vacation['end_date']) }}</td>
                        @endif
                        <td class="text-[10px] p-0 font-bold border border-gray-200 !h-[6px]">@if($vacation['status'] === 'confirmed') تایید شده@elseif($vacation['status'] === 'unconfirmed')  تایید نشده @else در انتظار تایید @endif</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        <div class="w-full px-6 mb-3 flex items-center gap-4">
            <div class="mx-auto w-full">
                <table class="border-collapse w-full text-[12px]">
                    <thead>
                        <tr class="text-center">
                            <th class="text-[12px] border border-gray-200">مرخصی های ماه</th>
                            <th class="text-[12px] border border-gray-200">مرخصی های سال</th>
                            <th class="text-[12px] border border-gray-200">مرخصی های باقی مانده</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="text-center">
                            <td class="text-[12px] border border-gray-200">{{ $vacation_report['used_in_daterange'] }} روز</td>
                            <td class="text-[12px] border border-gray-200">{{ $vacation_report['total_used_in_year'] }} روز</td>
                            <td class="text-[12px] border border-gray-200">{{ $vacation_report['remaining'] }} روز</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="flex items-center justify-between gap-x-1.5 px-6">
            <div class="w-full h-[80px] border border-dashed border-zinc-600 rounded-md p-1">
                <p class="text-[8px] font-normal">{{ $user->name }}:</p>
            </div>

            <div class="w-full h-[80px] border border-dashed border-zinc-600 rounded-md p-1">
                <p class="text-[8px] font-normal">مدیر پروژه:</p>
            </div>

            <div class="w-full h-[80px] border border-dashed border-zinc-600 rounded-md p-1">
                <p class="text-[8px] font-normal">مدیرعامل:</p>
            </div>

            <div class="w-full h-[80px] border border-dashed border-zinc-600 rounded-md p-1">
                <p class="text-[8px] font-normal">رئیس هیئت مدیره:</p>
            </div>
        </div>
    </body>
</html>
