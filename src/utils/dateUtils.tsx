import { format } from 'date-fns'
export const formatDate = (date: string): string => {
    const currentDate = new Date()
    const storyDate = new Date(date)
    const differenceInDays = Math.floor(
        (currentDate.getTime() - storyDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (differenceInDays >= 365) {
        return format(storyDate, 'yyyy-MM-dd')
    } else if (differenceInDays >= 30) {
        const differenceInMonths = Math.floor(differenceInDays / 30)
        return `${differenceInMonths} month${
            differenceInMonths > 1 ? 's' : ''
        } ago`
    } else if (differenceInDays >= 7) {
        const differenceInWeeks = Math.floor(differenceInDays / 7)
        return `${differenceInWeeks} week${differenceInWeeks > 1 ? 's' : ''} ago`
    } else if (differenceInDays >= 1) {
        return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`
    } else {
        return 'Today'
    }
}
