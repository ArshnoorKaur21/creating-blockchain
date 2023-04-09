const SHA256=require('crypto-js/sha256');
/*
  proof of work can help with 2 things:-
  1. it prevents attackers
  2. it provides mining rewards so that people try to be neutral rather than being attackers
  3. we can implement pow system by using mine method and nonce property to our block
*/

class Block{
    constructor(timestamp="",data=[])
    {
        this.timestamp=timestamp;
        this.data=data;
        this.hash=this.getHash();
        this.prevhash="";
        this.difficulty=1;
    }
    getHash()
    {
        return SHA256(this.prevhash,this.timestamp,JSON.stringify(this.data),this.nonce);
    }
    getlatestblock()
    {
        return this.chain[this.chain.length-1];
    }
    addblock(block)
    {
        block.prevhash=this.getlatestblock().hash;
        block.hash=block.getHash();
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block))
    }
    mine(difficulty)
    {
        //basically it loops until our hash starts with stting 00000 with length of diifiulty
        while(!this.hash.startsWith(Array(difficulty+1).join("0")))
        {
            this.nonce++;
            this.hash=this.getHash();
        }

        //in while condiiton this is a target hash that it sholud start with 0's which are pf lenght of dificutly
        /*
        Because when we change a small detail in our block, the hash will be completely different, so we are just incrementing nonce over and over again until the hash matches the one we need
        */

    }
}