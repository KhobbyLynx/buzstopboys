// ** React Import
import { forwardRef } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import TextField, { TextFieldProps } from '@mui/material/TextField'

const TextFieldStyled = styled(TextField)<TextFieldProps>(() => ({
  alignItems: 'flex-start',
  '& .MuiInputLabel-root': {
    transform: 'none',
    lineHeight: 1.154,
    position: 'relative',
    marginBottom: '8px', // Fixed margin value
    fontSize: '14px', // Fixed font size
    color: '#000000 !important', // Fixed color
  },
  '& .MuiInputBase-root': {
    borderRadius: '8px',
    backgroundColor: '#f1f3ffbc !important',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease', // Fixed transition
    '&:before, &:after': {
      display: 'none',
    },
    '&.MuiInputBase-sizeSmall': {
      borderRadius: '6px',
    },
    '&.Mui-error': {
      borderColor: '#f44336', // Fixed error color (red)
    },
    '&.Mui-focused': {
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      '& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
        transform: 'translateX(4px)',
      },
      '&.MuiInputBase-colorPrimary': {
        borderColor: '#1976d2', // Fixed primary color (blue)
      },
    },
    '&.Mui-disabled': {
      backgroundColor: '#f5f5f5 !important', // Disabled background
    },
    '& .MuiInputAdornment-root': {
      marginTop: '0 !important',
    },
  },
  '& .MuiInputBase-input': {
    color: '#4a4a4a', // Input text color
    '&:not(textarea)': {
      padding: '15.5px 13px',
    },
    '&:not(textarea).MuiInputBase-inputSizeSmall': {
      padding: '7.5px 13px',
    },
    '&:not(.MuiInputBase-readOnly):not([readonly])::placeholder': {
      transition: 'opacity 0.2s ease, transform 0.2s ease',
    },
  },
  '& .MuiFormHelperText-root': {
    lineHeight: 1.154,
    margin: '8px 0 0',
    color: '#757575', // Helper text color (gray)
    fontSize: '12px',
    '&.Mui-error': {
      color: '#f44336', // Error text color (red)
    },
  },
  // For multiline Textarea
  '& .MuiInputBase-multiline': {
    padding: '15.25px 13px',
    '&.MuiInputBase-sizeSmall': {
      padding: '7.25px 13px',
    },
  },
}))

const CustomTextField = forwardRef((props: TextFieldProps, ref) => {
  const { size = 'small', InputLabelProps, ...rest } = props

  return (
    <TextFieldStyled
      size={size}
      inputRef={ref}
      {...rest}
      variant="filled"
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
    />
  )
})

CustomTextField.displayName = 'CustomTextField'

export default CustomTextField
