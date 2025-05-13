<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> فرم مرخصی {{ $user->name }}</title>

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
    <body style="font-family:'BTitr';" class="flex flex-col h-screen text-sm text-gray-700 font-btitr">
        <div class="py-2 px-5 mt-2.5">
            <div class="w-full bg-gray-200 border border-dashed border-gray-600 rounded-md">
                <div class="flex justify-between items-center w-full mx-auto py-2 px-4">
                    <div class="flex flex-col justify-between w-5/12">
                        <div class="mb-2">
                            <img src="{{ public_path('static/images/zamintarsim2.png') }}" alt="زمین ترسیم" width="42px" height="42px">
                        </div>

                        <div class="flex flex-col gap-y-4">
                            <span class="flex flex-col font-bold">
                                <span class="font-normal text-[12px] text-gray-500">مهندسان مشاور زمین ترسیم خاورمیانه</span>
                            </span>
                        </div>
                    </div>

                    <div class="flex flex-col items-center justify-between text-[10px]">
                        <div class="flex flex-col items-center">
                            <span class="text-base">درخواست مرخصی</span>
                            <span class="font-light"> تاریخ درخواست مرخصی: {{ \App\Helper\DateConverterHelper::miladi_to_shamsi($vacation->created_at) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-5 py-4 -mb-4">
            <div class="text-[11px] grid grid-cols-3 gap-4 border border-dashed border-gray-600 p-4 rounded-t-md">
                <p> نام و نام خانوادگی: {{ $user->name }}</p>
                <p> کدملی: {{ $user->national_code }}</p>
                <p> کد پرسنلی: {{ $user->personally_number }}</p>
                @if($vacation->vacation_type === 'ساعتی')
                    <p> از ساعت: {{ $vacation->start_date }}</p>
                    <p> تا ساعت: {{ $vacation->end_date }}</p>
                @else
                    <p> از تاریخ: {{ \App\Helper\DateConverterHelper::miladi_to_shamsi($vacation->start_date) }}</p>
                    <p> تا تاریخ: {{ \App\Helper\DateConverterHelper::miladi_to_shamsi($vacation->end_date) }}</p>
                @endif
                <p> نوع مرخصی: {{ $vacation->vacation_type }}</p>
                <p> مقدار مرخصی: {{ $duration }} @if($vacation->vacation_type === 'ساعتی')  ساعت @else روز @endif </p>
            </div>

            <div class="text-[11px] px-4 py-3 border-l border-r border-b border-dashed border-gray-600 rounded-b-md">
                <p> توضیحات: @if($vacation->caption != null) {{ $vacation->caption }} @else توضیحاتی داده نشده @endif </p>
            </div>
        </div>

        <div class="container mx-auto px-5 py-4 w-full">
            <table class="w-full text-[12px] border-collapse">
                <thead>
                    <tr class="text-center">
                        <th class="font-normal p-1 border border-dashed border-gray-600 rounded-tl-md rounded-tr-md">مرخصی‌های ماه</th>
                        <th class="font-normal p-1 border border-dashed border-gray-600 rounded-tl-md rounded-tr-md">مرخصی‌های سال</th>
                        <th class="font-normal p-1 border border-dashed border-gray-600 rounded-tl-md rounded-tr-md">مرخصی‌های باقی مانده</th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="text-center">
                        <td class="text-[12px] font-bold p-1 border border-dashed border-gray-600 rounded-bl-md rounded-br-md">{{ $reportVacation['used_in_daterange'] }} روز </td>
                        <td class="text-[12px] font-bold p-1 border border-dashed border-gray-600 rounded-bl-md rounded-br-md">{{ $reportVacation['total_used_in_year'] }} روز </td>
                        <td class="text-[12px] font-bold p-1 border border-dashed border-gray-600 rounded-bl-md rounded-br-md">{{ $reportVacation['remaining'] }} روز </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="container mx-auto px-5 py-4">
            <div class="text-[12px] flex items-center gap-3 border-l border-r border-t border-dashed border-gray-600 px-4 py-2 rounded-t-md">
                <div class="flex items-center gap-1.5">
                    <label class="flex items-center gap-x-1 rounded-md">
                        <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded" @checked($vacation->status === 'confirmed')>
                        <span class="text-gray-700">موافقت</span>
                    </label>
                </div>

                <div class="flex items-center gap-1.5">
                    <label class="flex items-center gap-x-1 rounded-md">
                        <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded" @checked($vacation->status === 'unconfirmed')>
                        <span class="text-gray-700">عدم موافقت</span>
                    </label>
                </div>
            </div>

            <div class="border-l border-r border-b border-dashed border-gray-600 px-4 pb-2 rounded-b-md">
                <p class="mt-2"> اظهار نظر مسئول: @if($vacation->report_caption === null) _ @else {{ $vacation->report_caption }} @endif</p>
            </div>
        </div>

        <div class="container mx-auto px-5 py-4">
            <div class="grid grid-cols-2 items-center gap-1.5 mb-1.5">
                <div class="w-full h-[105px] border border-dashed border-zinc-600 rounded-md p-1">
                    <p class="text-[12px] font-normal">امضای {{ $user->name }}:</p>
                </div>

                <div class="w-full h-[105px] border border-dashed border-zinc-600 rounded-md p-1">
                    <p class="text-[12px] font-normal">امضای جانشین:</p>
                </div>
            </div>

            <div class="grid grid-cols-3 items-center gap-1.5">
                <div class="w-full h-[105px] border border-dashed border-zinc-600 rounded-md p-1">
                    <p class="text-[12px] font-normal">امضای مدیر پروژه:</p>
                </div>

                <div class="w-full h-[105px] border border-dashed border-zinc-600 rounded-md p-1">
                    <p class="text-[12px] font-normal">امضای مدیرعامل:</p>
                </div>

                <div class="w-full h-[105px] border border-dashed border-zinc-600 rounded-md p-1">
                    <p class="text-[12px] font-normal">امضای رئیس هیئت مدیره:</p>
                </div>
            </div>
        </div>
    </body>
</html>
