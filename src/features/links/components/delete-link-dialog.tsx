import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { toast } from 'sonner'

type DeleteLinkDialogProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function DeleteLinkDialog({
  title,
  isOpen,
  onClose,
  onConfirm,
}: DeleteLinkDialogProps) {
  const { t } = useTranslation()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onConfirm()
      onClose()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t(error.message))
      }
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('dashboard.links.deleteLink')}</DialogTitle>
          <DialogDescription>
            <Trans
              i18nKey="dashboard.links.deleteLinkDescription"
              values={{
                title,
              }}
              components={{ bold: <strong /> }}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <Spinner /> {t('auth.loading')}
              </>
            ) : (
              t('confirm')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
