const SHA256 = require("crypto-js/sha256");
class Blockchain{
    //section1 contains genesis block creation
    constructor(index,timestamp,data,previousHash='')
    {
        this.index=index;
        this.previousHash=previousHash;
        this.timestamp=timestamp;
        this.data=data;
        this.hash=this.calculateHash();
        this.chain=[this.createGenesisBlock()];
        //or this.chain=[new Block(Date.now().toString())];
    }
    calculateHash()
    {
        return SHA256(this.index,this.previousHash,this.timestamp,JSON.stringify(this.data)).toString();
    }

    createGenesisBlock()
    {
        return new Block(0,"03/01/2023","Genesis block","0");
        //previous hash value is "0" and 2nd argument is date.datetime.now()
    }

    //section2 adding new blocks
    getlatestblock()
    {
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock)
    {
        newBlock.previousHash=this.getlatestblock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(Object.freeze(newBlock));
        //object.freeze ensures immutability in our code
    }

    //section3 validating the chain
    ischainvalid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            const currentblock=this.chain[i];
            const previousblock=this.chain[i-1];

            if(currentblock.hash!==currentblock.calculateHash())
            {
                return false;
            }
            if(previousblock.hash!==previousblock.calculateHash())
            {
                return false;
            }
        }
        return true;

    }
}