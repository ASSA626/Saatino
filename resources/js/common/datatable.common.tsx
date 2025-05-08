import React from 'react';
import {Table, TableBody, TableHead, TableHeader, TableCell, TableRow} from "@/components/ui/table";
import NoDataMessage from "@/components/shared/nodata-message.component";
import {minToClock} from "@/lib/minToClock";
import moment from 'moment-jalaali';

type ActionTypeProps = {
    label: string;
    onClick: (row: Record<string, any>) => void;
}

type ColumnTypeProps = {
    key: string;
    label: string;
    render?: (value: any, row: Record<string, any>) => React.ReactNode;
    prefix?: string;
    suffix?: string;
    action?: ActionTypeProps;
    formatTime?: boolean;
    formatDate?: boolean | {
        fromFormat?: string;
        toJalali?: boolean;
        format?: string;
    };
}

type TableTypeProps = {
    columns: ColumnTypeProps[];
    data: Record<string, any>[];
    actions?: ActionTypeProps[];
    onEditRow?: (row: Record<string, any>) => void;
}

export default function Datatable({columns, data, actions = [], onEditRow}: TableTypeProps) {
    const getNestedValue = (obj: Record<string, any>, path: string): any => {
        const keys = path.split('.');
        let result = obj;

        for (const key of keys) {
            if (result == null) return null;
            result = result[key];
        }

        return result;
    };

    const formatDateValue = (value: any, options: ColumnTypeProps['formatDate']) => {
        if (!value) return '-';
        let dateObj;

        if (options && typeof options === 'object') {
            if (options.fromFormat) {
                dateObj = moment(value, options.fromFormat);
            } else {
                // روش 1: اضافه کردن یک روز به تاریخ
                dateObj = moment(value);
            }
            if (!dateObj.isValid()) {
                return value;
            }
            if (options.toJalali) {
                dateObj = dateObj.clone().locale('fa');
            }

            const format = options.format || 'jYYYY/jMM/jDD';

            return dateObj.format(format);
        } else if (options === true) {
            // روش 1: اضافه کردن یک روز به تاریخ
            dateObj = moment(value);

            if (!dateObj.isValid()) {
                return value;
            }

            return dateObj.clone().locale('fa').format('jYYYY/jMM/jDD');
        }

        return value;
    };

    const renderCell = (column: ColumnTypeProps, row: Record<string, any>) => {
        const value = getNestedValue(row, column.key);

        if (column.render) {
            return column.render(value, row);
        }

        if (column.action) {
            const action = column.action;

            if (column.key === 'update' || column.key.includes('update')) {
                return (
                    <button
                        type="button"
                        className="text-[14px] rounded-lg border border-gray-300 px-4 py-1.5 font-semibold text-gray-700"
                        onClick={() => {
                            if (onEditRow) {
                                onEditRow(row);
                            }
                            action.onClick(row);
                        }}
                    >
                        {action.label}
                    </button>
                );
            }

            return (
                <button
                    type="button"
                    className="text-[14px] rounded-lg border border-gray-300 px-4 py-1.5 font-semibold text-gray-700"
                    onClick={() => action.onClick(row)}
                >
                    {action.label}
                </button>
            );
        }

        if (column.key === 'actions' && actions.length > 0) {
            return (
                <div className="flex gap-2">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            type="button"
                            className="view-all-btn"
                            onClick={() => {
                                if (action.label === 'ویرایش' && onEditRow) {
                                    onEditRow(row);
                                }
                                action.onClick(row);
                            }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            );
        }

        if (column.formatTime && value !== null && value !== undefined) {
            return (
                <>
                    {column.prefix && `${column.prefix} `}
                    {minToClock(Number(value))}
                    {column.suffix && ` ${column.suffix}`}
                </>
            );
        }

        // بررسی و تبدیل تاریخ - حالا formatDate می‌تواند true باشد یا یک آبجکت با تنظیمات سفارشی
        if (column.formatDate !== undefined && value !== null && value !== undefined) {
            return (
                <>
                    {column.prefix && `${column.prefix} `}
                    {formatDateValue(value, column.formatDate)}
                    {column.suffix && ` ${column.suffix}`}
                </>
            );
        }

        const displayValue = value ?? '-';
        return (
            <>
                {column.prefix && `${column.prefix} `}
                {displayValue}
                {column.suffix && ` ${column.suffix}`}
            </>
        );
    };

    return (
        <div className="overflow-x-auto relative w-full">
            {data.length > 0 ? (
                <Table className="w-full table-auto">
                    <TableHeader>
                        <TableRow className="text-[12px]">
                            {columns.map((column, i) => (
                                <TableHead key={i} className="border-b border-gray-300 whitespace-nowrap">
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, i) => (
                                <TableRow key={i} className="font-bold border-b border-gray-300">
                                    {columns.map((column) => (
                                        <TableCell key={column.key} className="py-3 px-2.5 whitespace-nowrap">
                                            {renderCell(column, row)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            ) : (
                <NoDataMessage message="هیچ چیز ثبت نشده است"/>
            )}
        </div>
    );
}
