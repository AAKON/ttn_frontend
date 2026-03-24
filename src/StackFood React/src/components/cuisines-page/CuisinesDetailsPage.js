import React, { useEffect, useRef, useState } from 'react'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import { Box, Grid, NoSsr, Popover, Stack, Typography } from '@mui/material'
import RestaurantBoxCard from '../restaurant-details/RestaurantBoxCard'
import { useDispatch, useSelector } from 'react-redux'
import CustomPageTitle from '../CustomPageTitle'
import CustomShimmerRestaurant from '../CustomShimmer/CustomShimmerRestaurant'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import useMediaQuery from '@mui/material/useMediaQuery'
import { noRestaurantsImage } from '@/utils/LocalImages'
import { alpha, useTheme } from '@mui/material/styles'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CustomNextImage from '@/components/CustomNextImage'
import { HandleNext, HandlePrev } from '../CustomSliderIcon'
import { useRouter } from 'next/router'
import { useGetCuisines } from '@/hooks/react-query/cuisines/useGetCuisines'
import { setCuisines } from '@/redux/slices/storedData'
import FilterButton from '../Button/FilterButton'
import RestaurantFilterCard from '../home/restaurant/RestaurantFilterCard'
import { mockData } from './cuisineFilterData'

const CuisinesDetailsPage = ({ data, isLoading, onFilterChange }) => {
    const dispatch = useDispatch()
    const { global } = useSelector((state) => state.globalSettings)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [checkedFilterKey, setCheckedFilterKey] = useState(mockData)
    const { cuisines } = useSelector((state) => state.storedData)
    const matchesToSmall = useMediaQuery('(max-width:400px)')
    const theme = useTheme()
    const sliderRef = useRef(null)
    const router = useRouter()
    const { id } = router.query
    const { data: cuisinesData, refetch } = useGetCuisines()

    useEffect(() => {
        if (!cuisines?.length) {
            refetch()
        }
    }, [cuisines?.length, refetch])

    useEffect(() => {
        if (cuisinesData) {
            dispatch(setCuisines(cuisinesData?.Cuisines))
        }
    }, [cuisinesData, dispatch])

    useEffect(() => {
        if (!cuisines?.length || !id) return
        const activeIndex = cuisines.findIndex(
            (cuisine) =>
                String(cuisine?.id) === String(id) ||
                String(cuisine?.slug) === String(id)
        )
        if (activeIndex >= 0) {
            sliderRef.current?.slickGoTo(activeIndex)
        }
    }, [cuisines, id])

    const handleCuisineClick = (cuisine) => {
        router.push(
            {
                pathname: `/cuisines/${cuisine?.slug || cuisine?.id}`,
              
            },
            undefined,
            { shallow: true }
        )
    }

    const cuisineSliderSettings = {
        dots: false,
        infinite: cuisines?.length > 6,
        speed: 600,
        slidesToShow: 8,
        slidesToScroll: 2,
        autoplay: false,
        arrows: true,
        nextArrow: <HandleNext right="-1.6%" />,
        prevArrow: <HandlePrev left="-1.6%" />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: cuisines?.length > 5,
                    //centerPadding: '30px',
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: cuisines?.length > 4,
                    //centerPadding: '24px',
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: cuisines?.length > 3,
                   // centerPadding: '18px',
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: cuisines?.length > 2,
                    //centerPadding: '14px',
                },
            },
        ],
    }
    const handleDropClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleDropClose = () => {
        setAnchorEl(null)
    }
    const getActiveFilters = (filters) => {
        return filters
            ?.filter((item) => item?.isActive)
            ?.map((item) => item?.value)
    }
    useEffect(() => {
        if (!onFilterChange) return
        const activeFilters = getActiveFilters(checkedFilterKey)
        onFilterChange(activeFilters)
    }, [checkedFilterKey, onFilterChange])

    const handleReset = () => {
        const resetData = checkedFilterKey?.map((item) => ({
            ...item,
            isActive: false,
        }))
        setCheckedFilterKey(resetData)
        if (onFilterChange) {
            onFilterChange([])
        }
    }
    return (
        <CustomStackFullWidth spacing={2} sx={{ minHeight: '70vh' }}>
            {cuisines?.length > 0 && (
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'visible',
                        px: { xs: 0, md: 1 },
                        '& .slick-slider': {
                            position: 'relative',
                        },
                        '& .slick-slide > div': {
                            px: { xs: '6px', sm: '10px' },
                        },
                        '& .slick-list': {
                            paddingTop: {
                                xs: '10px !important',
                                sm: '20px !important',
                            },
                            paddingBottom: {
                                xs: '10px !important',
                                sm: '20px !important',
                            },
                        },
                    }}
                >
                    <Slider {...cuisineSliderSettings} ref={sliderRef}>
                        {cuisines.map((cuisine) => {
                            const isActiveCuisine =
                                String(cuisine?.slug) === String(id) ||
                                String(cuisine?.id) === String(id)
                            const isDarkMode =
                                theme.palette.mode === 'dark'
                            const activeShadow = isDarkMode
                                ? '0px 8px 20px rgba(0, 0, 0, 0.6)'
                                : '0px 8px 20px rgba(78, 80, 84, 0.22)'
                            const inactiveShadow = isDarkMode
                                ? '0px 8px 18px rgba(0, 0, 0, 0.45)'
                                : '0px 3px 6px rgb(159 159 159 / 12%)'
                            const activeBackground = isDarkMode
                                ? alpha(theme.palette.primary.main, 0.35)
                                : alpha(theme.palette.primary.main, 0.3)
                            const inactiveBackground = isDarkMode
                                ? theme.palette.neutral[800]
                                : theme.palette.neutral[100]
                            return (
                                <Box
                                    key={cuisine?.id}
                                    onClick={() =>
                                        handleCuisineClick(cuisine)
                                    }
                                    sx={{
                                        cursor: 'pointer',
                                        borderRadius: '10px',
                                        backgroundColor:
                                                    isActiveCuisine
                                                        ? activeBackground
                                                        : inactiveBackground,
                                        width: '120px',
                                        height: '96px',
                                      boxShadow: isActiveCuisine
                                                    ? activeShadow
                                                    : inactiveShadow,
                                        px: '16px',
                                        py: '10px',
                                        transition:
                                            'transform 0.2s ease, box-shadow 0.2s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow:
                                                '0px 14px 28px rgba(16, 24, 40, 0.12)',
                                        },
                                    }}
                                >
                                    <Stack
                                        spacing={1}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Box
                                            sx={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                backgroundColor: isActiveCuisine
                                                    ? theme.palette.neutral[100]
                                                    : theme.palette.neutral[200],
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <CustomNextImage
                                                src={cuisine?.image_full_url}
                                                alt={cuisine?.name}
                                                width={92}
                                                height={92}
                                                objectFit="cover"
                                                borderRadius="50%"
                                            />
                                        </Box>
                                        <Typography
                                            fontSize={{
                                                xs: '14px',
                                            }}
                                            fontWeight="500"
                                            color={
                                                isActiveCuisine
                                                    ? theme.palette.primary.main
                                                    : theme.palette.neutral[1000]
                                            }
                                            textAlign="center"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {cuisine?.name}
                                        </Typography>
                                    </Stack>
                                </Box>
                            )
                        })}
                    </Slider>
                </Box>
            )}
            <Grid container spacing={1} >
                <Grid item xs={12} sm={12} md={12} align="center">
                    <NoSsr>
                        <CustomStackFullWidth
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb="10px"
                        >
                            <CustomPageTitle
                                title="Restaurant List"
                            />
                            <FilterButton
                                id="fade-button"
                                handleClick={handleDropClick}
                                activeFilters={checkedFilterKey?.filter(
                                    (item) =>
                                        item?.isActive ===
                                        true
                                )}
                            />

                        </CustomStackFullWidth>

                    </NoSsr>
                </Grid>
                {data &&
                    data?.restaurants?.length > 0 &&
                    data?.restaurants?.map((restaurant) => {
                        return (
                            <Grid
                                item
                                xs={matchesToSmall ? 12 : 6}
                                sm={4}
                                md={3}
                                key={restaurant?.id}
                            >
                                <RestaurantBoxCard
                                    slug={restaurant?.slug}
                                    image={restaurant?.cover_photo_full_url}
                                    name={restaurant?.name}
                                    rating={restaurant?.avg_rating}
                                    restaurantImageUrl={
                                        global?.base_urls
                                            ?.restaurant_cover_photo_url
                                    }
                                    id={restaurant?.id}
                                    active={restaurant?.active}
                                    open={restaurant?.open}
                                    restaurantDiscount={restaurant?.discount}
                                    freeDelivery={restaurant?.free_delivery}
                                    delivery_time={restaurant?.delivery_time}
                                    cuisines={restaurant?.cuisine}
                                    rating_count={restaurant?.rating_count}
                                    coupons={restaurant?.coupons}
                                    opening_time={
                                        restaurant?.current_opening_time
                                    }
                                />
                            </Grid>
                        )
                    })}
                {isLoading && <CustomShimmerRestaurant />}
                {data?.restaurants.length === 0 && (
                    <CustomEmptyResult
                        image={noRestaurantsImage}
                        label="No Cuisine Restaurant Found"
                    />
                )}
            </Grid>
            <Popover
                onClose={() => handleDropClose()}
                id="fade-button"
                open={open}
                anchorEl={anchorEl}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    zIndex: 999,
                }}
                disableRestoreFocus
            >
                <RestaurantFilterCard
                    mockData={mockData}
                    rowWise={false}
                    checkboxData={checkedFilterKey}
                    handleDropClose={handleDropClose}
                    anchorEl={anchorEl}
                    setCheckedFilterKey={setCheckedFilterKey}
                    handleReset={handleReset}
                    singleSelect
                />
            </Popover>
        </CustomStackFullWidth>
    )
}

export default CuisinesDetailsPage
