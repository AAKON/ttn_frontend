import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { CustomTypographyGray } from '../../error/Errors.style'
const LoyalityPage = ({ data }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const isDebit = data?.loyality?.transaction_type === 'point_to_wallet'
    const amountValue = isDebit ? data?.loyality?.debit : data?.loyality?.credit

    return (
        <Box
            sx={{
                backgroundColor:
                    theme.palette.mode === 'dark'
                        ? (theme) => theme.palette.cardBackground1
                        : (theme) => theme.palette.neutral[200],
                borderRadius: '10px',
                padding: '12px 14px',
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Stack spacing={0.5}>
                    <Typography fontWeight="700" fontSize="18px">
                        {isDebit ? '-' : '+'} {amountValue}
                    </Typography>
                    <CustomTypographyGray
                        textTransform="capitalize"
                        sx={{ fontSize: '13px', fontWeight: '400' }}
                    >
                        {t(
                            data?.loyality?.transaction_type?.replaceAll(
                                '_',
                                ' '
                            )
                        )}
                    </CustomTypographyGray>
                </Stack>
                <Stack alignItems="flex-end" spacing={0.5}>
                    <Typography
                        textTransform="capitalize"
                        sx={{ fontSize: '13px', fontWeight: '600' }}
                        color={
                            isDebit
                                ? theme.palette.error.main
                                : theme.palette.success.main
                        }
                    >
                        {isDebit ? t('debit') : t('credit')}
                    </Typography>
                    <CustomTypographyGray
                        sx={{ fontSize: '12px', fontWeight: '400' }}
                    >
                        {data?.loyality?.created_at}
                    </CustomTypographyGray>
                </Stack>
            </Stack>
        </Box>
    )
}

export default LoyalityPage
