  const web3 = require('@solana/web3.js');
  const fs = require('fs')

  let server_addr = 'http://127.0.0.1:8899';
  let wallet_path = '/home/vuna/.config/solana/id.json';

  (async () => {
      let secretString = await fs.promises.readFile(wallet_path, 'utf-8')
      secretString = Uint8Array.from(JSON.parse(secretString))
      let wallet = web3.Keypair.fromSecretKey(secretString)

      let connection = new web3.Connection(server_addr)
      let balance = await connection.getBalance(wallet.publicKey)
      console.log('Dia chi VI: ', wallet.publicKey.toBase58())
      console.log('So du trong VI: ', balance/web3.LAMPORTS_PER_SOL)
   })()
