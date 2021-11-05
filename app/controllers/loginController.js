import { User } from '../models';

const jwt = require('jsonwebtoken');

let refreshTokens = [];

function generateAccessToken(email) {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  });
}

function refreshTokenFunction(req, res) {
  const { refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user.email);
    return res.json({ accessToken });
  });
}

async function login(req, res) {
  const { email } = req.body;

  const foundUser = await User.findAll({
    where: { email },
  });

  if (foundUser.length === 0) {
    res.sendStatus(400);
  } else {
    const accessToken = generateAccessToken(email);
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  }
}

function logout(req, res) {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.refreshToken);
  res.sendStatus(204);
}

module.exports = {
  login,
  logout,
  refreshTokenFunction,
  authenticateToken,
  generateAccessToken,
};
