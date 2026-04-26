import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Cropper, { type Area } from 'react-easy-crop'
import { useTranslation } from 'react-i18next'

type CropProfilePictureDialogProps = {
  isCropping: boolean
  setIsCropping: (isOpen: boolean) => void
  image: string
  crop: { x: number; y: number }
  setCrop: (crop: { x: number; y: number }) => void
  zoom: number
  setZoom: (zoom: number) => void
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
  handleSaveCroppedImage: () => void
}

export function CropProfilePictureDialog({
  isCropping,
  setIsCropping,
  image,
  crop,
  setCrop,
  zoom,
  setZoom,
  onCropComplete,
  handleSaveCroppedImage,
}: CropProfilePictureDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={isCropping} onOpenChange={setIsCropping}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('dashboard.design.tabs.header.cropImage')}
          </DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-80 bg-black overflow-hidden rounded">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={1}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <DialogFooter className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => setIsCropping(false)}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSaveCroppedImage}>{t('save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
