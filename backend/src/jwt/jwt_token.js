import jwt from "jsonwebtoken";

/**
 * JWT 토큰 만들기
 * @param {any} payload
 * @returns {string} token
 */
export const generateToken = payload => {
  return new Promise((resolve, reject) => {
    // jwt.sign(토큰에 들어갈 데이터, 비밀키, 옵션, 콜백함수)
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        // 만료는 7일
        expiresIn: "7d"
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};

export const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

// exports.jwtMiddleware = async (ctx, next) => {
//     const token = ctx.cookies.get('access_token')

//     if (!token) return next()

//     try {
//         const decoded = await decodeToken(token)

//         if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
//             const { _id, email } = decoded
//             const newToken = await generateToken({ _id, email }, 'User')

//             ctx.cookies.set('access_token', newToken, {
//                 httpOnly: true,
//                 maxAge: 1000 * 60 * 60 * 24 * 7
//             })
//         }

//         ctx.request.user = decoded
//     } catch (err) {
//         ctx.request.user = null
//     }

//     return next()
// }
