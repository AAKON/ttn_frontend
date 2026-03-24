import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'
import { onSingleErrorResponse } from '@/components/ErrorResponse'

export const getData = async (params) => {
    const { id, page_limit, offset, filter_data } = params
    const normalizedFilterData = Array.isArray(filter_data)
        ? filter_data.filter(Boolean)[0] || ''
        : filter_data
    const encodedFilterData =
        normalizedFilterData && normalizedFilterData !== ''
            ? encodeURIComponent(normalizedFilterData)
            : ''
    const { data } = await MainApi.get(
        `/api/v1/cuisine/get_restaurants?cuisine=${id}&limit=${page_limit}&offset=${offset}${
            encodedFilterData ? `&filter_data=${encodedFilterData}` : ''
        }`
    )
    return data
}
export const useGetCuisinesDetails = (params) => {
    const { id, page_limit, offset, filter_data } = params
    const normalizedFilterData = Array.isArray(filter_data)
        ? filter_data.filter(Boolean)[0] || ''
        : filter_data
    return useQuery(
        ['cuisines-Details', id, page_limit, offset, normalizedFilterData],
        () => getData(params),
        {
            enabled: false,
            onError: onSingleErrorResponse,
        }
    )
}
