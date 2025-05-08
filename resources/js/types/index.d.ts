export interface ProjectType {
    id?: number;
    title?: string;
}

export interface SalaryType {
    id: number
    user_id: number;
    title: string;
    value: string;
    count: number;
    all_values: string;
    description?: string;
    status: string;
    user: UserType;
}

export interface VacationType {
    id: number
    user_id: number;
    start_time: string;
    left_time: string;
    type: string;
    caption?: string;
    report_caption?: string;
    status: string;
    user: UserType;
}

export interface ClockType {
    id: number
    user_id: string;
    start_clock: string;
    left_clock: string;
    time_value: number;
    worklog_status: string;
    worklogs: WorklogType[]
}

export interface WorklogType {
    id: number;
    project: ProjectType[];
    time_value: number;
}

export interface UserType {
    id: number;
    name: string;
    image?: string;
    username: string;
    mobile: string;
    national_code: string;
    father_name: string;
    zip?: string;
    personally_number?: string;
    bimeh_number?: string;
    home_phone?: string;
    mobile_friend: string;
    user_activity: string;
    salary_status: string;
    bimeh_status: string;
    address: string;
    role: string;
    password: string;
}

export interface Auth {
    user: User;
}

export interface PaginationLinks {
    url: string;
    label: string;
    active: boolean
}

export interface PaginationType<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
