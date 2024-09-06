import { User } from '../../models/entities/User';

export const getUserAvatarText = (user?: User) => {
  if (!user) {
    return 'AB';
  }
  let text = user.first_name[0];
  if (user.last_name) {
    text += user.last_name[0];
  } else if (user.first_name.length > 1) {
    text += user.first_name[1];
  }
  return text.toUpperCase();
};

export const getUserFullName = (user?: User) =>
  [user?.first_name, user?.last_name]
    .filter((v) => !!v)
    .join(' ')
    .trim();
