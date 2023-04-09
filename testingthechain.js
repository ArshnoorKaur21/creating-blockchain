const SHA256=require('crypto-js/sha256');

class Block{
    constructor(timestamp="",data=[])
    {
        this.previousHash='';
        this.timestamp=timestamp;
        this.data=data;
        this.nonce=0;
        this.hash=this.calculateHash();
    }
    calculateHash()
    {
        return (SHA256((this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce))).toString();
    }
    mine(difficulty)
    {
        //basically it loops until our hash starts with stting 00000 with length of diifiulty
        while(!this.hash.startsWith(Array(difficulty).join("0")))
        {
            this.nonce++;
            this.hash=this.calculateHashHash();
        }
    }
    getlatestblock()
    {
        return this.chain[this.chain.length-1];
    }
    addblock(block)
    {
        block.prevhash=this.getlatestblock().hash;
        block.hash=block.calculateHash();
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block))
    }
}

class Blockchain{
    constructor()
    {
        this.difficulty = 1;
        this.chain = [new Block(Date.now().toString())];
    }
    getlatestblock()
    {
        return this.chain[this.chain.length-1];
    }
    addblock(block)
    {
        block.prevhash=this.getlatestblock().hash;
        block.hash=block.calculateHash();
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block))
    }
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

module.exports={Block,Blockchain};
