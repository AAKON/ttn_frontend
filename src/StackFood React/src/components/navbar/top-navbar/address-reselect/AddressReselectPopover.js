import React, { useState } from 'react'
import { Button, Drawer, Typography, useTheme, Stack } from '@mui/material'
import DeliveryAddress from '../../../checkout-page/DeliveryAddress'
import { CustomButtonPrimary } from '@/styled-components/CustomButtons.style'
import { CustomStackFullWidth } from '@/styled-components/CustomStyles.style'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MapWithSearchBox from '../../../google-map/MapWithSearchBox'
import { getToken } from '../../../checkout-page/functions/getGuestUserId'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useDispatch, useSelector } from 'react-redux'
import { useGetLocation } from '@/utils/custom-hook/useGetLocation'
import { AnimationDots } from '../../../products-page/AnimationDots'
import IconButton from '@mui/material/IconButton'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import { setLocation } from '@/redux/slices/addressData'
import { useQuery } from 'react-query'
import { GoogleApi } from '@/hooks/react-query/config/googleApi'
import { setUserLocationUpdate } from '@/redux/slices/global'
import { RTL } from '../../../RTL/RTL'
import { CustomToaster } from '@/components/custom-toaster/CustomToaster'
import { he } from 'date-fns/locale'

const AddressReselectPopover = (props) => {
    const token = getToken()
    const theme = useTheme()
    const dispatch = useDispatch()
    const [inZone, setInZone] = React.useState(null)
    const [rerenderMap, setRerenderMap] = useState(false)
    const {
        coords,
        anchorEl,
        setMapOpen,
        mapOpen,
        onClose,
        open,
        t,
        address,
        setAddress,
        ...other
    } = props
    //const geoCodeLoading = false
    const { geoCodeLoading, setLocationEnabled } = useGetLocation(coords)
    const { location, formatted_address, zoneId } = useSelector(
        (state) => state.addressData
    )
    const { userLocationUpdate } = useSelector((state) => state.globalSettings)
    const languageDirection = typeof window !== 'undefined' ? localStorage.getItem('direction') : 'ltr'
    const handleSuccess = () => {
        if (getToken()) {
            if (!mapOpen && open) {
                getLocation()
            }
        } else {
            if (mapOpen && open) {
                getLocation()
            }
        }
    }

    const { refetch: refetchCurrentLocation } = useQuery(
        ['geocode-api', location],
        async () => GoogleApi.geoCodeApi(location),
        {
            onSuccess: handleSuccess,
        }
    )

    console.log({ zoneId });

    const getLocation = () => {
        if (zoneId && formatted_address && location) {
            localStorage.setItem('zoneid', zoneId)
            localStorage.setItem('location', formatted_address)
            localStorage.setItem('currentLatLng', JSON.stringify(location))
            CustomToaster('success', 'New location has been set.')
            setAddress(null)
            dispatch(setUserLocationUpdate(!userLocationUpdate))
            onClose()
            window.location.reload()
        }
    }
    const setUserCurrentLocation = async () => {
        if (coords) {
            setLocationEnabled(true)
            dispatch(
                setLocation({
                    lat: coords?.latitude,
                    lng: coords?.longitude,
                })
            )
            if (zoneId) {
                localStorage.setItem('zoneid', zoneId)
            }
            await refetchCurrentLocation()
            setRerenderMap((prvMap) => !prvMap)
        }
    }

    return (
        <>
            <RTL direction={languageDirection}>
                <Drawer
                    anchor="left"
                    open={open}
                    onClose={onClose}
                    variant="temporary"
                    sx={{
                        zIndex: '1300',
                        minWidth: { xs: '95vw', sm: '60vw', md: '50vw' },
                    }}
                >
                    <CustomStackFullWidth
                        spacing={2.5}
                        paddingInline="1.4rem"
                        sx={{
                            minWidth: { xs: '95vw', sm: '60vw', md: '40vw' },
                        }}
                        pb="1.4rem"
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            paddingTop={{ xs: '20px', md: '40px' }}
                            paddingBottom={{xs:"20px"}}
                        >
                            <Stack direction="row" alignItems="center" gap={1.5} flex={1}>
                                <ArrowBackIcon sx={{ fontSize: '18px' }} onClick={onClose} />
                                <Typography
                                    fontWeight="600"
                                    flex={1}
                                >
                                    {token && !mapOpen ? (
                                        <>
                                            {t('Select from saved addresses')}{' '}
                                            {/* <br /> */}
                                            {t('or pick from map')}
                                        </>
                                    ) : (
                                        t('Type your address here or pick from map')
                                    )}
                                </Typography>
                            </Stack>
                            <IconButton
                                onClick={onClose}
                                className="closebtn"
                            >
                                <CloseIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Stack>

                        
                        {token && !mapOpen ? (
                            <CustomStackFullWidth
                                justifyContent="center"
                                alignItems="center"
                            >
                                <DeliveryAddress
                                    setAddress={setAddress}
                                    address={address}
                                    hideAddressSelectionField="true"
                                    renderOnNavbar="true"
                                    token={token}
                                    maxHeight="60vh"
                                
                                />
                                <Button
                                    startIcon={<AddCircleOutlineIcon />}
                                    sx={{
                                        alignItems: 'flex-start',
                                        marginBottom: '1rem',
                                        color: theme => theme.palette.primary.main,
                                        marginTop: '1rem',
                                    }}

                                    onClick={setUserCurrentLocation}
                                    variant="outlined"
                                >
                                    {t('Use Current Location')}
                                </Button>
                                <CustomButtonPrimary
                                    paddingLeft="25px"
                                    paddingRight="25px"
                                    paddingTop="10px"
                                    paddingBottom="10px"
                                    maxWidth="210px"
                                    onClick={() => setMapOpen(true)}
                                >
                                    {t('Pick from Map')}
                                </CustomButtonPrimary>
                            </CustomStackFullWidth>
                        ) : (
                            <CustomStackFullWidth
                                position="relative"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <MapWithSearchBox
                                    isGps={true}
                                    rerenderMap={rerenderMap}
                                    orderType="dd"
                                    padding="0px"
                                    coords={coords}
                                    mapHeight="400px"
                                    handleAgreeLocation={setUserCurrentLocation}
                                    setInZone={setInZone}
                                    inZone={inZone}
                                />
                                <Stack
                                    width={{ xs: '100%', }}
                                    marginTop="1.8rem"
                                    direction="row"
                                    spacing={1}
                                >
                                    {geoCodeLoading ? (
                                        <Button
                                            
                                            fullWidth
                                            sx={{
                                                paddingY:"10px",
                                                color: `${theme.palette.whiteText.main} !important`,
                                                backgroundColor:
                                                    theme.palette.primary.main,
                                                '&:hover': {
                                                    backgroundColor:
                                                        theme.palette.primary
                                                            .dark,
                                                },
                                            }}
                                        >
                                            <AnimationDots sx={{height: "20px"}} size="0px" />
                                        </Button>
                                    ) : (
                                        <Button
                                        disabled={inZone === false || !zoneId}
                                            fullWidth
                                            sx={{
                                                color: `${theme.palette.whiteText.main} !important`,
                                                backgroundColor:
                                                    theme.palette.primary.main,
                                                '&:hover': {
                                                    backgroundColor:
                                                        theme.palette.primary
                                                            .dark,
                                                },
                                                '&.Mui-disabled': {
                                                    color: theme.palette.text.disabled,
                                                    backgroundColor:
                                                        theme.palette.action
                                                            .disabledBackground,
                                                },
                                            }}
                                            paddingTop="10px"
                                            paddingBottom="10px"
                                            onClick={getLocation}
                                        >
                                            {t('Pick location')}
                                        </Button>
                                    )}

                                </Stack>
                            </CustomStackFullWidth>
                        )}
                    </CustomStackFullWidth>
                </Drawer>
            </RTL>
        </>
    )
}

AddressReselectPopover.propTypes = {}

export default AddressReselectPopover
