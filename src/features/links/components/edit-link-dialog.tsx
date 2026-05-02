import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { useTranslation } from 'react-i18next'
import type { Link } from '../types/link'
import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  editLinkSchema,
  type EditLinkSchema,
} from '../schemas/edit-link-schema'
import { Spinner } from '@/components/ui/spinner'

type EditLinkDialogProps = {
  link: Link | null
  isOpen: boolean
  onClose: () => void
  onSave: (data: EditLinkSchema) => Promise<void>
}

const fields: {
  name: keyof EditLinkSchema
  type: string
  labelKey: string
  placeholderKey: string
}[] = [
  {
    name: 'title',
    type: 'text',
    labelKey: 'dashboard.links.titleLabel',
    placeholderKey: 'dashboard.links.titlePlaceholder',
  },
  {
    name: 'url',
    type: 'text',
    labelKey: 'dashboard.links.linkLabel',
    placeholderKey: 'dashboard.links.linkPlaceholder',
  },
]

export const EditLinkDialog = React.memo(function EditLinkDialog({
  link,
  isOpen,
  onClose,
  onSave,
}: EditLinkDialogProps) {
  const { t } = useTranslation()
  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditLinkSchema>({
    resolver: zodResolver(editLinkSchema),
  })

  useEffect(() => {
    if (link) {
      reset({
        title: link.title,
        url: link.url,
      })
    }
  }, [link, reset])

  const onSubmit = async (data: EditLinkSchema) => {
    try {
      await onSave(data)
      onClose()
    } catch (error) {
      if (error instanceof Error) {
        setGlobalError(error.message)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-8"
        >
          <DialogHeader className="gap-2">
            <DialogTitle>{t('dashboard.links.editLink')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.links.editLinkDescription')}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            {globalError && (
              <FieldDescription className="text-red-500">
                {globalError}
              </FieldDescription>
            )}
            {fields.map(({ name, type, labelKey, placeholderKey }) => {
              const labelId = `${name}-label`
              const error = errors[name]

              return (
                <Field key={name}>
                  <FieldLabel id={labelId} htmlFor={name}>
                    {t(labelKey)}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={name}
                      type={type}
                      placeholder={t(placeholderKey)}
                      aria-labelledby={labelId}
                      aria-invalid={!!error}
                      {...register(name)}
                    />
                  </InputGroup>
                  {error && (
                    <FieldDescription className="text-red-500">
                      {error.message}
                    </FieldDescription>
                  )}
                </Field>
              )
            })}
          </FieldGroup>

          <DialogFooter className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('dashboard.links.cancel')}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner />
                  {t('auth.loading')}
                </>
              ) : (
                t('dashboard.links.saveChanges')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
})
