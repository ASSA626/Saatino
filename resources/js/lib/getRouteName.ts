const getRouteName = (url: string, replace: string) => {
    const routePath = url.replace(replace, "").replace(/^\//, "")

    switch (routePath) {
        case "":
            return "خانه";
        case "salaries":
            return "تنخواه ها";
        case "vacations":
            return "مرخصی ها";
        default:
            return "صفحه ناشناخته";
    }
}

export default getRouteName
