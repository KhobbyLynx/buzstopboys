export function formatAmount(amount: number): string {
    return `GHS ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}