import axiosRequest from './axiosRequest'

export const getCurrencyByCountry = (country: string): string => {
  const currencyMap: Record<string, string> = {
    GH: 'GHS', // Ghana
    NG: 'NGN', // Nigeria
    US: 'USD', // United States
    ZA: 'ZAR', // South Africa
  }

  // Default to USD for international donors
  return currencyMap[country] || 'USD'
}

export const detectCurrency = async (): Promise<string> => {
  try {
    const { data } = await axiosRequest.get('http://ip-api.com/json')

    const allPersonalData = await axiosRequest.get('http://ip-api.com/json')

    console.log('---- DETECTED CURRENCY --------')
    console.log(`Country Code: ${data.countryCode}`)
    console.log('Full Data:', data)
    console.log('--------------------------------')

    console.log('---- DETECTED DATA --------')
    console.log('Full Data:', allPersonalData)
    console.log('--------------------------------')

    return getCurrencyByCountry(data.countryCode)
  } catch (error) {
    console.error('Error detecting location:', error)
    return 'USD' // Safer fallback for international support
  }
}
