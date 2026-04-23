import i18next from 'i18next'

export const zodMessages = {
  required: () => i18next.t('validation.required'),
  string: {
    min: (min: number) => i18next.t('validation.minLength', { min }),
    max: (max: number) => i18next.t('validation.maxLength', { max }),
    email: () => i18next.t('validation.email'),
    url: () => i18next.t('validation.url'),
    onlyLettersAndSpaces: () => i18next.t('validation.onlyLettersAndSpaces'),
    onlyLettersNumbersUnderscoresDot: () =>
      i18next.t('validation.onlyLettersNumbersUnderscoresDot'),
    nonempty: () => i18next.t('validation.nonempty'),
    uuid: () => i18next.t('validation.uuid'),
  },
}
