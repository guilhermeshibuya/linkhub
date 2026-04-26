import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { Switch } from '@/components/ui/switch'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  createLinkSchema,
  type CreateLinkSchema,
} from '../schemas/create-link-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

const fields: {
  name: keyof CreateLinkSchema
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

type AddLinkDialogProps = {
  pageId: string
  nextPosition: number
  onSave: (data: CreateLinkSchema) => Promise<void>
}

export function AddLinkDialog({
  pageId,
  nextPosition,
  onSave,
}: AddLinkDialogProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      isVisible: true,
      position: nextPosition,
      pageId: pageId ?? '',
    },
  })

  useEffect(() => {
    if (pageId) {
      reset((prevValues) => ({
        ...prevValues,
        pageId,
        position: nextPosition,
      }))
    }
  }, [pageId, nextPosition, reset])

  const onSubmit = async (data: CreateLinkSchema) => {
    try {
      setGlobalError(null)
      await onSave(data)
      setIsOpen(false)
      reset()
    } catch (error) {
      if (error instanceof Error) {
        setGlobalError(error.message)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button className="w-full">{t('dashboard.links.addNewLink')}</Button>
        }
      />
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-8"
        >
          <DialogHeader className="gap-2">
            <DialogTitle>{t('dashboard.links.addNewLink')}</DialogTitle>
            <DialogDescription>
              {t('dashboard.links.addNewLinkDescription')}
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
            <Field className="grid grid-cols-2 ">
              <div>
                <FieldLabel id="isVisible-label" htmlFor="isVisible">
                  {t('dashboard.links.isVisibleLabel')}
                </FieldLabel>
                <FieldDescription>
                  {t('dashboard.links.isVisibleDescription')}
                </FieldDescription>
              </div>
              <Controller
                name="isVisible"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isVisible"
                    defaultChecked
                    className="self-center justify-self-end"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>
            <input type="hidden" {...register('pageId')} />
          </FieldGroup>

          <DialogFooter className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              {t('dashboard.links.cancel')}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner />
                  {t('auth.loading')}
                </>
              ) : (
                t('dashboard.links.add')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
