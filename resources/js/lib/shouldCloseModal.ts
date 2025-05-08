import {ClockType} from "@/types";

const shouldCloseModal = (clock: ClockType | null, isModalOpen: boolean) =>
    isModalOpen && clock?.worklog_status !== 'inserting';

export default shouldCloseModal
