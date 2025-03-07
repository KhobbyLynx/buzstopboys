'use client'
// ** React Imports
import { SyntheticEvent, useEffect, useMemo, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { SelectChangeEvent } from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import { Alert, Box, CardActions, FormHelperText, Typography } from '@mui/material'

// ** Custom Component Import
import CustomTextField from '@/components/mui/text-field'

// ** Third Party Imports
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import isEqual from 'lodash/isEqual'
import * as yup from 'yup'

// ** Icon Imports
import { Icon } from '@iconify/react'

// ** Store
import { AppDispatch, RootState } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDropzone } from 'react-dropzone'
import { updateUser } from '@/store/auth'
import { updateUserInfo } from '@/store/users'
import IconifyIcon from '@/components/icon'
import axiosRequest from '@/utils/axiosRequest'
import { setCookie } from '@/utils/setCookie'

const Schema = yup.object().shape({
  firstname: yup.string(),
  lastname: yup.string(),
  username: yup.string().required('Username is required!'),
  address: yup.string(),
  email: yup.string().email('Invalid email').required('Email is required'),

  x: yup
    .string()
    .url('Enter a valid URL (e.g., https://example.com)')
    .matches(/^https:\/\/(www\.)?twitter\.com|x\.com\/[a-zA-Z0-9_]+$/, 'Enter a valid Twitter URL')
    .nullable()
    .optional(),

  facebook: yup
    .string()
    .url('Enter a valid URL (e.g., https://example.com)')
    .matches(/^https:\/\/(www\.|web\.)?facebook\.com\/[a-zA-Z0-9.]+$/, 'Enter a valid Facebook URL')
    .nullable()
    .optional(),

  tiktok: yup
    .string()
    .url('Enter a valid URL (e.g., https://example.com)')
    .matches(
      /^https:\/\/(www\.)?tiktok\.com\/(@[a-zA-Z0-9._]+|@[a-zA-Z0-9._]+\/video\/\d+)$/,
      'Enter a valid TikTok URL'
    )
    .nullable()
    .optional(),

  instagram: yup
    .string()
    .url('Enter a valid URL (e.g., https://example.com)')
    .matches(/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+$/, 'Enter a valid Instagram URL')
    .nullable()
    .optional(),

  contact: yup
    .string()
    .matches(/^\d+$/, 'Contact must contain numbers only')
    .min(9, 'Contact must be at least 9 digits')
    .nullable()
    .optional(),
})

