import { User } from '../models';

export async function getUser(req) {
  // Get user's info
  const { user: { email: username } } = req;
  const foundUsers = await User.findAll({
    where: {
      email: username,
    },
  });

  if (foundUsers.length > 0) return foundUsers[0];
  return null;
}

export async function updateXP(req, xpAmount) {
  const user = await getUser(req);
  user.xp += parseInt(xpAmount, 10);
  user.save();
}
