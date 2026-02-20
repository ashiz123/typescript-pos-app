export const getTodayDate = () => {
    const today = new Date()
    const dateStr = today.toISOString().split('T')[0]
    return dateStr
}
