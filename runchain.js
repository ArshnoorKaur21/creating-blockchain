const {Block,Blockchain}=require('../running-blockchain/testingthechain');

const jechain=new Blockchain();

jechain.addblock(new Block(Date.now().toString(),{from:"Arshnoor",to:"abc",amount:100}));

console.log(jechain.chain);