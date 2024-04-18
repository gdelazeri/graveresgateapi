import { isString } from 'lodash';
import { REGISTRATION_PREFIX } from '../enum/Constants';

export const generateRegistrationId = (registrationId?: string) => {
  if (!isString(registrationId)) {
    return `${REGISTRATION_PREFIX}001`;
  }

  const registrationNumber =
    parseInt(registrationId.replace(REGISTRATION_PREFIX, '')) + 1;
  const formattedRegistrationNumber = registrationNumber
    .toString()
    .padStart(3, '0');
  return `${REGISTRATION_PREFIX}${formattedRegistrationNumber}`;
};
