import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { headerSchema, type HeaderData } from '../schemas/header-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useDesignStore } from '../store/design-store'
import { DESCRIPTION_MAX_LENGTH } from '../constants/description'
import { Button } from '@/components/ui/button'
import { type Area } from 'react-easy-crop'
import { getCroppedImage } from '@/utils/get-cropped-img'
import { toast } from 'sonner'
import { uploadProfilePicture } from '@/features/profiles/data-access/upload-profile-picture'
import { useAuth } from '@/hooks/use-auth'
import { getProfilePictureUrl } from '@/features/profiles/data-access/get-profile-picture-url'
import { updateProfilePicture } from '@/features/profiles/data-access/update-profile-picture'
import { CropProfilePictureDialog } from '@/features/profiles/components/crop-profile-picture-dialog'

export function HeaderTab() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { pageInfo, setHeaderData, setProfilePictureUrl } = useDesignStore()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isCropping, setIsCropping] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const {
    register,
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<HeaderData>({
    resolver: zodResolver(headerSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const formValues = useWatch({ control })

  const descriptionValue = formValues.description || ''
  const descriptionLength = descriptionValue.length

  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    fileInputRef.current?.click()
  }

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error(t('dashboard.design.tabs.header.pictureSizeError'))
      return
    }

    if (image) {
      URL.revokeObjectURL(image)
    }

    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
    setIsCropping(true)
  }

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleSaveCroppedImage = async () => {
    try {
      if (image && croppedAreaPixels && user) {
        const cropedImage = await getCroppedImage(image, croppedAreaPixels)
        await uploadProfilePicture(user?.id, cropedImage)
        const publicProfilePictureUrl = await getProfilePictureUrl(user.id)
        await updateProfilePicture(user.id, publicProfilePictureUrl)
        setProfilePictureUrl(publicProfilePictureUrl)
        toast.success(t('dashboard.design.tabs.header.pictureUploadSuccess'))
        setIsCropping(false)
      }
    } catch (error) {
      console.error('Error cropping image:', error)
      toast.error(t('dashboard.design.tabs.header.pictureUploadError'))
    }
  }

  useEffect(() => {
    if (pageInfo) {
      reset({
        title: pageInfo.title,
        description: pageInfo.description ?? '',
      })
    }
  }, [pageInfo, reset])

  useEffect(() => {
    trigger().then((isValid) => {
      if (isValid) setHeaderData(formValues as HeaderData)
    })
  }, [formValues, trigger, setHeaderData])

  return (
    <section>
      <Field>
        <FieldLabel>
          {t('dashboard.design.tabs.header.profilePicture')}
        </FieldLabel>
        <div>
          <img
            referrerPolicy="no-referrer"
            className="rounded-full size-20"
            src={pageInfo?.profilePictureUrl || '/default-avatar.png'}
            alt="Avatar"
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
          <Button variant="outline" onClick={handleProfilePictureClick}>
            {t('change')}
          </Button>
          {image && (
            <CropProfilePictureDialog
              isCropping={isCropping}
              setIsCropping={setIsCropping}
              image={image}
              crop={crop}
              setCrop={setCrop}
              zoom={zoom}
              setZoom={setZoom}
              onCropComplete={onCropComplete}
              handleSaveCroppedImage={handleSaveCroppedImage}
            />
          )}
        </div>
        <FieldLabel id="title-label" htmlFor="title">
          {t('dashboard.design.tabs.header.titleInputLabel')}
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="title"
            type="text"
            placeholder={t(
              'dashboard.design.tabs.header.titleInputPlaceholder',
            )}
            aria-labelledby="title-label"
            aria-invalid={!!errors.title}
            {...register('title')}
          />
        </InputGroup>
        {errors.title && <FieldError>{errors.title.message}</FieldError>}
      </Field>
      <Field>
        <FieldLabel id="description-label" htmlFor="description">
          {t('dashboard.design.tabs.header.descriptionInputLabel')}
        </FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            className="min-h-24"
            id="description"
            placeholder={t(
              'dashboard.design.tabs.header.descriptionInputPlaceholder',
            )}
            aria-labelledby="description-label"
            aria-invalid={!!errors.description}
            {...register('description')}
          />
        </InputGroup>
        <span className="text-end">
          {descriptionLength}/{DESCRIPTION_MAX_LENGTH}
        </span>
        {errors.description && (
          <FieldError>{errors.description.message}</FieldError>
        )}
      </Field>
    </section>
  )
}
