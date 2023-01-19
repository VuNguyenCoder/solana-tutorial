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
      console.log('So du truoc: ', balance/web3.LAMPORTS_PER_SOL)

      let other_wallet = web3.Keypair.generate()
      console.log('Chuyen 5 SOL cho ', other_wallet.publicKey.toBase58())
      transaction = new web3.Transaction();
      transaction.add(
          web3.SystemProgram.transfer({
              fromPubkey: wallet.publicKey,
              toPubkey: other_wallet.publicKey,
              lamports: 1 * web3.LAMPORTS_PER_SOL,
          }),
      );
      await web3.sendAndConfirmTransaction(connection, transaction, [wallet]);

      balance = await connection.getBalance(wallet.publicKey)
      console.log('So du sau: ', balance/web3.LAMPORTS_PER_SOL)
  })()
