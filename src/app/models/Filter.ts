export interface Filter {

    place: string[],
    minPrice: number,
    maxPrice: number,
    minStars: number,
    startDate: string | null,
    endDate: string | null
}