const FormLayoutsTabs = () => {
  // ** States
  const [value, setValue] = useState<string>('personal-info')

  // ** File Upload State
  const [img, setImg] = useState<string | null>(null)
  const [imgError, setImgError] = useState<string>('')

  // ** Dropzone Logic
  const readAndValidateImage = (file: File): Promise<File> => {
    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const image = new window.Image()
        image.src = event.target?.result as string
        image.onload = () => {
          // Validate size
          if (file.size <= 2 * 1024 * 1024) {
            resolve(file)
          } else {
            reject(new Error('File size exceeds 2 MB.'))
          }
        }

        image.onerror = () => {
          reject(new Error('Invalid image file.'))
        }
      }

      reader.onerror = () => {
        reject(new Error('Failed to read the file.'))
      }

      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setImg(reader.result as string) // Convert image to Base64
      }
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2 MB
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    onDrop: async (acceptedFiles) => {
      try {
        await Promise.all(acceptedFiles.map((file) => readAndValidateImage(file)))
      } catch (error) {
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
          console.error('Error uploading image - OnDrop', error)
        }
      }
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
            console.error('Error uploading image - onDropRejected', error)
          }

          if (error.code === 'file-too-large') {
            setImgError('File size exceeds 2 MB.')
          } else if (error.code === 'too-many-files') {
            setImgError('You can only upload 1 image.')
          } else if (error.code === 'file-invalid-type') {
            setImgError('Invalid file type. Please upload a PNG, JPG, or JPEG image.')
          } else {
            setImgError('File upload rejected.')
          }
        })
      })
    },
  })

  // ** Hooks
  const userData = useSelector((state: RootState) => state.auth.data)
  const updatingUserPending = useSelector((state: RootState) => state.users.updatingUserPending)

  const {
    id: userId,
    firstname,
    lastname,
    username,
    email,
    contact,
    address,
    verified,
    socials,
    avatar,
  } = userData || {}
  const { x, facebook, instagram, tiktok } = socials || {}
  const defaultValues = useMemo(
    () => ({
      firstname: firstname || '',
      lastname: lastname || '',
      username: username || '',
      email: email || '',
      contact: String(contact) || null,
      address: address || '',
      x: x || null,
      facebook: facebook || null,
      instagram: instagram || null,
      tiktok: tiktok || null,
    }),
    [firstname, lastname, username, email, contact, address, x, facebook, instagram, tiktok]
  )

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues, resolver: yupResolver(Schema) })

  // Watche for change in form
  const watchedValues = useWatch({ control })

  // State to track if form has changed
  const [hasChanged, setHasChanged] = useState(false)

  // Effect to check if watched values have changed from default values
  useEffect(() => {
    setHasChanged(!isEqual(watchedValues, defaultValues))
  }, [watchedValues, defaultValues])

  // ** UseEffect
  useEffect(() => {
    setTimeout(() => {
      setImgError('')
    }, 5000)
  }, [imgError])

  const dispatch = useDispatch<AppDispatch>()

  const handleTabsChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // Reset Form
  const handleReset = () => {
    reset()
  }

  // Save User Avatar
  const [uploading, setUploading] = useState(false)
  const handleUploadAvatar = async () => {
    try {
      setUploading(true)
      const response = await axiosRequest.post('/upload', { images: [img] })
      const imageUrlArray = response.data.urls

      const imgUrl = imageUrlArray[0]

      if (imgUrl) {
        // Delete old image
        await axiosRequest.delete(`/upload?urls=${avatar}`)
      }

      if (userId) {
        // Update avatar in DB & state
        await dispatch(updateUserInfo({ data: { avatar: imgUrl }, userId })).then(() =>
          dispatch(updateUser({ avatar: imgUrl }))
        )
      }

      if (userData) {
        const updatedUserData = {
          ...userData,
          avatar: imgUrl,
        }

        await setCookie('userData', updatedUserData)
      }
    } catch (error: any) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error uploading user avatar', error)
      }
    } finally {
      setImg(null)
      setUploading(false)
    }
  }

  interface FormType {
    firstname?: string
    lastname?: string
    email: string
    address?: string
    username: string
    contact?: string | null
    x?: string | null
    facebook?: string | null
    instagram?: string | null
    tiktok?: string | null
  }
  const onSubmit = async (data: FormType) => {
    const {
      firstname,
      lastname,
      email,
      address,
      username,
      contact,
      x,
      facebook,
      instagram,
      tiktok,
    } = data

    try {
      const profileInfo = {
        username: username,
        fullname: `${firstname} ${lastname}`,
        firstname: firstname ?? '',
        lastname: lastname ?? '',
        address: address ?? '',
        contact: String(contact) ?? '',
        email: email,
        socials: {
          x: x ?? '',
          facebook: facebook ?? '',
          instagram: instagram ?? '',
          tiktok: tiktok ?? '',
        },
      }

      // Update User in DB
      if (userId) {
        // Update user in DB
        await dispatch(updateUserInfo({ data: profileInfo, userId })).then(() =>
          // Action to update user state
          dispatch(updateUser(profileInfo))
        )
      } else {
        console.error('User ID is undefined')
      }

      if (userData) {
        const updatedUserData = {
          ...userData,
          ...profileInfo,
        }

        await setCookie('userData', updatedUserData)
      }
    } catch (error: any) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error submitting Updated profile form', error)
      }
    }
  }

  return (
    <>
      <Card>
        <TabContext value={value}>
          <TabList
            variant="scrollable"
            scrollButtons={false}
            onChange={handleTabsChange}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              '& .MuiTab-root': { py: 3.5 },
            }}
          >
            <Tab value="personal-info" label="Personal Info" />
            <Tab value="social-links" label="Social Links" />
          </TabList>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <TabPanel sx={{ p: 0 }} value="personal-info">
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    {/* Dropzone */}
                    <Box className="flex items-center justify-start">
                      <Box
                        {...getRootProps()}
                        sx={{
                          p: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px dashed gray',
                          cursor: 'pointer',
                          width: 100,
                          height: 100,
                          backgroundImage: img ? `url(${img})` : avatar ? `url(${avatar})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <input {...getInputProps()} />
                        {!img ? (
                          <Icon icon="lucide:edit" className="text-gray-300 w-6 h-6" />
                        ) : null}
                      </Box>
                      <Button
                        variant="outlined"
                        className="px-3 py-1 ml-3 mt-auto text-gray-200 bg-blue-700 hover:bg-blue-900"
                        startIcon={
                          <Icon
                            icon={uploading ? 'line-md:upload-loop' : 'line-md:upload'}
                            className="w-6 h-6"
                          />
                        }
                        disabled={!img || uploading}
                        onClick={handleUploadAvatar}
                      >
                        {uploading ? 'Uploading...' : 'Upload'}
                      </Button>
                    </Box>
                    {imgError && (
                      <FormHelperText error sx={{ mb: 1 }}>
                        {imgError}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="firstname"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          type="firstname"
                          label="First name"
                          placeholder="eg. Samuel"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="tabler:user" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.firstname)}
                          {...(errors.firstname && { helperText: errors.firstname.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="lastname"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          type="lastname"
                          label="Last name"
                          placeholder="eg. Tetteh"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="tabler:user" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.lastname)}
                          {...(errors.lastname && { helperText: errors.lastname.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="username"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          type="username"
                          label="Username"
                          placeholder="eg. Lynx"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="icon-park-outline:edit-name" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.username)}
                          {...(errors.username && { helperText: errors.username.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          type="address"
                          label="Address"
                          placeholder="eg. Madina, Rawlings Circle"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="ion:location-outline" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.address)}
                          {...(errors.address && { helperText: errors.address.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          type="email"
                          label="Email"
                          placeholder="khobbylynx55@gmail.com"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="tabler:mail" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.email)}
                          {...(errors.email && { helperText: errors.email.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="contact"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          label="Phone No."
                          placeholder="123-456-7890"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="tabler:phone" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.contact)}
                          {...(errors.contact && { helperText: errors.contact.message })}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel sx={{ p: 0 }} value="social-links">
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="x"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          label="X formerly Twitter"
                          placeholder="https://twitter.com/carterLeonard"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="tabler:brand-twitter" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.x)}
                          {...(errors.x && { helperText: errors.x.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="facebook"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          label="Facebook"
                          placeholder="https://facebook.com/carterLeonard"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="tabler:brand-facebook" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.facebook)}
                          {...(errors.facebook && { helperText: errors.facebook.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="tiktok"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          label="Tiktok"
                          placeholder="https://www.tiktok.com/carterLeonard"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="tabler:brand-tiktok" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.tiktok)}
                          {...(errors.tiktok && { helperText: errors.tiktok.message })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="instagram"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          fullWidth
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          label="Instagram"
                          placeholder="https://www.instagram.com/buzstopboys"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Icon fontSize="1.25rem" icon="tabler:brand-instagram" />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(errors.instagram)}
                          {...(errors.instagram && { helperText: errors.instagram.message })}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
            </CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <CardActions>
              <Button
                type="submit"
                sx={{ mr: 2 }}
                variant="contained"
                disabled={!hasChanged || updatingUserPending}
                startIcon={
                  <IconifyIcon
                    icon={updatingUserPending ? 'eos-icons:loading' : 'ic:baseline-update'}
                  />
                }
              >
                {updatingUserPending ? 'Updating' : 'Update'}
              </Button>
              {hasChanged && (
                <Button type="reset" variant="outlined" color="secondary" onClick={handleReset}>
                  Reset
                </Button>
              )}
            </CardActions>
          </form>
        </TabContext>
      </Card>

      {verified ? (
        <Alert severity="success" className="mt-10 flex items-center">
          <Typography variant="button" className="mr-auto">
            Email is verified!
          </Typography>
        </Alert>
      ) : (
        <Alert severity="error" className="mt-10 flex items-center">
          <div className="w-full">
            <Typography variant="button" className="mr-auto">
              Email is not verified!
            </Typography>
            <Button variant="outlined" color="info" className="px-6 font-light">
              Verify
            </Button>
          </div>
        </Alert>
      )}
    </>
  )
}

export default FormLayoutsTabs
