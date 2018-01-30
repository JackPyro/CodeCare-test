export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
export const required = value => (value ? undefined : 'Required')
export const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)
export const validHour = value => (value > 0 && value < 6) || (value > 7 && value < 13) ? undefined : 'Enter valid hours'
export const validMinute = value => (value >= 0 && value <= 60) ? undefined : 'Enter valid minutes'

export const getValidTime = (hours, minutes) => {
  const validTime = (hours < 6)
    ? (hours + 12) * 10 + minutes
    : hours * 10 + minutes
  return validTime
}