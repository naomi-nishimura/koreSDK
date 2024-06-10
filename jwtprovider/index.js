const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// corsへの対処
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080' // アクセスを許可するオリジン
}));

// JSONデータの受け取りに必要
app.use(express.json());

// JWTの秘密鍵
const secretKey = 'KO99ZLqbOX9sZI3KqG1MM3j2NDsTe4zXF5HDGM38W+s=';

app.post('/generateJWT', (req, res) => {
  const { clientId, clientSecret, identity, aud, isAnonymous } = req.body;

  // クライアントIDとクライアントシークレットの検証
  if (clientId !== 'cs-0b85045f-9a0a-501c-8a25-3f6735404ede' || clientSecret !== 'KO99ZLqbOX9sZI3KqG1MM3j2NDsTe4zXF5HDGM38W+s=') {
    return res.status(401).json({ error: 'Invalid client credentials' });
  }

  // JWTのペイロードを作成
  const payload = {
    sub: identity, // サブジェクト (ユーザーIDなど)
    iss: clientId, // イシューア (クライアントID)
    aud: aud, // 対象者
    isAnonymous: isAnonymous, // 匿名フラグ
  };

  // JWTの生成
  const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

  res.json({ jwt: token });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});